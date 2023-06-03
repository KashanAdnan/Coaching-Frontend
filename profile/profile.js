// console.log(firebase);
const firebaseConfig = {
  apiKey: "AIzaSyCbcbPRw8m2w4ZzMCQvF0rK1ZZRQW361Z0",
  authDomain: "upload-image-dbc41.firebaseapp.com",
  projectId: "upload-image-dbc41",
  storageBucket: "upload-image-dbc41.appspot.com",
  messagingSenderId: "83724584697",
  appId: "1:83724584697:web:1832e81d1f3aae0d05c428",
  measurementId: "G-JTGF48PDVX",
};
const url = "http://localhost:3000";

firebase.initializeApp(firebaseConfig);
// firebase.initializeApp

function uploadImage() {
  console.log(firebase);
}
const get = () => {
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/api/v1/me");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      console.log(jsonRes);
      var showdata = document.getElementById("showdata");
      document.getElementById(
        "username"
      ).innerHTML = `<p>${jsonRes.user.name}</p>`;
      const image = document.getElementById("image");
      const innerimage = document.getElementById("innerimage");
      innerimage.innerHTML = `<img src="${jsonRes.user.url}" onclick="toggleMenu()" />`;
      image.innerHTML = `<img src="${jsonRes.user.url}" onclick="toggleMenu()" />`;
      showdata.innerHTML = `
       <div class="SigNup Admission" id="${jsonRes.user._id}">
  <h2 style="margin-bottom:20px;" >Profile Edit</h2>
  <hr />
  <img src="${jsonRes.user.url}" class="url" width="140px">
  <label for="stdName">User Name</label>
  <input type="text" id="stDname" value='${jsonRes.user.name}'disabled >
  <label for="email">Email</label>
  <input type="email" id="email" value='${jsonRes.user.email}'disabled >
  <div class="button-SignUp">
  <button onclick="return updateprofile('${jsonRes.user._id}','${jsonRes.user.url}','${jsonRes.user.name}','${jsonRes.user.email}')">Update</button>
  </div>
  </div>
      `;
    }
  };
};
let subMenu = document.getElementById("sub");
function toggleMenu() {
  subMenu.classList.toggle("open-wrap");
}

