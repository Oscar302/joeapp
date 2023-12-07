const chat = document.getElementById("chat");

const sendButton = document.getElementById("sendButton");

function LogReply(reply){
    li_r = document.createElement("li")
    li_r.classList.add("replies")
    li_r.innerHTML = reply
    chat.appendChild(li_r)
}

sendButton.addEventListener("click", async () => {

    let question = document.getElementById("questions").value

    if(question == ""){
        return
    }

    li_q = document.createElement("li")
    li_q.classList.add("question")
    li_q.innerHTML = question
    
    chat.appendChild(li_q)
    document.getElementById("questions").value = "";

    let data = await fetch("/service/chatbot", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {
                "question" : question
            }
        )
    })
    .then(res => res.json())
    
    if(data !== undefined){
        LogReply(data.reply)
    }
})
