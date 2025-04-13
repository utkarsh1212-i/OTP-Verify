import React from 'react';
import { useRouter } from 'next/router';

const StudentWelcome = () => {
    const router = useRouter();
    const { studentName } = router.query; // Get name from query parameters

    const handleLogout = () => {
        router.push('/'); // Redirect to the home page
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome, {studentName || 'Student'}!</h1>
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