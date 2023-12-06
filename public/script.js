
function LoadUser(){
    
    const loginButton = document.getElementById("log-in");
    const signupButton = document.getElementById("sign-up");
    const menu = document.getElementById("menu");

    const user = [];
    const cookieString = document.cookie.split(';');
    
    cookieString.forEach(cookie => {

        //formaterer cookien
        cookie = cookie.trim();
        cookie = cookie.split('=');

        user.push(cookie[1]);
    })

    if(user[0] !== undefined){
        loginButton.innerHTML = "Log out";
        signupButton.style.display = "none";

        page = document.createElement("a");
        page.href = "/site/user";
        page.innerHTML = user[0];
        menu.append(page);
    }
    
}
LoadUser()
