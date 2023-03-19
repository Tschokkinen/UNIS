const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

// https://geekflare.com/user-authentication-with-jwt-in-nodejs/
// const verifyJWT = async (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     console.log("before authHeader");
//     console.log("authHeader", authHeader);
//     const token = authHeader && authHeader.split(' ')[1]

//     if (token == null) return res.sendStatus(401)
    
//     const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = await UserModel.findById(verify.id);
//     next();
// }

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    console.log("Auth header", authHeader);
    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    console.log("token ", token);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403); // Invalid token
            req.email = decoded.UserInfo.email;
            next();
        }
    )
}

module.exports = verifyJWT;