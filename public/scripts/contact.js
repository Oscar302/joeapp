
const socket = io('http://localhost:3000')
const chat = document.getElementById("chat");

const sendButton = document.getElementById("sendButton");

socket.on("connect", () => {

    console.log("connected to server")  

    socket.on("reply", (reply) => {

        li_r = document.createElement("li")
        li_r.classList.add("replies")
        li_r.innerHTML = reply
        chat.appendChild(li_r)
    })
})

sendButton.addEventListener("click", () => {

    let question = document.getElementById("questions").value

    if(question == ""){
        return
    }

    socket.emit("question", question)

    li_q = document.createElement("li")
    li_q.classList.add("question")
    li_q.innerHTML = question
    
    chat.appendChild(li_q)
    document.getElementById("questions").value = "";
})
