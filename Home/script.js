// const url = "https://syed-tariq-ahmed-production.up.railway.app";
const url = "http://localhost:3000";

function getUserData() {
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/api/v1/me");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      const image = document.getElementById("image");
      const innerimage = document.getElementById("innerimage");
      var randomColor = Math.floor(Math.random() * 16777215).toString(16);
      console.log(randomColor);
      const username = (document.getElementById("username").innerHTML =
        jsonRes.user.name);
      innerimage.innerHTML = `<img src="${jsonRes.user.url}" onclick="toggleMenu()" />`;
      image.innerHTML = `<img src="${jsonRes.user.url}" onclick="toggleMenu()" />`;
    }
  };
}

getUserData();
// function getData() {
//   var showdata = document.getElementById("showdata");
//   const Http = new XMLHttpRequest();
//   Http.open("GET", url + "/descdata");
//   Http.setRequestHeader("Content-Type", "application/json");
//   Http.send(null);
//   Http.onreadystatechange = (e) => {
//     console.log(e);
//     if (Http.readyState === 4) {
//       let jsonRes = JSON.parse(Http.responseText);
//       console.log(jsonRes);
//       let out;
//       jsonRes.map((data) => {
//         console.log(data);

//         out = `
//         <div class="carousel-item">
//         <div class="box">
//         <div class="square">
//         <div class="borders">
//         <h1 style="position: absolute; font-size: 35px; top: 38px; right: 70px; color: #6868ff;font-family: 'Hachi Maru Pop', cursive;">Daliy <br /> Quotes</h1>
//         <div class="gif">
//         <img src="./images/Untitled design.gif" alt="">
//       </div>
//         <div class=x"logo">

//         </div>
//         <div class="border-radiuse-2">
//         <div class="blue-top"></div>
//         <div class="white-top"></div>
//         </div>
//         <div class="content-of-description">
//             <i class="fa-solid fa-quote-left"></i>
//             <h1 style='width : 600px'><q id="heading">${data.desc}</q></h1>
//             <p>${data.paradesc}</p>
//             <h3>${data.date}</h3>
//             </div>
//             <div class="border-radiuse-2">
//             <div class="blue"></div>
//             <div class="white"></div>
//             </div>
//             </div>
//             </div>
//             </div>
//             </div>
//             `;
//         showdata.innerHTML += out;
//       });
//     }
//   };
//   console.log("hello");
// }

// getData();
  let subMenu = document.getElementById("sub");
  function toggleMenu() {
    console.log("ello");
    subMenu.classList.toggle("open-wrap");
  }
  let menu = document.getElementById("menu");
  function toggleinMenu() {
    console.log("ello");
    menu.classList.toggle("open-menu");
  }

function logout() {
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/api/v1/logout");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
          window.location.href ="/"
      } else {
        console.log(jsonRes);
      }
    }
  };
}

function contact() {
  const ccmail = localStorage.getItem("email");
  const showdata = document.getElementById("show__data");
  showdata.innerHTML = `
  <div class="formBox">
  <div class="inputBx w50">
    <input type="text" id="firstname" required>
    <span>First Name</span>
  </div>
  <div class="inputBx w50">
    <input type="text" id="lastname" required>
    <span>Last Name</span>
  </div>
  <div class="inputBx w100">
    <input type="text" id="email" value='${ccmail}' required>
    <span>Email Address</span>
  </div>
  <div class="inputBx w100">
    <textarea type="text" id="message" required></textarea>
    <span>Message</span>
  </div>
  <div class="inputBx w100">
    <input type="submit" id="Submit" onclick="return contacting()" value="Submit">
  </div>
</div>`
}

function contacting() {
  const Http = new XMLHttpRequest();
  Http.open("POST", url + "/contact");
  Http.setRequestHeader("Content-Type", "application/json");
  let obj = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    email: document.getElementById("email").value,
    messgae: document.getElementById("message").value,
  };
  console.log(obj);
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        alert(jsonRes.message);
        console.log(jsonRes);
      } else {
        alert(jsonRes.message);
      }
    }
  };
  console.log("hello");
  return false;
}

contact();
