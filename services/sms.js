
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