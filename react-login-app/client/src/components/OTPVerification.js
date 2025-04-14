import React, { useState } from 'react';
import axios from '../api/axios';
import { useHistory, useLocation } from 'react-router-dom';
import '../styles/OTPVerification.css'; // Import the CSS file

const OTPVerification = () => {
    const history = useHistory();
    const location = useLocation();
    const email = location.state?.email // Get email or phone number from state
    const phoneNumber =  location.state?.phoneNumber; // Get email or phone number from state

    const [otp, setOtp] = useState(new Array(6).fill('')); // Array for 6-digit OTP
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loader state

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return; // Only allow numbers
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Move to the next input box automatically
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await axios.post('/api/student/verify-otp', { email, phoneNumber, otp: otp.join('') });
            if (response.data.success) {
                history.push('/student-welcome', { studentName: response.data.studentName });
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const handlePhoneSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await axios.post('/api/student/verify-otp', { phoneNumber, otp: otp.join('') });
            if (response.data.success) {
                history.push('/student-welcome', { studentName: response.data.studentName });
            } else {
                setError('Invalid OTP. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="otp-verification-container">
            <button
                className="home-button"
                onClick={() => history.push('/')}
                title="Go to Home"
            >
                🏠
            </button>
            <h2 className="otp-title">OTP Verification</h2>
            <p className="otp-instruction">Enter the 6-digit OTP sent to your email: {email}</p>
            {error && <p className="otp-error">{error}</p>}
            <form className="otp-form" onSubmit={email ? handleSubmit : handlePhoneSubmit}>
                <div className="otp-input-container">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={(e) => handleChange(e.target, index)}
                            onFocus={(e) => e.target.select()} // Highlight the input on focus
                            required
                        />
                    ))}
                </div>
                <button type="submit" disabled={loading} className="otp-submit-button">
                    {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
            </form>
        </div>
    );
};

export default OTPVerification;