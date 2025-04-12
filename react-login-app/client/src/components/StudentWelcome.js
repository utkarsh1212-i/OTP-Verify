import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const StudentWelcome = () => {
    const location = useLocation();
    const {studentName}  = location.state || {}; // Get name from location state
    console.log("StudentName", studentName);
    const history = useHistory();

    const handleLogout = () => {
        history.push('/'); // Redirect to the home page
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, {studentName}!</h1>
            <p>You have successfully logged in as a student.</p>
            <button
                onClick={handleLogout}
                style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default StudentWelcome;