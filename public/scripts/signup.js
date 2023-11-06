/* 
fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email }),
  })
    .then((response) => response.text())
    .then((result) => {
      alert(result);
    })
    .catch((error) => {
      console.error(error);
    });
} 
*/

document.querySelectorAll("input").forEach((item) => {

})

function kookie () {
const username = document.getElementById('username-sign-up').value;
const password = document.getElementById('password-sign-up').value;
const email = document.getElementById('email-sign-up').value;

if (username != "" && password != "" && email != "") {
    document.cookie = "username=" + username;
    document.cookie = "password=" + password;
    document.cookie = "email=" + email;
    alert("Cookies are set");
} else {
    alert("Please fill out the form");
}
}
//kookie();

// kryptering af cookie data?

    /* Hvis vi også vil rode med LocalStorage   
    const userJSON = JSON.stringify(user);
    localStorage.setItem('user', userJSON);
    */