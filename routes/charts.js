const router = require('express').Router();

const { 
    chart, 
    patientIDCookie,
    getSleepData, 
    getMoodData, 
    getBloodpressureData,
    getPulseAndHRV,
    getCommentsData,
    addComment
} = require('../controllers/chartsController');

router.get('/', chart); // Chart page.
router.get('/:id', patientIDCookie) // Pro chart.

router.get('/data/getSleepData', getSleepData);
router.get('/data/getMoodData', getMoodData);
router.get('/data/getBloodpressureData', getBloodpressureData);
router.get('/data/getPulseAndHRV', getPulseAndHRV);
router.get('/data/getCommentsData', getCommentsData);

router.post('/addComment', addComment);

module.exports = router;