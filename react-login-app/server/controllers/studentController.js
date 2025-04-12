const Student = require('../models/Student');
const otpService = require('../utils/otpService');

// Register a new student
exports.registerStudent = async (req, res) => {
    const { rollNumber, name, branch, email, phoneNumber } = req.body;
    console.log("Registering student:", req.body);

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }
    // Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
        return res.status(400).json({ message: 'A student with this email already exists' });
    }


    try {
        const newStudent = new Student({ rollNumber, name, branch, email, phoneNumber });
        await newStudent.save();

        // Generate and send OTP
        const otp = otpService.generateOTP();
        await otpService.storeOTP(email, otp);
        await otpService.sendOTPEmail(email, otp); // Assuming sendOTP handles sending via email

        res.status(201).json({ message: 'Student registered successfully, OTP sent to email.', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error });
    }
};
// Login a student
exports.loginStudent = async (req, res) => {
    const { email } = req.body;
    console.log("Logging in student:", req.body);

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Check if the student exists
        const existingStudent = await Student.findOne({ email });
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Generate and send OTP
        const otp = otpService.generateOTP();
        await otpService.storeOTP(email, otp);
        await otpService.sendOTPEmail(email, otp); // Assuming sendOTP handles sending via email

        res.status(200).json({ message: 'OTP sent to email for login.', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in student', error });
    }
};
exports.loginPhoneStudent = async (req, res) => {
    const { phoneNumber } = req.body;
    console.log("Logging in student:", req.body);

    if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
    }

    try {
        // Check if the student exists
        const existingStudent = await Student.findOne({ phoneNumber });
        if (!existingStudent) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // Generate and send OTP
        const otp = otpService.generateOTP();
        await otpService.storeOTP(phoneNumber, otp, false);
        await otpService.sendOTPSMS(phoneNumber, otp); // Assuming sendOTP handles sending via Phone

        res.status(200).json({ message: 'OTP sent to Phone for login.', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in student', error });
    }
};

// Verify OTP for student login
exports.verifyStudentOTP = async (req, res) => {
    const { email, phoneNumber, otp } = req.body;

    // Determine the identifier (email or phoneNumber)
    const identifier = email || phoneNumber;

    if (!identifier || !otp) {
        return res.status(400).json({ message: 'Email or Phone Number and OTP are required', success: false });
    }

    try {
        // Verify the OTP
        const result = await otpService.verifyOTP(identifier, otp, email ? true : false);

        // Find the student based on the identifier
        const student = email
            ? await Student.findOne({ email })
            : await Student.findOne({ phoneNumber });

        if (!student) {
            return res.status(404).json({ message: 'Student not found', success: false });
        }

        // Check if the OTP is valid
        if (!result.success) {
            return res.status(400).json({ message: result.message, success: false });
        }

        // OTP is valid
        res.status(200).json({
            message: result.message,
            success: true,
            studentName: student.name,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};