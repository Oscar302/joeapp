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
const {noToken} = require("../models/tokenGen.js");

// Standard Endpoints
Router.get("/", (req, res) => {
  res.send(users);
});

Router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "contact.html"));
});

Router.get("/login", noToken, (req, res) => {
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


//EJS, routes
Router.get("/menu", (req, res) => {
  res.render("menu", { products: products });
});

Router.get("/product/:id", (req, res) => {
  const productId = req.params.id - 1;

  res.render("product", { product: products[productId] });
});


module.exports = Router;
