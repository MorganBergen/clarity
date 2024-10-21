import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
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

import { AppProvider } from '@toolpad/core';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalysisIcon from '@mui/icons-material/QueryStats';
import SettingsIcon from '@mui/icons-material/Settings';
import LoggingIcon from '@mui/icons-material/Today';
import ReportsIcon from '@mui/icons-material/FolderCopy';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

const NAVIGATION = [
  {
    segment: 'MainDashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    kind: 'page',
  },
  {
    segment: 'Analysis',
    title: 'Analysis',
    icon: <AnalysisIcon />,
    kind: 'page',
  },
  {
    segment: 'logging',
    title: 'Logging',
    icon: <LoggingIcon />,
    kind: 'page',
  },
  {
    segment: 'reports',
    title: 'Reports',
    icon: <ReportsIcon />,
    kind: 'page',
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Settings',
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
    kind: 'page',
  },
];


const Theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  return (
    <Provider store={store}>
      <AppProvider navigation={NAVIGATION} theme={Theme}>
        <DashboardLayout>
          <UserProvider>
            <Router>
              <Routes>
                /* prior to login */
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/_/#/auth/confirm-verification/:token" element={<EmailVerification />} />

                /* after login */
                <Route path="/MainDashboard" element={<MainDashboard />} />
                <Route path="/Analysis" element={<Analysis />} />
                <Route path="/Settings" element={<Settings />} />
                <Route path="/Logging" element={<Logging />} />
                <Route path="/Reports" element={<Reports />} />
              </Routes>
            </Router>
          </UserProvider>
        </DashboardLayout>
      </AppProvider>
    </Provider>
  );
}

export default App;