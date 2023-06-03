// var port = "https://sir-web.herokuapp.com";
var port = "https://syed-tariq-ahmed-production.up.railway.app";
// var port = "http://localhost:3000";

function admit() {
  console.log("hello");
  var obj = {
    stDname: document.getElementById("username").value,
    age: document.getElementById("age").value,
    email: document.getElementById("email").value,
    contactno: document.getElementById("phone").value,
    adress: document.getElementById("adress").value,
    nationality: document.getElementById("nation").value,
    placeofBIrth: document.getElementById("placeofbirth").value,
    level: document.getElementById("level").value,
  };
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/admission");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  console.log(obj);
  Http.onreadystatechange = (e) => {
    console.log(e);
    if (Http.readyState === 4) {
      console.log(Http.status);
      var jsonRes = JSON.parse(Http.responseText);
      console.log(jsonRes);
      if (Http.status === 200) {
        localStorage.setItem("ID", jsonRes.data._id);
        localStorage.setItem("stDname", jsonRes.data.stDname);
        localStorage.setItem("age", jsonRes.data.age);
        localStorage.setItem("adminemail", jsonRes.data.email);
        localStorage.setItem("contact", jsonRes.data.contactno);
        localStorage.setItem("adress", jsonRes.data.adress);
        localStorage.setItem("level", jsonRes.data.level);
        alert("Good job! " + jsonRes.message + " success");
        var jsonRes = JSON.parse(Http.responseText);
        window.location.href = "../Home/home.html";
      }
    } else if (Http.status === 405) {
      console.log(Http.status);
      var jsonRes = JSON.parse(Http.responseText);
      swal("Opps!", jsonRes.message, "error");
    }
  };
  return false;
}
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

const button = document.getElementById("button");
const slecet = document.getElementById("dropdow");
const options = document.querySelectorAll(".option");
const slecet_label = document.getElementById("select-label");

button.addEventListener("click", (e) => {
  e.preventDefault();
  toggleHidden();
});

function toggleHidden() {
  slecet.classList.toggle("hidden");
}
options.forEach(function (option) {
  option.addEventListener("click", (event) => {
    slecet_label.innerText = event.target.id;
    toggleHidden();
  });
});
