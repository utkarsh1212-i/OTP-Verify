const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { generateOTP } = require('../utils/otpService');

// Route for admin login
router.post('/login', adminController.adminLogin);

// // Route for generating OTP for admin
// router.post('/generate-otp', generateOTP);

// Route for verifying OTP for admin
router.post('/verify-otp', adminController.verifyAdminOTP);
router.get('/recent-student', adminController.getRecentStudents);

module.exports = router;