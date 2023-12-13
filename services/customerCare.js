const ecosystemConfig = require('../ecosystem.config');

require('dotenv').config();

//const API_KEY = process.env.OPEN_AI_KEY
const API_KEY = ecosystemConfig.apps[0].env.API_KEY;
async function ChatGPTRequest(message){
    
    if(!API_KEY){
        console.log("No API key found");
        return 
    }

    //console.log(API_KEY)

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
    try{reply = request.choices[0].message.content
        console.log(reply);
        return reply
    }
    catch(err){
        if(reply === undefined){
            reply = "Ran into an error..."
        }
        return err
    }
}

module.exports = {ChatGPTRequest};    // Exporterer funktionen så den kan bruges i andre filer