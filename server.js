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


app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Call function to add user to the database with hashed password
  addUserToDatabase(username, email, password);

  // redirect to login page
  res.redirect('/public/pages/login.html')
});

// Login endpoint
app.post('/login', async (req, res) => {
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
  res.redirect('/public/pages/user.html');
  }
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

    let reply = await ChatGPTRequest(question);
    socket.emit("reply", reply)

  })

})

server.listen(PORT, HOST, () => {
  console.log(`Server is now running on port ${PORT}`);
});



