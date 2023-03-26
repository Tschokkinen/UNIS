const { changePartial } = require('../lib/helpers.js');
const SleepReview = require('../models/SleepReview');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const main = async (req, res) => {
        const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded._id);

        req.body.user = decoded._id;
        const user = await User.findById(req.body.user);
        const firstName = user.firstName;
        const lastName = user.lastName;

        console.log("User: ", user);
        res.render(
                'mainView',
                {
                        layout: 'main-page',
                        firstName,
                        lastName
                }),
                changePartial('sleepMeter', 'sleepMeter'),
                changePartial('moodMeter', 'moodMeter'),
                changePartial('bloodpressureMeter', 'bloodpressureMeter');
                changePartial('messageToProfessional', 'messageToProfessional');
                changePartial('messageToSupport', 'messageToSupport');
                changePartial('changeUserInfo', 'changeUserInfo');
};

const saveSleep = async (req, res) => {
        try {
                const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
                console.log(decoded._id);
                req.body.user = decoded._id;
                console.log(req.body);
                const sleeReview = await SleepReview.create({
                        "comments": req.body.comments,
                        "user": req.body.user
                });

                console.log(SleepReview);
                res.redirect('/main');
                // res.status(200).json({ "Message": "Success"});
        } catch (err) {
                console.error(err);
                res.sendStatus(500);
        }


        // res.status(200);
}; const saveMood = (req, res) => {
        console.log(req.body);
        res.redirect('/main');
};

const saveBloodpressure = (req, res) => {
        console.log(req.body);
        res.redirect('/main');
};

const messageToProfessional = (req, res) => {
        console.log(req.body);
        res.redirect('/main');
};

const messageToSupport = (req, res) => {
        console.log(req.body);
        res.redirect('/main');
};

const changeUserInfo = (req, res) => {
        console.log(req.body);
        res.redirect('/main');
};

module.exports = { main, saveSleep, saveSleep, saveMood, saveBloodpressure, messageToProfessional, messageToSupport, changeUserInfo };