const jwt = require('jsonwebtoken');


const verifyJWT = (req, res, next) => {
    // const authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log("Auth header", authHeader);
    // if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    // const token = authHeader.split(' ')[1];
    // console.log("token ", token);
    jwt.verify(
        req.cookies.cookieToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                // res.sendStatus(403); // Invalid token
                res.redirect('/');
            } else {
                // req.email = decoded.UserInfo.email;
                next();
            }
        }
    )
}



module.exports = verifyJWT;