const { changePartial } = require('../lib/helpers.js');

const SleepReview = require('../models/SleepReview');
const MoodReview = require('../models/MoodReview');
const Bloodpressure = require('../models/BloodPressureModel');
const Comment = require('../models/CommentModel');
const User = require('../models/UserModel');

const { getUserID, getPatientID } = require('../lib/generalHelpers.js');

const jwt = require('jsonwebtoken');
const path = require('path');
const { v4: uuid4 } = require('uuid');
const { spawn } = require('child_process');
const bcrypt = require('bcrypt');

const chart = async (req, res) => {
    let backAddress;
    let comments;
    let decoded;

    // Required at the moment because "professional" requires chartCookie
    // in order to access patient chart data.
    try {
        decoded = jwt.verify(req.cookies.chartCookie, process.env.ACCESS_TOKEN_SECRET);
    } catch {
        decoded = null;
    }

    // If chartCookie doesn't exist, user is "user"
    if (!decoded) {
        const id = getUserID(req);
        const chartToken = jwt.sign(
            {
                id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '1h'
            }
        );

        res.cookie('chartCookie', chartToken, { httpOnly: true });

        backAddress = '/main';
        comments = 'chartComments'
    } else { // If chartCookie exists user if "professional"
        backAddress = '/mainPro';
        comments = 'chartCommentsPro'
    }

    // res.status(200).json({ 'message': 'success '});

    res.render(
        'charView',
        {
            layout: 'chart',
            backAddress
        }),
        changePartial('comments', comments);
}

// FEATURE FOR PROFESSIONAL
const patientIDCookie = async (req, res) => {
    const { id } = req.params;
    // res.status(200).json({ 'message': 'success '});
    console.log("param id: ", id);
    //Save id of selected patient to chartCookie
    // const patientID = id;
    const chartToken = jwt.sign(
        {
            id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        }
    );

    res.cookie('chartCookie', chartToken, { httpOnly: true });
    // res.json({ message: 'success'});
    res.redirect('/charts');
}

const bloodpressureView = async (req, res) => {
    // res.status(200).json({ 'message': 'success '});
    res.render('bloodpressureView', { layout: 'magnified-chart' });
}

const sleepmoodView = async (req, res) => {
    // res.status(200).json({ 'message': 'success '});
    res.render('sleepmoodView', { layout: 'magnified-chart' });
}

const hrvpulseView = async (req, res) => {
    // res.status(200).json({ 'message': 'success '});
    res.render('hrvpulseView', { layout: 'magnified-chart' });
}

const commentsView = async (req, res) => {
    // res.status(200).json({ 'message': 'success '});
    res.render('commentsView', { layout: 'magnified-chart' });
}

const getSleepData = async (req, res) => {
    // const sleepReviews = await SleepReview.find({ 'user': getUserID(req) });
    const sleepReviews = await SleepReview.find({ 'user': getPatientID(req) });
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
    // const moodReviews = await MoodReview.find({ 'user': getUserID(req) });
    const moodReviews = await MoodReview.find({ 'user': getPatientID(req) });
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
    // const bloodpressure = await Bloodpressure.find({ 'user': getUserID(req) });
    const bloodpressure = await Bloodpressure.find({ 'user': getPatientID(req) });
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
        // console.log(typeof(jsonDataFromPython));
        // console.log("jsonDataFromPython: ", jsonDataFromPython);
        for (var i = 0; i < jsonDataFromPython.length; i++) {
            var current = jsonDataFromPython[i];
            const newPulseAndHRV = {
                'pulse': current.mean_hr_bpm,
                'hrv': current.rmssd_ms,
                'date': current.create_timestamp
            }
            // console.log(current.create_timestamp);
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

const getCommentsData = async (req, res) => {
    // const comment = await Comment.find({ 'user': getUserID(req) });
    const comment = await Comment.find({ 'user': getPatientID(req) });
    // console.log(moodReviews);
    const comments = [];
    for (var i = 0; i < comment.length; i++) {
        // sleeps.push(sleepReviews[i].sleepQuality);
        let date = comment[i].createdAt;
        let formattedDate = date.getDate() + "." + date.getMonth() + "." + date.getFullYear() + " - " + date.getHours() + ":" + date.getMinutes();
        const newComment = {
            'comment': comment[i].comment,
            'date': formattedDate

        }
        comments.push(newComment);
    }
    // console.log(moods);
    // res.status(200).json({ 'message': 'success '});
    res.status(200).json(comments);
}

// FEATURE FOR PROFESSIONAL
const addComment = async (req, res) => {
    const patientID = getPatientID(req);

    if (!patientID) {
        res.status(400).json({ 'message': 'user ID not found' });
    }

    console.log("patientID: ", patientID);

    try {
        // console.log(req.body);
        await Comment.create({
            "comment": req.body.comment,
            "user": patientID
        });

        res.status(200).redirect('/charts');
        // res.status(200).json({ "Message": "Success"});
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}

module.exports =
{
    chart,
    patientIDCookie,
    bloodpressureView,
    sleepmoodView,
    hrvpulseView,
    commentsView,
    getSleepData,
    getMoodData,
    getBloodpressureData,
    getPulseAndHRV,
    getCommentsData,
    addComment
};