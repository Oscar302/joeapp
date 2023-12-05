const express = require("express");
const Router = express.Router();
const path = require("path");
const users = require("../config/config").user;
const { SendText } = require("../services/sms");
const bodyParser = require("body-parser");

const products = require("../config/config").products;
const emailService = require("../services/mail.js");
Router.use(bodyParser.json());

const { ChatGPTRequest } = require("../services/customerCare.js");

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

Router.get("/userpage", (req, res) => {

 res.sendFile(path.join(__dirname, "../public/pages", "user.html"));

});

Router.get("/users", (req, res) => {
  res.send(users);
});

Router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/pages", "signup.html"));
});

Router.get("/phone", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

//EJS, routes
Router.get("/menu", (req, res) => {
  res.render("menu", { products: products });
});

Router.get("/product/:id", (req, res) => {
  const productId = req.params.id - 1;

  res.render("product", { product: products[productId] });
});

Router.post("/service/sendText", (req, res) => {
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

// New route for sending emails
// sendEmail route
Router.post("/service/sendEmail", async (req, res) => {
  const { htmlMsg, recieverMail, name } = req.body;
  console.log('Received a POST request at /site/service/sendEmail');
  console.log('Request body:', req.body);
  try {
    const emailInfo = await emailService.mailToUser(
      htmlMsg,
      recieverMail,
      name
    );
    res.send({ msg: "Email sent successfully", emailInfo });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .send({ msg: "Internal Server Error", error: error.message });
  }
});

//Chatbot
Router.post("/service/chatbot", async (req, res) => {

  let question = req.body.question;
  let reply = await ChatGPTRequest(question);

  res.send({reply : reply})

})

Router.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Call function to add user to the database with hashed password
  addUserToDatabase(username, email, password);

  // redirect to login page
  res.redirect('/public/pages/login.html')
});

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
    res.redirect('/site/userpage');
  }
});

module.exports = Router;
