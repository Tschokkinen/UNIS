const router = require('express').Router();

const { 
    main, 
    saveSleep, 
    saveMood, 
    saveBloodpressure, 
    messageToProfessional, 
    messageToSupport, 
    changeUserInfo,
    requestUserData,
    validatePassword,
    meterValues
} = require('../controllers/mainController');

router.get('/', main);
router.get('/requestUserData', requestUserData);
router.get('/meterValues', meterValues);

router.post('/saveSleep', saveSleep);
router.post('/saveMood', saveMood);
router.post('/saveBloodpressure', saveBloodpressure);

router.post('/sendMessageToProfessional', messageToProfessional);
router.post('/sendMessageToSupport', messageToSupport);
router.post('/changeUserInfo', changeUserInfo);
router.post('/validatePassword', validatePassword);

router.get('/logout', (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/');
})

module.exports = router;