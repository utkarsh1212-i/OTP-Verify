import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import AdminDashboard from './components/AdminDashboard';
import OTPVerification from './components/OTPVerification';
import StudentWelcome from './components/StudentWelcome';
import './styles/App.css';
import LoginChoice from './components/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LoginChoice} />
          <Route path="/student-login" exact component={StudentLogin} />
          <Route path="/admin" component={AdminLogin} />
          <Route path="/otp-verification" component={OTPVerification} />
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <Route path="/student-welcome" component={StudentWelcome} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;