const router = require('express').Router();

const { 
    chart, 
    getSleepData, 
    getMoodData, 
    getBloodpressureData,
    getPulseAndHRV,
    getCommentsData
} = require('../controllers/chartsController');

router.get('/', chart); // Chart page.

router.get('/data/getSleepData', getSleepData);
router.get('/data/getMoodData', getMoodData);
router.get('/data/getBloodpressureData', getBloodpressureData);
router.get('/data/getPulseAndHRV', getPulseAndHRV);
router.get('/data/getCommentsData', getCommentsData);

module.exports = router;