import Admin from '../../models/Admin';
import Student from '../../models/Student';
import otpService from '../../utils/otpService';
import dbConnect from '../../utils/dbConnect'; // Utility to connect to MongoDB

export default async function handler(req, res) {
    await dbConnect(); // Ensure the database is connected

    const { method } = req;

    switch (method) {
        case 'POST':
            return handleAdminLogin(req, res); // Handle admin login and OTP generation
        case 'GET':
            return getRecentStudents(req, res); // Handle fetching recent students
        default:
            res.setHeader('Allow', ['POST', 'GET']);
            return res.status(405).json({ message: `Method ${method} not allowed` });
    }
}

// Function to handle admin login and OTP generation
async function handleAdminLogin(req, res) {
    const { email, phoneNumber, name } = req.body;

    try {
        // Check if admin exists
        let admin = await Admin.findOne({ $or: [{ email }, { phone: phoneNumber }] });
        if (!admin) {
            admin = new Admin({ email, phone: phoneNumber, name });
            await admin.save();
        }

        if (name !== admin.name) {
            return res.status(400).json({ message: 'Name does not match', success: false });
        }

        // Generate and send OTP
        const otp = otpService.generateOTP();
        if (email) {
            await otpService.storeOTP(email, otp, true);
            await otpService.sendOTPEmail(email, otp);
        }
        if (phoneNumber) {
            await otpService.storeOTP(phoneNumber, otp, false);
            await otpService.sendOTPSMS(phoneNumber, otp);
        }

        res.status(200).json({ message: 'OTP sent to your email or phone', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in admin', error, success: false });
    }
}

// Function to verify admin OTP
async function verifyAdminOTP(req, res) {
    const { email, phoneNumber, otp } = req.body;

    try {
        // Determine the identifier (email or phoneNumber)
        const identifier = email || phoneNumber;

        if (!identifier || !otp) {
            return res.status(400).json({ message: 'Email or Phone Number and OTP are required', success: false });
        }

        // Verify the OTP
        const isValid = await otpService.verifyOTP(identifier, otp);

        if (isValid?.success) {
            res.status(200).json({ message: 'Admin logged in successfully', success: true });
        } else {
            res.status(400).json({ message: 'Invalid OTP', success: false });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
}

// Function to get recently logged-in students
async function getRecentStudents(req, res) {
    try {
        const students = await Student.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching students', error });
    }
}