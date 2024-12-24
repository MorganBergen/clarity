/**
 *  @file         App.js
 *  @author       morgan bergen <morganmahabergen@icloud.com>
 *  @date         07/13/2024
 *  @commit       31f9adbf6dcfcdda8bfa46e44ca85e517d8e8905
 *  
 *  @description  serves as the main entry point for the react application sets up the routing the 
 *                application using `react-router-dom` provides the redux store and user context to 
 *                the rest of the app the file imports various components representing different pages 
 *                or views and defines the routes for navigating between them
 * 
 *  @context      UserContext                       context for managing user-related data
 *                UserProvider                      context provider for managing user-related data
 *                Redux store                       redux store for managing global state
 * 
 *  @imports      React                             core library for building the user interface 
 *                Route, Routes, BrowserRouter      components from `react-router-dom` for handling 
 *                                                  client-side routing
 *                Provider                          component from `react-redux` to make redux store 
 *                                                  available to the rest of the app
 *                UserProvider                      context provider for managing user-related data
 *                
 * @routes        /                                 login account page
 *                /register                         registration page
 *                /forgot-password                  forgot password page
 *                /dashboard                        initial welcome screen upon account creation
 *                /MainDashboard                    hero page containing aggregated data from user's profile
 *                /Analysis                         insights into macro & micronutrient and non nutirient data
 *                /Settings                         user settings page
 *                /Logging                          logging page
 *                /Reports                          reports page
 *                
 *                
 */

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
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

function App() {
  return (
    <Provider store={store}> 
        <UserProvider>
          <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/MainDashboard" element={<MainDashboard />} />
            <Route path="/Analysis" element={<Analysis />} />
            <Route path="/Settings" element={<Settings />} />
            <Route path="/Logging" element={<Logging />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/_/#/auth/confirm-verification/:token" element={<EmailVerification />} />
          </Routes>
          </Router>
        </UserProvider>
    </Provider>
  );
}

export default App;