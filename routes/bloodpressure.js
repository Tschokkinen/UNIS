const router = require('express').Router();

const { 
    bloodpressureView, 
    getBloodpressureData
} = require('../controllers/chartsController');

router.get('/', bloodpressureView); // Bloodpressure chart page.
router.get('/data/getBloodpressureData', getBloodpressureData);

module.exports = router;