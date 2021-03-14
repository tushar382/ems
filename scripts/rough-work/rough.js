
   

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

