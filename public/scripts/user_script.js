/*
function checkLoggedIn() {
    // Retrieve the user authentication information from cookies
    const username = getCookie("username");
    const password = getCookie("password");

    // Check if both username and password cookies exist and are not empty
    if (username && password && username !== "" && password !== "") {
        // The user is logged in, allow access to the page
        console.log("User is logged in. usernmae: " + username + ", password: " + password + ".");
    } else {
        // The user is not logged in, redirect to a login page or show a login form
        console.log("User is not logged in. Redirecting to login page...");
    }
    window.location.href = "signup.html";
}

// Function to get the value of a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

// Call the checkLoggedIn function when the page loads
checkLoggedIn();
*/


