import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../api/axios';
import '../styles/StudentloginForm.css'; // Import the CSS file

const StudentLogin = () => {
    const history = useHistory();
    const [isRegistering, setIsRegistering] = useState(true); // Toggle between Register and Login
    const [loginWithPhone, setLoginWithPhone] = useState(false); // Toggle between email and phone login
    const [rollNumber, setRollNumber] = useState('');
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [loading, setLoading] = useState(false); // Loader state
    const [error, setError] = useState(''); // Error state

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Clear previous errors
        const studentData = { rollNumber, name, branch, email, phoneNumber };
        try {
            const response = await axios.post('/api/student/register', studentData);
            if (response.data.success) {
                history.push('/otp-verification', { email });
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                setTimeout(() => setError(''), 6000);
            } else {
                setError('An error occurred. Please try again later.');
                setTimeout(() => setError(''), 6000);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleLoginWithEmail = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Clear previous errors
        try {
            const response = await axios.post('/api/student/login', { email });
            if (response.data.success) {
                history.push('/otp-verification', { email });
            } else {
                setError('Invalid email. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                setTimeout(() => setError(''), 6000);
            } else {
                setError('An error occurred. Please try again later.');
                setTimeout(() => setError(''), 6000);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleLoginWithPhone = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(''); // Clear previous errors
        try {
            const response = await axios.post('/api/student/login-phone', { phoneNumber });
            if (response.data.success) {
                history.push('/otp-verification', { phoneNumber });
            } else {
                setError('Invalid phone number. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                setTimeout(() => setError(''), 6000);
            } else {
                setError('An error occurred. Please try again later.');
                setTimeout(() => setError(''), 6000);
            }
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="student-login-container">
            <button
                className="home-button"
                onClick={() => history.push('/')}
                title="Go to Home"
            >
                Back
            </button>
            <h2 className="form-title">{isRegistering ? 'Student Register' : 'Student Login'}</h2>
            {error && <p className="error-message">{error}</p>} {/* Display error message */}
            {isRegistering ? (
                <form className="student-login-form" onSubmit={handleRegisterSubmit}>
                    <input
                        type="text"
                        placeholder="Roll Number"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Select Branch
                        </option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Chemical">Chemical</option>
                        <option value="Aerospace">Aerospace</option>
                        <option value="Biomedical">Biomedical</option>
                        <option value="Environmental">Environmental</option>
                        <option value="Industrial">Industrial</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Automobile">Automobile</option>
                    </select>
                    <input
                        type="email"
                        placeholder="Email ID"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Register'}
                    </button>
                </form>
            ) : (
                <form
                    className="student-login-form"
                    onSubmit={loginWithPhone ? handleLoginWithPhone : handleLoginWithEmail}
                >
                    {loginWithPhone ? (
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhone(e.target.value)}
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
                    <button type="submit" disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
                </form>
            )}
            {!isRegistering && (
                <button
                    className="toggle-login-method"
                    onClick={() => setLoginWithPhone(!loginWithPhone)}
                >
                    {loginWithPhone ? 'Login with Email' : 'Login with Phone'}
                </button>
            )}
            <button
                className="toggle-button"
                onClick={() => setIsRegistering(!isRegistering)}
            >
                {isRegistering ? 'Already registered? Login' : 'New user? Register'}
            </button>
        </div>
    );
};

export default StudentLogin;