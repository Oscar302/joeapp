
const socket = io("http://157.245.78.214");
    
const cookies = document.cookie.split("; ");

const username = cookies[1].split("=")[1];
console.log(cookies)

const sendButton = document.getElementById("sendButton");

socket.on("connect", async () => {

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
            appendMessage(message.message)
        })
        
})


function appendMessage(message){
    const messageContainer = document.getElementById("messages");
    const messageElement = document.createElement("li");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}