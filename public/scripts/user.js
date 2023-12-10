
//const socket = io("http://157.245.78.214");
const socket = io("http://localhost:3000");

//getElementbyId's
const addFriendInput = document.getElementById("addFriend");
const friendSeach = document.getElementById("friendSearch");
const users = [];
const addFriendButton = document.getElementById("addFriendButton");
const sendButton = document.getElementById("sendButton");


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
const COOKIES = ObjectifyCookies(cookies)
const {username, email, password, name, address, phone} = COOKIES;


function appendSearch(message, container, classname){
    
    const messageContainer = document.getElementById(container);
    const messageElement = document.createElement("li");

    messageElement.addEventListener("click", async () => {
        
        let data = await fetch(`/user/add/friend`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(
                {
                    "username" : username,
                    "friend" : message
                }
            )
        })
        .then(res => res.json())
        LoadFriends()
        alert(data.msg)
    })

    messageElement.addEventListener("mouseover", () => {
        messageElement.textContent = "Add " + message + " as friend";
    })  
    messageElement.addEventListener("mouseout", () => {
        messageElement.textContent = message;
    })


    messageElement.className = classname;
    messageElement.innerText = message;
    messageContainer.append(messageElement);    
    
}

socket.on("connect", async () => {

        socket.on(username, (user) => {
            console.log(user)
        })

        console.log("Connected to server", socket.id, "from client");
        
        await socket.emit("joinRoom", 'room123')

        sendButton.addEventListener("click", () => {
            
            const chatInput = document.getElementById("chat-input").value;

            //console.log("sending", chatInput)

            socket.emit("chatMessage", {
                room : 'room123', message : chatInput
            })

            document.getElementById("chat-input").value = "";
        })

        socket.on("chatMessage", (message) => {
            //console.log(message)
            //appendMessage(username + " – "+ message.message, "messages")
        })
        
})

document.addEventListener("DOMContentLoaded", async () => {

    const response = await fetch("/user/get/all", {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
            }
        })
    .then(res => res.json())

    
    for(let i = 0; i < response.users.length; i++){
        if(response.users[i].username === username){
            continue;
        } else {
            users.push(response.users[i])
        }
    }   
    }
)

addFriendInput.addEventListener("keydown", (event) => {

    if(addFriendInput.value === ""){
        return;
    }

    if(event.key === "Enter"){

        document.querySelectorAll(".friendSearch-item").forEach(item => item.remove())
        const searchedUser = users.filter(users => users.username.includes(addFriendInput.value))
        friendSeach.style.opacity = 1

        if(searchedUser.length === 0){
            appendSearch("No users found", "friendSearch", "friendSearch-item")
            return;
        }
        
        for(let i = 0; i < searchedUser.length; i++){
            appendSearch(searchedUser[i].username, "friendSearch", "friendSearch-item")
        }
    } 
}) 


async function LoadFriends(){

    document.querySelectorAll(".friend").forEach(item => item.remove())

    const friends = await fetch("/user/get/friends", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {
                "username" : username
            }
        )
    })
    .then(res => res.json())
    
    
    const friendList = document.getElementById("existingFriends-list");


    for(let i = 0; i < friends.friends.length; i++){
        const friend = document.createElement("li");
        friend.className = "friend";
        friend.innerText = friends.friends[i];
        friendList.appendChild(friend);
    }
}
LoadFriends();


