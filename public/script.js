
const loginButton = document.getElementById("log-in");
const signupButton = document.getElementById("sign-up");



function LoadUser(){

    const user = {};
    const cookieString = document.cookie.split(';');
    

    cookieString.forEach(cookie => {

        //formaterer cookien
        cookie = cookie.trim();
        cookie = cookie.split('=');

        console.log(cookie)
    })
    
}
LoadUser()
