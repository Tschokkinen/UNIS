const router = require('express').Router();

const { signInPage, signIn, registerPage, registerUser } = require('../controllers/indexController');

router.route('/')
    .get(signInPage)
    .post(signIn);

router.route('/register')
    .get(registerPage)
    .post(registerUser);

module.exports = router;