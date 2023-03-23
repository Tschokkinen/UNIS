const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sleepReviewSchema = new Schema({
    sleepQuality: {
        type: Number,
        required: false
    },
    comments: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel"
    }
})

module.exports = mongoose.model('SleepReview', sleepReviewSchema);