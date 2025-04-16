import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const StudentWelcome = () => {
    const location = useLocation();
    const { studentName } = location.state || {}; // Get name from location state
    const history = useHistory();

    const handleLogout = () => {
        history.push('/student-login'); // Redirect to the home page
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'linear-gradient(to bottom, #6a11cb,rgb(185, 210, 254))',
                color: '#fff',
                fontFamily: 'Arial, sans-serif',
                textAlign: 'center',
                padding: '20px',
                position: 'relative', // To position the logout button absolutely
            }}
        >
            {/* Logout Button */}
            <button
                onClick={handleLogout}
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    color: '#fff',
                    backgroundColor: '#007bff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease, transform 0.2s ease',
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#0056b3';
                    e.target.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#007bff';
                    e.target.style.transform = 'scale(1)';
                }}
            >
                Logout
            </button>

            {/* Welcome Message */}
            <h1
                style={{
                    fontSize: '3rem',
                    marginBottom: '20px',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
            >
                Welcome, {studentName || 'Student'}!
            </h1>
            <p
                style={{
                    fontSize: '1.2rem',
                    marginBottom: '30px',
                    color: '#f0f0f0',
                }}
            >
                You have successfully logged in as a student.
            </p>

            {/* Cards Section */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '30px',
                }}
            >
                {/* Card 1: Announcements */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        color: '#333',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        width: '300px',
                        textAlign: 'left',
                    }}
                >
                    <h3 style={{ marginBottom: '10px', color: '#007bff' }}>Announcements</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        Stay updated with the latest news and announcements from the university.
                    </p>
                    <button
                        style={{
                            marginTop: '10px',
                            padding: '8px 15px',
                            fontSize: '0.9rem',
                            color: '#fff',
                            backgroundColor: '#007bff',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        View More
                    </button>
                </div>

                {/* Card 2: Upcoming Events */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        color: '#333',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        width: '300px',
                        textAlign: 'left',
                    }}
                >
                    <h3 style={{ marginBottom: '10px', color: '#28a745' }}>Upcoming Events</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        Check out the upcoming events and activities happening on campus.
                    </p>
                    <button
                        style={{
                            marginTop: '10px',
                            padding: '8px 15px',
                            fontSize: '0.9rem',
                            color: '#fff',
                            backgroundColor: '#28a745',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        View Events
                    </button>
                </div>

                {/* Card 3: Quick Links */}
                <div
                    style={{
                        backgroundColor: '#fff',
                        color: '#333',
                        borderRadius: '10px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '20px',
                        width: '300px',
                        textAlign: 'left',
                    }}
                >
                    <h3 style={{ marginBottom: '10px', color: '#ffc107' }}>Quick Links</h3>
                    <p style={{ fontSize: '0.9rem', lineHeight: '1.5' }}>
                        Access important resources and links for your academic needs.
                    </p>
                    <button
                        style={{
                            marginTop: '10px',
                            padding: '8px 15px',
                            fontSize: '0.9rem',
                            color: '#fff',
                            backgroundColor: '#ffc107',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Explore Links
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentWelcome;