const { changePartial } = require('../lib/helpers.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const signInPage = async (req, res) => {
    res.render(
        'splitView',
        changePartial('leftPartial', 'signInLeft'),
        changePartial('rightPartial', 'signInRight')
    )
};


// Related to UserModel based sign in
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
  }

const signIn = async (req, res) => {
    // Sign in used from UserModel
    console.log("Session: ", req.sesssion); // Why session is undefined???
    // const {email, password} = req.body;

    // try {
    //   const user = await User.login(email, password);
  
    //   // create a token
    //   const token = createToken(user._id);
  
    //   res.status(200).json({email, token});
    // } catch (error) {
    //   res.status(400).json({error: error.message});
    // }

    // Non UserModel related solution
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ 'message': 'Email and password required. ' });

    const findUser = await User.findOne({ email: email }).exec();
    if (!findUser) return res.status(401);

    const match = await bcrypt.compare(password, findUser.password);

    // https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs
    // https://www.geeksforgeeks.org/how-to-implement-jwt-authentication-in-express-js-app/
    if (match) {
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": findUser.email
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1800s'
            });

        const refreshToken = jwt.sign(
            { "email": findUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
        console.log("Result ", result);
        res.status(200).json({ accessToken });
    } else {
        res.sendStatus(401);
    }
}



const registerPage = (req, res) => {
    res.render(
        'splitView',
        changePartial('leftPartial', 'registerLeft'),
        changePartial('rightPartial', 'registerRight')
    )
};

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("Form data: ", req.body);

    if (!email || !password) {
        res.status(400).json({ 'message': 'email and password required ' }); // Render error message here!
        return;
    }

    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409);

    try {
        const hashedPwd = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            "email": email,
            "password": hashedPwd
        });

        console.log(newUser);

        // res.status(201).json({ 'success': `New user ${newUser} create.` });
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }

    res.redirect('/');
}

module.exports = { signInPage, signIn, registerPage, registerUser };