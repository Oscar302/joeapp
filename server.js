// Description: This is the main server file for the application. It will be used to run the server and handle all the requests.
const express = require("express");
const app = express();
const path = require("path");

const bcrypt = require("bcrypt");
const salt_rounds = 10;
const cookieParser = require('cookie-parser');
const { validateToken } = require('./models/tokenGen.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const {ChatGPTRequest} = require("./services/customerCare.js");

//sockets
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' }})

// Importerer router filen
const router = require("./router/router.js");
const { userRouter } = require("./router/userRouter.js");
const { serviceRouter } = require("./router/serviceRouter.js");

//produkter
const products = require("./config/config").products;

// Sætter port og host
const PORT = 3000;
const HOST = "127.0.0.1";

//EJS Filer (sider der kan ændre indholdet, alt efter hvad de loades på, f.eks. en profilside eller produktside)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public/pages/views'));

// Sætter public folderen som statisk (ikke ejs filer)
app.use(express.static("public"));
app.use("/site", router);
app.use("/user", userRouter);
app.use("/service", serviceRouter);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//Henter db filen
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db.sqlite");


//Opens a connection to the database
db.all("CREATE TABLE IF NOT EXISTS newUsers (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT, name TEXT, billing TEXT)", (err) => {
  if(err){
    console.log(err)
  } else {
    console.log("Starting: Creating Table IF NOT EXISTS newUsers")
  }
})


//Index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html", "signup.html", "login.html"));
});


// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/pages", "404.html"));
});

//Socket pt. ubrugt skal bruges til chat mellem 2 brugere
io.on("connection", socket => {
  console.log(socket.id)
})


//Start server
server.listen(PORT, HOST, () => {
  console.log(`Starting: Server is now running on port ${PORT}`);
});



