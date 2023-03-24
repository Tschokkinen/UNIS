const router = require('express').Router();

const {main, saveSleep, saveMood, saveBloodpressure} = require('../controllers/mainController');

router.get('/', main);

router.post('/saveSleep', saveSleep);
router.post('/saveMood', saveMood);
router.post('/saveBloodpressure', saveBloodpressure);

module.exports = router;