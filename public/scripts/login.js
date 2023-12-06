// Lige pt. behøver der ikke kører nogen kode på denne fil. Kan dog godt være vi skal omstrukturere senere for ordentlighedens skyld (eksempelvis rykke login funktionen over i denne fil, så den ikke ligger i signup.js)

//import the user object from the config file
//const user = require("../../config/config.js").user;
//import { user } from "../../config/config.js";



//user object
/*
const customers = [
  {
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
    },
    ];

//make a login function

console.log("login.js loaded");

async function login() {
  // Get the values from the input fields
  const username = document.getElementById("username-log-in").value;
  const password = document.getElementById("password-log-in").value;

  // Check if username and password are provided
  if (username && password) {
    const customer = customers.find(
      (user) => user.username === username && user.password === password
    );

    if (customer) {
      // Set a cookie or store the user information locally for client-side authentication
      document.cookie = `userAuth=${username}; max-age=3600`; // 1 hour expiration
      alert("Du er blevet logget ind");
      window.location.href = "../index.html";
      // Redirect to another page or perform further actions
    } else {
      alert("Forkert brugernavn eller adgangskode");
    }
  } else {
    alert("Indtast brugernavn og adgangskode");
  }
}


// Ovenstående kode fungerer, men når man bliver redirected til index.html forsvinder cokies. Det skal fixes.




// nedenunder er "den gamle kode" med Localhost
  /*
  if (username.trim() === "" || password.trim() === "") {
    alert("Please fill in all fields");
    return;
  }
  
  //check if the values are correct
  if (username === user.username && password === user.password) {
    //if they are, then redirect to the home page
    await localStorage.setItem("user", JSON.stringify(user));
    console.log("login.js redirecting to index.html");
    window.location.href = "../index.html";
  } else {
    // show error alert
    alert("Wrong email or password");
  }
}
*/

//save user in local storage

//add an event listener to the login button
/*

document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault(); // prevent the form from submitting
    login();
  });

//make signout function

function signout() {
    //remove the user from local storage
    localStorage.removeItem("user");
  }

  document.getElementById("signout").addEventListener("click", signout);

  function CheckLogin(){

    const loginButton = document.getElementById("loginButton");
    const signoutButton = document.getElementById("signout");

    const usernameInput = document.getElementById("username-log-in");
    const passwordInput = document.getElementById("password-log-in");

    const para = document.getElementById("para-on-login");

    const headerSignout = document.getElementById("login");

    let user = localStorage.getItem("user");

    console.log(user)

    if(user != null){
      //hvis bruger ikke findes
      loginButton.style.display = "none";
      usernameInput.style.display = "none";
      passwordInput.style.display = "none";     
    } else {
      //hvis bruger findes
      signoutButton.style.display = "none";
    }
  }
  CheckLogin();
  */