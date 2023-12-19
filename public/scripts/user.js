//const socket = io("http://157.245.78.214");
//const socket = io("http://localhost:3000");
const socket = io("https://dinjoefeature.dk");

//getElementbyId's
const addFriendInput = document.getElementById("addFriend");
const friendSeach = document.getElementById("friendSearch");
const users = [];
const userFriends = [];
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
        
        if(data.status === 400){
            appendMessage(data.msg, "error", "messages")
        } else {
            await appendMessage(data.msg, "success", "messages")
            setTimeout(() => {
                window.location.reload();
            }, 1500)
            
        }
        
        //alert(data.msg)
    })

    messageElement.addEventListener("mouseover", () => {
        if(message !== 'No users found'){
            messageElement.textContent = "Add " + message + " as friend";
        }
    })  
    messageElement.addEventListener("mouseout", () => {
        messageElement.textContent = message;
    })


    messageElement.className = classname;
    messageElement.innerText = message;
    messageContainer.append(messageElement);    
    
}

function appendMessage(message, classname, container){

    const messageContainer = document.getElementById(container);
    const messageElement = document.createElement("li");

    messageElement.className = classname;
    messageElement.innerText = message;
    messageContainer.append(messageElement);

}

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

        appendSearch("Loading...", "friendSearch", "friendSearch-item")

            setTimeout( ( ) => {
                document.querySelectorAll(".friendSearch-item").forEach(item => item.remove())

                if(searchedUser.length === 0){

                
                    document.querySelectorAll(".friendSearch-item").forEach(item => item.remove())
                    appendSearch("No users found", "friendSearch", "friendSearch-item")    
                    return;

            }
            for(let i = 0; i < searchedUser.length; i++){
                appendSearch(searchedUser[i].username, "friendSearch", "friendSearch-item")
            }
    }, 500)
    } 
}) 

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", async () => {

    let data = await fetch(`/user/delete/${username}`, {
        method : "GET",
        headers : {
            "Content-Type" : "application/json"
        }
    })
    .then(res => res.json())

    if(data.status != 200){
        alert(data.msg)
        return;
    }

    if(data.status === 200){
        let loguout = await fetch("/user/logout", {
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        alert(loguout.msg)
        if(loguout.status === 200){
            window.location.href = "/";
        }
    }
})

//console.log(userFriends)

socket.on("connect", async () => {


    await LoadFriends();
    
    console.log("Connected to server", socket.id, "from client");

    //socket.emit("join", {room : userFriends[0].room, user : username});

    socket.on("joinedRoom", data => {


        if(document.querySelectorAll("welcomeMessage").length > 0){
            appendMessage(data, "welcomeMessage", "welcomeAnnounce")    
        } else {
            document.querySelectorAll(".welcomeMessage").forEach(item => item.remove())
            appendMessage(data, "welcomeMessage", "welcomeAnnounce")
        }
    })


    socket.on("reply", data => {
        appendMessage(data, "replies", "messages")
    })


    sendButton.addEventListener("click", async () => {

        let message = document.getElementById("chat-input").value

        if(message === ""){
            return;
        }
        
        socket.emit("chatMessage", {message : message, username : username})

        document.getElementById("chat-input").value = "";
    })

    async function LoadFriends(){

        //fjerner forrige elementer, for at undgå at de stacker oven på hinanden.
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
    
            let justPressed = false;
            

            for(let i = 0; i < friends.allFriends.length; i++){
    
                userFriends.push({friend : friends.allFriends[i].friend, room : friends.allFriends[i].room})
                const friend = document.createElement("li");
                const button = document.createElement("button");
                const div = document.createElement("div");

                div.className = "friend-div";

                button.innerText = "See Friend";
                button.addEventListener("click", () => {
                    window.location.href = `/user/get/friend/${friends.allFriends[i].friend}`
                })

                

                div.addEventListener("click", async () => {

                    await socket.emit("leaveAll")
                    socket.emit("join", {room : friends.allFriends[i].room, user : friends.allFriends[i].friend});
                    
                })

                friend.className = "friend";
                friend.innerText = friends.allFriends[i].friend;
                div.appendChild(friend);
                div.appendChild(button);
                friendList.appendChild(div);
            }
    }
    
})