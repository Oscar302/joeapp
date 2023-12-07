
function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
    return null;
}

function LoadCookes(){
    const loginButton = document.getElementById("log-in");
    const signupButton = document.getElementById("sign-up");
    const menu = document.getElementById("menu");

    let cookies = document.cookie.split("; ");

    //console.log(cookies)
    
    //formaterer cookies til et objekt    
    cookies = cookies.reduce((acc, cookie) => {
        const [cookieName, cookieValue] = cookie.split('=');
        acc[cookieName] = cookieValue;
        return acc;
    }, {});

    if(cookies["username"]){
        loginButton.innerHTML = "Log Out";
        signupButton.style.display = "none";

        profile = document.createElement("a");
        profile.innerHTML = cookies.username;
        profile.href = `/user/page/userpage`;
        menu.append(profile);

    } else {
        loginButton.style.display = "block";
        signupButton.style.display = "block";
    }
}
LoadCookes()