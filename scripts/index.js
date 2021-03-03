



const eventList = document.querySelector(".events");
const searchBar = document.querySelector("#searchBar");
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
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `<div class="modal-content">
                            <img src="/img/user-icon.png" height="100px" width="100px" alt="user"/> <br> 
                            <i class="material-icons prefix white-text">email</i><br>${user.email
          }<br>
                            <b>${doc.data().name}</b><br>${doc.data().bio
          }<br><i class="material-icons prefix white-text">call</i><br>
                            ${doc.data().phoneno}<br>
                            <div class="red-text">${user.admin ? "Admin" : ""
          }</div>
                        </div>`;

        accountDetails.innerHTML = html;
      });

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
//setup the manage-events list
const manageEvents = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const mevent = doc.data();

      const li = `
            </br>
        <li>
            <div id="div1" class="collapsible-header grey lighten-4">${mevent.title}</div>
            
        </li>
        </hr> `;
      html += li;
    });
    manageEventList.innerHTML = html;
  }
};
//setup the events
function eventsList() {
  db.collection("events").onSnapshot(function (snapshot) {
    document.getElementById("eventslist").innerHTML = "";
    snapshot.forEach(function (eventValue) {
      document.getElementById("eventslist").innerHTML += `
          <li>
          <div class="collapsible-header grey lighten-4">${eventValue.data().title
        }</div>
          <div class="collapsible-body white"><p id="title">Description</p>${eventValue.data().desc
        }</br><hr>
          <p>Eligibility</p>${eventValue.data().eligibility}</br><hr>
          <p>Schedule</p>${eventValue.data().schedule}</br><hr>
          <p>Location</p>${eventValue.data().location}</br><hr>
          <p>Payment</p>${eventValue.data().payment}</br>
          <button type="submit" class="btn btn-danger" onclick="applyEvent('${eventValue.id
        }')"><i
          class="fas fa-trash-alt"></i>Apply</button>
          </div>
          </li><br></hr>`;
    });
  });
}
//apply for event
    function applyEvent(id) {
      var user = firebase.auth().currentUser;
      var email = user.email;
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
          { merge: true }
        );
      });

      Name = document.getElementById("name").value;
      phoneno = document.getElementById("phnumber").value;
      document.getElementById("email").value = email;
    
      function updateTask2(id, Name, Phoneno, email) {
        var taskupdated = {
          uid: user.uid,
          Name: Name,
          Phone: Phoneno,
          Email: email
        };
        let db = firebase.firestore().collection("eventResponses").doc(id);
        db.set(taskupdated).then(() => {
          Swal.fire("Good job!", "Appiled!", "success");
        });
    
        document.getElementById("eventslist").innerHTML = "";
        eventsList();
      }
    
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