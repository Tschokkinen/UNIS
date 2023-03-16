const router = require('express').Router();

const { signIn, register, registerUser, main } = require('../controllers/indexController');
const { authorize } = require('../controllers/authorizationController');

router.route('/')
    .get(signIn)
    .post(authorize);

router.route('/register')
    .get(register)
    .post(registerUser);

router.get('/main', main);

module.exports = router;