import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Dashboard from './components/Dashboard';
import MainDashboard from './components/MainDashboard';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import EmailVerification from './components/EmailVerification';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/MainDashboard" element={<MainDashboard />} />
          <Route path="/_/#/auth/confirm-verification/:token" element={<EmailVerification />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;