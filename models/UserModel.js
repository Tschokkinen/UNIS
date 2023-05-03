const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        // type: Number, // Convert to Date and new Date() for automatic age calculation!
        type: Date,
        required: false
    },
    weight: {
        type: Number,
        required: false
    },
    height: {
        type: Number,
        required: false
    },
    phonenumber: {
        type: String, // Using Number leads to having first zero dropped form the number!
        required: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    illnesses: {
        type: String,
        required: false
    },
    medications: {
        type: String,
        required: false
    },
    sleepApnea: {
        type: String,
        required: false
    },
    refreshToken: String,
    roles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    ]
})


// Verify if entered password equals current password.
userSchema.statics.validatePassword = async function (userID, password) {
    const user = await this.findById(userID);

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return false;
    }

    return true;
}


module.exports = mongoose.model('User', userSchema);