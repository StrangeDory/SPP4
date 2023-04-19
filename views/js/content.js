function getsignInRoot() {
    // language=HTML
    return `
      
        <style>
            html, body * { box-sizing: border-box; font-family: 'Open Sans', sans-serif; }

            body {
                
                background:
                        linear-gradient(
                                rgba(246,247,249,0.8),
                                rgba(246,247,249,0.8)),
                        url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/sky-clouds-cloudy-mountain.jpg) no-repeat center center fixed;
                background-size: cover;
            }
            .container {
                width: 100%;
                padding-top: 60px;
                padding-bottom: 100px;
            }

            .frame {
                height: 535px;
                width: 430px;
                background: -webkit-linear-gradient(
                        rgba(35, 43, 85, 0.75),
                        rgba(35, 43, 85, 0.95)),
                url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/clouds-cloudy-forest-mountain.jpg) no-repeat center center;
                background: linear-gradient(
                        rgba(35, 43, 85, 0.75),
                        rgba(35, 43, 85, 0.95)),
                url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/clouds-cloudy-forest-mountain.jpg) no-repeat center center;
                background-size: cover;
                margin-left: auto;
                margin-right: auto;
                border-top: solid 1px rgba(255, 255, 255, .5);
                border-radius: 5px;
                box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                -webkit-transition: all .5s ease;
                transition: all .5s ease;
            }

            .frame-long {
                height: 615px;
            }

            .frame-short {
                height: 400px;
                margin-top: 50px;
                box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.1);
            }

            .nav {
                width: 100%;
                height: 100px;
                padding-top: 40px;
                opacity: 1;
                -webkit-transition: all .5s ease;
                transition: all .5s ease;
            }

         

            li {
                padding-left: 10px;
                font-size: 18px;
                display: inline;
                text-align: left;
                text-transform: uppercase;
                padding-right: 10px;
                color: #ffffff;
            }

            .signin-active a {
                padding-bottom: 10px;
                color: #ffffff;
                text-decoration: none;
                border-bottom: solid 2px #1059FF;
                -webkit-transition: all .25s ease;
                transition: all .25s ease;
                cursor: pointer;
            }

          

           

            .form-signin {
                width: 430px;
                height: 375px;
                font-size: 16px;
                font-weight: 300;
                padding-left: 37px;
                padding-right: 37px;
                padding-top: 55px;
                -webkit-transition: opacity .5s ease, -webkit-transform .5s ease;
                transition: opacity .5s ease, -webkit-transform .5s ease;
                transition: opacity .5s ease, transform .5s ease;
                transition: opacity .5s ease, transform .5s ease, -webkit-transform .5s ease;
            }

            .form-signin-left {
                -webkit-transform: translateX(-400px);
                transform: translateX(-400px);
                opacity: .0;
            }

            .form-signin input, .form-signup input {
                color: #ffffff;
                font-size: 13px;
            }

            .form-styling {
                width: 100%;
                height: 35px;
                padding-left: 15px;
                border: none;
                border-radius: 20px;
                margin-bottom: 20px;
                background: rgba(255, 255, 255, .2);
            }

            label {
                font-weight: 400;
                text-transform: uppercase;
                font-size: 13px;
                padding-left: 15px;
                padding-bottom: 10px;
                color: rgba(255, 255, 255, .7);
                display: block;
            }

            :focus {
                outline: none;
            }

            .form-signin input:focus, textarea:focus, .form-signup input:focus, textarea:focus {
                background: rgba(255, 255, 255, .3);
                border: none;
                padding-right: 40px;
                -webkit-transition: background .5s ease;
                transition: background .5s ease;
            }

            [type="checkbox"]:not(:checked),
            [type="checkbox"]:checked {
                position: absolute;
                display: none;
            }

            [type="checkbox"]:not(:checked) + label,
            [type="checkbox"]:checked + label {
                position: relative;
                padding-left: 85px;
                padding-top: 2px;
                cursor: pointer;
                margin-top: 8px;
            }

            [type="checkbox"]:not(:checked) + label:before,
            [type="checkbox"]:checked + label:before,
            [type="checkbox"]:not(:checked) + label:after,
            [type="checkbox"]:checked + label:after {
                content: '';
                position: absolute;
            }

            [type="checkbox"]:not(:checked) + label:before,
            [type="checkbox"]:checked + label:before {
                width: 65px;
                height: 30px;
                background: rgba(255, 255, 255, .2);
                border-radius: 15px;
                left: 0;
                top: -3px;
                -webkit-transition: all .2s ease;
                transition: all .2s ease;
            }

            [type="checkbox"]:not(:checked) + label:after,
            [type="checkbox"]:checked + label:after {
                width: 10px;
                height: 10px;
                background: rgba(255, 255, 255, .7);
                border-radius: 50%;
                top: 7px;
                left: 10px;
                -webkit-transition: all .2s ease;
                transition: all .2s ease;
            }

            /* on checked */
            [type="checkbox"]:checked + label:before {
                background: #0F4FE6;
            }

            [type="checkbox"]:checked + label:after {
                background: #ffffff;
                top: 7px;
                left: 45px;
            }

            [type="checkbox"]:checked + label .ui,
            [type="checkbox"]:not(:checked) + label .ui:before,
            [type="checkbox"]:checked + label .ui:after {
                position: absolute;
                left: 6px;
                width: 65px;
                border-radius: 15px;
                font-size: 14px;
                font-weight: bold;
                line-height: 22px;
                -webkit-transition: all .2s ease;
                transition: all .2s ease;
            }

            [type="checkbox"]:not(:checked) + label .ui:before {
                content: "no";
                left: 32px;
                color: rgba(255, 255, 255, .7);
            }

            [type="checkbox"]:checked + label .ui:after {
                content: "yes";
                color: #ffffff;
            }

            [type="checkbox"]:focus + label:before {
                box-sizing: border-box;
                margin-top: -1px;
            }

           

            .btn-signin {
                float: left;
                padding-top: 8px;
                width: 100%;
                height: 35px;
                border: none;
                border-radius: 20px;
                margin-top: -8px;
                font-size: 15px;
                background-color: rgba(16, 89, 255, 1);
                color: white;
            }
a{
    text-decoration: none;
}
            .btn-animate {
                float: left;
                font-weight: 700;
                text-transform: uppercase;
                font-size: 13px;
                text-align: center;
                color: rgba(255, 255, 255, 1);
                padding-top: 8px;
                width: 100%;
                height: 35px;
                border: none;
                border-radius: 20px;
                margin-top: 23px;
                background-color: rgba(16, 89, 255, 1);
                left: 0px;
                top: 0px;
                -webkit-transition: all .5s ease, top .5s ease .5s, height .5s ease .5s, background-color .5s ease .75s;
                transition: all .5s ease, top .5s ease .5s, height .5s ease .5s, background-color .5s ease .75s;
            }

            .btn-animate-grow {
                width: 130%;
                height: 625px;
                position: relative;
                left: -55px;
                top: -420px;
                color: rgba(255, 255, 255, 0);
                background-color: rgba(255, 255, 255, 1);
            }

           button.btn-signin:hover {
              color: rgba(16, 89, 255, 1);
                cursor: pointer;
                background-color: white;
                -webkit-transition: background-color .5s;
                transition: background-color .5s;
            }

   
         
        </style>
       <div class="container">
  <div class="frame">
    <div class="nav">
      <ul class="links">
        <li class="signin-active"><a class="btn" id="sin">Sign in</a></li>
        <li class="signup-inactive"><a class="btn" id="sup">Sign up </a></li>
      </ul>
    </div>
				        <form class="form-signin" action="" method="post" name="signIn">
          <label for="username">Username</label>
          <input class="form-styling" type="text" name="login" placeholder=""/>
          <label for="password">Password</label>
          <input class="form-styling" type="password" name="password" placeholder=""/>
<!--          <input type="checkbox" id="checkbox"/>-->
<!--          <label for="checkbox" ><span class="ui"></span>Keep me signed in</label>-->
          <div class="btn-animate">
            <button class="btn-signin" type="submit">Sign in</button>
          </div>
				        </form>
    </div>
  </div>`
}

