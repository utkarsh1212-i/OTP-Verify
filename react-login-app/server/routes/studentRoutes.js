const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route for student registration
router.post('/register', studentController.registerStudent);
router.post('/login', studentController.loginStudent);
router.post('/login-phone', studentController.loginPhoneStudent);


// Route for verifying OTP
router.post('/verify-otp', studentController.verifyStudentOTP);

module.exports = router;