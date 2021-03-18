

const eventList = document.querySelector(".events");
const manageEventList = document.querySelector(".manage-events");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");
const adminItems = document.querySelectorAll(".admin");
const userItems = document.querySelector(".useronly");


const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach((item) => (item.style.display = "block"));
    }
    //account info
    const ImgName = user.uid; 
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `<div class="modal-content">
                            <img src="${doc.data().Link}" id="profile_pic" height="100px" width="100px" alt="user" /> <br> 
                            <i class="material-icons prefix grey-text">email</i><br>${user.email
          }<br>
                            <b>${doc.data().displayName}</b><br>${doc.data().bio
          }<br><i class="material-icons prefix grey-text">call</i><br>
                            ${doc.data().phoneno}<br>
                            <div class="red-text">${user.admin ? "Admin" : ""
          }</div>
                        </div>
                       
                        
                        `;
                        accountDetails.innerHTML = html;
                        
                  
                    
                    
  
      },

    
    );
   
  
   

    //toggle UI Elements
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));

  } else {
    adminItems.forEach((item) => (item.style.display = "none"));
    //hide account info
    accountDetails.innerHTML = "";
    //toggle UI Elements
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

//Event reponses 
function eventResponses(id) {
  var eventID = id;
  db.collection("eventResponses").where("eventID", "==", eventID).onSnapshot(function (snapshot) {
    document.getElementById("manage-eventslist").innerHTML = `
    <button style="display: inline-block; width: 10%;" id="backBtn" class="nbtn" >
    <i class="fas fa-trash-alt"></i>&#x2716</button></br></br>
   
        <input type ="text" id="searchUser" placeholder="Search by name" onkeyup="searchUser()">
        <p><b>Applicants</b></p></br>
        
   
    `;

    snapshot.forEach(function (eventValue) {
      document.getElementById("manage-eventslist").innerHTML += `
    
      <li>
      <div class="collapsible-header grey lighten-4">${eventValue.data().Name}</div>
      <div class="collapsible-body white">
      <p>Contact number</p>${eventValue.data().Phone}</br><hr>
      <p>Email</p>${eventValue.data().email}</br><hr>
      </li><br>
      `;
    });
    document.getElementById("backBtn").addEventListener("click", (e) => {
      
      e.preventDefault();
      manageEventsList();
    });
  });
}

//setup the events
function eventsList() {
  
  db.collection("events").orderBy("payment").onSnapshot(function (snapshot) {
    document.getElementById("eventslist").innerHTML = `<div>
    <h4>Available Events</h4>
    <input type ="text" id="searchHevents" placeholder="Enter Events title" onkeyup="searchHEvents()">
    </div>`;
    snapshot.forEach(function (eventValue) {
      document.getElementById("eventslist").innerHTML += `
          <li>
          <div class="collapsible-header grey lighten-4">${eventValue.data().title
        }</div>
          <div class="collapsible-body white"><p>Description</p>${eventValue.data().description
        }</br><hr>
          <p>Eligibility</p>${eventValue.data().eligibility}</br><hr>
          <p>Schedule</p>${eventValue.data().schedule}</br><hr>
          <p>Location</p>${eventValue.data().location}</br><hr>
          <p>Payment</p>${eventValue.data().payment}</br>
          <button type="submit" class="btn btn-danger" onclick="applyEvent('${eventValue.id}')">
          <i class="fas fa-trash-alt"></i>Apply</button>
          </div>
          </li><br></hr>`;
    });
  });
}

//apply for event
function applyEvent(id) {
  var user = firebase.auth().currentUser;
  document.getElementById("eventslist").innerHTML = `
        
            <h4></h4><br />
              <form class="border p-4 mb-4" id="applyform">
                <div class="form-group">
                  <label>Name</label>
                  <input type="text" class="form-control" id="name" placeholder="Enter name">
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input type="text" class="form-control" id="email" placeholder="Enter email">
                </div>
                <div class="form-group"> 
                  <label>Phone Number</label>
                  <input type="text" class="form-control" id="phnumber" placeholder="Enter number">
                </div>
                <button type="submit" style="display: inline-block" id="submitBtn" class="btn btn-success"><i class="fas fa-sync"></i>Submit</button>
                <button style="display: inline-block" id="apply-cancelBtn" class="btn btn-danger"><i class="fas fa-ban"></i>Cancel</button>
              </form> ;
         `;
  document.getElementById("apply-cancelBtn").addEventListener("click", (e) => {
    e.preventDefault();
    eventsList();
  });
  document.getElementById("applyform").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  document.getElementById("submitBtn").addEventListener("click", (e) => {
    updateTask2(
      id,
      document.getElementById("name").value,
      document.getElementById("phnumber").value,
      document.getElementById("email").value
    );
  });

  displayName = document.getElementById("name").value;
  phoneno = document.getElementById("phnumber").value;
  email = document.getElementById("email").value;

  function updateTask2(id, displayName, Phoneno, email) {
    var taskupdated = {
      eventID: id,
      uid: user.uid,
      Name: displayName,
      Phone: Phoneno,
      email: email
    };
    let db = firebase.firestore().collection("eventResponses").doc();
    db.set(taskupdated).then(() => {
      Swal.fire("Good job!", "Appiled!", "success");
    });
    
    document.getElementById("eventslist").innerHTML = "";
    eventsList();
  }
}
//delete the event 
function deleteEvent(id) {
  firebase
    .firestore()
    .collection("events")
    .doc(id)
    .delete()
    .then(() => {
      Swal.fire("Good job!", "Event Deleted!", "success");
    });
  document.getElementById("manage-eventslist").innerHTML = "";
  eventsList();
}
// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);

  var elems = document.querySelectorAll(".carousel");
  var instances = M.Carousel.init(elems, {
    fullWidth: true,
    indicators: true,
  });

  var elems = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(elems);
  $(document).ready(function () {
    $(".dropdown-trigger").dropdown({ hover: true });
  });
});