const ecosystemConfig = require('../ecosystem.config');

require('dotenv').config();
// sætter twilio oplysninger i variabler
const accountSid = ecosystemConfig.apps[0].ACCOUNT_SID;
const authToken = ecosystemConfig.apps[0].AUTH_TOKEN_TWI;

//opstiller funktion som tager to variable og sender sender en sms til den givne modtager med den givne tekst 
async function SendText(text, number, sender, receiver){

    const client = await require('twilio')(accountSid, authToken);

    if(text === ""){
      text = "No text given";
    }
    
    try{
  // sender sms
    client.messages
    .create({
       body: `Hi ${receiver} \n` + text + `\nFrom: ${sender}`,
       from: '+15313313205',
       to: `+45${number}`
    }) 
    .then(message => console.log("Sending text", "ID:", message.sid))
    return true
    } catch(err)
    {
      console.log("Error sending sms: ", err)
    }
}

// eksporterer funktionen så den kan bruges i andre filer
module.exports = { SendText };