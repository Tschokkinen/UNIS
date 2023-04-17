const { changePartial } = require('../lib/helpers.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/UserModel');
const Role = require('../models/RoleModel');
const jwt = require('jsonwebtoken');

// Display sign in page
const signInPage = async (req, res) => {
    res.render(
        'splitView',
        changePartial('leftPartial', 'signInLeft'),
        changePartial('rightPartial', 'signInRight')
    )
};

// Display sign in page
const signInPagePro = async (req, res) => {
    res.render(
        'splitView',
        changePartial('leftPartial', 'signInLeftPro'),
        changePartial('rightPartial', 'signInRight')
    )
};

// Verify user and sign in if valid
const signIn = async (req, res) => {
    // Sign in used from UserModel

    const { email, password } = req.body;
    console.log(email, password);
    try {
        if (!email || !password) return res.status(400).json({ 'message': 'Email and password required. ' });

        const user = await User.findOne({ email: email }).exec();
        if (!user) return res.status(401);

        // Get users role
        const roles = await Role.find(
            {
                _id: { $in: user.roles }
            });

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            const _id = user._id;
            // console.log("ID: ", _id);
            const accessToken = jwt.sign(
                {
                    _id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: '3d'
                }
            );
            res.cookie('cookieToken', accessToken, { httpOnly: true });

            if (roles[0].name === "user") {
                res.status(200).redirect('/main');
            }

            if (roles[0].name === "professional") {
                res.status(200).redirect('/mainPro');
            }
            
        } else {
            res.redirect('/'); // Display error message
        }

    } catch (error) {
        res.status(400).json({ error: error.message });
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
    // console.log("Form data: ", req.body);

    if (!email || !password) {
        res.status(400).json({ 'message': 'email and password required ' });
        // Render error page here!
        return;
    }

    // Check if email already exists
    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409); // Render error page here!

    const role = await Role.findOne({ name: "user" }).exec(); // Assign user role.

    console.log(role);

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
            "password": hashedPwd,
            "roles": [role._id]
        });


        console.log(newUser);
        // res.status(201).json({ 'success': `New user ${newUser} create.` });
        res.status(201).redirect('/');
    } catch (err) {
        res.status(500).json({ 'message': err.message });
        // Render error page here!
    }
}

module.exports = { signInPage, signInPagePro, signIn, registerPage, registerUser };