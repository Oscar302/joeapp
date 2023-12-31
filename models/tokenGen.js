const { sign, verify } = require('jsonwebtoken');
const path = require("path");

// du kan tilføje expiration date her under!!!!! + vi skal helt sikkert bruge en secret key der er lidt bedre end "Fernando_torres"
const createTokens = (user) => {
    const accessToken = sign({
        username : user.username, 
        id: user.id
        }, 
        "JOEAPP_SECRET_KEY", 
        );
    return accessToken;
}


const validateToken = (req, res, next) => {

    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        return res.redirect("/site/signup");
        //json({error: "User not authenticated"});
        //.sendFile(path.join(__dirname, "../public", "index.html"));
    } try {
        const validToken = verify(accessToken, "JOEAPP_SECRET_KEY");
        if (validToken) {
            req.authenticated = true;
            return next();
    }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

const noToken = (req, res, next) => {

    const accessToken = req.cookies["access-token"];
    if (!accessToken) {
        req.authenticated = false;
        return next();
    } else {
        return res.redirect("/");
    }
}

module.exports = {createTokens, validateToken, noToken};