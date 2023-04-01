const { changePartial } = require('../lib/helpers.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { getUserID, calculateBMI } = require('../lib/generalHelpers.js');

// Models
const User = require('../models/UserModel');
const SleepReview = require('../models/SleepReview');
const MoodReview = require('../models/MoodReview');
const BloodPressure = require('../models/BloodPressureModel');

// const saltRounds = 10;

// Get data for the application main view.
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

// Save sleep data to MongoDB.
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

        // res.redirect('/main');
        res.status(200).redirect('/main');
        // res.status(200).json({ "Message": "Success"});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    // res.status(200);
};

// Save mood data to MongoDB.
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

        res.status(200).redirect('/main');
        // res.status(200).json({ "Message": "Success"});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }

    // res.status(200);

};

// Save bloodpressure to MongoDB.
const saveBloodpressure = async (req, res) => {
    console.log("BLOOD");
    console.log(req.body);
    console.log("Systolic pressure: ", req.body.systolicPressure);
    try {
        await BloodPressure.create({
            "systolicPressure": req.body.systolicPressure,
            "diastolicPressure": req.body.diastolicPressure,
            "comments": req.body.bloodpressureText,
            "user": getUserID(req)
        });
        
        res.status(200);
        res.redirect('/main');
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
};

const messageToProfessional = (req, res) => {
    console.log(req.body);
    res.redirect('/main');
};

const messageToSupport = (req, res) => {
    console.log(req.body);
    res.redirect('/main');
};

// Change user info.
const changeUserInfo = async (req, res) => {
    const {
        firstName,
        lastName,
        height,
        weight,
        age,
        phonenumber,
        email,
        // password
    } = req.body;

    console.log("POST changeUserInfo");
    // Get current user data.
    const user = await User.findById(getUserID(req));

    // const check = await User.verifyPassword(password, getUserID(req));

    // if (!check) {
    //     res.status(500).json({ 'message': 'wrong password'});
    //     // res.status(500);
    // }
    // const hashedPwd = await bcrypt.hash(password, saltRounds);
    // console.log(req.body);

    // console.log("Current user height: ", user.height);

    try {
        await User.updateOne(
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
                    // "password": hashedPwd != "" ? hashedPwd : user.password
                }
            }
        )
        res.status(200);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    res.redirect('/main');
};

const requestUserData = async (req, res) => {
    // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
    // // console.log(decoded._id);
    // req.body.user = decoded._id;
    const user = await User.findById(getUserID(req));
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

// NOT IN USE: If removed, remove validatePassword from UserModel, also.
const checkPassword = async (req, res) => {
    console.log("checkPassword req.password: ", req.body.password);
    const match = await User.validatePassword(getUserID(req), req.body.password);
    console.log("checkPassword match value: ", match);
    res.status(200).json({ 'match': match });
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
    requestUserData,
    checkPassword
};