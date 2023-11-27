const { sign, verify } = require('jsonwebtoken');

// du kan tilføje expiration date her under!!!!! + vi skal helt sikkert bruge en secret key der er lidt bedre end "Fernando_torres"
const createTokens = (user) => {
    const accessToken = sign({username: user.username, id: user.id}, 
        "Fernando_torres", 
        );
    return accessToken;
}

const validateToken = (req, res, next) => {
const accessToken = req.cookies["access-token"];
if (!accessToken) {
    return res.status(400).json({error: "User not authenticated"});
} try {
    const validToken = verify(accessToken, "Fernando_torres");
    if (validToken) {
    req.authenticated = true;
    return next();
    }
} catch (err) {
    return res.status(400).json({ error: err });
}
};



module.exports = {createTokens, validateToken};