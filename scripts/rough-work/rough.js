
   

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

<!--EDIT PROFILE-->
<div id="modal-edit-profile" class="modal" style="max-width: max-content;">
    <div class="modal-content center-align ">
        <h4 class="pheading">Edit Profile</h4><br /></hr>
    
            
    </div>
</div>

   
  //     updateProfile(
  //       document.getElementById("update_phno").value,
  //       document.getElementById("update_height").value,
  //       document.getElementById("update_age").value,
  //       document.getElementById("update_bio").value,
  //       document.getElementById("update_email").value,
  //       document.getElementById("update_workexp").value,
  //       document.getElementById("update_skills").value
  //     );
  //   });
  // const user = auth.currentUser;
  //   function updateProfile(Phoneno,Height,Age,Bio,Email,WorkExperience,Skills){
  //     var profileUpdated = {
  //       Phoneno: Phoneno,
  //       Height: Height,
  //       Age: Age,
  //       Bio: Bio,
  //       Email: Email,
  //       WorkExperience: WorkExperience,
  //       Skills: Skills
  //     };
  //     let db = firebase.firestore().collection("users").doc(user.uid);
  //     db.set(profileUpdated).then(() => {
      
  //       console.log("Updated");
  //       Swal.fire("Good job!", "Profile Updated!", "success");
  //     });
  //   } 
