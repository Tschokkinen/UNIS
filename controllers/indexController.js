const { changePartial } = require('../lib/helpers.js');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');
const User = require('../models/UserModel');

const signIn = async (req, res) => {
    res.render(
        'splitView',
        changePartial('leftPartial', 'signInLeft'),
        changePartial('rightPartial', 'signInRight')
    )
};

const register = (req, res) => {
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
        res.status(400).json({ 'message': 'email and password required '}); // Render error message here!
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
    
    res.render(
        'splitView',
        changePartial('leftPartial', 'signInLeft'),
        changePartial('rightPartial', 'signInRight')
    )
}

const main = (req, res) => {
        res.render('mainView', { layout: 'main-page' });
};

module.exports = { signIn, register, registerUser, main };