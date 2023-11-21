
const loginButton = document.getElementById("log-in");
const signupButton = document.getElementById("sign-up");



function LoadUser(){

    let user = localStorage.getItem("user");
    if(user != null){

        loginButton.innerHTML = "Sign Out"
        signupButton.style.display = "none";
    }
}
LoadUser()
