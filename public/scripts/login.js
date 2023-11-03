//import the user object from the config file
const user = require("../../config/config.js").user;

//make a login function

console.log("login.js loaded");

function login() {
  //get the values from the input fields
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  //check if the values are correct
  if (email === user.email && password === user.password) {
    //if they are, then redirect to the home page
    window.location.href = "home.html";
  } else {
    //if not, then show an error message
    document.getElementById("error").innerHTML = "Wrong email or password bror";
  }
}

//save user in local storage

localStorage.setItem("user", JSON.stringify(user));

//add an event listener to the login button

document.getElementById("login").addEventListener("click", login);
