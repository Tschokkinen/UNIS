const router = require('express').Router();

const { signInPage, signInPagePro, signIn, registerPage, registerUser } = require('../controllers/indexController');

router.route('/')
    .get(signInPage)
    .post(signIn);

router.route('/pro')
    .get(signInPagePro)
    .post(signIn);

router.route('/register')
    .get(registerPage)
    .post(registerUser);

module.exports = router;