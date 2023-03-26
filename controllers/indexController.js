const { changePartial } = require('../lib/helpers.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

// Display sign in page
const signInPage = async (req, res) => {
    res.render(
        'splitView',
        changePartial('leftPartial', 'signInLeft'),
        changePartial('rightPartial', 'signInRight')
    )
};

// Related to UserModel based sign in
// const createToken = (_id) => {
//     return jwt.sign({ _id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' })
// }

// Verify user and sign in if valid
const signIn = async (req, res) => {
    // Sign in used from UserModel

    const { email, password } = req.body;
    console.log(email, password);
    try {
        // UserModel based sign in
        // const user = await User.login(email, password);
        // // create a token
        //   const token = createToken(user._id);

        // if (!email || !password) return res.status(400).json({ 'message': 'Email and password required. ' });
        // Render error page/notification here!

        // const findUser = await User.findOne({ email: email }).exec();
        const user = await User.login(email, password);
        // if (!user) return res.status(401);

        // const match = await bcrypt.compare(password, user.password);


        // Remove if-else when system is working: redundant due to 
        // UserModel data verification!
        if (user) {
            const _id = user._id;
            // console.log("ID: ", _id);
            const accessToken = jwt.sign(
                {
                    // "UserInfo": {
                    //     "email": findUser.email
                    // }
                    _id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '3d'
                }
            );
            res.cookie('cookieToken', accessToken, { httpOnly: true });
            res.status(200).redirect('/main');
        } else {
            res.redirect('/'); // Display error message
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
        // res.status(400).redirect('/');
        // res.status(400);
    }
}

// Display register new user page
const registerPage = (req, res) => {
    res.render(
        'splitView',
        changePartial('leftPartial', 'registerLeft'),
        changePartial('rightPartial', 'registerRight')
    )
};

// Verify registering form data
const registerUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    console.log("Form data: ", req.body);

    if (!email || !password) {
        res.status(400).json({ 'message': 'email and password required ' }); 
        // Render error page here!
        return;
    }

    // Check if email already exists
    const duplicate = await User.findOne({ email: email }).exec(); 
    if (duplicate) return res.sendStatus(409); // Render error page here!

    try {
        const hashedPwd = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            "lastName": lastName,
            "firstName": firstName,
            "height": "",
            "weight": "",
            "age": "",
            "phonenumber": "",
            "email": email,
            "password": hashedPwd
        });

        console.log(newUser);
        // res.status(201).json({ 'success': `New user ${newUser} create.` });
        res.status(201).redirect('/');
    } catch (err) {
        res.status(500).json({ 'message': err.message });
        // Render error page here!
    } 
}

module.exports = { signInPage, signIn, registerPage, registerUser };