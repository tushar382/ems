const eventList = document.querySelector('.events');
const searchBar = document.querySelector('#searchBar');
const manageEventList = document.querySelector('.manage-events');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');
const userItems = document.querySelector('.useronly');

const setupUI = (user) => {
    if (user) {
        if (user.admin) {
            adminItems.forEach(item => item.style.display = 'block');
            
        }
        //account info
        db.collection('users').doc(user.uid).get().then(doc => {
            const html = `<div class="modal-content">
                            <img src="/img/user-icon.png" height="100px" width="100px" alt="user"/> <br> 
                            <i class="material-icons prefix white-text">email</i><br>${user.email}<br>
                            <b>${doc.data().name}</b><br>${doc.data().bio}<br><i class="material-icons prefix white-text">call</i><br>
                            ${doc.data().phoneno}<br>
                            <div class="red-text">${user.admin ? 'Admin' : ''}</div>
                        </div>`;
                        
                        
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
//setup the manage-events list
const manageEvents = (data) => {

    if (data.length) {
        
        let html = "";
        data.forEach(doc => {
            const mevent = doc.data();
            
            const li = `
            </br>
        <li>
            <div id="div1" class="collapsible-header grey lighten-4">${mevent.title}</div>
            
        </li>
        </hr> `
       ;
        
            html += li;  
            
        });     
        manageEventList.innerHTML = html;
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
            <p>Payment</p>${event.payment}</br>
            </div>
        </li>
        </hr>
        `;
            html += li;       
        });
        eventList.innerHTML = html;
    }
    
    else {
        eventList.innerHTML = '';
    }

}

// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems,{
        fullWidth: true,
        indicators: true
      });
    

    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems);
    $(document).ready(function(){
        $('.dropdown-trigger').dropdown({hover: true});
      });
   

});