const SleepReview = require('../models/SleepReview');
const MoodReview = require('../models/MoodReview');
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const path = require('path');

// NOT IN USE
const getSleepReviews = async (req, res) => {

    // res.status(200).json({ 'message': 'success '});
    res.render('test-chart', {layout: 'chart'});
}

const getSleepData = async (req, res) => {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded._id);
    req.body.user = decoded._id;
    const user = await User.findById(req.body.user);

    const sleepReviews = await SleepReview.find({ 'user': req.body.user });
    console.log(sleepReviews);
    const sleeps = [];
    for (var i = 0; i < sleepReviews.length; i++) {
        // sleeps.push(sleepReviews[i].sleepQuality);
        const newSleep = {
            'sleepQuality': sleepReviews[i].sleepQuality,
            'date': sleepReviews[i].createdAt
        }
        sleeps.push(newSleep);
    }
    console.log(sleeps);
    // res.status(200).json({ 'message': 'success '});
    res.json(sleeps);
}

const getMoodData = async (req, res) => {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
        // console.log(decoded._id);
    req.body.user = decoded._id;
    const user = await User.findById(req.body.user);

    const moodReviews = await MoodReview.find({ 'user': req.body.user });
    console.log(moodReviews);
    const moods = [];
    for (var i = 0; i < moodReviews.length; i++) {
        // sleeps.push(sleepReviews[i].sleepQuality);
        const newMood = {
            'moodQuality': moodReviews[i].moodQuality,
            'date': moodReviews[i].createdAt
        }
        moods.push(newMood);
    }
    console.log(moods);
    // res.status(200).json({ 'message': 'success '});
    res.json(moods);
}

module.exports = { getSleepReviews, getSleepData, getMoodData };