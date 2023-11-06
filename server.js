// Description: This is the main server file for the application. It will be used to run the server and handle all the requests.
const express = require("express");
const app = express();
const path = require("path");

// Importerer router filen
const router = require("./router/router.js");

//produkter
const products = require("./config/config").products;

// Sætter port og host
const PORT = 3000;
const HOST = "127.0.0.1";

// Importerer sqlite3
/*const sqlite3 = require("sqlite3").verbose();

// Opretter database
const db = new sqlite3.Database("./db/db.sqlite");

//Nedstående funktiok kan køre SQL statements
db.serialize(function () {
  // Tabellen indeholder primærnøgle id, url, tidspunkt og caption
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, firstname TEXT, lastname TEXT, email TEXT, password TEXT, age INTEGER, phone INTEGER, address TEXT, city TEXT, zip INTEGER, country TEXT)"
  );
});*/

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

app.listen(PORT, HOST, () => {
  console.log(`Server is now running on port ${PORT}`);
});
