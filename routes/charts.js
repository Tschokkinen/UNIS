const router = require('express').Router();

const { 
    chart, 
    getSleepData, 
    getMoodData, 
    getBloodpressureData,
    getPulseAndHRV
} = require('../controllers/chartsController');

router.get('/', chart); // Chart page.

router.get('/data/getSleepData', getSleepData);
router.get('/data/getMoodData', getMoodData);
router.get('/data/getBloodpressureData', getBloodpressureData);
router.get('/data/getPulseAndHRV', getPulseAndHRV);

module.exports = router;