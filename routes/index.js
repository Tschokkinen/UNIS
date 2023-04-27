const router = require('express').Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const { signInPage, signInPagePro, signIn, registerPage, registerUser } = require('../controllers/indexController');

router.route('/')
    .get(csrfProtection, signInPage)
    .post(csrfProtection, signIn);

router.route('/pro')
    .get(csrfProtection, signInPagePro)
    .post(csrfProtection, signIn);

router.route('/register')
    .get(registerPage)
    .post(registerUser);

module.exports = router;