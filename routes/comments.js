const router = require('express').Router();

const {
    commentsView 
  }  = require('../controllers/chartsController');

router.get('/', commentsView); // Pro comments table page.

module.exports = router;