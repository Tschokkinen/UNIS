const { getUserID } = require('../lib/generalHelpers.js');
const User = require('../models/UserModel');
const Role = require('../models/RoleModel');

const isUser = async (req, res, next) => {
    const user = await User.findById(getUserID(req)).exec();
    if (!user) {
        res.status(500).send({ message: "No user found" });
        return;
    }

    const roles = await Role.find(
        {
            _id: { $in: user.roles }
        });

    // console.log(roles);

    if (!roles) {
        res.status(500).send({ message: "No roles" });
        return;
    }

    for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "user") {
            next();
            return;
        }
    }

    res.status(403).send({ message: "Require User Role!" });
    return;
}

module.exports = isUser;