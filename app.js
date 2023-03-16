require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { engine } = require('express-handlebars');
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/dbConnection');


// Routes
const index = require('./routes'); // Login, main and register

connectDB();

const app = express();

app.use(express.json());

app.use(cookieParser());

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


app.use('/', index);

app.use(express.static('public/'));

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on port: 3000"));
});