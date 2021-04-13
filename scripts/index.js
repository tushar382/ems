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
        const html = `
        <div class="card-container" style="width:300px; height: 450px;">
         <div class="upper-container">
            <div class="image-container">
               <img src="${doc.data().Link}" alt="Profile img" />
            </div>
         </div>
         <div class="lower-container">
            <div>
               <h5>${doc.data().displayName}</h5>
               <h6>${doc.data().skills}</h6>
            </div>
            <div>
               <p>
               <i class="material-icons prefix blue-text" style=" float: left;">email</i><p class="text1">${user.email}</p>
               <i class="material-icons prefix blue-text" style=" float: left;">call</i><p class="text1">${doc.data().phoneno}</p>
               <i class="material-icons prefix blue-text" style=" float: left;">male</i><p class="text1"  >${doc.data().gender}</p>
               <p class="text1"><b>Work Experience</b></p>
               <i class="material-icons prefix blue-text" style="float: center;">work</i><p class="text1" style="text-align:center;">${doc.data().workExperience}</p>
                
                 
                 
               </p>
            </div>
          </div>
        </div>

      
        
        `;
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
//forgot password
document.getElementById("forgotPasssword").addEventListener("click", (e)=>{
document.getElementById("login-form").innerHTML = `
<p>Password recovery</p>
<div class="input-field">
                    <i class="material-icons prefix blue-text" style="font-size: 25px; top: 15px;">email</i>
                    <input type="email" id="reset-email" style="color: black;" required />
                    <label for="reset-email">Email address</label>
                    <button class="sbtn" id="reset-pass">Reset</button>
                   
                    <p>Make sure you refresh the page after submitting reset password request</p>
                </div>`;
         
        document.getElementById("reset-pass").addEventListener("click",(e)=> {
          var email = document.getElementById("reset-email").value;
          var auth = firebase.auth();
          auth.sendPasswordResetEmail(email).then(()=> {
            Swal.fire("Good job!", "Password recovery mail sent! check your mail", "success");
            const modal = document.querySelector("#modal-login");
            M.Modal.getInstance(modal).close();
            
          }).catch(error =>{
            console.error(error);
          })
          
        })      
        
});

