 // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
      apiKey: "AIzaSyAGVDJvncV6sMaNI55zjyT7hnvMwJ2iBcE",
      authDomain: "event-management-system-a8d99.firebaseapp.com",
      projectId: "event-management-system-a8d99",
      appId: "1:498689851436:web:865c6282361285eb8fd189",
      measurementId: "G-ZBH1Y22WYJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  // Make auth,functions and firestore references
  const auth = firebase.auth();
  const db = firebase.firestore();
  const functions = firebase.functions();
  //update firestore settings
  db.settings({ timestampsInSanpshots: true });

//add admin cloud function
const adminForm = document.querySelector(".admin-actions");
adminForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const adminEmail = document.querySelector("#admin-email").value;
  const addAdminRole = functions.httpsCallable("addAdminRole");
  addAdminRole({ email: adminEmail }).then((result) => {
    console.log(result);
  });
});
// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    
    user.getIdTokenResult().then((idTokenResult) => {
      user.admin = idTokenResult.claims.admin;
      setupUI();
    });
    //get data
    db.collection("events").onSnapshot(
      (snapshot) => {
        setupUI(user);
        eventsList(snapshot.docs);
        manageEventsList(snapshot.docs);
        
        sortLTH(snapshot.docs);
        sortHTL(snapshot.docs);
        applyEvent(snapshot.docs);
        deleteEvent(snapshot.docs); 
        eventResponses(id);
        
        
      },
      (err) => {
        console.log(err.message);
      }
    );
  } else {
    setupUI();
    eventsList([]);
    applyEvent([]);
    manageEventsList([]);
    
    deleteEvent([]);
    eventResponses([]);
    sortLTH([]);
    sortHTL([]);

  
    
  }
});

//create new event
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var payment = createForm[("payment")].value;
  payment = parseInt(payment);
  
  db.collection("events")
    .add({
      title: createForm["title"].value,
      description: createForm["desc"].value,
      eligibility: createForm["eligibilty"].value,
      schedule: createForm["schedule"].value,
      location: createForm["location"].value,
      payment: payment,
    })
    .then(() => {
      //close the modal and reset form
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createForm.reset();
    })
    .catch((err) => {
      console.log(err.message);
    });
});



//signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  // signup the user
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set(
        {
          bio: signupForm["signup-bio"].value,
          displayName: signupForm["signup-name"].value,
        },
        { merge: true }
      );
    })
    .then(() => {
      const modal = document.querySelector("#modal-signup");
      M.Modal.getInstance(modal).close();
      signupForm.reset();
      signupForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      signupForm.querySelector(".error").innerHTML = err.message;
    });
});

//login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  //get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      //close the login modal and reset form
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      loginForm.reset();
      loginForm.querySelector(".error").innerHTML = "";
    })
    .catch((err) => {
      loginForm.querySelector(".error").innerHTML = err.message;
    });
});

// logoutDesktop
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});

// logoutMobile
const logoutMobile = document.querySelector("#logout-mobile");
logoutMobile.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
});
