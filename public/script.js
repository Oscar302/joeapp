

function getActiveUser(){
    // Get the active user from local storage
    const liveUser = localStorage.getItem('activeUser');
    const log_in_element = document.getElementById('log-in');

    // If the user is logged in, display their name
    if(liveUser != null || liveUser != undefined){
        log_in_element.innerHTML = liveUser;
    }

}
getActiveUser()