function getsignUpRoot() {
    return `<style>

html, body * { box-sizing: border-box; font-family: 'Open Sans', sans-serif; }

body {
  background:
    -webkit-linear-gradient(
    rgba(246,247,249,0.8),
    rgba(246,247,249,0.8)),
    url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/sky-clouds-cloudy-mountain.jpg) no-repeat center center fixed;
  background:
    linear-gradient(
    rgba(246,247,249,0.8),
    rgba(246,247,249,0.8)),
    url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/sky-clouds-cloudy-mountain.jpg) no-repeat center center fixed;
  background-size: cover;
}

.container {
  width: 100%;
  padding-top: 60px;
  padding-bottom: 100px;
}

.frame {
  height: 575px;
  width: 430px;
  background:
    -webkit-linear-gradient(
    rgba(35,43,85,0.75),
    rgba(35,43,85,0.95)),
    url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/clouds-cloudy-forest-mountain.jpg) no-repeat center center;
  background:
    linear-gradient(
    rgba(35,43,85,0.75),
    rgba(35,43,85,0.95)),
    url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/clouds-cloudy-forest-mountain.jpg) no-repeat center center;
  background-size: cover;
  margin-left: auto;
  margin-right: auto;
  border-top: solid 1px rgba(255,255,255,.5);
  border-radius: 5px;
  box-shadow: 0px 2px 7px rgba(0,0,0,0.2);
  overflow: hidden;
  -webkit-transition: all .5s ease;
  transition: all .5s ease;
}

.frame-long {
  height: 615px;
}

.frame-short {
  height: 400px;
  margin-top: 50px;
  box-shadow: 0px 2px 7px rgba(0,0,0,0.1);
}

.nav {
  width: 100%;
  height: 100px;
  padding-top: 40px;
  opacity: 1;
  -webkit-transition: all .5s ease;
  transition: all .5s ease;
}



li {
  padding-left: 10px;
  font-size: 18px;
  display: inline;
  text-align: left;
  text-transform: uppercase;
  padding-right: 10px;
  color: #ffffff;
}


.signup-active a {
  cursor: pointer;
  color: #ffffff;
  text-decoration: none;
  border-bottom: solid 2px #1059FF;
  padding-bottom: 10px;
}

.signup-inactive a {
  cursor: pointer;
  color: rgba(255,255,255,.3);
  text-decoration: none;
  -webkit-transition: all .25s ease;
  transition: all .25s ease;
}



.form-signup {
  width: 430px;
  height: 375px;
\tfont-size: 16px;
\tfont-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  padding-top: 55px;
  position: relative;
 
  -webkit-transition: all .5s ease;
  transition: all .5s ease;
}

.form-signup-left {
  -webkit-transform: translateX(-399px);
          transform: translateX(-399px);
  opacity: 1;
}

.form-signup-down {
  top: 0px;
  opacity: 0;
}


.form-signin input, .form-signup input {
  color: #ffffff;
  font-size: 13px;
}

.form-styling {
  width: 100%;
  height: 35px;
\tpadding-left: 15px;
\tborder: none;
\tborder-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255,255,255,.2);
}

label {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 13px;
  padding-left: 15px;
  padding-bottom: 10px;
  color: rgba(255,255,255,.7);
  display: block;
}

:focus {outline: none;
}

.form-signin input:focus, textarea:focus, .form-signup input:focus, textarea:focus {
    background: rgba(255,255,255,.3);
    border: none; 
    padding-right: 40px;
    -webkit-transition: background .5s ease;
    transition: background .5s ease;
 }

[type="checkbox"]:not(:checked),
[type="checkbox"]:checked {
  position: absolute;
  display: none;
}

[type="checkbox"]:not(:checked) + label,
[type="checkbox"]:checked + label {
  position: relative;
  padding-left: 85px;
  padding-top: 2px;
  cursor: pointer;
  margin-top: 8px;
}

[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before,
[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  content: '';
  position: absolute;
}

[type="checkbox"]:not(:checked) + label:before,
[type="checkbox"]:checked + label:before {
  width: 65px; 
  height: 30px;
  background: rgba(255,255,255,.2);
  border-radius: 15px;
  left: 0; 
  top: -3px;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}

[type="checkbox"]:not(:checked) + label:after,
[type="checkbox"]:checked + label:after {
  width: 10px; 
  height: 10px;
  background: rgba(255,255,255,.7);
  border-radius: 50%;
  top: 7px; 
  left: 10px;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}

/* on checked */
[type="checkbox"]:checked + label:before {
  background: #0F4FE6; 
}

[type="checkbox"]:checked + label:after {
  background: #ffffff;
  top: 7px; 
  left: 45px;
}

[type="checkbox"]:checked + label .ui,
[type="checkbox"]:not(:checked) + label .ui:before,
[type="checkbox"]:checked + label .ui:after {
  position: absolute;
  left: 6px;
  width: 65px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: bold;
  line-height: 22px;
  -webkit-transition: all .2s ease;
  transition: all .2s ease;
}

[type="checkbox"]:not(:checked) + label .ui:before {
  content: "no";
  left: 32px;
  color: rgba(255,255,255,.7);
}

[type="checkbox"]:checked + label .ui:after {
  content: "yes";
  color: #ffffff;
}

[type="checkbox"]:focus + label:before {
  box-sizing: border-box;
  margin-top: -1px;
}

.btn-signup {
  float: left;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: #ffffff;
  padding-top: 8px;
  width: 100%;
  height: 35px;
\tborder: none;
\tborder-radius: 20px;
  margin-top: 23px;
  background-color: #1059FF;
}
[title="err"]{
border: solid 2px red;
}

.btn-animate {
  float: left;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255,255,255, 1);
  padding-top: 8px;
  width: 100%;
  height: 35px;
\tborder: none;
\tborder-radius: 20px;
  margin-top: 23px;
  background-color: rgba(16,89,255, 1);
  left: 0px;
  top: 0px;
  -webkit-transition: all .5s ease, top .5s ease .5s, height .5s ease .5s, background-color .5s ease .75s;
  transition: all .5s ease, top .5s ease .5s, height .5s ease .5s, background-color .5s ease .75s; 
}

.btn-animate-grow {
  width: 130%;
  height: 625px;
  position: relative;
  left: -55px;
  top: -420px;
  color: rgba(255,255,255,0);
  background-color: rgba(255,255,255,1);
}
a{
text-decoration: none;
}
button.btn-signup:hover {
color: rgba(16,89,255, 1);
    cursor: pointer; 
    background-color: white;
    -webkit-transition: background-color .5s;
    transition: background-color .5s; 
}


</style>
 <div class="container">
  <div class="frame">
    <div class="nav">
      <ul >
        <li class="signup-inactive"><a class="btn" id="sin">Sign in</a></li>
        <li class="signup-active"><a class="btn" id="sup">Sign up </a></li>
      </ul>
    </div>
<form class="form-signup" action="" method="post" name="signUp"  >
          <label for="fullname">USERNAME</label>
          <input class="form-styling" type="text" name="login" placeholder="" required/>
          <label for="password">Password</label>
          <input class="form-styling" type="password" name="password" placeholder="" id="password" required/>
          <label for="confirmpassword">Confirm password</label>
          <input class="form-styling" type="password" name="confirmpassword" placeholder="" id="confirmpassword"/>
          <button class="btn-signup" type="submit">Sign Up</button></form>
</div>
</div>`
}

