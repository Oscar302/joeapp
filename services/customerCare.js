require('dotenv').config();
const API_KEY = process.env.OPENAI_API_KEY;
console.log(openaiApiKey)

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
                "model": "gpt-4",
                "messages": [{"role": "system", "content" : "You're a JoeAndTheJuice customer care agent."}, {"role": "user","content": `${message}`},],
                "temperature": 0.7
            }
        ) 
    })
    .then(res => res.json())

    reply = request.choices[0].message.content 
    console.log(reply);

    return reply
    
}

module.exports = {ChatGPTRequest};    // Exporterer funktionen så den kan bruges i andre filer