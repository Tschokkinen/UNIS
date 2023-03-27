const { changePartial } = require('../lib/helpers.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserModel = require('../models/UserModel');
const User = require('../models/UserModel');
const SleepReview = require('../models/SleepReview');
const MoodReview = require('../models/MoodReview');

const saltRounds = 10;

const calculateBMI = (height, weight) => {
        if (height === 0 || weight === 0) {
                return "0";
        }

        const heightToMeters = height/100;
        console.log("heightToMeters: ", heightToMeters);
        let bmi = weight / (heightToMeters * heightToMeters);
        console.log(bmi);
        return bmi.toFixed(2);

        // let bmi = (heightToInt * heightToInt) / weightToInt;
        // console.log(bmi);
        // return bmi.toString();
}

const getUserID = (req) => {
        const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded._id);
        req.body.user = decoded._id;
        return req.body.user;
}

const main = async (req, res) => {
        // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded._id);

        // req.body.user = decoded._id;
        // const userID = decode(req);
        const user = await User.findById(getUserID(req));
        const firstName = user.firstName;
        const lastName = user.lastName;
        const height = user.height ?? 0;
        const weight = user.weight ?? 0;
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
                changePartial('moodMeter', 'moodMeter'),
                changePartial('bloodpressureMeter', 'bloodpressureMeter'),
                changePartial('messageToProfessional', 'messageToProfessional'),
                changePartial('messageToSupport', 'messageToSupport'),
                changePartial('changeUserInfo', 'changeUserInfo')
};

const saveSleep = async (req, res) => {
        try {
                // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
                // console.log(decoded._id);
                // req.body.user = decoded._id;
                // console.log(req.body);
                await SleepReview.create({
                        "comments": req.body.sleepmetertext,
                        "user": getUserID(req)
                        // "user": req.body.user
                });

                res.redirect('/main');
                // res.status(200).json({ "Message": "Success"});
        } catch (err) {
                console.error(err);
                res.sendStatus(500);
        }

        // res.status(200);
};

const saveMood = async (req, res) => {
        try {
                // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
                // console.log(decoded._id);
                // req.body.user = decoded._id;
                // console.log(req.body);
                await MoodReview.create({
                        "comments": req.body.moodmetertext,
                        "user": getUserID(req)
                        // "user": req.body.user
                });

                res.redirect('/main');
                // res.status(200).json({ "Message": "Success"});
        } catch (err) {
                console.error(err);
                res.sendStatus(500);
        }

        // res.status(200);
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

const changeUserInfo = async (req, res) => {
        const { 
                firstName, 
                lastName, 
                height, 
                weight, 
                age, 
                phonenumber, 
                email, 
                password 
        } = req.body;

        const hashedPwd = await bcrypt.hash(password, saltRounds);
        // console.log(req.body);

        // Get current user data.
        const user = await User.findById(getUserID(req));

        // console.log("Current user height: ", user.height);

        await UserModel.updateOne(
                {
                        _id: getUserID(req)
                },
                {
                        $set:
                        {
                                "firstName": firstName != "" ? firstName : user.firstName,
                                "lastName": lastName != "" ? lastName : user.lastName,
                                "height": height != "" ? height : user.height,
                                "weight": weight != "" ? weight : user.weight,
                                "age": age != "" ? age : user.age,
                                "phonenumber": phonenumber != "" ? phonenumber : user.phonenumber,
                                "email": email != "" ? email : user.email,
                                "password": hashedPwd != "" ? hashedPwd : user.password
                        }
                }
        )

        res.redirect('/main');
};

const requestUserData = async (req, res) => {
        const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded._id);
        req.body.user = decoded._id;
        const user = await User.findById(req.body.user);
        const userData = {
                "firstName": user.firstName,
                "lastName": user.lastName,
                "weight": user.weight,
                "height": user.height,
                "age": user.age,
                "phonenumber": user.phonenumber,
                "email": user.email
        };
        res.status(200).json(userData);
}

module.exports = {
        main,
        saveSleep,
        saveSleep,
        saveMood,
        saveBloodpressure,
        messageToProfessional,
        messageToSupport,
        changeUserInfo,
        requestUserData
};