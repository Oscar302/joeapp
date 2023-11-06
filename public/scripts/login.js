//import the user object from the config file
//const user = require("../../config/config.js").user;
//import { user } from "../../config/config.js";

//user object
const user = {
    firstname: "John",
    lastname: "Doe",
    username: "JohnDoe", 
    email: "joedoe@gmail.com",
    password: "kodeord",
    age: 21,
    phone: 11112222,
    address: "Solbjerg Plads 12",
    city: "Frederiksberg",
    zip: 2000,
    country: "Denmark",
  };

//make a login function

console.log("login.js loaded");

function login() {
  //get the values from the input fields
  const username = document.getElementById("username-log-in").value;
  const password = document.getElementById("password-log-in").value;
  //tjekker om der er skrevet noget i email og password
  if (username.trim() === "" || password.trim() === "") {
    alert("Please fill in all fields");
    return;
  }
  //check if the values are correct
  if (username === user.username && password === user.password) {
    //if they are, then redirect to the home page
    console.log("login.js redirecting to index.html");
    window.location.href = "../index.html";
  } else {
    // show error alert
    alert("Wrong email or password");
  }
}

//save user in local storage

//localStorage.setItem("user", JSON.stringify(user));

//add an event listener to the login button

document.getElementById("login").addEventListener("click", function(event) {
    event.preventDefault(); // prevent the form from submitting
    login();
  });
