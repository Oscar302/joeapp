
async function LoadUser(){

    const fullname = document.getElementById("span-whole-name");
    const username  = document.getElementById("span-username");

    let cookies = await fetch("/user/get/cookies")
    .then(res => res.json())

    if(cookies["access-token"]){
        //fullname.innerHTML = cookies.name;
        username.innerHTML = cookies.username;
    }

}
LoadUser()