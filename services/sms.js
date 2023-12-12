
// importerer twilio config filen
const twilioDetail = require('../config/config.js').twilioDetail;

// sætter twilio oplysninger i variabler
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN_TWI;

console.log(accountSid, authToken)

// opsætter twilio client
const client = require('twilio')(accountSid, authToken);

//opstiller funktion som tager to variable og sender sender en sms til den givne modtager med den givne tekst 
function SendText(text, number, sender, receiver){

    if(text === ""){
      text = "No text given";
    }
    
  // sender sms
    client.messages
    .create({
       body: `Hi ${receiver} \n` + text + `\nFrom: ${sender}`,
       from: '+15313313205',
       to: `´+45${number}`
    }) 
    .then(message => console.log(message.sid))

}

// eksporterer funktionen så den kan bruges i andre filer
module.exports = { SendText };