const authControllers = require('../controllers/authController');

const router = require('express').Router();

router.post('/getsignup', authControllers.signupController);
router.post('/sendotp', authControllers.sendOtpController);
router.get('/getsignin', authControllers.SigninController);
router.put('/forgetpassword', authControllers.forgetPasswordController);
router.post('/pickusername', authControllers.pickUsernameController);
router.get('/fetchPeopletoFollow', authControllers.fetchPeopletoFollowController);
router.post('/composeprediction', authControllers.composePredictionController);
module.exports = router;

