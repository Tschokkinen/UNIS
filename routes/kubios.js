const router = require('express').Router();

const kubios = require('../controllers/kubiosController');

router.get('/', kubios);

module.exports = router;