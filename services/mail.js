const nodemailer = require("nodemailer");

// This is a complete example to send an email with plain text and HTML body using Forward Email.
// Source: https://nodemailer.com/about/

// SMTP transport: https://nodemailer.com/smtp/
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    // Opret en Gmail-konto, for eksempel joejuice2023@gmail.com: https://accounts.google.com/
    // Brug et random password til Gmail-kontoen, for eksempel joecbs2023
    // Tilføj to-faktor authentication til Gmail-kontoen via et telefonnummer: https://myaccount.google.com/signinoptions/two-step-verification/enroll-welcome
    // Opret et app password til Gmail-kontoen: https://myaccount.google.com/apppasswords
    // Fjern mellemrum i app password og brug det til at sende mails via Gmail SMTP

    // Mikkel har oprettet denne konto, så brug den kun til at afprøve, og ikke spam.... jeg har oprettet denne konto nu
    // Husk at indsætte modtager email adresser under "to" i funktionen mailToUser
    user: "joeanthejuice2023@gmail.com",
    pass: "wmbyqnoildzvxisw",
  },
});

// Øvelse 1: Send en mail til dig selv med nodemailer via Gmail
// Se ovenstående under auth for oprettelse af Gmail-konto
function GenerateMessage(reciever, sender){
  return `<h1>Hi ${reciever}</h1>` + `<p>${sender} would like to take your out for a sandwhich. Use the link below and let them know fast as possible</p>` + '<p>Best regards</p>' + '<p>Joe & And the Juice</p>';
}


async function mailToUser(recieverMail, sender, reciever) {
  try {
    
    const text = GenerateMessage(reciever, sender);

    const info = await transporter.sendMail({
      
      from: "Joe & The Juice <joeanthejuice2023@gmail.com>", // sender address
      to: [recieverMail], // list of receiver addresses
      //if name is not defined, then use username
      subject: `Offer from Joe & And the Juice with ${sender}`, // Subject line
      text: "", // plain text body
      html: text, // html body
    });
    console.log("Mail sent to: ", recieverMail, "with subject: ", text);
    return true;
  }
  catch (error) {
    console.log("Error sending email:", error);
    return false
  }
};
//eksporter funktionen mailToUser
//mailToUser("ottotyty@gmail.com", "Otto", "Mikkel")

module.exports = {
  mailToUser,
};