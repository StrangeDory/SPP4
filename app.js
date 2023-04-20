const express = require('express')
const multer = require("multer")
const cookieParser = require('cookie-parser')
const cookies = require('cookie-parse')
const moment = require('moment')
const Track = require('./track')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const io = require("socket.io")({
    serveClient: true,
    cookie: true
})
const http = require("http")
const app = express()
const server = http.createServer(app)

const dataPath = 'data.json'
const idPath = 'id.json'
const usersPath = 'users.json'
const tokenKey = 'b91028378997c0b3581821456edefd0ec'

let userId = -1
let lastFile

const jsonParser = express.json()
app.use(express.static(__dirname + "/views/public"))

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(express.static(__dirname))
app.use(multer({ storage: storageConfig }).single("track-files"));

app.use(cookieParser())

app.use(async (req, res, next) => {
    console.log(req.cookies)
    try {
        let decoded = jwt.verify(req.cookies.token, tokenKey)
        let users = readToJSON(usersPath)
        let user = users.find(u => u.login === decoded.login)
        req.logged = user !== undefined && await bcrypt.compare(decoded.password, user.hashedPassword)
        userId = user.id
    } catch {
        req.logged = false
    }
    next();
})

io.use(async function (socket, next) {
    let token
    try {
        token = cookies.parse(socket.handshake.headers.cookie).token
    } catch {
        token = undefined
    }

    console.log("token ", token)
    let logged
    try {
        let decoded = jwt.verify(token, tokenKey)
        let users = readToJSON(usersPath)
        let user = users.find(u => u.login === decoded.login)
        logged = user !== undefined && await bcrypt.compare(decoded.password, user.hashedPassword)
    } catch {
        logged = false
    }
    if (logged) {
        next()
    } else {
        next(new Error('Authentication error'))
    }
})
    .on('connection', function (socket) {
        console.log("connected")

        socket.on("askTracks", () => onReadTracks(io))

        socket.on("createTrack", (data) => {
            onCreateTrack(data, lastFile)
            onReadTracks(io)
        })

        socket.on("updateStatus", (trackId, data) => {
            onUpdateStatus(trackId, data)
            onReadTracks(io)
        })

        socket.on("deleteTrack", (trackId) => {
            onDeleteTrack(trackId)
            onReadTracks(io)
        })
    })

readToJSON = function(path,userId,isAll) {
    let data = fs.readFileSync(path, "utf8")
    let parsedJSON = JSON.parse(data)
    let p = [[]]
    if (path == 'data.json'&& !isAll) {
        for (let i = 0; i < parsedJSON[0].length; i++) {
            if (parsedJSON[0][i].userId == userId) {
                p[0].push(parsedJSON[0][i])
            }
        }
        console.log(JSON.parse(JSON.stringify(Object.assign({}, p))))
        console.log(parsedJSON)
        return JSON.parse(JSON.stringify(Object.assign({}, p)))

    }
    return parsedJSON
}

function writeToJSON(path, obj) {
    const data = JSON.stringify(obj, null, 2)
    fs.writeFileSync(path, data)
    return data
}

app.get("/download/:trackId/:filename", function (req, res) {
    console.log(req.logged)
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    onDownload(req, res)
})
app.post("/logout", function (req, res) {
    res.clearCookie('token');
    delete req.session;
    res.redirect('/');
    io.close
})
app.post("/signIn", jsonParser, function (req, res) {
    onSignIn(req, res);
})

app.post("/signUp", jsonParser, function (req, res) {
    onSignUp(req, res);
})

app.post("/upload", function (req, res, next) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    console.log(req.file)
    lastFile = req.file
    next()
})

io.attach(server)
server.listen(3000)

onReadTracks = function (io) {
    io.sockets.emit("getTracks", JSON.stringify(readToJSON(dataPath,userId)))
}

onCreateTrack = function (newTrackData, lastFile) {
    let ids = readToJSON(idPath,userId)
    let data = readToJSON(dataPath,userId,true)

    ids.trackId = ids.trackId + 1;
    ids.userId = ids.userId;
    if (newTrackData.name === "") {
        newTrackData.name = `New track-${ids.trackId}`
    }
    if (newTrackData.expires === "") {
        newTrackData.expires = moment(new Date()).add(1, 'days').format('YYYY-MM-DDThh:mm')
    }

    const track = new Track(ids.trackId, userId, newTrackData.name, newTrackData.status, newTrackData.dateUpload, lastFile)
    data[0].push(track)

    writeToJSON(idPath, ids)
    writeToJSON(dataPath, data)
}

onUpdateStatus = function (trackId, status) {
    let data = readToJSON(dataPath,userId,true)

    const index = data[0].findIndex(x => x.id == parseInt(trackId))
    data[0][index].status = status

    writeToJSON(dataPath, data)
}

onDeleteTrack = function (trackId) {
    let data = readToJSON(dataPath,userId)
    data[0] = data[0].filter(x => x.id !== parseInt(trackId))
    writeToJSON(dataPath, data)
}

onDownload = function (req, res) {
    let path = process.cwd() + "\\uploads\\" + req.params.filename
    let trackId = req.params.trackId
    let data = readToJSON(dataPath, userId,false)
    let originalName = data[0].filter(x => x.id === parseInt(trackId))[0].file.originalname

    res.download(path, originalName)
}

onSignIn = async function (req, res) {
    console.log(req.body)
    let users = readToJSON(usersPath,userId,false)
    let user = users.find(u => u.login === req.body.login)
    console.log(user)
    if (user !== undefined) {
        const match = await bcrypt.compare(req.body.password, user.hashedPassword)
        if (match) {
            userId = user.id
            let token = jwt.sign(req.body, tokenKey, { expiresIn: '1h' })
            res.cookie('token', token, { httpOnly: true })
            res.send(readToJSON(dataPath,userId,false))
        }
        else {
            res.status(401).json({ message: 'Bad password' })
        }
    } else {
        res.status(401).json({ message: 'Not authorized' })
    }
}

onSignUp = function (req, res) {
    console.log(req.body)
    let users = readToJSON(usersPath,userId,false)
    let user = users.find(u => u.login === req.body.login)
    if (user === undefined) {
        let ids = readToJSON(idPath,userId)
        ids.userId = userId = ids.userId + 1;
        writeToJSON(idPath, ids)
        users.push({  id: ids.userId,login: req.body.login, hashedPassword: req.body.password })
        let token = jwt.sign(req.body, tokenKey, { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true })
        writeToJSON(usersPath, users)
        res.send(readToJSON(dataPath,userId))
    } else {
        res.status(401).json({ message: 'Not authorized' })
    }
}
