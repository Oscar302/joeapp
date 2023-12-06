const express = require("express");
const userRouter = express.Router();
const path = require("path");

const { SendText } = require("../services/sms");
const bodyParser = require("body-parser");


userRouter.use(bodyParser.json());

const { RunSQL } = require("../config/performSQL.js");


//—––––––––USER MANAGEMENT–––––––––––––––––—–––––––––––––––––––––––––—–––––––––––––––––––––––––—–––––––––––––––––––––––––

//Hent bruger
userRouter.get("/get/:username", async (req, res) => {

    let username = req.params.username
  
    let query = "SELECT * FROM users WHERE username = (?)"
    let values = [username]
  
    let user = await RunSQL(query, values);
  
    res.send({user : user})
  
  })

//Slet Bruger

    userRouter.get("/delete/:username", async (req, res) => {

    let username = req.params.username

    let query = "DELETE FROM users WHERE username = (?)"
    let values = [username]

    let user = await RunSQL(query, values);

    res.send({user : user})
})

module.exports = {userRouter}