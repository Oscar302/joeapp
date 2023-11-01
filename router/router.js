const express = require("express");
const Router = express.Router()
const path = require('path')
const users = require('../backend/users');
const { SendText } = require('../services/sms');
const bodyParser = require('body-parser');

Router.use(bodyParser.json());

Router.get("/", (req, res) => {

    res.send(users)
    
})

Router.get("/contact", (req, res) => {

    res.sendFile(path.join(__dirname, '../public/pages', 'contact.html'))

})

Router.get("/menu", (req, res) => {

    res.sendFile(path.join(__dirname, '../public/pages', 'menu.html'))

})

Router.get("/about", (req, res) => {

    res.sendFile(path.join(__dirname, '../public/pages', 'about.html'))

})

Router.get('/project', (req, res) => {

    res.sendFile(path.join(__dirname, '../public/pages', 'project.html'))

})

Router.get('/user', (req, res) => {

    userstatus = req.query.loggedOn;;

    if(userstatus === 'true'){
        res.sendFile(path.join(__dirname, '../public/pages', 'user.html'))
    } else {
        res.sendFile(path.join(__dirname, '../public/pages', 'signup.html'))
    }
})

Router.get('/phone', (req, res) => {
    
        res.sendFile(path.join(__dirname, '../public', 'index.html'))
})

Router.post('/service/sendText', (req, res) => {

    text = req.body.message;
    number = req.body.number;

    try{
        SendText(text, number);
        res.send({msg : 'Message sent', msgSent : text})
    } catch(err){
        res.send({msg : 'Message failed to send', err : err.message})
    }
})

module.exports = Router;