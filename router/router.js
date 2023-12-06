const express = require("express");
const Router = express.Router();
const path = require("path");
const users = require("../config/config").user;
const { SendText } = require("../services/sms");
const bodyParser = require("body-parser");

const products = require("../config/config").products;
const emailService = require("../services/mail.js");
Router.use(bodyParser.json());

//Importerede funktioner
const { createTokens } = require('../models/tokenGen.js');
const { getUserByEmail, addUserToDatabase } = require('../models/signupHash.js');
const { ChatGPTRequest } = require("../services/customerCare.js");
const { validateToken } = require("../models/tokenGen.js");

// Standard Endpoints
Router.get("/", (req, res) => {
  res.send(users);
});

Router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "contact.html"));
});

Router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "login.html"));
});

Router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "about.html"));
});

Router.get("/project", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "project.html"));
});

//Signup endpoint
Router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "signup.html"));
});


//Create user endpoint
Router.post("/signup", async (req, res) => {

  const { username, email, password } = req.body;

  // Call function to add user to the database with hashed password
  let userAdded = await addUserToDatabase(username, email, password)

  console.log(userAdded, "userAdded")

  //console.log(userAdded, "userAdded")
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
    res.send({msg : "User created, redirecting...", href : "/site/user", status : 200}).status(200)
  }
  
    
})

// Login endpoint
Router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Get the user from the database
  const user = await getUserByEmail(email);

  // Check if the user exists in the database and if the password is correct
  if (!user || user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
      return res.status(401).send('Invalid email or password');
  } else {
    const accessToken = createTokens(user[0]);
    res.cookie('access-token', accessToken, {maxAge: 3600, httpOnly: true});
  
  // User exists, redirect to home page
    res.redirect('/site/user');
  }
});


//EJS, routes
Router.get("/menu", (req, res) => {
  res.render("menu", { products: products });
});

Router.get("/product/:id", (req, res) => {
  const productId = req.params.id - 1;

  res.render("product", { product: products[productId] });
});


Router.get('/user', validateToken, (req, res) => {
    
  const data = db.all(`SELECT * FROM users WHERE username = '${req.user.username}'`, (err, rows) => {
      if(err){
          console.log(err);
          res.sendStatus(500);
      } else {
          res.send(rows);
      }
  })
});


module.exports = Router;
