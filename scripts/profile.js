
 const form = document.getElementById("btn-edit-profile").addEventListener('click', (e) =>{
  e.preventDefault();
  const modal = document.querySelector("#modal-account");
  M.Modal.getInstance(modal).close();
  editProfile();
})
function editProfile(){
  
  document.getElementById("editProfile").innerHTML = `<div>
    <h4>Edit profile</h4>
    <form id="editprofileform">
                <p>Personal Information</p><hr>
               
                <div class="input-field">
                    <i class="material-icons prefix purple-text">call</i>
                    <input class="text" type="number" id="update_phno">
                    <label for="update_phno" >Update phone number</label>
                </div>
                <div class="input-field">
                <i class="material-icons prefix yellow-text">accessibility</i>
                    <input type="number" id="update_height">
                    <label class="text" for="update_height">Update height in Cm</label>
                </div>
                <div class="input-field">
                <i class="material-icons prefix brown-text">person</i>
                    <input type="number" id="update_age">
                    <label class="text" for="update_age">Update age</label>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix green-text">view_headline</i>
                    <input class="text" type="text" id="update_bio">
                    <label for="update_bio">Update bio</label>
                </div>
                <p>Work Information</p><hr>
                <div class="input-field">
                    <i class="material-icons prefix blue-text">person</i>
                    <input class="text" type="text" id="update_dispName">
                    <label for="update_dispName">Display name </label>
                </div>
                <div class="input-field">
                    <i class="material-icons prefix blue-text">work</i>
                    <input class="text" type="text" id="update_workexp">
                    <label for="update_workexp">Work experience</label>
                </div>
                <div class="input-field">
                <i class="material-icons prefix orange-text">psychology</i>
                <input class="text" type="text" id="update_skills">
                <label for="update_skills">Skills</label>
                </div>
                <div>
                <i class="material-icons prefix black-text">face</i>
                <img src="" id="profile_pic" alt="Profile Image" style="border:2px solid black; width="200px"; height="200px"; ">
                <button class="nbtn" style="width: 50px; " id="select">Select</button>
        
                </div>
                <div style="text-align: center;">
                <button type="submit" class="sbtn" style="width: 50px;" id="btn-update-profile"><i
                        class="material-icons">check</i>Update</button>
                <button class="dbtn"  style="width: 50px;" id="btn-cancel-update-profile"><i
                        class="material-icons">clear</i>Cancel</button>
                </div>
                <p class="error pink-text center-align"></p>

            </form>
    </div>`;
    document.getElementById("btn-cancel-update-profile").addEventListener('click',(e)=> {
      e.preventDefault();
      document.getElementById("editProfile").innerHTML = '';
    })
    var user = auth.currentUser;
    var userDataref = db.collection("users").doc(user.uid)
    userDataref.get().then((doc) => {
          document.getElementById("update_phno").value = doc.data().phoneno;
          document.getElementById("update_age").value = doc.data().age;
          document.getElementById("update_height").value = doc.data().height;
          document.getElementById("update_bio").value = doc.data().bio; 
          document.getElementById("update_workexp").value = doc.data().workExperience;
          document.getElementById("update_skills").value = doc.data().skills;
          document.getElementById("update_dispName").value = doc.data().displayName;
          document.getElementById("profile_pic").src = doc.data().Link;
      }).catch((error) => {
      console.log("Error getting document:", error);
  });
  var  ImgUrl;
  var files = [];
  var reader;
  
  document.getElementById("select").onclick = function (e){
    e.preventDefault();
    var input = document.createElement('input');
    input.type = 'file';
  

    input.onchange = e => {
        files  = e.target.files;
        reader = new FileReader();
        reader.onload = function(){
            document.getElementById("profile_pic").src = reader.result;

        }
        reader.readAsDataURL(files[0]);
    }
    input.click();
}
  
    document.getElementById("btn-update-profile").addEventListener('click',(e)=> {
      e.preventDefault();
      const user = auth.currentUser;
      var phoneno, age, height,bio,workExp,skills,dispName;
      var ImgName = user.uid;
      var uploadTask = firebase.storage().ref('images/'+ImgName+".png").put(files[0]);
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){
            ImgUrl = url;
    
        db.collection("users").doc(user.uid).set({
            Name: ImgName,
            Link: ImgUrl
        },{merge: true});
        
        
    }
    );

      phoneno = document.getElementById("update_phno").value;
      age =  document.getElementById("update_age").value;
      height =  document.getElementById("update_height").value;
      bio = document.getElementById("update_bio").value;
      workExp =  document.getElementById("update_workexp").value;
      skills = document.getElementById("update_skills").value;
      dispName = document.getElementById("update_dispName").value;
      phoneno = parseInt(phoneno);
      age = parseInt(age);
      height = parseInt(height);
     
      return db
          .collection("users")
          .doc(user.uid)
          .set(
            {
              uid: user.uid,
              phoneno: phoneno,
              age: age,
              height: height,
              displayName: dispName,
              bio: bio,
              workExperience: workExp,
              skills: skills,
              
            },
            {merge:true}
          )
          .then(() => {
            document.getElementById("update_phno").value = "";
            document.getElementById("update_age").value = "";
            document.getElementById("update_height").value = "";
            document.getElementById("update_bio").value = "";
            document.getElementById("update_workexp").value = "";
            document.getElementById("update_skills").value = "";
            document.getElementById("update_dispName").value = "";
                  Swal.fire("Good job!", "Profile Updated!", "success");
            document.getElementById("editProfile").innerHTML = ''; 
            
          })
      
})
}

