const express = require("express");
const Router = express.Router();
const path = require("path");
const users = require("../config/config").user;
const { SendText } = require("../services/sms");
const bodyParser = require("body-parser");

const products = require("../config/config").products;

Router.use(bodyParser.json());

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

Router.get("/users", (req, res) => {
  
  res.send(users);

});

Router.get("/phone", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

//EJS, routes
Router.get("/menu", (req, res) => {
  res.render('menu', {products : products});  
});


Router.get('/product/:id', (req, res) => {

  const productId = req.params.id - 1;

    res.render('product', {product : products[productId]})
  
})  


Router.post("/service/sendText", (req, res) => {
  text = req.body.message;
  number = req.body.number;

  number = number.replace(/\s/g, "");

  res.send({ msgSent: number });
    try{
        SendText(text, number);
        res.send({msg : 'Message sent', msgSent : text})
    } catch(err){
        res.send({msg : 'Message failed to send', err : err.message})
    }
});

module.exports = Router;
