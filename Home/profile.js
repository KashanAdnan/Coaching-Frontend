const url = "http://localhost:3000";

function getData() {
  var showdata = document.getElementById("showdata");
  const Http = new XMLHttpRequest();
  Http.open("GET", url + "/signupdata");
  Http.setRequestHeader("Content-Type", "application/json");
  Http.send(null);
  Http.onreadystatechange = (e) => {
    if (Http.readyState === 4) {
      let jsonRes = JSON.parse(Http.responseText);
      console.log(jsonRes[0]._id);
      let out;
      var i = 1;
      out = `
        <div class="Admission" id='hellll'>
        <h2>Admisson Profile Edit</h2>
        <hr />
        <label for="stdName">Student Name</label>
        <input type="text" id="stDname" value='${jsonRes[0].stDname}'disabled >
        <label for="email">Email</label>
        <input type="email" id="email" value='${jsonRes[0].email}'disabled >
        <label for="level"  >Level</label>
        <input type="level" id="level" value='${jsonRes[0].level}'disabled >
        <label for="email">Contact No.</label>
        <input type="jhgj" id="contact" value='${jsonRes[0].contactno}' disabled>
        <button onclick="return update('${jsonRes[0]._id}' , '${jsonRes[0].stDname}', '${jsonRes[0].email}', '${jsonRes[0].contactno}', '${jsonRes[0].level}')">Update</button>
    </div>
        `;
      showdata.innerHTML += out;
    }
  };
  return false;
}
function update(_id, stDname, email, contactno, level) {
  console.log(_id);
  document.getElementById("hellll").innerHTML = `
  <div class="Admission" id='${_id}'>
  <h2>Admisson Profile Edit</h2>
        <hr />
        <label for="stdName">Student Name</label>
  <input type='text' class='stDname' id='${_id}-stDname' value='${stDname}' width='40'>
<label for="email">Email</label>
  <input type='text' class='email'  id='${_id}-email'value='${email}' width='40'>
       <label for="email">Contact No.</label>
<input type='text' class='contactno' id='${_id}-contactno' value='${contactno}' width='40'>
 <label for="level"  >Level</label>
  <input type='text' class='level' id='${_id}-level' value='${level}' width='40'>
  <button onclick="return update_data('${_id}')">Update Admisson Profile</button>
  </div>
  `;
  return false;
}
function update_data(id) {
  console.log(id);
  const stDname = document.getElementById(`${id}-stDname`).value;
  const email = document.getElementById(`${id}-email`).value;
  const contactno = document.getElementById(`${id}-contactno`).value;
  const level = document.getElementById(`${id}-level`).value;
  console.log(stDname);
  console.log(email);
  console.log(contactno);
  console.log(level);
  axios
    .put(`http://localhost:3000/update/${id}`, {
      stDname: stDname,
      email: email,
      contactno: contactno,
      level: level,
    })
    .then((reponse) => {
      alert(reponse.data.message);
      console.log(reponse);
    })
    .catch((err) => {
      alert(err);
    });
}

getData();

function getUser() {
  axios
    .get("http://localhost:3000/api/v1/me")
    .then((result) => {
      (document.getElementById("showUser").innerHTML = `
             <h1>Edit Your Profile</h1>
            <hr>
            <form action="#" class="signUp">
                <h2>User Profile Edit</h2>
                <hr>
                <label for="username">Username</label>
                <input type="text" placeholder="Enter Your Username" value="${result.data.user.name}">
                <label for="email">Email</label>
                <input type="text" value="${result.data.user.email}" placeholder="Enter Your Email">
                <label for="username">Date Of Birth</label>
                <input type="text" value="${result.data.user.dob}" placeholder="Enter Your Date Of Birth">
                <label for="email">Adress</label>
                <input type="email" placeholder="Enter Your Address" value="${result.data.user.Address}">
                <button disabled onclick="return getData()">Update Profile</button>
            </form>
      `);
    })
    .catch((err) => {
      console.log(err);
    });
}

getUser();
