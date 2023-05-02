require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path')
const { engine } = require('express-handlebars');
const { default: mongoose } = require('mongoose');
const connectDB = require('./config/dbConnection');

// const session = require('express-session');
// const MongoStore = require('connect-mongo');

// Middleware
const verifyJWT = require('./middleware/verifyJWT');
const { isUser, isProfessional } = require('./middleware/roleAuth');
const { logger } = require('./middleware/logger');

// Cors
// const cors = require('cors');
// const corsOptions = require('./config/corsOptions');

// Connect to database
connectDB();

const app = express();

// app.use(
//     session({
//       secret: process.env.SECRET,
//       cookie: {},
//       resave: false,
//       saveUninitialized: false,
//       store: new MongoStore({ 
//         mongoUrl: process.env.MONGO_URI
//        })
//     })
//   )

// Logger to get console logs for GET, POST etc.
app.use(logger);

app.use(express.json());
app.use(cookieParser());
// const csrfProtection = csrf({ cookie: true })

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
app.use('/pro', require('./routes/index'));
// Endpoints beyond this middleware require authentication
app.use(verifyJWT);
// Endpoint beyond this point require "user" user role
app.use('/main', require('./routes/main'));
app.use('/charts', require('./routes/charts'));
app.use('/sleep-and-mood', require('./routes/sleepmood'));
app.use('/bloodpressure', require('./routes/bloodpressure'));
app.use('/HRV', require('./routes/hrvpulse'));
app.use('/comments-from-professional', require('./routes/comments'));
// Endpoint beyond this point require "professional" user role
app.use('/mainPro', require('./routes/mainPro'));


mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server running on port: 3000"));
});