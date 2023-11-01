
const accountSid = 'ACc51e52fb55e9f546269424e7756bdaf9';
const authToken = 'abf8956e0b040a230e8621413741aa4d';

const client = require('twilio')(accountSid, authToken);

function SendText(text, receiver){

    client.messages
    .create({
       body: text,
       from: '+15313313205',
       to: receiver
     })
    .then(message => console.log(message.sid))
    
}

module.exports = { SendText };