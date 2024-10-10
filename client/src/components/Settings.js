import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
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
        { text: 'Sign Out' },
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
                <ListItem button={text.toString()} key={text} component={Link} to={`/${text === 'Dashboard' ? 'MainDashboard' : text.toLowerCase().replace(' ', '-')}`}>
                  <ListItemText primary={text} className="page-text-color" />
                </ListItem>
              ))}
            </List>
            <div className="separator-line"></div>
            <List className="bottom-list">
              {bottomItems.map(({ text }) => (
                <ListItem button={text.toString()} key={text} component={Link} to={`/${ text === 'Sign Out' ? '' : text.toLowerCase().replace(' ', '-')}`}>
                  <ListItemText primary={text} className="page-text-color" />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    );
  };

export default Settings;