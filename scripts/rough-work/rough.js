<div class="container">
<h4 class="pheading">Profile</h4><br />
<img src=""  height="100px" width="100px" alt="user" /> <br> 
<b>${doc.data().displayName}</b>
<div>
<ul>
<li> <i class="material-icons prefix blue-text" style=" float: left;">email</i><p class="text1" style="text-align:left;">Email:${user.email}</p></li>
<li> <i class="material-icons prefix purple-text" style=" float: left;">call</i><p class="text1" style="text-align:left;">Contact:${doc.data().phoneno}</p></li>
<li><i class="material-icons prefix pink-text" style=" float: left;">male</i><p class="text1" style="text-align:left;" >Gender:${doc.data().gender}</p></li>
<li> <i class="material-icons prefix green-text" style=" float: left;">face</i><p class="text1" style="text-align:left;">Age:${doc.data().age}</p></li>
<li><i class="material-icons prefix yellow-text" style=" float: left;">description</i><p class="text1" style="text-align:left;">Bio:${doc.data().bio}</p></li>
<li> <i class="material-icons prefix brown-text" style=" float: left;">work</i><p class="text1" style="text-align:left;">Work Experience:${doc.data().workExperience}</p></li>
<li> <i class="material-icons prefix yellow-text" style=" float: left;">psychology</i><p class="text1" style="text-align:left;">Skills:${doc.data().skills}</p></li>
<li> <i class="material-icons prefix red-text" style=" float: left;">person</i><p class="text1" style="text-align:left;">${user.admin ? "Admin" : "User"}</p></li>
</ul>
</div>
</div>





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



  //
  profile
  <body style=" background: url(user-background.jfif) ; ">
        <div class="container muck-up"  style= "width: 320px; ">
            
            <div class="top">
              <div class="nav">
                <i class="material-icons prefix red-text" style=" float: left;">person</i>
                <p style=" float: center;">&nbsp;Profile</p>
              </div>
              <div class="user-profile">
                <img src="${doc.data().Link}">
                <div class="user-details" >
                    <h4>${doc.data().displayName}</h4>
                    <p><b>${doc.data().skills}</b></p>
                </div>
              </div>
            </div>
             
              <div class="container bottom" style="bottom: 20px;">
                
                  
                  <p class="text1"><b>Personal Information</b></p>
                  <ul  >
                  <li> <i class="material-icons prefix blue-text" style=" float: left;">email</i><p class="text1">${user.email}</p></li>
                  <li> <i class="material-icons prefix purple-text" style=" float: left;">call</i><p class="text1" style="text-align:left;">Contact:${doc.data().phoneno}</p></li>
                  <li><i class="material-icons prefix pink-text" style=" float: left;">male</i><p class="text1" style="text-align:left;" >Gender:${doc.data().gender}</p></li>
                  <li> <i class="material-icons prefix green-text" style=" float: left;">face</i><p class="text1" style="text-align:left;">Age:${doc.data().age}</p></li>
                  <p class="text1"><b>Work Experience</b></p>
                  <li> <i class="material-icons prefix brown-text" style="float: center;">work</i><p class="text1" style="text-align:center;">${doc.data().workExperience}</p></li>
                  </ul>
            
            </div>
            
            
           
            
           
            
        </div>
        
      </body>

</body>
</div>

//css
.card:before{
  content: '';
  position: absolute;
  width: 100%;
  height: 150px;
  top: 0;
  left: 0;
  background-image: url(/user-background.jfif);
  clip-path: circle(300px at 50% -48.5%);
}




.muck-up {
  width: 320px;
  height: auto;
  margin: 5em auto;
  position: relative;
  overflow: hidden;
}
.muck-up > .top {
  position: relative;
  min-height: 240px;
  padding: 15px;
  color: black;
}

.top .nav span {
  float: left;
  display: block;
}
.nav p {
 
  display: inline-block;
  vertical-align: bottom;
}
.user-profile {
  margin-top: 10px;
}
.user-profile img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  float: left;
  margin-right: 24px;
}

.user-details p {
  font-size: 11px;
  bottom: 60px;
  
}
.user-details {
  bottom: 10px;
  float: left;
  vertical-align: bottom;
}

.user-details h4 {
  font-size: 18px;
}


.title small {
  font-size: 10px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
}
.card {
  box-shadow: 0 4px 15px 1 rgba(0, 0, 0, 0.1);
  max-width: fit-content;
  margin: auto;
  text-align: center;
  overflow: hidden;
  background-color:#eeeeee;
  position: relative;
}