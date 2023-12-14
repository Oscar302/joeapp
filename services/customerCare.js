require('dotenv').config();

const API_KEY = process.env.API_KEY;

async function ChatGPTRequest(message){
    
    if(!API_KEY){
        console.log("No API key found");
        return 
    }

    if(message = ""){
        return "No message given"
    }

    let request = await fetch("https://api.openai.com/v1/chat/completions ", {
        method : "POST",
        headers : {
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(
            {
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "system", "content" : "You're a Joe & The Juice customer care agent."}, {"role": "user","content": `${message}`},],
                "temperature": 0.7
            }
        ) 
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    console.log(request);

    try{reply = request.choices[0].message.content
        console.log(reply);
        return reply
    }
    catch(err){
        console.log(err)
        return "Ran into an error..."
    }
}

module.exports = {ChatGPTRequest};    // Exporterer funktionen så den kan bruges i andre filer