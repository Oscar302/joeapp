

const sendTextButton = document.getElementById('sendTextButton');
let cookies = document.cookie.split("; ");
function ObjectifyCookies(cookies){

    //formaterer cookies til et objekt    
    cookies = cookies.reduce((acc, cookie) => {
        const [cookieName, cookieValue] = cookie.split('=');
        acc[cookieName] = cookieValue;
        return acc;
    }, {});

    return cookies;
}

const COOKIES = ObjectifyCookies(cookies);


sendTextButton.addEventListener('click', async () => {

    let text = false;

    try{
        text = document.getElementById("textInput").value;
    }catch(err){
        
    }

    let friend = document.getElementById("username").innerHTML;
    let number = document.getElementById("number").innerHTML;
    console.log(friend, number, text)

    let textAttempt = fetch("/service/send/text", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {
            "sender" : COOKIES.username,
            "number" : number,
            "receiver" : friend,
            "text" : text})
       })
    .then(res => res.json())
    .then(res => console.log(res));
    }
)


const sendMailButton = document.getElementById('sendMailButton');

sendMailButton.addEventListener('click', async () => {

    console.log("sendMailButton clicked")

    const user = COOKIES.username;
    const friend = document.getElementById("username").innerHTML;
    const address = document.getElementById("email").innerHTML

    try{
        console.log(user, friend, address)
    let mail = await fetch("/service/send/mail", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(
                {
                "sender" : user,
                "receiver" : friend,
                "address" : address
                })
           
            })
            .then(res => res.json())
            .then(res => console.log(res))
        return true;

    }
    catch(err){
        return false;
    }
})