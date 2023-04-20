let socket;

function resolveTracks(jsonData) {
    console.log(jsonData)
    const data = JSON.parse(jsonData)
    reset()
    drawRoot()
    drawTracks(data[0]);
}

function raiseConnection() {
    socket = io()

    socket.on('connect_error', function (err) {
        console.log(err)
        reset()
        drawsignInRoot()
    })

    socket.on("getTracks", data => resolveTracks(data))
}

async function responseRoutine(response) {
    if (response.ok === true) {
        localStorage.setItem('isUnauthorised',false);
        raiseConnection()
         await fetchTracks()
    } else if (response.status === 401) {
        reset()
        drawsignInRoot()
    }
}

function onSignIn(e) {
    e.preventDefault();
    const form = document.forms["signIn"];
    let user = {
        login: form.elements["login"].value,
        password: form.elements["password"].value
    };
    console.log(user);
    sendUser(user).then();
}

function onSignUp(e) {
    e.preventDefault();
    const form = document.forms["signUp"];
    const hashedPassword = dcodeIO.bcrypt.hashSync(form.elements["password"].value, 10);
    let user = {
        login: form.elements["login"].value,
        password: hashedPassword
    };
    console.log(user);
    addUser(user).then();
}

async function sendUser(user) {
    const response = await fetch('/signIn', {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    await responseRoutine(response);
}

async function addUser(user) {
    const response = await fetch('/signUp', {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(user)
    });
    await responseRoutine(response);
}

async function fetchTracks() {
    socket.emit("askTracks")
}

async function createTrack(obj, file) {
    console.log(file.files);
    const formData = new FormData();
    formData.append('track-files', file.files[0]);
    await fetch(`/upload`, {
        method: "POST",
        body: formData
    })
    socket.emit("createTrack", obj)
}

async function deleteTrack(trackId) {
    socket.emit("deleteTrack", trackId)
}

async function updateStatus(track) {
    const trackId = track.id
    socket.emit("updateStatus", trackId)
}

function reset() {
    document.getElementById("root").innerHTML = "";
}

function drawTracks(tracks) {
    let trackRows = ""
    tracks.forEach(track => {
        trackRows += getTracks(track)
    })
    document.getElementById("root").insertAdjacentHTML('afterbegin', getTableRoot(trackRows))
    tracks.forEach(track => {
        document.getElementById(`delete-${track.id}`).addEventListener("click", e => deleteTrack(track.id))
    })
}

function drawRoot() {
    reset()
    document.getElementById("root").insertAdjacentHTML('beforeend', getNewTrackRoot())
    document.forms["add-track"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["add-track"];
        let obj = {
            name: form.elements["track-name"].value,
            status: form.elements["track-status"].value,
            dateUpload: form.elements["track-date-upload"].value
        };
        createTrack(obj, form.elements["track-files"]).then();
    });
}

function drawsignInRoot() {
    reset()
    document.getElementById("root").insertAdjacentHTML('beforeend', getsignInRoot())
    document.getElementById("sup").addEventListener("click", e => {
        e.preventDefault()
        drawsignUpRoot()
    })
    document.forms["signIn"].addEventListener("submit", e => onSignIn(e));
}

function drawsignUpRoot() {
    reset()
    document.getElementById("root").insertAdjacentHTML('beforeend', getsignUpRoot())
    document.getElementById("sin").addEventListener("click", e => {
        e.preventDefault()
        drawsignInRoot()
    })
    document.forms["signUp"].addEventListener("submit", e => onSignUp(e));
}

if(localStorage.getItem('isUnauthorised')=='true'){
    drawsignInRoot()
}else {
    drawRoot()
    raiseConnection()
    fetchTracks().then()
}
