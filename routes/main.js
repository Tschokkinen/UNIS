const router = require('express').Router();
const { isUser, isProfessional } = require('../middleware/roleAuth');

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

router.get('/', isUser, main);
router.get('/requestUserData', isUser, requestUserData);
router.get('/meterValues', isUser, meterValues);

router.post('/saveSleep', isUser, saveSleep);
router.post('/saveMood', isUser, saveMood);
router.post('/saveBloodpressure', isUser, saveBloodpressure);

router.post('/sendMessageToProfessional', isUser, messageToProfessional);
router.post('/sendMessageToSupport', isUser, messageToSupport);
router.post('/changeUserInfo', isUser, changeUserInfo);
router.post('/validatePassword', isUser, validatePassword);

router.get('/logout', (req, res) => {
    res.clearCookie('cookieToken');
    res.clearCookie('chartCookie');
    res.redirect('/');
})

module.exports = router;