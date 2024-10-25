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
import Analysis from './components/Analysis';
import Settings from './components/Settings';
import Logging from './components/Logging';
import Reports from './components/Reports';
import { UserProvider } from './context/UserContext';
import ApiTest from './components/ApiTest';
import Upload from './Upload';

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <ApiTest />
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/MainDashboard" element={<MainDashboard />} />
            <Route path="/_/#/auth/confirm-verification/:token" element={<EmailVerification />} />
            <Route path="/Analysis" element={<Analysis />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Logging" element={<Logging />} />
            <Route path="/Reports" element={<Reports />} />
            {/* <Route path="/Upload" element={<MainLayout><Upload /></MainLayout>} /> */}
          </Routes>
        </Router>
      </UserProvider>
    </Provider>
  );
}

export default App;