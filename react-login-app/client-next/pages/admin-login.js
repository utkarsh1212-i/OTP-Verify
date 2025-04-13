import { useState } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
// import '../styles/StudentloginForm.css'; // Reuse the Student Login CSS

const AdminLogin = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loginWithPhone, setLoginWithPhone] = useState(false); // Toggle between email and phone login
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Loader state

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const loginData = loginWithPhone ? { phoneNumber, name } : { email, name };
            const response = await axios.post('/api/admin/login', loginData);
            if (response.data.success) {
                setIsOtpSent(true);
                setError(''); // Clear any previous error
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleOtpVerification = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const verificationData = loginWithPhone ? { phoneNumber, otp } : { email, otp };
            const response = await axios.post('/api/admin/verify-otp', verificationData);
            if (response.data.success) {
                setError(''); // Clear any previous error
                router.push('/admin-dashboard'); // Redirect to admin dashboard
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="student-login-container">
            <button
                className="home-button"
                onClick={() => router.push('/')}
                title="Go to Home"
            >
                🏠
            </button>
            <h2 className="form-title">Admin Login</h2>
            <form className="student-login-form" onSubmit={isOtpSent ? handleOtpVerification : handleLogin}>
                {!isOtpSent && (
                    <>
                        {loginWithPhone ? (
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        ) : (
                            <input
                                type="email"
                                placeholder="Email ID"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        )}
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </>
                )}
                {isOtpSent && (
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                )}
                <button type="submit" disabled={loading}>
                    {loading ? (isOtpSent ? 'Verifying...' : 'Sending...') : isOtpSent ? 'Verify OTP' : 'Send OTP'}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
            {!isOtpSent && (
                <button
                    className="toggle-login-method"
                    onClick={() => setLoginWithPhone(!loginWithPhone)}
                >
                    {loginWithPhone ? 'Login with Email' : 'Login with Phone'}
                </button>
            )}
        </div>
    );
};

export default AdminLogin;