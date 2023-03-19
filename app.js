require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require("connect-mongo");
const cookieParser = require('cookie-parser');
const { logger } = require('./middleware/logger');
const { engine } = require('express-handlebars');
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/dbConnection');
const verifyJWT = require('./middleware/verifyJWT');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

connectDB();
const app = express();
app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));



// Required to get req.body data out
app.use(express.urlencoded({ extended: true }));

const options = {
    layoutsDir: 'views/layouts',
    defaultLayout: 'split',
    partialsDir: 'views/partials',
    helpers: require('./lib/helpers.js')
};

app.engine('handlebars', engine(options));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static('public/'));

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


app.use('/', require('./routes/index'));
// app.use(verifyJWT);
app.use('/main', require('./routes/main'));



mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on port: 3000"));
});