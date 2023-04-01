const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hrvSchema = new Schema ({
    hrv: {
        type: Number,
        required: true
    },
    measuredAt: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('HRVModel', hrvSchema);