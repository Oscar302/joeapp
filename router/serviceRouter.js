const express = require("express");
const serviceRouter = express.Router();
const path = require("path");
const users = require("../config/config").user;
const { SendText } = require("../services/sms");
const bodyParser = require("body-parser");

const products = require("../config/config").products;
const emailService = require("../services/mail.js");
serviceRouter.use(bodyParser.json());

//Importerede funktioner
const { createTokens } = require('../models/tokenGen.js');
const { mailToUser } = require('../services/mail.js'); 
const { getUserByEmail, addUserToDatabase } = require('../models/signupHash.js');
const { ChatGPTRequest } = require("../services/customerCare.js");
const { validateToken } = require("../models/tokenGen.js");


serviceRouter.post("/mail", (req, res) => {
  
    const {address, name, content} = req.body;
    
    //Mangler at blive sat op ordenligt!
    mailToUser(address, name, content);
    
    res.send("mail sent");


});

//Service Routes
serviceRouter.post("/text", (req, res) => {
    text = req.body.message;
    number = req.body.number;
  
    number = number.replace(/\s/g, "");
  
    res.send({ msgSent: number });
    try {
      SendText(text, number);
      res.send({ msg: "Message sent", msgSent: text });
    } catch (err) {
      res.send({ msg: "Message failed to send", err: err.message });
    }
  });

  //Chatbot
serviceRouter.post("/chatbot", async (req, res) => {

    let question = req.body.question;
    let reply = await ChatGPTRequest(question);
  
    res.send({reply : reply})
  
  })


module.exports = {serviceRouter}