
let cookies = document.cookie.split("; ");

function ObjectifyCookies(cookies){

    //formaterer cookies til et objekt    
    cookies = cookies.reduce((acc, cookie) => {
        const [cookieName, cookieValue] = cookie.split('=');
        acc[cookieName] = cookieValue;
        return acc;
    }, {});

    //console.log(cookies)

    return cookies

}
const COOKIES = ObjectifyCookies(cookies);


async function login() {
  // Get the values from the input fields
  const username = document.getElementById("username-login").value;
  const password = document.getElementById("password-login").value;

  if (username === "" || password === "") {
    return alert("Please provide a username and password");  
  }

  let data = await fetch("/user/login", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      username : username,
      password : password
    })
  })
  .then(res => res.json())

  if(data.status === 200){
    window.location.href = `/user/page/userpage`;
  } else {
    alert(data.msg);
  }

}

async function logout(){
  await fetch("/user/logout")
  .then(res => res.json())
  .then(res => {
    if(res.status === 200){
      window.location.href = "/";
    }
  })
}

//make a login function
document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault(); // prevent the form from submitting
    login();
  });

//make a logout function
document.getElementById("signout").addEventListener("click", function(event) {
    event.preventDefault(); // prevent the form from submitting
    logout();
})

