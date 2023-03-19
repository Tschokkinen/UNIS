const session = require('express-session');
const MongoStore = require("connect-mongo");

module.exports = (app) => {
    app.use(
        session({
            secret: process.env.SECRET,
            resave: true,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                maxAge: 60000
            },
            store: MongoStore.create({
                mongoUrl: process.env.MONGO_URI
            })
        })
    );
};