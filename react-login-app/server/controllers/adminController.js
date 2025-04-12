const Admin = require('../models/Admin');
const Student = require('../models/Student');
const otpService = require('../utils/otpService');

// Function to handle admin login and OTP generation
exports.adminLogin = async (req, res) => {
    const { email, phoneNumber, name } = req.body;

    try {
        // Check if admin exists
        console.log("HHUDHSHDG")
        let admin = await Admin.findOne({ $or: [{ email }, { phone : phoneNumber }] });
        if (!admin) {
            admin = new Admin({ email, phone: phoneNumber, name });
            console.log(admin)
            await admin.save();
        }
        if (name !== admin.name) {
            return res.status(400).json({ message: 'Name does not match', success: false });
        }
        
        // Generate and send OTP
        const otp = otpService.generateOTP();
        if(email){

            await otpService.storeOTP(email, otp, true);
            await otpService.sendOTPEmail(email, otp);
        }
        if(phoneNumber){
            console.log("OTP INSIDE PHONE")
            await otpService.storeOTP(phoneNumber, otp, false);
            await otpService.sendOTPSMS(phoneNumber, otp);
        }

        res.status(200).json({ message: 'OTP sent to your email', email, success : true });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin', error, success : false });
    }
};

// Function to verify admin OTP
exports.verifyAdminOTP = async (req, res) => {
    const { email, phoneNumber, otp } = req.body;

    try {
        // Determine the identifier (email or phoneNumber)
        const identifier = email || phoneNumber;

        if (!identifier || !otp) {
            return res.status(400).json({ message: 'Email or Phone Number and OTP are required', success: false });
        }

        // Verify the OTP
        const isValid = await otpService.verifyOTP(identifier, otp, email ? true : false);

        if (isValid?.success) {
            res.status(200).json({ message: 'Admin logged in successfully', success: true });
        } else {
            res.status(400).json({ message: 'Invalid OTP', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};

// Function to get recently logged in students
exports.getRecentStudents = async (req, res) => {
    try {
        const students = await Student.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
};