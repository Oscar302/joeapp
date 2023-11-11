// Description: This is the main server file for the application. It will be used to run the server and handle all the requests.
const express = require("express");
const app = express();
const path = require("path");

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

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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
