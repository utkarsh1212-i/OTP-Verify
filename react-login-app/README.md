# React Login App

This project is a minimalistic React application that allows users to log in as either students or admins. The application includes features for student registration, OTP verification, and an admin dashboard to view recently logged-in students.

## Project Structure

```
react-login-app
├── client
│   ├── public
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src
│   │   ├── components
│   │   │   ├── AdminLogin.js
│   │   │   ├── StudentLogin.js
│   │   │   ├── AdminDashboard.js
│   │   │   └── OTPVerification.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── styles
│   │       └── App.css
│   └── package.json
├── server
│   ├── controllers
│   │   ├── adminController.js
│   │   └── studentController.js
│   ├── models
│   │   ├── Admin.js
│   │   └── Student.js
│   ├── routes
│   │   ├── adminRoutes.js
│   │   └── studentRoutes.js
│   ├── utils
│   │   └── otpService.js
│   ├── server.js
│   └── package.json
├── .env
└── README.md
```

## Features

- **Student Login**: Students can register by providing their roll number, name, branch, email, and phone number. An OTP will be sent to their email or phone for verification.
- **Admin Login**: Admins can log in using their email and name. They will receive an OTP for verification.
- **Admin Dashboard**: Admins can view a list of students who have recently logged in.

## Technologies Used

- React.js for the frontend
- Node.js and Express.js for the backend
- MongoDB for the database
- OTP service for sending OTPs via email or SMS

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd react-login-app
   ```

2. Set up the server:
   - Navigate to the `server` directory:
     ```
     cd server
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file and add your environment variables (e.g., database connection string, OTP service API keys).

3. Set up the client:
   - Navigate to the `client` directory:
     ```
     cd ../client
     ```
   - Install dependencies:
     ```
     npm install
     ```

4. Start the server:
   ```
   cd server
   npm start
   ```

5. Start the client:
   ```
   cd ../client
   npm start
   ```

## Usage

- Access the application in your browser at `http://localhost:3000`.
- Follow the prompts to log in as a student or admin.

## License

This project is licensed under the MIT License.