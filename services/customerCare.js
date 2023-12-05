require('dotenv').config();
const API_KEY = process.env.OPENAI_API_KEY;
async function ChatGPTRequest(message){
    
    console.log("Request started")

    let request = await fetch("https://api.openai.com/v1/chat/completions ", {
        method : "POST",
        headers : {
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {
                "model": "gpt-3.5",
                "messages": [{"role": "system", "content" : "You're a Joe & The Juice customer care agent."}, {"role": "user","content": `${message}`},],
                "temperature": 0.7
            }
        ) 
    })
    .catch(err => console.log(err))
    .then(res => res.json())
    try{reply = request.choices[0].message.content
        console.log(reply);
        return reply
    }
    catch(err){
        console.log(request)
        reply = request.error.message
    }
}

module.exports = {ChatGPTRequest};    // Exporterer funktionen så den kan bruges i andre filer