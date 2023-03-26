const router = require('express').Router();

const { main, saveSleep, saveMood, saveBloodpressure, messageToProfessional, messageToSupport, changeUserInfo } = require('../controllers/mainController');

router.get('/', main);

router.post('/saveSleep', saveSleep);
router.post('/saveMood', saveMood);
router.post('/saveBloodpressure', saveBloodpressure);

router.post('/sendMessageToProfessional', messageToProfessional);
router.post('/sendMessageToSupport', messageToSupport);
router.post('/changeUserInfo', changeUserInfo);

router.get('/logout', (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/');
})

module.exports = router;