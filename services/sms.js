
// importerer twilio config filen
const twilioDetail = require('../config/config.js').twilioDetail;

// sætter twilio oplysninger i variabler
const accountSid = twilioDetail.accountSid;
const authToken = twilioDetail.authToken;

// opsætter twilio client
const client = require('twilio')(accountSid, authToken);

//opstiller funktion som tager to variable og sender sender en sms til den givne modtager med den givne tekst 
function SendText(text, receiver){

  // sender sms
    client.messages
    .create({
       body: text,
       from: '+15313313205',
       to: receiver
     })
    .then(message => console.log(message.sid))
    
}

// eksporterer funktionen så den kan bruges i andre filer
module.exports = { SendText };