function filterTracksByStatus() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("srchSelect");
    filter = input.value.toUpperCase();
    tr = document.getElementsByClassName("mdc-data-table__row")
    for (i = 1; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase() === filter || filter === "ALL") {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}


function getTableRoot(rows) {
    return ` <div class="Tittle" style="margin-top: 5px; text-align-last: center; font-family:  cursive; font-size: 3em; color: snow;">
        <p>PLAYLIST</p>
    </div>
    <img class="gif" src="views/icons/cat-catjam.gif" height="300" alt="gif" style="margin-left: auto; margin-right: auto; margin-bottom: 30px; display: block;">
    <select name="status" id="srchSelect" class="custom-select fntsize" onchange="filterTracksByStatus()" title="Track's status" style="margin: auto; width: 50%;  font-size: 1.2em; font-family: 'Open Sans Condensed', sans-serif;">
                    <option value="All">All</option>
                    <option value="Favourite">Favourite</option>
                    <option value="Common">Common</option>
                    <option value="Not favourite">Not favourite</option>
            </select>
    <div class="mdc-data-table__table-container" style="overflow-y:scroll;max-height:260px">
    <table class="mdc-data-table__table" aria-label="Tasks">
                    <tbody class="mdc-data-table__content">
                    <tr class="mdc-data-table__row" style="border-bottom:solid">
                <th class="mdc-data-table__cell" scope="row" style="font-weight:bold;color:black">Name</th>
                <td class="mdc-data-table__cell mdc-data-table__cell--numeric" style="text-align:left;font-weight:bold;color:black;margin-left:10px">Status</td>
                <td class="mdc-data-table__cell" style="font-weight:bold;color:black">Date upload</td>
                <td class="mdc-data-table__cell" style="font-weight:bold;color:black">File</td>
                <td class="mdc-data-table__cell" style="font-weight:bold;color:black">Delete</td>
            </tr>
                    ${rows}
                    </tbody>
                </table>
            </div>`
}

