const router = require('express').Router();

const { 
    hrvpulseView, 
    getPulseAndHRV
} = require('../controllers/chartsController');

router.get('/', hrvpulseView); // Bloodpressure chart page.
router.get('/data/getPulseAndHRV', getPulseAndHRV);

module.exports = router;