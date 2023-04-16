const jwt = require('jsonwebtoken');

const getUserID = (req) => {
    const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded._id);
    req.body.user = decoded._id;
    return req.body.user;
}

const getPatientID = (req) => {
    // const decoded = jwt.verify(req.cookies.cookieToken, process.env.ACCESS_TOKEN_SECRET);
    const decoded = jwt.verify(req.cookies.chartCookie, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decoded._id);
    req.body.patientID = decoded.id;
    return req.body.patientID;
}

const calculateBMI = (height, weight) => {
    if (height === 0 || weight === 0) {
        return "0";
    }

    const heightToMeters = height / 100;
    console.log("heightToMeters: ", heightToMeters);
    let bmi = weight / (heightToMeters * heightToMeters);
    console.log(bmi);
    return bmi.toFixed(2);
}

module.exports = { getUserID, getPatientID, calculateBMI };