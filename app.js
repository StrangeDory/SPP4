const express = require('express')
const multer = require("multer")
const cookieParser = require('cookie-parser')
const moment = require('moment')
const Track = require('./track')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const dataPath = 'data.json'
const idPath = 'id.json'
const usersPath = 'users.json'
const tokenKey = 'b91028378997c0b3581821456edefd0ec'

let userId = -1
let lastUploadFile

const jsonParser = express.json()
const app = express()
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

function readToJSON(path, isAll) {
    let data = fs.readFileSync(path, "utf8")
    let parsedJSON = JSON.parse(data)
    let p = [[]]
    if (path == 'data.json' && !isAll) {
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

app.get("/tracks", function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    console.log(req.url)
    res.send(readToJSON(dataPath, false))
})

app.get("/download/:trackId/:filename", function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    let path = process.cwd() + "\\uploads\\" + req.params.filename
    let trackId = req.params.trackId
    let data = readToJSON(dataPath, false)
    let originalName = data[0].filter(x => x.id === parseInt(trackId))[0].file.originalname

    res.download(path, originalName)
})

app.post("/logout", function (req, res) {
    res.clearCookie('token');
    delete req.session;

    res.redirect('/');
})

app.post("/signIn", jsonParser, async function (req, res) {
    console.log(req.body)
    let users = readToJSON(usersPath, false)
    let user = users.find(u => u.login === req.body.login)
    if (user !== undefined) {
        const match = await bcrypt.compare(req.body.password, user.hashedPassword)
        if (match) {
            userId = user.id
            let token = jwt.sign(req.body, tokenKey, { expiresIn: 600 })
            res.cookie('token', token, { httpOnly: true })
            res.send(readToJSON(dataPath, false))

        }
        else {
            res.status(400).json({ message: 'Bad password' })
        }
    } else {
        res.status(401).json({ message: 'Not authorized' })
    }
})

app.post("/signUp", jsonParser, function (req, res) {
    console.log(req.body)
    let users = readToJSON(usersPath, false)
    let user = users.find(u => u.login === req.body.login)
    if (user === undefined) {
        let ids = readToJSON(idPath)

        ids.userId = userId = ids.userId + 1;
        writeToJSON(idPath, ids)
        users.push({ id: ids.userId, login: req.body.login, hashedPassword: req.body.password })
        let token = jwt.sign(req.body, tokenKey, { expiresIn: 600 })
        res.cookie('token', token, { httpOnly: true })
        writeToJSON(usersPath, users)
        res.status(201).json({ message: 'Registration successful' })
    } else {
        res.status(401).json({ message: 'Registration faild' })
    }
})

app.post("/upload", function (req, res, next) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    console.log(req.file)
    lastUploadFile = req.file
    next();
})

app.post("/tracks", jsonParser, function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }
    if (!req.body)
        return res.sendStatus(404)
    let ids = readToJSON(idPath)
    let data = readToJSON(dataPath, true)    

    ids.trackId = ids.trackId + 1
    ids.userId = ids.userId;
    if (req.body.name === "") {
        req.body.name = `New track-${ids.trackId}`
    }
    if (req.body.dateUpload === "") {
        req.body.dateUpload = moment(new Date()).add(1, 'days').format('YYYY-MM-DDThh:mm')
    }
    if (req.body.name === "") {
        req.body.name = `New track-${data.trackId}`
    }

    if (req.body.dateUpload === "") {
        req.body.dateUpload = moment(new Date()).add(1, 'days')
    }

    if (userId == undefined)
    {
        return res.status(401).json({ message: 'Not authorized' })
    }
    const track = new Track(ids.trackId, userId, req.body.name, req.body.status, req.body.dateUpload, lastUploadFile)
    data[0].push(track)
    console.log("POST track")
    console.log(req.body)
    console.log(data)

    writeToJSON(idPath, ids)
    writeToJSON(dataPath, data)
    let userdata = readToJSON(dataPath, false)
    res.send(JSON.stringify(userdata, null, 2))
})

app.delete("/tracks/:trackId", function (req, res) {
    if (!req.logged) {
        return res.status(401).json({ message: 'Not authorized' })
    }

    const trackId = req.params.trackId
    let data = readToJSON(dataPath, true)

    data[0] = data[0].filter(x => x.id !== parseInt(trackId))
    writeToJSON(dataPath, data)
    let userdata = readToJSON(dataPath, false)
    res.send(JSON.stringify(userdata, null, 2))
})

app.listen(3000)