function getNewTrackRoot() {
    return `    <div class="mdc-data-table__table-container" style="position:fixed;bottom:5px;">
                <form action="/"  method="post" enctype="multipart/form-data" id="add-track" name="add-track">
                    <table class="mdc-data-table__table" aria-label="Add task">
                        <tbody class="mdc-data-table__content">
                            <tr class="mdc-data-table__row">
                            <th class="mdc-data-table__cell" scope="row">
                                <label class="mdc-text-field mdc-text-field--filled" style="height:50px">
                                    <span class="mdc-text-field__ripple"></span>
                                    <span class="mdc-floating-label" id="my-label-id" style="bottom:-25px;font-size:small;font-weight:bolder;">Track name</span>
                                    <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id" placeholder="Track name" name="track-name">
                                </label>
                            </th>                   
                            <th class="mdc-data-table__cell" scope="row">
                                <select name="track-status" class="custom-select fntsize" id="sttsselect" required title="Track's status" style="height:50px; width: 150px">
                                    <option value="Favourite">Favourite</option>
                                    <option value="Common">Common</option>
                                    <option value="Not favourite">Not favourite</option>
                                </select>
                            </th>
                            <th class="mdc-data-table__cell" scope="row">
                                <label class="mdc-text-field mdc-text-field--filled" style="height:50px">
                                    <span class="mdc-text-field__ripple"></span>
                                    <span class="mdc-floating-label" id="my-label-id" style="bottom:-25px;font-size:small;font-weight:bolder;">DateTime</span>
                                    <input class="mdc-text-field__input" aria-labelledby="my-label-id" type="datetime-local" placeholder="Track's upload date" name="track-date-upload" value="${moment().format('YYYY-MM-DDTHH:mm')}">
                                </label>
                            </th>
                            <th class="mdc-data-table__cell" scope="row">
                                <label class="mdc-text-field mdc-text-field--filled" style="height:50px">
                                    <span class="mdc-text-field__ripple"></span>
                                    <span class="mdc-floating-label" id="my-label-id" style="bottom:-25px;font-size:small;font-weight:bolder;">Track file</span>
                                    <input class="mdc-text-field__input" type="file" accept=".mp3, .aac, .wav, .flac, .alac, .dsd" name="track-files">
                                </label>
                            </th>
                            <th class="mdc-data-table__cell" scope="row">
                                <div class="mdc-touch-target-wrapper">
                                    <button class="mdc-button mdc-button--touch" name="add-track" style="background:antiquewhite;color:darkred">
                                        <span class="mdc-button__ripple"></span>
                                        <span class="mdc-button__touch"></span>
                                        <span class="mdc-button__label">Add</span>                                        
                                    </button>
                                </div>
                            </th>
                            <th>
                                <div class="mdc-touch-target-wrapper">
                                    <button class="mdc-button mdc-button--touch" type="button" name="exit" onclick="exitPress()" style="background:antiquewhite;color:darkred">
                                        <span class="mdc-button__ripple"></span>
                                        <span class="mdc-button__touch"></span>
                                        <span class="mdc-button__label">Exit</span>                                        
                                    </button>
                                </div>
                            </th>
                            
                            </tr>
                        </tbody>
                    </table>
                </form>
                
            </div>`
}

