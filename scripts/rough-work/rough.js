
//apply for event
function applyEvent(id) {
  var user = firebase.auth().currentUser;
  document.getElementById("eventslist").innerHTML = `
        
            <h4>Applying for </h4><br />
            <p>Check your details before submitting<p>
              <form class="border p-4 mb-4" id="applyform">
              <div class="input-field">
              <i class="material-icons prefix purple-text">call</i>
              <input class="text" type="number" id="phno">
              <label for="phno" >Phone number</label>
          </div>
          <div class="input-field">
          <i class="material-icons prefix yellow-text">accessibility</i>
              <input type="number" id="height">
              <label class="text" for="height">Height in Cm</label>
          </div>
          <div class="input-field">
          <i class="material-icons prefix brown-text">person</i>
              <input type="number" id="age">
              <label class="text" for="age">Age</label>
          </div>
          <div class="input-field">
              <i class="material-icons prefix green-text">view_headline</i>
              <input class="text" type="text" id="bio">
              <label for="bio">Bio</label>
          </div>
          <p>Work Information</p><hr>
          <div class="input-field">
              <i class="material-icons prefix blue-text">person</i>
              <input class="text" type="text" id="dispName">
              <label for="dispName">Display name </label>
          </div>
          <div class="input-field">
              <i class="material-icons prefix blue-text">work</i>
              <input class="text" type="text" id="workexp">
              <label for="workexp">Work experience</label>
          </div>
          <div class="input-field">
          <i class="material-icons prefix orange-text">psychology</i>
          <input class="text" type="text" id="skills">
          <label for="skills">Skills</label>
          </div>
          <div>
          <i class="material-icons prefix black-text">face</i>
          <img src="" id="submit_profile" alt="Profile Image" style="border:2px solid black; width="200px"; height="200px"; ">
          <button class="nbtn" style="width: 50px; " id="select_photo">Select</button>
  
                <button type="submit" style="display: inline-block" id="submitBtn" class="btn btn-success"><i class="fas fa-sync"></i>Submit</button>
                <button style="display: inline-block" id="apply-cancelBtn" class="btn btn-danger"><i class="fas fa-ban"></i>Cancel</button>
              </form> 
         `;
  document.getElementById("apply-cancelBtn").addEventListener("click", (e) => {
    e.preventDefault();
    eventsList();
  });
  document.getElementById("applyform").addEventListener("submit", (e) => {
    e.preventDefault();
  });
  var user = auth.currentUser;
  var userDataref = db.collection("users").doc(user.uid)
  userDataref.get().then((doc) => {
        document.getElementById("phno").value = doc.data().phoneno;
        document.getElementById("age").value = doc.data().age;
        document.getElementById("height").value = doc.data().height;
        document.getElementById("bio").value = doc.data().bio; 
        document.getElementById("workexp").value = doc.data().workExperience;
        document.getElementById("skills").value = doc.data().skills;
        document.getElementById("dispName").value = doc.data().displayName;
        document.getElementById("submit_profile").src = doc.data().Link;
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  var  ImgUrl;
  var files = [];
  var reader;
  
  document.getElementById("select_photo").onclick = function (e){
    e.preventDefault();
    var input = document.createElement('input');
    input.type = 'file';
  

    input.onchange = e => {
        files  = e.target.files;
        reader = new FileReader();
        reader.onload = function(){
            document.getElementById("submit_profile").src = reader.result;

        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}

  document.getElementById("submitBtn").addEventListener("click", (e) => {
    const user = auth.currentUser;
    var ImgName = user.uid;
    var phoneno, age, height,bio,workExp,skills,dispName;
    var uploadTask1 = firebase.storage().ref('images/'+ImgName+".png").put(files[0]);
    uploadTask1.snapshot.ref.getDownloadURL().then(function(url){
        ImgUrl = url;

    db.collection("eventResponses").doc().set({
        uid: ImgName,
        eventPic: ImgUrl
    })
    
    
  });
     phoneno = document.getElementById("phno").value;
      age =  document.getElementById("age").value;
      height =  document.getElementById("height").value;
      bio = document.getElementById("bio").value;
      workExp =  document.getElementById("workexp").value;
      skills = document.getElementById("skills").value;
      dispName = document.getElementById("dispName").value;
      phoneno = parseInt(phoneno);
      age = parseInt(age);
      height = parseInt(height);

      return db
      .collection("eventResponses")
      .doc()
      .set(
        {
          eventID: id,
          uid: user.uid,
          phoneno: phoneno,
          age: age,
          height: height,
          displayName: dispName,
          bio: bio,
          workExperience: workExp,
          skills: skills,
          
        }
        
      ).then(() => {
        document.getElementById("phno").value = "";
        document.getElementById("age").value = "";
        document.getElementById("height").value = "";
        document.getElementById("bio").value = "";
        document.getElementById("workexp").value = "";
        document.getElementById("skills").value = "";
        document.getElementById("dispName").value = "";
        document.getElementById("submit_profile").src = "";
              Swal.fire("Good job!", "Profile Updated!", "success");
        document.getElementById("eventslist").innerHTML = ''; 
        
      });

    });
  
 
}
   

// firestore rules 
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     // match logged in user doc in users collection 
//     match /users/{userId} {
//     	// allow create: if request.auth.uid != null
//     	// allow read: if request.auth.uid == userId;
//       allow read, write;
//     }
    
//     //match documents in events collection
//     match /events/{eventId}{
//     	allow read: if request.auth.uid != null;
//       allow write: if request.auth.token.admin == true;
//     }
   
//   }
// }