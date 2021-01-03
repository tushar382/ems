

//add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({email: adminEmail}).then(result => {
        console.log(result);
    });
})
// listen for auth status changes
auth.onAuthStateChanged(user =>{
    if(user){
        user.getIdTokenResult().then(idTokenResult => {
            user.admin = idTokenResult.claims.admin;
            setupUI();
        })
        //get data
        db.collection('events').onSnapshot(snapshot => {
            setupEvents(snapshot.docs);
            manageEvents(snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message);
        });
    }else{
        setupUI();
        setupEvents([]);
        manageEvents([]);
    }
});

//create new event
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('events').add({
        title: createForm['title'].value,
        desc: createForm['desc'].value,
        eligibility: createForm['eligibilty'].value,
        schedule: createForm['schedule'].value,
        location: createForm['location'].value,
        payment: createForm['payment'].value
    }).then(() =>{
        //close the modal and reset form
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    })
})

//manage event
const manageEvent = document.querySelector('#modal-manage');
manageEvent.addEventListener('click',(e) =>  {
    e.preventDefault();
    console.log("ManageEvent");
});

//edit profile
const editProfile = document.querySelector('#edit-profile-form');
editProfile.addEventListener('submit', (e) => {
    e.preventDefault();

     const user = auth.currentUser;

     return db.collection("users").doc(user.uid).set({
        phoneno : editProfile['add-phone-no'].value,
        gender : editProfile['gender'].value,
        age : editProfile['add-age'].value
    },{ merge: true })
    .then(() => {
        const modal = document.querySelector('#modal-edit-profile');
        M.Modal.getInstance(modal).close();
        editProfile.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});
const cancelEditProfile = document.querySelector('#btn-cancel-update-profile');
cancelEditProfile.addEventListener('click',(e) => {
    e.preventDefault();
    const modal = document.querySelector('#modal-edit-profile');
        M.Modal.getInstance(modal).close();
})


//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e) => {
    e.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
   

    // signup the user 
    auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        return db.collection('users').doc(cred.user.uid).set({
            bio: signupForm['signup-bio'].value,
            name: signupForm['signup-name'].value
        },{ merge: true });      
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(cred =>{
        //close the login modal and reset form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })
})

// logoutDesktop
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
  
});

// logoutMobile
const logoutMobile = document.querySelector('#logout-mobile');
logoutMobile.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();

});