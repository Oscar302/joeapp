const express = require("express");
const Router = express.Router()
const path = require('path')
const users = require('../backend/users');

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


module.exports = Router;