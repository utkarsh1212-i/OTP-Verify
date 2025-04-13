import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useRouter } from 'next/router';
// import styles from '../styles/studentdetails.module.css'; // Import the CSS module for styling

const StudentDetails = () => {
    const router = useRouter();
    const [studentDetails, setStudentDetails] = useState([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/admin/recent-student'); // Adjust the endpoint as necessary
                setStudentDetails(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);

    const handleLogout = () => {
        router.push('/'); // Redirect to login choice page
    };

    const handleBack = () => {
        router.push('/admin-dashboard'); // Redirect back to admin dashboard
    };

    if (!studentDetails) {
        return <p>No student details available.</p>;
    }

    return (
        <div className="admin-dashboard">
            <h1>Recent Student Logins</h1>
            {studentDetails.length === 0 ? (
                <p>No students have logged in recently.</p>
            ) : (
                <div className="student-list">
                    {studentDetails.map((student) => (
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

export default StudentDetails;