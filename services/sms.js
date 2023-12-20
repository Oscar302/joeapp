require('dotenv').config();
// sætter twilio oplysninger i variabler
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN_TWI;

//opstiller funktion som tager to variable og sender sender en sms til den givne modtager med den givne tekst 
async function SendText(number, sender, receiver){

    if(!accountSid || !authToken){
      console.log("Missing twilio credentials")
    }

    const client = await require('twilio')(accountSid, authToken);
   
    try{
  // sender sms
    client.messages
    .create({
       body: `Hi${receiver} \n` + `${sender} Sent you an offer for` + `\nGrab ${sender}'s hand, get to a Joe & the Juice store to enjoy your offer!`,
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