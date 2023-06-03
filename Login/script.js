// var port = "https://sir-web.herokuapp.com";
// var port = "https://syed-tariq-ahmed-production.up.railway.app";
var port = "http://localhost:3000";

function login() {
  var obj = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  console.log(obj)
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/api/v1/login");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 200) {
        console.log(jsonRes)
        swal("Good job!", "Login Succesfull" , "success");
        setInterval(() => {
          window.location.href = "/Home"
        }, 3000);
        return;
      }
      else if (Http.status === 201) {
        swal("Good job!", jsonRes.message , "success");
        setInterval(() => {
          window.location.href = "../Admin Panel/index.html"  
        }, 3000);
        // alert(jsonRe/s.message)
      }
      else {
        swal("Opps!", jsonRes.message, "error");
        console.log(jsonRes.message);
      }
    }
  };

  return false;
}

let menu = document.getElementById("menu");
function toggleinMenu() {
  console.log("ello");
  menu.classList.toggle("open-menu");
}