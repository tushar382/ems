//search events in home page
const searchHEvents = () => {
    let filter = document.getElementById("searchHevents").value.toUpperCase();
    let ul = document.getElementById("eventslist");
    let li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        let div = li[i].getElementsByTagName("div")[0];
        let textValue = div.textContent || div.innerHTML;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none ";
        }
    }
};
//search user in check responses section
const searchUser = () => {
    let filter = document.getElementById("searchUser").value.toUpperCase();
    let ul = document.getElementById("manage-eventslist");
    let li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        let div = li[i].getElementsByTagName("div")[0];
        let textValue = div.textContent || div.innerHTML;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none ";
        }
    }
};
//searchBar of manage events
const searchMEvents = () => {
    let filter = document.getElementById("searchMEvents").value.toUpperCase();
    let ul = document.getElementById("manage-eventslist");
    let li = ul.getElementsByClassName("list")
    for (var i = 0; i < li.length; i++) {
        let div = li[i].getElementsByTagName("div")[0];
        let textValue = div.textContent || div.innerHTML;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none ";
        }
    }
};
const searchMEvents_LTH = () => {
    let filter = document.getElementById("searchMEvents_LTH").value.toUpperCase();
    let ul = document.getElementById("manage-eventslist");
    let li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        let div = li[i].getElementsByTagName("div")[0];
        let textValue = div.textContent || div.innerHTML;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none ";
        }
    }
};
const searchMEvents_HTL = () => {
    let filter = document.getElementById("searchMEvents_HTL").value.toUpperCase();
    let ul = document.getElementById("manage-eventslist");
    let li = ul.getElementsByTagName("li");
    for (var i = 0; i < li.length; i++) {
        let div = li[i].getElementsByTagName("div")[0];
        let textValue = div.textContent || div.innerHTML;
        if (textValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none ";
        }
    }
};
