import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, Container, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AccountCircle from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PocketBase from 'pocketbase';
import './MainDashboard.css';

const pb = new PocketBase('http://127.0.0.1:8090');

const MainDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // state for dark mode
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState('Upload');

  const mainItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Analysis', icon: <AssessmentIcon /> },
    { text: 'Logging', icon: <CalendarMonthIcon /> },
    { text: 'Reports', icon: <ReportIcon /> },
    { text: 'Upload', icon: <CloudUploadIcon /> },
  ];

  const bottomItems = [
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Sign Out', icon: <LogoutIcon /> },
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const Upload = () => {
    const handleUpload = () => {
      console.log('Upload functionality goes here.');
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar sx={{ backgroundColor: 'white', boxShadow: 'none', borderBottom: '1px solid #E0E0E0' }}>
        <Toolbar>
          <IconButton edge="start" color="primary" onClick={toggleDrawer}>
            {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
          <Typography className="title-text" variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Clarity
          </Typography>
          <IconButton onClick={toggleTheme} color="primary">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />} {/* Toggle icon based on theme */}
          </IconButton>
          <IconButton edge="end" color="primary">
            <AccountCircle /> {/* User icon */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerOpen ? 240 : 60,
            boxSizing: 'border-box',
            marginTop: '64px',
            height: 'calc(100% - 64px)',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <List className="main-list">
            {mainItems.map(({ text, icon }) => (
              <ListItem button={text.toString()} key={text} component={Link} to={`/${text === 'Dashboard' ? 'MainDashboard' : text.toLowerCase().replace(' ', '-')}`}>
                {icon}
                {drawerOpen && <ListItemText sx={{ marginLeft: '10px' }} primary={text} className="page-text-color" />}
              </ListItem>
            ))}
          </List>
          <List className="bottom-list" sx={{ marginTop: 'auto' }}>
            {bottomItems.map(({ text, icon }) => (
              <ListItem button={text.toString()} key={text} component={Link} to={`/${text === 'Sign Out' ? '' : text.toLowerCase().replace(' ', '-')}`}>
                {icon}
                {drawerOpen && <ListItemText sx={{ marginLeft: '10px' }} primary={text} className="page-text-color" />}
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer> 
      <Container>
            






















      </Container>
    </Box>
  );
};

export default MainDashboard;