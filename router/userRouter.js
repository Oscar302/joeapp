const express = require("express");
const userRouter = express.Router();
const path = require("path");
const bodyParser = require("body-parser");

const { SendText } = require("../services/sms");
const { HashingMachine } = require("../models/signupHash.js")
const { HashedInputMatch } = require("../models/signupHash.js")
const { RunSQL } = require("../config/performSQL.js");
const {createTokens} = require("../models/tokenGen.js");
const {validateToken} = require("../models/tokenGen.js");
const { error } = require("console");

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(express.static("public"));



//—––––––––USER MANAGEMENT–––––––––––––––––—–––––––––––––––––––––––––—–––––––––––––––––––––––––—–––––––––––––––––––––––––
//Hent bruger
userRouter.post("/login", async (req, res) => {

    const {username, password} = req.body;
  
    let query = "SELECT * FROM users WHERE username = (?)"
    let values = [username]
    let user = await RunSQL(query, values);
    user = user[0];

    let match = await HashedInputMatch(user.password, password);
  
    if(match === true){
    //Create token
    const accessToken = createTokens(user);

    res.cookie('access-token', accessToken, {maxAge: 3600000, httpOnly: true});
    res.cookie('username', username, {maxAge: 3600000, httpOnly: true});
    res.cookie('email', user.email, {maxAge: 3600000, httpOnly: true});

      res.send({msg : "Logging in...", status : 200});
    } else {
      res.send({msg : "User not found..", status : 400});
    }
})


//Slet Bruger
userRouter.get("/delete/:username", validateToken, async (req, res) => {

    let username = req.params.username

    let query = "DELETE FROM users WHERE username = (?)"
    let values = [username]

    let user = await RunSQL(query, values);

    res.send({user : user})
})

userRouter.get('/page/:username', validateToken, (req, res) => {
    
  user = req.params.username;

  query = "SELECT * FROM users WHERE username = (?)"

  values = [user]

  RunSQL(query, user)

  res.sendFile(path.join(__dirname, "../public/pages", "user.html"));
      
});

userRouter.post('/signup', async (req, res) => {

    const {username, email, password, name, billing} = req.body;

  
    //mangler token genearator
  // const accessToken = createTokens(user);

    res.cookie('access-token', accessToken, {maxAge: 3600000, httpOnly: true});
    res.cookie('username', username, {maxAge: 3600000, httpOnly: true});
    res.cookie('email', user.email, {maxAge: 3600000, httpOnly: true});

})

userRouter.get("/get/cookies", validateToken, (req, res) => {

  res.send(req.cookies)
})

userRouter.get("/logout", validateToken, (req, res) => {
  res.clearCookie("access-token");
  res.clearCookie("username");
  res.clearCookie("email");

  res.send({msg : "Logged out", status : 200, dest : "/"})
})

module.exports = {userRouter}