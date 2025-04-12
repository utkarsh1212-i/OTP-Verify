import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
        history.push('/'); // Redirect to login choice page
    };

    return (
        <div className="admin-dashboard">
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
             <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                Logout
            </button>
        </div>
    );
};

export default AdminDashboard;