function updateprofile(id, url, name, email) {
  console.log(url);
  document.getElementById(`showdata`).innerHTML = `
  <div class="SigNup Admission" id="${id}">
  <h2 style="margin-bottom:20px;">Profile Edit</h2>
  <hr />
  <input type="file" id='fileInp' class="url" style="display:none;" onchange="getFile(event)">
<label  for="fileInp"><img src="${url}" /> </label>
<label for="stdName">User Name</label>
<input type="text" id="${id}-name" value='${name}' >
<label for="email">Email</label>
<input type="email" id="${id}-email" value='${email}' >
<div class="button-SignUp">
  <button onclick="return update_data('${id}')">Update</button>
  </div>
  </div>
  `;
  return false;
}
function toggleMenu() {
  console.log("ello");
  subMenu.classList.toggle("open-wrap");
}
let menu = document.getElementById("menu");
function toggleinMenu() {
  console.log("ello");
  menu.classList.toggle("open-menu");
}
var fileText = document.getElementById("fileText");
var uploadPercentage = document.getElementById("percentage");
let percentVal;
let fileItem;
let fileName;
const getFile = (e) => {
  console.log(e);
  console.log(fileText);
  fileItem = e.target.files[0];
  console.log(fileItem);
  fileName = fileItem.name;
  console.log(fileName);
};
function update_data(id) {
  let storageRef = firebase.storage().ref("images/" + fileName);
  console.log(storageRef);
  let uploadTask = storageRef.put(fileItem);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
      percentVal = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 1000
      );
    },
    (error) => {
      console.log("Error is " + error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((whaurl) => {
        console.log(whaurl);
        const url = "http://localhost:3000";
        const Http = new XMLHttpRequest();
        Http.open("PUT", url + `/api/v1/me/update`);
        Http.setRequestHeader("Content-Type", "application/json");
        let obj = {
          url: whaurl,
          name: document.getElementById(`${id}-name`).value,
          email: document.getElementById(`${id}-email`).value,
        };
        console.log(obj);
        Http.send(JSON.stringify(obj));
        Http.onreadystatechange = (e) => {
          console.log(e);
          if (Http.readyState === 4) {
            let jsonRes = JSON.parse(Http.responseText);
            if (Http.status === 200) {
              console.log(jsonRes);
            } else {
              console.log(jsonRes);
            }
          }
        };
        return false;
      });
    }
  );
}
get();
function AdmigetData() {
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/api/v2/admission/profile");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        console.log(jsonRes);
        var showdata = document.getElementById("admission");
        showdata.innerHTML = `
       <div class="SigNup Admission" id="${jsonRes.user._id}">
  <h2 style="margin-bottom:20px;">Profile Edit</h2>
  <hr />
  <img src="${jsonRes.user.url}" class="url" width="140px">
  <label for="stdName">User Name</label>
  <input type="text" id="stDname" value='${jsonRes.user.name}'disabled >
  <label for="email">Email</label>
  <input type="email" id="email" value='${jsonRes.user.email}'disabled >
  <div class="button-SignUp">
  <button onclick="return updateprofile('${jsonRes.user._id}','${jsonRes.user.url}','${jsonRes.user.name}','${jsonRes.user.email}')">Update</button>
  </div>
  </div>
  `;
      } else {
      const showData = (document.getElementById("admission").innerHTML = `
      <div class="error">
        <h3>${jsonRes.message}</h3>
        <a href="/Admission">Get Admission</a>
      </div>
        `);
      }
    }
  };
}
AdmigetData();
function update(id, data, email, contact, adress, level) {
  console.log(id);
  document.getElementById(`admi-${id}`).innerHTML = `
  <div class="Admission" id="admi-${id}">
  <h2>Profile Edit</h2>
        <hr />
        <label for="Student Name">User Name</label>
  <input type='text' class='stDname' id="${id}-stDname" value='${data}' width='40'>
<label for="email">Email</label>
  <input type='text' class='email'  id="${id}-admiemail" value='${email}' width='40'>
       <label for="email">Contact.</label>
<input type='text' class='contactno' id="${id}-contact" value='${contact}' width='40'>
       <label for="email">Adress</label>
<input type='text' class='contactno' id="${id}-adress" value='${adress}' width='40'>
       <label for="email">Level</label>
<input type='text' class='contactno' id="${id}-level" value='${level}' width='40'>
  <button onclick="return update_data_admi('${id}')">Update Profile</button>
  </div>
  `;
  return false;
}
function update_data_admi(id) {
  const url = "http://localhost:3000";
  const Http = new XMLHttpRequest();
  Http.open("PUT", url + `/admiupdate/${id}`);
  Http.setRequestHeader("Content-Type", "application/json");
  let obj = {
    stDname: document.getElementById(`${id}-stDname`).value,
    adminemail: document.getElementById(`${id}-admiemail`).value,
    contact: document.getElementById(`${id}-contact`).value,
    adress: document.getElementById(`${id}-adress`).value,
    level: document.getElementById(`${id}-level`).value,
  };
  console.log(obj);
  const _id = id;
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      if (Http.status === 200) {
        localStorage.setItem("stDname", obj.stDname);
        localStorage.setItem("id", _id);
        localStorage.setItem("adminemail", obj.adminemail);
        localStorage.setItem("contact", obj.contact);
        localStorage.setItem("adress", obj.adress);
        localStorage.setItem("level", obj.level);
        let jsonRes = JSON.parse(Http.responseText);
        alert(jsonRes.message);
        window.location.reload();
        getData();
      } else {
        let jsonRes = JSON.parse(Http.responseText);
        console.log(jsonRes.message);
      }
    }
  };
  return false;
}
