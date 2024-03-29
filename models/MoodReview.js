const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const moodReviewSchema = new Schema({
    moodQuality: {
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
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('MoodReview', moodReviewSchema);