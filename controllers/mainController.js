const { changePartial } = require('../lib/helpers.js');
const { getUserID, calculateBMI } = require('../lib/generalHelpers.js');

// Models
const User = require('../models/UserModel');
const Role = require('../models/RoleModel');
const SleepReview = require('../models/SleepReview');
const MoodReview = require('../models/MoodReview');
const BloodPressure = require('../models/BloodPressureModel');

// Get data for the application main view.
const main = async (req, res) => {
    const user = await User.findById(getUserID(req));
    const firstName = user.firstName;
    const lastName = user.lastName;
    const height = user.height ?? 0;
    const weight = user.weight ?? 0;
    const age = user.age ?? 0;
    const bmi = calculateBMI(height, weight);

    const logout = "/main/logout";

    console.log("User: ", user);
    res.render(
        'mainView',
        {
            layout: 'main-page',
            age,
            firstName,
            lastName,
            height,
            weight,
            bmi,
            logout
        }),
        changePartial('sleepMeter', 'sleepMeter'),
        changePartial('moodMeter', 'moodMeter'),
        changePartial('bloodpressureMeter', 'bloodpressureMeter'),
        changePartial('messageToProfessional', 'messageToProfessional'),
        changePartial('messageToSupport', 'messageToSupport'),
        changePartial('changeUserInfo', 'changeUserInfo'),
        changePartial('infoBank', 'infoBank'),
        changePartial('scripts', 'mainScripts')
};

// FEATURE FOR PROFESSIONAL
// Get data for the application main view.
const mainPro = async (req, res) => {
    const user = await User.findById(getUserID(req));
    const firstName = user.firstName;
    const lastName = user.lastName;
    
    const logout = "/mainPro/logout";

    console.log("User: ", user);
    res.render(
        'mainViewPro',
        {
            layout: 'main-page',
            firstName,
            lastName,
            logout
        }),
        changePartial('messageToProfessional', 'messageToProfessional'),
        changePartial('messageToSupport', 'messageToSupport'),
        changePartial('scripts', 'mainScriptsPro')
};

// FEATURE FOR PROFESSIONAL
const getPatients = async (req, res) => {
    const userRole = await Role.findOne(
        {
            name: 'user'
        });

    // console.log("userRole: ", userRole);

    const usersOnly = await User.find(

        { 'roles': userRole._id }
    );

    const patientNames = [];
    for (let i = 0; i < usersOnly.length; i++) {
        let newPatient = {
            firstName: usersOnly[i].firstName,
            lastName: usersOnly[i].lastName,
            id: usersOnly[i]._id
        }
        patientNames.push(newPatient);
    }
    console.log("Patients: ", patientNames);
    res.status(200).json(patientNames);
    
}

// Save sleep data to MongoDB.
const saveSleep = async (req, res) => {
    // console.log("saveSleep req.body: ", req.body);
    try {
        await SleepReview.create({
            "sleepQuality": req.body.sleepvalue,
            "comments": req.body.sleepmetertext,
            "user": getUserID(req)
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
    // console.log("saveMood req.body: ", req.body);
    try {
        // console.log(req.body);
        await MoodReview.create({
            "moodQuality": req.body.moodvalue,
            "comments": req.body.moodmetertext,
            "user": getUserID(req)
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
            "comments": req.body.bloodpressuretext,
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

    // console.log("POST changeUserInfo");
    // Get current user data.
    const user = await User.findById(getUserID(req));
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

const validatePassword = async (req, res) => {
    console.log("checkPassword req.password: ", req.body.password);
    const match = await User.validatePassword(getUserID(req), req.body.password);
    console.log("checkPassword match value: ", match);
    const obj = {
        "match": match
    }
    res.status(200).json(obj);
}

const meterValues = async (req, res) => {

    let start = new Date();
    start.setHours(0, 0, 0, 0);

    let end = new Date();
    end.setHours(23, 59, 59, 999);

    const sleepReviewedToday = await SleepReview.findOne(
        {
            'user': getUserID(req),
            'createdAt':
            {
                $gte: start,
                $lt: end
            }

        });

    // console.log("sleepReviewedToday: ", sleepReviewedToday);

    const moodReviewedToday = await MoodReview.findOne(
        {
            'user': getUserID(req),
            'createdAt':
            {
                $gte: start,
                $lt: end
            }

        });

    const bloodpressureReviewedToday = await BloodPressure.findOne(
        {
            'user': getUserID(req),
            'createdAt':
            {
                $gte: start,
                $lt: end
            }

        });

    const meterValues = {
        sleep: sleepReviewedToday != null ? true : false,
        mood: moodReviewedToday != null ? true : false,
        bloodpressure: bloodpressureReviewedToday != null ? true : false
    }

    res.status(200).json(meterValues);
}

module.exports = {
    main,
    mainPro,
    getPatients,
    saveSleep,
    saveSleep,
    saveMood,
    saveBloodpressure,
    messageToProfessional,
    messageToSupport,
    changeUserInfo,
    requestUserData,
    validatePassword,
    meterValues
};