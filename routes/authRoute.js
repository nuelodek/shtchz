const authControllers = require('../controllers/authController');

const router = require('express').Router();

router.post('/getsignup', authControllers.signupController);
router.get('/getuser', authControllers.getUserController);
module.exports = router;
