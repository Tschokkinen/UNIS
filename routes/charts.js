const router = require('express').Router();

const { getSleepReviews, getSleepData, getMoodData } = require('../controllers/chartsController');

router.get('/', getSleepReviews);

router.get('/data/getSleepData', getSleepData);
router.get('/data/getMoodData', getMoodData);

module.exports = router;