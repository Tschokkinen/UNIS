const SleepReview = require('../models/SleepReview');
const MoodReview = require('../models/MoodReview');
const Bloodpressure = require('../models/BloodPressureModel');

const { getUserID } = require('../lib/generalHelpers.js');

const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const path = require('path');
const { v4: uuid4 } = require('uuid');
const { spawn } = require('child_process');
const bcrypt = require('bcrypt');

const chart = async (req, res) => {

    // res.status(200).json({ 'message': 'success '});
    res.render('test-chart', { layout: 'chart' });
}

const getSleepData = async (req, res) => {
    // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
    // // console.log(decoded._id);
    // req.body.user = decoded._id;
    // const user = await User.findById(req.body.user);

    const sleepReviews = await SleepReview.find({ 'user': getUserID(req) });
    // console.log(sleepReviews);
    const sleeps = [];
    for (var i = 0; i < sleepReviews.length; i++) {
        // sleeps.push(sleepReviews[i].sleepQuality);
        const newSleep = {
            'sleepQuality': sleepReviews[i].sleepQuality,
            'date': sleepReviews[i].createdAt,
            'comments': sleepReviews[i].comments
        }
        sleeps.push(newSleep);
    }
    // console.log(sleeps);
    // res.status(200).json({ 'message': 'success '});
    res.json(sleeps);
}

const getMoodData = async (req, res) => {
    // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
    // // console.log(decoded._id);
    // req.body.user = decoded._id;
    // const user = await User.findById(req.body.user);

    const moodReviews = await MoodReview.find({ 'user': getUserID(req) });
    // console.log(moodReviews);
    const moods = [];
    for (var i = 0; i < moodReviews.length; i++) {
        // sleeps.push(sleepReviews[i].sleepQuality);
        const newMood = {
            'moodQuality': moodReviews[i].moodQuality,
            'comments': moodReviews[i].comments,
            'date': moodReviews[i].createdAt
        }
        moods.push(newMood);
    }
    // console.log(moods);
    // res.status(200).json({ 'message': 'success '});
    res.json(moods);
}

const getBloodpressureData = async (req, res) => {
    // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
    // req.body.user = decoded._id;
    // const user = await User.findById(req.body.user);

    const bloodpressure = await Bloodpressure.find({ 'user': getUserID(req) });
    const bloodpressures = [];
    for (var i = 0; i < bloodpressure.length; i++) {
        const newBloodpressure = {
            'systolicPressure': bloodpressure[i].systolicPressure,
            'diastolicPressure': bloodpressure[i].diastolicPressure,
            'comments': bloodpressure[i].comments,
            'date': bloodpressure[i].createdAt
        }
        console.log(bloodpressure[i].createdAt);
        bloodpressures.push(newBloodpressure);
    }
    // console.log("chartsController (bloodpressures): ", bloodpressures);
    res.json(bloodpressures);
}

const getPulseAndHRV = async (req, res) => {
    // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
    // req.body.user = decoded._id;

     // Use your Kubios HRV App username and password and own client_id
    const USERNAME = process.env.KUBIOS_USERNAME;
    const PASSWORD = process.env.KUBIOS_PASSWORD;
    const CLIENT_ID = process.env.KUBIOS_CLIENT_ID;
    const LOGIN_URL = "https://kubioscloud.auth.eu-west-1.amazoncognito.com/login";
    const TOKEN_URL = "https://kubioscloud.auth.eu-west-1.amazoncognito.com/oauth2/token";
    const REDIRECT_URI = "https://analysis.kubioscloud.com/v1/portal/login";
    const USER_AGENT = "UNIS HRV";
    const csrf = uuid4(); // Generate unique random ID

    // spawn new child process to call the python script
    const python = spawn('python3',
        [
            './python/kubios_connection.py', // Relative path from project root folder
            USERNAME,
            PASSWORD,
            CLIENT_ID,
            LOGIN_URL,
            TOKEN_URL,
            REDIRECT_URI,
            USER_AGENT,
            csrf
        ]);

    python.stderr.pipe(process.stdout) // Receive python error stream.

    let rawDataFromPython; // Raw data received from python
    let jsonDataFromPython;
    const pulsesAndHRVs = [];

    // Call python script
    python.stdout.on('data', function (data) {
        rawDataFromPython = data.toString(); // Data returned from python.

        jsonDataFromPython = JSON.parse(rawDataFromPython); // Convert data to JSON format.
        
        for (var i = 0; i < jsonDataFromPython.results.length; i++) {
            var current = jsonDataFromPython.results[i];
            const newPulseAndHRV = {
                'pulse': current.result.mean_hr_bpm,
                'hrv': current.result.rmssd_ms,
                'date': current.create_timestamp
            }
            console.log(current.create_timestamp);
            pulsesAndHRVs.push(newPulseAndHRV);
        }

        // console.log("chartsController (pulsesAndHRVs): ", pulsesAndHRVs);
        res.json(pulsesAndHRVs); // NOTE: Res must be inside python.stdout.on!
    });

    // Close stream from python script. Code 0 success, 1 error.
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
    });
}

module.exports =
{
    chart,
    getSleepData,
    getMoodData,
    getBloodpressureData,
    getPulseAndHRV
};