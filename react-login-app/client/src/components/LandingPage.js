import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginChoice = () => {
    const history = useHistory();

    const handleStudentLogin = () => {
        history.push('/student-login'); // Redirect to Student Login page
    };

    const handleAdminLogin = () => {
        history.push('/admin'); // Redirect to Admin Login page
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to the Login Portal</h1>
            <p>Please choose your login type:</p>
            <div style={{ marginTop: '20px' }}>
                <button
                    onClick={handleStudentLogin}
                    style={{
                        padding: '10px 20px',
                        margin: '10px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Login / Register as Student
                </button>
                <button
                    onClick={handleAdminLogin}
                    style={{
                        padding: '10px 20px',
                        margin: '10px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    Login as Admin
                </button>
            </div>
        </div>
    );
};

export default LoginChoice;