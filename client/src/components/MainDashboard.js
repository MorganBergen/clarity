import React from 'react';

import { Box } from '@mui/material';
import AppNavBar from './dashboard/components/AppNavbar';
import SideMenu from './dashboard/components/SideMenu';
import MainGrid from './dashboard/components/MainGrid';
import { UserProvider } from '../context/UserContext';

const MainDashboard = () => {
  return (
    <UserProvider>
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1 }}>
          <AppNavBar />
        </Box>
      </Box>
    </UserProvider>
  );
};

export default MainDashboard;