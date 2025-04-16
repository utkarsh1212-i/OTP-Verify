import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Landingpage.css'; // Import the CSS file

const LoginChoice = () => {
    const history = useHistory();

    const handleStudentLogin = () => {
        history.push('/student-login'); // Redirect to Student Login page
    };

    const handleAdminLogin = () => {
        history.push('/admin'); // Redirect to Admin Login page
    };

    return (
        <div className="landing-page">
            <div className="landing-header">
                <h1>Welcome to the Login Portal</h1>
                <p>Choose your login type to proceed</p>
            </div>
            <div className="button-container">
                <button className="landing-button student-button" onClick={handleStudentLogin}>
                    Login / Register as Student
                </button>
                <button className="landing-button admin-button" onClick={handleAdminLogin}>
                    Login as Admin
                </button>
            </div>
        </div>
    );
};

export default LoginChoice;