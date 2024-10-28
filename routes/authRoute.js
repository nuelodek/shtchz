const authControllers = require('../controllers/authController');

const router = require('express').Router();

router.post('/getsignup', authControllers.signupController);

module.exports = router;
