const router = require('express').Router();

const main = require('../controllers/mainController');

router.get('/', main);

module.exports = router;