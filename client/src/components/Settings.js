import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import './MainDashboard.css';

const Settings = () => {
  const mainItems = [
    { text: 'Dashboard' },
    { text: 'Analysis' },
    { text: 'Logging' },
    { text: 'Reports' },
  ];

  const bottomItems = [
    { text: 'Settings' },
    { text: 'Sign Out', link: '/'},
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List className="main-list">
            {mainItems.map(({ text }) => (
              <ListItem button key={text} component={Link} to={`/${text === 'Dashboard' ? 'MainDashboard' : text.toLowerCase().replace(' ', '-')}`}>
                <ListItemText primary={text} className="page-text-color" />
              </ListItem>
            ))}
          </List>
          <div className="separator-line"></div>
          <List className="bottom-list">
            {bottomItems.map(({ text }) => (
              <ListItem button key={text} component={Link} to={`/${ text === 'Sign Out' ? '' : text.toLowerCase().replace(' ', '-')}`}>
                <ListItemText primary={text} className="page-text-color" />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Typography variant="h4">Settings</Typography>
        <Typography variant="body1">View and edit your profile information.</Typography>
      </Box>
    </Box>
  );
};

export default Settings;