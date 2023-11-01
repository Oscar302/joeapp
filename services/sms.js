

// Twilio oplysninger fra min (ottos bruger)
const accountSid = 'ACc51e52fb55e9f546269424e7756bdaf9';
const authToken = 'abf8956e0b040a230e8621413741aa4d';

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