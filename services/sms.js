const accountSid = 'ACc51e52fb55e9f546269424e7756bdaf9';
const authToken = 'cb94d4193529a731e80a1ac86dfe442f';
const client = require('twilio')(accountSid, authToken);

function SendText(text, receiver){

    client.messages
    .create({
        body: text,
        from: '+15313313205',
        to: receiver
    })
    .then(message => console.log(message.sid))
    .done();
    
}

module.exports = { SendText };