require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path')
const { engine } = require('express-handlebars');
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/dbConnection');


// Middleware
const verifyJWT = require('./middleware/verifyJWT');
const isUser = require('./middleware/roleAuth');
const { logger } = require('./middleware/logger');

// Cors
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');




// Connect to database
connectDB();

const app = express();

// Logger to get console logs for GET, POST etc.
app.use(logger); 

app.use(express.json());
app.use(cookieParser());

// Is cross origin (CORS) even needed???
// app.use(cors(corsOptions));

// app.use(cors({
//     origin: '*'
// }));

// Required to get req.body data out
app.use(express.urlencoded({ extended: true }));

// Options for handlebars
const options = {
    layoutsDir: 'views/layouts',
    defaultLayout: 'split',
    partialsDir: 'views/partials',
    helpers: require('./lib/helpers.js')
};

app.engine('handlebars', engine(options));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Create test comment
// const Comment = require('./models/CommentModel');
//  Comment.create({
//     comment: "Doin' great!",

// })


// Path for static files
app.use('/', express.static(path.join(__dirname, 'public/')));

app.use('/', require('./routes/index'));
// Endpoints beyond this middleware require authentication and user role verification
app.use(verifyJWT, isUser); 
app.use('/main', require('./routes/main'));
app.use('/charts', require('./routes/charts'));
app.use('/sleep-and-mood', require('./routes/sleepmood'));
app.use('/bloodpressure', require('./routes/bloodpressure'));
app.use('/HRV', require('./routes/hrvpulse'));
app.use('/comments-from-professional', require('./routes/comments'));

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on port: 3000"));
});