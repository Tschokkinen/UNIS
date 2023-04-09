const mongoose = require('mongoose');
const Role = require('../models/RoleModel');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        await getRoles();
    } catch (err) {
        console.log(err);
    }
}

module.exports = connectDB;



// initUserRoles();

const getRoles = async () => {
    let count = await Role.estimatedDocumentCount();
    console.log(count);
    if (count === 0) {
        console.log("Zero roles");
        await Role.create({
            name: "user"
        });
        console.log("Created role");
    }
    console.log("Roles already exist.");
}

