import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from '../utils/axios'; // Import the CSS file for styling

export default function StudentLogin() {
    const router = useRouter();
    const [isRegistering, setIsRegistering] = useState(true);
    const [loginWithPhone, setLoginWithPhone] = useState(false);
    const [rollNumber, setRollNumber] = useState('');
    const [name, setName] = useState('');
    const [branch, setBranch] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/student/register', {
                rollNumber,
                name,
                branch,
                email,
                phoneNumber,
            });
            if (response.data.success) {
                // router.push('/otp-verification', { query: { email } });
                router.push({
                    pathname: '/otp-verification',
                    query: { email },
                });
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };
    const handleLoginWithEmail = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await axios.post('/api/student/login', { email });
            if (response.data.success) {
                router.push('/otp-verification', { query: { email } });
                router.push({
                    pathname: '/otp-verification',
                    query: { email },
                });

            } else {
                alert('Invalid email. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false); // Stop loading
        }
    };
    const handleLoginWithPhone = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        try {
            const response = await axios.post('/api/student/login-phone', { phoneNumber });
            if (response.data.success) {
                // router.push('/otp-verification', { query: loginWithPhone ? { phoneNumber } : { email } });
                router.push({
                    pathname: '/otp-verification',
                    query: loginWithPhone ? { phoneNumber } : { email },
                });
            } else {
                alert('Invalid phone number. Please try again.');
            }
        } catch (error) {
            alert('An error occurred. Please try again later.');
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
            <h2 className="form-title">{isRegistering ? 'Student Register' : 'Student Login'}</h2>
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
}