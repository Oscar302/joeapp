
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

async function LoadCookes(){

    const loginButton = document.getElementById("log-in");
    const signupButton = document.getElementById("sign-up");
    const menu = document.getElementById("menu");

    try{
    let cookies = await fetch("/user/get/cookies")
    .then(res => res.json())

    if(cookies["access-token"]){
        loginButton.innerHTML = "Log Out";
        signupButton.style.display = "none";

        profile = document.createElement("a");
        profile.innerHTML = cookies.username;
        profile.href = `/user/page/${cookies.username}`;
        menu.append(profile);

    } else {
        loginButton.style.display = "block";
        signupButton.style.display = "block";
    }}
    catch(err){
        return;
    }

}
LoadCookes()