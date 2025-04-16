import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // Adjust the import path as necessary
import { useHistory } from 'react-router-dom';
import '../styles/admindashboard.css'; // Import the CSS file for styling

const AdminDashboard = () => {
    const history = useHistory();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/admin/recent-student'); // Adjust the endpoint as necessary
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleLogout = () => {
        history.push('/admin'); // Redirect to login choice page
    };

    return (
        <div className="admin-dashboard">
            {/* Top Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <h2>Admin Dashboard</h2>
                </div>
                <div className="navbar-right">
                    <span className="admin-name">
                        {localStorage.getItem('adminName') || 'Admin'}
                    </span>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="dashboard-content">
                <h1>Recent Student Logins</h1>
                {students.length === 0 ? (
                    <p>No students have logged in recently.</p>
                ) : (
                    <div className="student-list">
                        {students.map((student) => (
                            <div className="student-card" key={student._id}>
                                <h3>{student.name}</h3>
                                <p><strong>Roll Number:</strong> {student.rollNumber}</p>
                                <p><strong>Branch:</strong> {student.branch}</p>
                                <p><strong>Email:</strong> {student.email}</p>
                                <p><strong>Phone:</strong> {student.phoneNumber}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;