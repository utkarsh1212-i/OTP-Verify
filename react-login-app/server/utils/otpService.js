const nodemailer = require('nodemailer');
const twilio = require('twilio');
const OTP = require('../models/OTP');
const axios = require('axios');

const otpService = {
    generateOTP: () => {
        return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
    },

    sendOTPEmail: async (email, otp) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email service
            auth: {
                user: process.env.EMAIL_SERVICE_USER, // Your email
                pass: process.env.EMAIL_SERVICE_PASS, // Your email password
            },
        });

        const mailOptions = {
            // from: process.env.EMAIL_USER,
            from: 'test@otpsystem',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            return true;
        } catch (error) {
            console.error('Error sending OTP email:', error);
            return false;
        }
    },

    sendOTPSMS: async (phone, otp) => {
        if (!phone.startsWith('+91')) {
            phone = `+91${phone}`;
        }
        const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        try {
            await client.messages.create({
                body: `Your OTP code is ${otp}`,
                from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
                to: phone,
            });
            return true;
        } catch (error) {
            console.error('Error sending OTP SMS:', error);
            return false;
        }
    },
    storeOTP: async (identifier, otp, isEmail) => {
        const expirationTime = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

        // Remove any existing OTP for the email
        isEmail ? await OTP.deleteMany({ email: identifier }) : await OTP.deleteMany({ phoneNumber: identifier })


        // Save the new OTP in the database

        const newOtp = isEmail
            ? new OTP({ email: identifier, otp, expirationTime })
            : new OTP({ phoneNumber: identifier, otp, expirationTime });
        console.log('Storing OTP:', newOtp);
        await newOtp.save();
    },

    getStoredOtp: async (identifier, isEmail) => {
        const otpRecord = await OTP.findOne(isEmail ? { email: identifier } : { phoneNumber: identifier });
        if (!otpRecord) return null;

        // Check if the OTP has expired
        if (new Date() > otpRecord.expirationTime) {
            await OTP.deleteOne(isEmail ? { email : identifier} : {phoneNumber: identifier}); // Remove expired OTP
            return null;
        }

        return otpRecord.otp;
    },

    verifyOTP: async (identifier, otp, isEmail) => {
        const storedOtp = await otpService.getStoredOtp(identifier, isEmail); // Retrieve the stored OTP
        if (!storedOtp) {
            return { success: false, message: 'OTP has expired or does not exist.' };
        }

        if (storedOtp === otp) {
            await OTP.deleteOne(isEmail ? { email : identifier} : {phoneNumber: identifier}); // Remove OTP after successful verification
            return { success: true, message: 'OTP verified successfully.' };
        }

        return { success: false, message: 'Invalid OTP.' };
    },
};

module.exports = otpService;