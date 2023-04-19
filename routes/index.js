const router = require('express').Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const { signInPage, signInPagePro, signIn, registerPage, registerUser } = require('../controllers/indexController');

router.route('/')
    .get(csrfProtection, signInPage)
    .post(signIn);

router.route('/pro')
    .get(csrfProtection, signInPagePro)
    .post(signIn);

router.route('/register')
    .get(registerPage)
    .post(registerUser);

module.exports = router;