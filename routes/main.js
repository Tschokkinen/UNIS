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
    checkPassword
} = require('../controllers/mainController');

router.get('/', main);
router.get('/requestUserData', requestUserData);

router.post('/saveSleep', saveSleep);
router.post('/saveMood', saveMood);
router.post('/saveBloodpressure', saveBloodpressure);

router.post('/sendMessageToProfessional', messageToProfessional);
router.post('/sendMessageToSupport', messageToSupport);
router.post('/changeUserInfo', changeUserInfo);
router.post('/checkPassword', checkPassword);

router.get('/logout', (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/');
})

module.exports = router;