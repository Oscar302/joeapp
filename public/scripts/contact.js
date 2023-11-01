
document.getElementById("sms-btn").addEventListener("click", async (e) => {
    // prevent the default behavior of the form
    e.preventDefault();

    let message = document.getElementById("sms-message").value;
    let number = document.getElementById("sms-number").value;
    let span = document.getElementById("message-response")

    let data = {
        message,
        number
    }

    let request = await fetch("/site/service/sendText", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })
    .then(res => res.json())
    
    try{
        span.innerHTML = request.msgSent
    }catch(err){
        console.log(err)
        span.innerHTML = "Failed"
    }


})