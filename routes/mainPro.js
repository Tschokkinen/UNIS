const router = require('express').Router();
const { isUser, isProfessional } = require('../middleware/roleAuth');
const { clearChartCookie } = require('../middleware/clearCookies');

const { 
    mainPro,
    getPatients,
    messageToProfessional, 
    messageToSupport
} = require('../controllers/mainController');

router.get('/', isProfessional, clearChartCookie, mainPro);
router.get('/getPatients', isProfessional, getPatients);

router.post('/sendMessageToProfessional', messageToProfessional);
router.post('/sendMessageToSupport', messageToSupport);

router.get('/logout', (req, res) => {
    res.clearCookie('cookieToken');
    res.redirect('/pro');
})

module.exports = router;