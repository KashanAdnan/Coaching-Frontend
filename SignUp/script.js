// var port = "https://syed-tariq-ahmed-production.up.railway.app";
var port = "http://localhost:3000";

function sinup() {
  var obj = {
    name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  var Http = new XMLHttpRequest();
  Http.open("POST", port + "/api/v1/register");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(JSON.stringify(obj));
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      if (Http.status === 201) {
        swal("Good Job !", "Sign Up SuccesFull !", "success");
        window.location.href = "/Home"
      } else {
        swal("Opps!", "Error Happend", "error");
        console.log(jsonRes)
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