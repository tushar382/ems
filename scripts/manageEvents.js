//manage the events
function manageEventsList() {
  db.collection("events").onSnapshot(function (snapshot) {
    document.getElementById("manage-eventslist").innerHTML = `<div>
      <input type ="text" id="searchMEvents" placeholder="Enter Events title" onkeyup="searchMEvents()">
      <a  class='dropdown-trigger nbtn' data-target='sortBy_main'>Sort by</a>
      <ul id='sortBy_main' class="dropdown-content">
      <li><a style="font-size: 10px; color: #000;" id="lowToHigh" onclick="sortLTH()" >Payment: Low to High</a></li>
      <li><a style="font-size: 10px; color: #000;" id="highToLow"  onclick="sortHTL()">Payment: High to Low</a></li>
      </ul>
      </div>`;
    snapshot.forEach(function (eventValue) {
      document.getElementById("manage-eventslist").innerHTML += `
        <li class="list">
            <div class="collapsible-header grey lighten-4">${eventValue.data().title}</div>
          <div class="collapsible-body white">
          <center>
          <button type="submit" class="sbtn" onclick="eventResponses('${eventValue.id}')">
          <i class="fas fa-trash-alt"></i>Check Responses</button></br></br>
          <button type="submit" class="dbtn" onclick="deleteEvent('${eventValue.id}')">
          <i class="fas fa-trash-alt"></i>Delete</button>
          <center>
          </div>
        </li><br>`;
    });
    $('.dropdown-trigger').dropdown();
    document.getElementById("lowToHigh").addEventListener("click", (e) => {
      e.preventDefault();
      sortLTH();
    });
    document.getElementById("highToLow").addEventListener("click", (e) => {
      e.preventDefault();
      sortHTL();
    });
  });
  function sortLTH() {
    db.collection("events").orderBy("payment").onSnapshot(function (snapshot) {
      document.getElementById("manage-eventslist").innerHTML = `<div>
            <button style="display: inline-block; width: 10%;" id="backBtn_lth" class="nbtn" >
            </i>&#x2716</button></br></br>
            <input type ="text" id="searchMEvents_LTH" placeholder="Enter Events title" onkeyup="searchMEvents_LTH()">
            <p>Sorted by Payment: Low to High<i class="material-icons blue-text" style=" float: right;">swap_vert</i></p>
            </div>`;
            snapshot.forEach(function (eventValue) {
            document.getElementById("manage-eventslist").innerHTML += `
                  <li>
                      <div class="collapsible-header grey lighten-4">${eventValue.data().title}</div>
                    <div class="collapsible-body white">
                    <center>
                    <button type="submit" class="sbtn" onclick="eventResponses('${eventValue.id}')">
                    <i class="fas fa-trash-alt"></i>Check Responses</button></br></br>
                    <button type="submit" class="dbtn" onclick="deleteEvent('${eventValue.id}')">
                    <i class="fas fa-trash-alt"></i>Delete</button>
                    </center>
                    </div>
                  </li><br>`;
      });
      document.getElementById("backBtn_lth").addEventListener("click", (e) => {
        e.preventDefault();
        manageEventsList();
      });
    });
  }
  function sortHTL() {
    db.collection("events").orderBy("payment", "desc").onSnapshot(function (snapshot) {
      document.getElementById("manage-eventslist").innerHTML = `<div>
            <button style="display: inline-block; width: 10%;" id="backBtn_htl" class="nbtn" >
            </i>&#x2716</button></br></br>
            <input type ="text" id="searchMEvents_HTL" placeholder="Enter Events title" onkeyup="searchMEvents_HTL()">
            <p>Sorted by Payment: High to Low<i class="material-icons blue-text" style=" float: right;">swap_vert</i></p>
            </div>`;
            snapshot.forEach(function (eventValue) {
              document.getElementById("manage-eventslist").innerHTML += `
                    <li>
                        <div class="collapsible-header grey lighten-4">${eventValue.data().title}</div>
                      <div class="collapsible-body white">
                      <center>
                      <button type="submit" class="sbtn" onclick="eventResponses('${eventValue.id}')">
                      <i class="fas fa-trash-alt"></i>Check Responses</button></br></br>
                      <button type="submit" class="dbtn" onclick="deleteEvent('${eventValue.id}')">
                      <i class="fas fa-trash-alt"></i>Delete</button>
                      <center>
                      </div>
                    </li><br>`;
      });
      document.getElementById("backBtn_htl").addEventListener("click", (e) => {
        e.preventDefault();
        manageEventsList();
      });
    });
  }
}