//Event responses
function eventResponses(id) {
  var eventID = id;
  db.collection("eventResponses")
    .where("eventID", "==", eventID)
    .onSnapshot(function (snapshot) {
      document.getElementById("manage-eventslist").innerHTML = `
    <button style="display: inline-block; width: 10%;" id="backBtn" class="nbtn" >
    <i class="fas fa-trash-alt"></i>&#x2716</button></br></br>
        <input type ="text" id="searchUser" placeholder="Search by name" onkeyup="searchUser()">
        <p><b><i class="material-icons prefix blue-text" style="font-size: 25px; float: left;">people</i>&nbsp;Applicants</b></p></br>
       `;
        snapshot.forEach(function (eventValue) {
        document.getElementById("manage-eventslist").innerHTML += `
      <li>
      <div class="collapsible-header grey lighten-4">${eventValue.data().Name}</div>
      <div class="collapsible-body white">
      <h6><b>Contact Information</b></h6>
      <p class="text1"><i class="material-icons prefix purple-text" style="font-size: 25px; float: left;">call</i>&nbsp;Contact number</p><p class="text1">${eventValue.data().Phone}</p><hr>
      <p class="text1"><i class="material-icons prefix blue-text" style="font-size: 25px; float: left;">email</i>&nbsp;Email</p><p class="text1">${eventValue.data().email}</p><hr>
      <h6><b>Work Information</b></h6>
      <p class="text1"> <i class="material-icons prefix yellow-text" style="font-size: 25px; float: left;">accessibility</i>&nbsp;Height</p><p class="text1">${eventValue.data().height} cms</p><hr>
      <p class="text1"> <i class="material-icons prefix blue-text" style="font-size: 25px; float: left;">work</i>&nbsp;Work Experience</p><p class="text1">${eventValue.data().workExp}</p><hr>
      <p class="text1"> <i class="material-icons prefix orange-text" style="font-size: 25px; float: left;">psychology</i>&nbsp;Skills</p><p class="text1">${eventValue.data().skills}</p><hr>
      <center>
      <button type="click" class="sbtn" id="hireCandidate" onclick="hireApplicant('${eventValue.id}')">Hire</button></center>
      </li><br>`;
      });
      document.getElementById("backBtn").addEventListener("click", (e) => {
        e.preventDefault();
        manageEventsList();
      });
    });
}
//hiring applicant
function hireApplicant(id) {
  var applicantId = id;
  document.getElementById("manage-eventslist").innerHTML = `
        <form  method="POST" class="border p-4 mb-4" id="hireform">
        <div class="form-group" style= "display: none";>  
        <label class="text1">
        <i class="material-icons prefix yellow-text" style=" float: left;">person</i>EventID</label>
        <input type="text" class="form-control" id="eventID" placeholder="" required />
        </div>
        <div class="form-group">
        <label class="text1">
        <i class="material-icons prefix yellow-text" style=" float: left;">person</i>Name</label>
        <input type="text" class="form-control" id="hireName" placeholder="Enter name" required />
        </div>
        <div class="form-group">
        <label class="text1">
        <i class="material-icons prefix blue-text" style=" float: left;">email</i>Email</label>
        <input type="email" class="form-control" id="hireEmail" placeholder="Enter email" required />
        </div>
        <div class="form-group"> 
        <label class="text1">
        <i class="material-icons prefix green-text" style=" float: left;">message</i>Messege</label>
        <textarea rows="10" cols="50" class="form-control" id="hireMessage" placeholder="Enter message"></textarea>
        </div>
        <center>
        <button type="submit"  id="sendMail" class="sbtn">Send</button>
        <button type="click"  id="sendMailBack" class="dbtn">Cancel</button>
        </center>
        </form>`;
        document.getElementById("sendMailBack").addEventListener("click", (e) => {
          e.preventDefault();
          manageEventsList();
  });
  var userDataref = db.collection("eventResponses").doc(applicantId);
  userDataref.get().then((doc) => {
      var HN = document.getElementById("hireName").value = doc.data().Name;
      var HE = document.getElementById("hireEmail").value = doc.data().email;
      var EI = document.getElementById("eventID").value = doc.data().eventID;
      var Eventdetails = db.collection("events").doc(EI);
      Eventdetails.get().then((doc) => {
        document.getElementById("hireMessage").value = `You are selected for "${doc.data().title}".
          Description of the event is "${doc.data().description}".
          Payment of the event is:  ${doc.data().payment}.
          Location of the event is:${doc.data().location}.
          Timing of the event is: ${doc.data().schedule}. `;
        var HM = document.getElementById("hireMessage").value;
       document.getElementById("sendMail").addEventListener("click", (e) => {
          sendEmail(HN, HE, HM);
          function sendEmail(HN, HE, HM) {
            Email.send({
              Host: "smtp.gmail.com",
              Username: 'eventscorporate538@gmail.com',
              Password: 'Sexandrun@143',
              To: `${HE}`,
              From: 'eventscorporate538@gmail.com',
              Subject: `${HN} you have new mail from Corporate Events`,
              Body: `Name: ${HN} <br/> Email: ${HE} <br/> Message : ${HM} `,
            }).then(() => {
              Swal.fire("Good job!", "Mail Sent", "success");
            });
            document.getElementById("hireName").value = "";
            document.getElementById("hireEmail").value = "";
            document.getElementById("eventID").value = "";
            document.getElementById("hireMessage").value = "";
            manageEventsList();
          }
        });
      });
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
}
//About us
document.getElementById("aboutus").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("div-contactus").innerHTML = "";
  document.getElementById("div-faq").innerHTML = "";
  document.getElementById("div-aboutus").innerHTML = `<div class="row">
  <center>
  <h4 id="close_aboutus">About us</h4>
  <a href="#" class="brand-logo" class="responsive" >
  <img src="logo.svg" class="responsive" style="width: 150px; " align="middle" >
  </a>
  <div>
  <p>Who are we? And what can we do for you?</p>
  </div>
  </center>
  <div class="container">
  <b>Corporate Events</b> is the web application of project management to the creation and development of small and/or large-scale personal or corporate events.
  It involves brand events such as promoting and many more.<br><br></hr>
  The process of planning and coordinating the event is usually referred to as event planning and which can include budgeting, scheduling, site selection, coordinating
  transportation and parking, managing the crowd, anchoring, hosting,  arranging decor, event security, catering, coordinating with third party vendors, and emergency plans.
  Each event is different in its nature so process of planning & execution of each event differs on basis of type of event. <br><br>
  What we do is, we get the best events from brands and gives you opportunity to work with them. The Recruitment process done by the event coordinators and management team. This process includes identifying, 
  shortlisting, and interviewing, suitable candidates for events/jobs.
  </div>
  </div>`;
  document.getElementById("close_aboutus").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("div-aboutus").innerHTML = "";
  });
});
// contact us
document.getElementById("contactus").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("div-aboutus").innerHTML = "";
  document.getElementById("div-faq").innerHTML = "";
  document.getElementById("div-contactus").innerHTML = `<div class="row">
  <center>
  <h4 id="close_contactus">Contact us</h4>
  <a href="#" class="brand-logo" class="responsive" >
  <img src="logo.svg" class="responsive" style="width: 150px; " align="middle" >
  </a>
  </center>
  <div>
  <h5><i class="material-icons prefix green-text" style="font-size: 30px; float: left;">support_agent</i>&nbsp;Get Support</h5>
  <p>If you’re having trouble with Corporate Events, contact us by</p>
  <i class="material-icons prefix blue-text" style=" float: left;">email</i><p>eventscorporate538@gmail.com<p>
  <br>
  <div>
  <h5><i class="material-icons prefix green-text" style="font-size: 30px; float: left;">work</i>&nbsp;For business inquiries</h5>
  <i class="material-icons prefix blue-text" style=" float: left;">email</i><p>eventscorporate538@gmail.com<p>
  </div><br>
  <div>
  <h5><i class="material-icons prefix green-text" style="font-size: 30px; float: left;">code</i>&nbsp;For Developers</h5>
  <p>If you are interested in developing an integration, contact us by</p> 
  <i class="material-icons prefix blue-text" style=" float: left;">email</i><p>tusharghadi6710@gmail.com<p>
  </div>
  </div>`;
  document.getElementById("close_contactus").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("div-contactus").innerHTML = "";
  });
});
// faq
document.getElementById("faq").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("div-aboutus").innerHTML = "";
  document.getElementById("div-contactus").innerHTML = "";
  document.getElementById("div-faq").innerHTML = `<div class="row">
  <center>
  <h4 id="close_contactus">FAQ</h4>
  <a href="#" class="brand-logo" class="responsive" >
  <img src="logo.svg" class="responsive" style="width: 150px; " align="middle" >
  </a>
  </center>
  <div>
  <ul>
  <li>
  </ul>
  </div>
  `;
});
//create new event
const createForm = document.getElementById("create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var payment = createForm["payment"].value;
  payment = parseInt(payment);
  var num = Math.random() * 100;
  var eventID = num.toString();
  console.log(eventID);
  return db.collection("events").doc(eventID).set({
      eventId: eventID,
      title: createForm["title"].value,
      description: createForm["desc"].value,
      eligibility: createForm["eligibilty"].value,
      schedule: createForm["schedule"].value,
      location: createForm["location"].value,
      payment: payment,
    })
    .then(() => {
      Swal.fire("Good job!", "Event Created", "success");
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});
//setup my events
function myevents() {
  user = auth.currentUser;
  userId = user.uid;
  db.collection("eventResponses")
    .where("uid", "==", userId)
    .onSnapshot(function (snapshot) {
      document.getElementById("my-eventslist").innerHTML = `<div>
    <h4>My Events</h4>
    <input type ="text" id="searchMyevents" placeholder="Search for events" onkeyup="searchMyEvents()">
    </div>
    `;
      snapshot.forEach(function (eventValue) {
        var myevents = eventValue.data().eventID;
        //console.log(myevents);
        db.collection("events")
          .where("eventId", "==", myevents)
          .onSnapshot(function (snapshot) {
            snapshot.forEach(function (eventValue) {
              document.getElementById("my-eventslist").innerHTML += `<li>
            <div class="collapsible-header grey lighten-4">${eventValue.data().title}</div>
            <div class="collapsible-body white"><p>Description</p><i class="material-icons prefix blue-text">description</i>${eventValue.data().description}</br><hr>
            <p>Eligibility</p><i class="material-icons prefix blue-text" style=" float: left;">bookmark</i>${eventValue.data().eligibility}</br><hr>
            <p>Schedule</p><i class="material-icons prefix blue-text" style=" float: left;">schedule</i>${eventValue.data().schedule}</br><hr>
            <p>Location</p><i class="material-icons prefix blue-text" style=" float: left;">location_on</i>${eventValue.data().location}</br><hr>
            <p>Payment</p> <i class="material-icons prefix blue-text" style=" float: left;">attach_money</i>${eventValue.data().payment}</br>
            </div>
          </li><br></hr> `;
            });
          });
      });
    });
}
//setup the events
function eventsList() {
  db.collection("events")
    .orderBy("payment")
    .onSnapshot(function (snapshot) {
      document.getElementById("eventslist").innerHTML = `<div>
    <h4 style="text-align:center; bottom: 20px;">Available Events</h4>
    <input type ="text" id="searchHevents" placeholder="Search for events" onkeyup="searchHEvents()">
    </div>`;
      snapshot.forEach(function (eventValue) {
        document.getElementById("eventslist").innerHTML += `
          <li>
          <div class="collapsible-header grey lighten-4">${eventValue.data().title}</div>
          <div class="collapsible-body white"><p>Description</p><i class="material-icons prefix yellow-text">description</i>${eventValue.data().description}</br><hr>
          <p>Eligibility</p><i class="material-icons prefix brown-text" style=" float: left;">bookmark</i>${eventValue.data().eligibility}</br><hr>
          <p>Schedule</p><i class="material-icons prefix red-text" style=" float: left;">schedule</i>${eventValue.data().schedule}</br><hr>
          <p>Location</p><i class="material-icons prefix blue-text" style=" float: left;">location_on</i>${eventValue.data().location}</br><hr>
          <p>Payment</p> <i class="material-icons prefix green-text" style=" float: left;">attach_money</i>${eventValue.data().payment}</br>
          <center> <button type="submit" class="sbtn" onclick="applyEvent('${eventValue.id}')">
          <i class="fas fa-trash-alt"></i>Apply</button>
          </center>
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
              <p><b>Candidate Information</b></p>
                <div class="form-group">
                  <label class="text1">
                  <i class="material-icons prefix green-text" style=" float: left;">person</i>Name</label>
                  <input type="text" class="form-control" id="name" placeholder="Enter name" required />
                </div>
                <div class="form-group">
                  <label class="text1">
                  <i class="material-icons prefix blue-text" style=" float: left;">email</i>Email</label>
                  <input type="text" class="form-control" id="email" placeholder="Enter email" required />
                </div>
                <div class="form-group"> 
                  <label class="text1">
                  <i class="material-icons prefix purple-text" style=" float: left;">call</i>Phone Number</label>
                  <input type="text" class="form-control" id="phnumber" placeholder="Enter number" required />
                </div>
                <p><b>Work Information</b></p>
                <div class="form-group"> 
                  <label class="text1">
                  <i class="material-icons prefix yellow-text"  style=" float: left;">accessibility</i>Height</label>
                  <input type="text" class="form-control" id="height" placeholder="Enter height in cm" required />
                </div>
                <div class="form-group"> 
                  <label class="text1">
                  <i class="material-icons prefix blue-text" style=" float: left;">work</i>Work Experience</label>
                  <input type="text" class="form-control" id="workexp" placeholder="Enter work experience" required />
                </div>
                <div class="form-group"> 
                  <label class="text1">
                  <i class="material-icons prefix orange-text" style=" float: left;">psychology</i>Skills</label>
                  <input type="text" class="form-control" id="skills" placeholder="Enter skills" required />
                </div>
                <center>
                <button type="submit" style="display: inline-block" id="submitBtn" class="sbtn"><i class="fas fa-sync"></i>Submit</button>
                <button style="display: inline-block" id="apply-cancelBtn" class="nbtn"><i class="fas fa-ban"></i>Cancel</button>
                </center>
              </form>     `;
  document.getElementById("apply-cancelBtn").addEventListener("click", (e) => {
    e.preventDefault();
    eventsList();
  });
  document.getElementById("applyform").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  document.getElementById("submitBtn").addEventListener("click", (e) => {
    e.preventDefault();
    updateTask2(
      id,
      document.getElementById("name").value,
      document.getElementById("phnumber").value,
      document.getElementById("email").value,
      document.getElementById("height").value,
      document.getElementById("skills").value,
      document.getElementById("workexp").value
    );
  });
  var user = auth.currentUser;
  document.getElementById("email").value = user.email;
  var userDataref = db.collection("users").doc(user.uid);
  userDataref
    .get()
    .then((doc) => {
      document.getElementById("name").value = doc.data().displayName;
      document.getElementById("phnumber").value = doc.data().phoneno;
      document.getElementById("height").value = doc.data().height;
      document.getElementById("skills").value = doc.data().skills;
      document.getElementById("workexp").value = doc.data().workExperience;
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  displayName = document.getElementById("name").value;
  Phone = document.getElementById("phnumber").value;
  email = document.getElementById("email").value;
  height = document.getElementById("height").value;
  workExp = document.getElementById("workexp").value;
  skills = document.getElementById("skills").value;

  function updateTask2(
    id,
    displayName,
    Phoneno,
    email,
    height,
    workExp,
    skills
  ) {
    var taskupdated = {
      eventID: id,
      uid: user.uid,
      Name: displayName,
      Phone: Phoneno,
      email: email,
      height: height,
      workExp: workExp,
      skills: skills,
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
    .firestore().collection("events").doc(id).delete().then(() => {
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
