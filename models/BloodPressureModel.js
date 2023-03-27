const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bloodPressureSchema = new Schema ({
    systolicPressure: {
        type: Number,
        required: true
    },
    diastolicPressure: {
        type: Number,
        required: true
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

module.exports = mongoose.model('BloodPressure', bloodPressureSchema);