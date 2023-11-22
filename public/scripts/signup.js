document.querySelectorAll("input").forEach((item) => {

})

function kookie () {
const username = document.getElementById('username-sign-up').value;
const password = document.getElementById('password-sign-up').value;
const email = document.getElementById('email-sign-up').value;

if (username !== "" && password !== "" && email !== "") {
    // Set cookies with an expiration date in the future
    var expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Set expiration for 1 year from now

    document.cookie = "username" + username + "; expires" + expirationDate.toUTCString() + "; path=/";
    document.cookie = "password=" + password + "; expires=" + expirationDate.toUTCString() + "; path=/";
    document.cookie = "email=" + email + "; expires=" + expirationDate.toUTCString() + "; path=/";

    

    alert("Cookies are set");
    window.location.href = "user.html";

} else {
    alert("Please fill out the form");
} 
} 