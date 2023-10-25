const express = require('express');
const app = express();
const path = require("path");

const router = require("./router/router.js");

const PORT = 3000;
const HOST = '127.0.0.1'

app.use(express.static('public'))
app.use(useragent.express());; 
app.use('/site', router);
app.use(express.urlencoded({extended : true}));


app.get("/", (req, res) => {

    
    res.sendFile(path.join(__dirname, 'public', 'index.html'))            

})


app.listen(PORT, HOST,() => {
    console.log(`Server is now running on ${PORT}`)

})  