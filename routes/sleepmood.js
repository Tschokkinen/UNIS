const router = require('express').Router();

const {
    sleepmoodView,
    getSleepData,
    getMoodData
} = require('../controllers/chartsController');

router.get('/', sleepmoodView); // Sleep and mood chart page.
router.get('/data/getSleepData', getSleepData);
router.get('/data/getMoodData', getMoodData);

module.exports = router;