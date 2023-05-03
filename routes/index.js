const router = require('express').Router();
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });
const { clearChartCookie } = require('../middleware/clearCookies');

const { signInPage, signInPagePro, signIn, registerPage, registerUser } = require('../controllers/indexController');

router.route('/')
    .get(csrfProtection, signInPage)
    .post(csrfProtection, clearChartCookie, signIn);

router.route('/pro')
    .get(csrfProtection, signInPagePro)
    .post(csrfProtection, clearChartCookie, signIn);

router.route('/register')
    .get(registerPage)
    .post(registerUser);

module.exports = router;