async function exitPress() {
    const response = await fetch(`/logout`, {
        method: "POST",
        headers: { "Accept": "application/json" }
    });
    reset();
    drawsignInRoot()
    localStorage.setItem('isUnauthorised',true);
}
function getTracks(track) {
    const date = moment(track.dateUpload).format("DD.MM.YYYY HH:mm")
    let expiredTag = `<td class="mdc-data-table__cell">${date}</td>`
    let statusTag = `<td class="mdc-data-table__cell">${track.status}</td>`
    let fileTag = "";
    if (track.file !== undefined && track.file !== null) {
        fileTag = `<td class="mdc-data-table__cell"> <figcaption style="margin: 2px">${track.file.originalname}</figcaption> <audio controls><source src="/uploads/${track.file.filename}"></audio> </td>`;
    }
    else {
        fileTag = `<td class="mdc-data-table__cell" />`
    }

    return `<tr class="mdc-data-table__row">
    <th class="mdc-data-table__cell" scope="row">${track.name}</th>
                ${statusTag}
                ${expiredTag}
                ${fileTag}
                <td class="mdc-data-table__cell">                            
                                <div class="mdc-touch-target-wrapper">
                                    <button class="mdc-button mdc-button--touch" name="delete-task" id="delete-${track.id}" value="${track.id}" style="background:antiquewhite;color:darkred">
                                        <span class="mdc-button__ripple"></span>
                                        <span class="mdc-button__touch"></span>
                                        <span class="mdc-button__label">Delete</span>
                                    </button>
                                </div>                            
                        </td>
            </tr>`;
}