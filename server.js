// Description: This is the main server file for the application. It will be used to run the server and handle all the requests.
const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const salt_rounds = 10;
const cookieParser = require('cookie-parser');
const { validateToken } = require('./public/scripts/JWT');
const { createTokens } = require('./public/scripts/JWT');
const { addUserToDatabase } = require('./public/scripts/signup');
const { getUserByEmail } = require('./public/scripts/signup');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


const {ChatGPTRequest} = require("./services/customerCare.js");

//sockets
const server = require('http').createServer(app)
const io = require('socket.io')(server, { cors: { origin: '*' }})

// Importerer router filen
const router = require("./router/router.js");

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
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html", "signup.html", "login.html"));
});


app.get('/user', validateToken, (req, res) => {
    res.json('Hello');
});

// 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public/pages", "404.html"));
});

io.on("connection", socket => {
  console.log(socket.id)

  socket.on("question", async question => {

    socket.emit("reply", reply)

  })

})

server.listen(PORT, HOST, () => {
  console.log(`Server is now running on port ${PORT}`);
});



