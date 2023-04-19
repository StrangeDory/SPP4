
if(localStorage.getItem('isUnauthorised')==='true'){
     drawsignInRoot()
 }else {
    drawRoot()
    fetchTracks().then()
}



async function responseRoutine(response) {
    if (response.status === 201) {
        alert("Registration was successful!")
        reset();
        drawsignInRoot();
    } else if (response.ok === true) {
            const data = await response.json();
            console.log('s' + data)
            localStorage.setItem('isUnauthorised',false);
            reset();
            drawRoot();
            drawTracks(data[0]);

    } else if (response.status === 401)
    {
        alert('Not authorized');
        reset();
        drawsignInRoot();
        localStorage.setItem('isUnauthorised',true);
    }else if (response.status === 400)
    {
        alert('Wrong password');
        reset();
        drawsignInRoot();
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
    const response = await fetch('/tracks', {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    await responseRoutine(response);
}

async function createTrack(obj, file) {
    console.log(file.files);
    const formData = new FormData();
    formData.append('track-files', file.files[0]);
    await fetch(`/upload`, {
        method: "POST",
        body: formData
    });
    const response = await fetch(`/tracks`, {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(obj)
    });
    await responseRoutine(response);
}

async function deleteTrack(trackId) {
    const response = await fetch(`/tracks/${trackId}`, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    await responseRoutine(response);
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

