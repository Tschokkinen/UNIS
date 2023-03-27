const router = require('express').Router();

const { 
    getSleepReviews, 
    getSleepData, 
    getMoodData, 
    getBloodpressureData 
} = require('../controllers/chartsController');

router.get('/', getSleepReviews);

router.get('/data/getSleepData', getSleepData);
router.get('/data/getMoodData', getMoodData);
router.get('/data/getBloodpressureData', getBloodpressureData);

module.exports = router;