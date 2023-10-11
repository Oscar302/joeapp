

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

function Navigation(){

    const home = document.getElementById('menu-home');
    const menu = document.getElementById('menu-menu');
    const about = document.getElementById('menu-about');
    const contact = document.getElementById('menu-contact');
    const log_in = document.getElementById('log-in');

    const loggedOn = localStorage.getItem('loggedOn');

    home.addEventListener('click', () => {
        window.location.href = '/';
    })  
    menu.addEventListener('click', () => {
        window.location.href = '/site/menu';
    })
    about.addEventListener('click', () => {
        window.location.href = '/site/about';
    })
    contact.addEventListener('click', () => {
        window.location.href = '/site/contact';
    })
    log_in.addEventListener('click', () => {
        window.location.href = `/site/user?loggedOn=${loggedOn}`;
    })
}
Navigation()

