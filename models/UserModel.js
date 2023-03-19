const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    age: {
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
        type: Number,
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
    refreshToken: String
})

userSchema.statics.signup = async function (email, password, firstName, lastName, phoneNumber) {
    if (!email || !password || !firstName || !lastName || !phoneNumber) {
        // Error here (throw Error)
    }
    if (!validator.isEmail(email)) {
        // Error here
    }
    if (!validator.isStrongPassword(password)) {
        // Error here
    }

    const exists = await this.findOne({ email });

    if (exists) {
        // Error here
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ email, password: hash, firstName, lastName, phoneNumber });

    return user;
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        // Error here
    }

    const user = await this.findOne({email});
    if (!user) {
        // Error here
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        // Error
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);