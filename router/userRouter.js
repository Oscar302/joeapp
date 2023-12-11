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
const {addUserToDatabase} = require("../models/signupHash.js");
const { user } = require("../config/config.js");
const { addFriend } = require("../models/addFriend.js");
const { compareSync } = require("bcrypt");
const {noToken} = require("../models/tokenGen.js");

userRouter.use(bodyParser.json());
userRouter.use(bodyParser.urlencoded({ extended: true }));
userRouter.use(express.static("public"));



//—––––––––USER MANAGEMENT–––––––––––––––––—–––––––––––––––––––––––––—–––––––––––––––––––––––––—–––––––––––––––––––––––––
//Hent bruger
userRouter.post("/login", async (req, res) => {

    const {username, password} = req.body;
  
    let query = "SELECT * FROM allUsers WHERE username = (?)"
    let values = [username]
    let user = await RunSQL(query, values);
    user = user[0];

    let match = await HashedInputMatch(user.password, password);
  
    if(match === true){
    //Create token
    const accessToken = createTokens(user);

    res.cookie('access-token', accessToken, {maxAge: 3600000, httpOnly: true});
    res.cookie('username', username, {maxAge: 3600000});
    res.cookie('email', user.email, {maxAge: 3600000});
    res.cookie('id', user.id, {maxAge: 3600000});
    res.cookie('fullName', user.name, {maxAge: 3600000});
    res.cookie('phone', user.phone, {maxAge: 3600000});
    res.cookie('address', user.address, {maxAge: 3600000});

      res.send({msg : "Logging in...", status : 200});
    } else {
      res.send({msg : "User not found..", status : 400});
    }
})


userRouter.post("/add/friend", validateToken, async (req, res) => {

  const {username, friend} = req.body;

  console.log(req.body)

  const process = await addFriend(username, friend)
  
  if(!process){
    res.send({friend : friend, msg : "Already friends"}).status(400)
  } else {
    res.send({friend : friend, msg : "Adding friend..."}).status(200)
  }
  }
)

userRouter.post("/get/friends", validateToken, async (req, res) => {
  
    const {username} = req.body;
  
    let query = "SELECT friends FROM allUsers WHERE username = (?)"
    let values = [username]
    const friends = await RunSQL(query, values);
  


    column = friends[0].friends;
    column = JSON.parse(column);
    column = column
    //{friend : osma, room : "otthotosma"}
    //column = column.friend;
  
    res.send({allFriends : column}).status(200)

})

//Hent bruger...
userRouter.get("/get/user/:username", validateToken, async (req, res) => {

  let username = req.params.username

  let query = "SELECT * FROM allUsers WHERE username = (?)"
  let values = [username]
  let user = await RunSQL(query, values);
  user = user[0];

  //console.log(user)

  res.send({user : user})
})

userRouter.get("/get/friend/:username", validateToken, async (req, res) => {

  let username = req.params.username

  let query = "SELECT * FROM allUsers WHERE username = (?)"
  let values = [username]
  let user = await RunSQL(query, values);
  user = user[0];

  //console.log(user)

  res.render("friends", {username : user.username, email : user.email, fullName : user.name, phone : user.phone, pageTitle : "Joe & And The Juice"})
})

userRouter.get("/get/all", validateToken, async (req, res) => {

  let query = "SELECT * FROM allUsers"
  let users = await RunSQL(query);

  res.send({users : users})

})


//Slet Bruger
userRouter.get("/delete/:username", validateToken, async (req, res) => {

    let username = req.params.username

    let query = "DELETE FROM allUsers WHERE username = (?)"
    let values = [username]

    let user = await RunSQL(query, values);

    res.send({user : user})
})

userRouter.get('/page/userpage', validateToken, async (req, res) => {
    
  let currentUser = req.cookies.username;

  query = "SELECT * FROM allUsers WHERE username = (?)"

  values = [currentUser]

  let user = await RunSQL(query, values);
  //console.log(user)
  let {id, username, email, password, name, address, phone} = user[0];

  address = JSON.parse(address);

  res.render("user", {username : username, email : email, fullName : name, phone : phone,
  street : address.street, zip : address.zip, city : address.city, country : address.country, pageTitle : "Joe & And The Juice"})
      
});

userRouter.post('/signup', async (req, res) => {

    let {username, password, email, fullName, address, phone} = req.body;

    address = JSON.stringify(address);
     
    // Call function to add user to the database with hashed password
    let userAdded = await addUserToDatabase(username, password, email, fullName, address, phone);

    if(userAdded === undefined){
      // User was not added to the database, send error message
      res.send({msg : "User not added"}).status(400)
    }

  if(userAdded.usernameTaken === true){
    // Username is taken, send error message
    res.send({msg : "Username taken", href : "", status : 400}).status(400)
    
  } else if (userAdded.err){
    // Error in adding user to database, send error message
      console.log(userAdded.err, "userAdded.err")
      res.send({msg : "Error in adding user to database", status : 400}).status(400)
      
    } else {
      
      const accessToken = createTokens(username);

      res.cookie('access-token', accessToken, {maxAge: 3600000, httpOnly: true});
      res.cookie('username', username, {maxAge: 3600000, httpOnly: false});
      res.cookie('email', email, {maxAge: 3600000, httpOnly: false});
      res.cookie('fullName', fullName , {maxAge: 3600000, httpOnly: false});
      res.cookie('phone', phone , {maxAge: 3600000, httpOnly: false});
      res.cookie('address', address , {maxAge: 3600000, httpOnly: false});

      res.send({msg : "User created, redirecting...", href : "/user/page/userpage", status : 200}).status(200)
    }  
  
})

userRouter.get("/get/cookies", validateToken, (req, res) => {

  cookies = req.cookies["access-token"];

  res.send(req.cookies)
})

userRouter.get("/logout", validateToken, (req, res) => {
  res.clearCookie("access-token");
  res.clearCookie("username");
  res.clearCookie("email");
  res.clearCookie("id");
  res.clearCookie("phone");
  res.clearCookie("address");
  res.clearCookie("fullName");

  res.send({msg : "Logged out", status : 200, dest : "/"})
})

module.exports = {userRouter}