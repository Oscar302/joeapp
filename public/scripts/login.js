

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
      window.location.href = "/site/user";
      // Redirect to another page or perform further actions
    }
  }
}

//save user in local storage

document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault(); // prevent the form from submitting
    login();
  });

