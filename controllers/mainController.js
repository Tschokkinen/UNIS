const { changePartial } = require('../lib/helpers.js');
const SleepReview = require('../models/SleepReview');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const calculateBMI = (height, weight) => {
        let heightToInt = parseInt(height);
        let weightToInt = parseInt(weight);
        if (heightToInt === 0 || weightToInt === 0) {
                return "0";
        }
        let bmi = (heightToInt * heightToInt) / weightToInt;
        console.log(bmi);
        return bmi.toString();
}

const main = async (req, res) => {
        const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded._id);

        req.body.user = decoded._id;
        const user = await User.findById(req.body.user);
        const firstName = user.firstName;
        const lastName = user.lastName;
        const height = user.height ?? "0";
        const weight = user.weight ?? "0";
        const bmi = calculateBMI(height, weight);

        console.log("User: ", user);
        res.render(
                'mainView',
                {
                        layout: 'main-page',
                        firstName,
                        lastName,
                        height,
                        weight,
                        bmi
                }),
                changePartial('sleepMeter', 'sleepMeter'),
                changePartial('editProfile', 'editProfile')
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
};

module.exports = { main, saveSleep };