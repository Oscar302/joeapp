const express = require("express");
const serviceRouter = express.Router();
const path = require("path");
const users = require("../config/config").user;
const { SendText } = require("../services/sms");
const bodyParser = require("body-parser");

const products = require("../config/config").products;
//const emailService = require("../services/mail.js");
serviceRouter.use(bodyParser.json());

//Importerede funktioner
const { createTokens } = require('../models/tokenGen.js');
const { mailToUser } = require('../services/mail.js'); 
const { getUserByEmail, addUserToDatabase } = require('../models/signupHash.js');
const { ChatGPTRequest } = require("../services/customerCare.js");
const { validateToken } = require("../models/tokenGen.js");


serviceRouter.post("/send/mail", async (req, res) => {
  
    const {address, receiver, sender} = req.body;
    
    //Mangler at blive sat op ordenligt!
    const sentMail = await mailToUser(address, sender, receiver);

    //console.log(sentMail)
    
    if(!sentMail){
      res.send({msg : "Mail failed to send!"});
    } else {
      res.send({msg : "Mail sent!"});
    }

});

//Service Routes
serviceRouter.post("/send/text", validateToken, (req, res) => {
    let {sender, receiver, number, text} = req.body;
  
    //Fjerner mellemrum fra nummer
    number = number.replace(/\s/g, "");
  
    //res.send({ msgSent: number });
    try {
      SendText(text, number, sender, receiver);
      res.send({ msg: "Message sent", msgSent: text });
    } catch (err) {
      res.send({ msg: "Message failed to send", err: err.message });
    }
  });

  //Chatbot
serviceRouter.post("/chatbot", async (req, res) => {
 
    let question = req.body.question;
    console.log("Recieved question", question);
    let reply = await ChatGPTRequest(question);
  
    res.send({reply : reply})
  
  })


module.exports = {serviceRouter}