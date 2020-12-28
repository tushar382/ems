const eventList = document.querySelector('.events');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
            
        }
        //account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `<div> logged in as ${user.email}</div>
                        <div> ${doc.data().bio}</div>
                        <div class="red-text">${user.admin ? 'Admin' : ''}</div>`;
            accountDetails.innerHTML = html;
        });

        //toggle UI Elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }
    else {
        adminItems.forEach(item => item.style.display = 'none');
        //hide account info
        accountDetails.innerHTML = '';
        //toggle UI Elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}
//setup the events
const setupEvents = (data) => {

    if (data.length) {
        
        let html = "";
        data.forEach(doc => {
            const event = doc.data();
            const li = `
        </br>
        <li>
            <div class="collapsible-header grey lighten-4">${event.title}</div>
            <div class="collapsible-body white"><p>Description</p>${event.desc}</br><hr>
            <p>Eligibility</p>${event.eligibility}</br><hr>
            <p>Schedule</p>${event.schedule}</br><hr>
            <p>Location</p>${event.location}</br><hr>
            <p>Payment</p>${event.payment}</div>
             
        </li>
        
        </hr>
        `;
            html += li;
        });

        eventList.innerHTML = html;
    }
    else {
        eventList.innerHTML = '<h5 class="center-align">Login to view Events</h5>'
    }

}
 //Deleting events






// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});