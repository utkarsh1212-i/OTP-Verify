import { useRouter } from 'next/router';
// import '../styles/index.css';


export default function LandingPage() {
    const router = useRouter();

    const handleStudentLogin = () => {
        router.push('/student-login');
    };

    const handleAdminLogin = () => {
        router.push('/admin-login');
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
}