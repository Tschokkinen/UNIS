const router = require('express').Router();

const { getSleepReviews, getSleepData } = require('../controllers/chartsController');

router.get('/', getSleepReviews);

router.get('/data', getSleepData);

module.exports = router;