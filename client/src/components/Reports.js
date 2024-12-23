import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, Container } from '@mui/material';
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
import { UserContext } from '../context/UserContext';
import './MainDashboard.css';
import AttachmentIcon from '@mui/icons-material/Attachment';
// import { Grid2 } from '@mui/material';
// import { BarChart } from '@mui/x-charts/BarChart';

const pb = new PocketBase('http://127.0.0.1:8090');

const Reports = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState('Upload');
  const [uploadIcon, setUploadIcon] = useState(<AttachmentIcon />);
  const { userId } = useContext(UserContext); // Get userId from context

  const mainItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Analysis', icon: <AssessmentIcon /> },
    { text: 'Logging', icon: <CalendarMonthIcon /> },
    { text: 'Reports', icon: <ReportIcon /> },
    { text: buttonText, icon: uploadIcon }, // Use dynamic text and icon
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && /\.(img|jpeg|jpg|heic)$/i.test(file.name)) {
      setSelectedFile(file);
      setButtonText('Submit'); // Change button text to "Submit"
      setUploadIcon(<CloudUploadIcon />); // Change icon to CloudUploadIcon
    } else {
      alert('Please select a valid image file (.img, .jpeg, .jpg, .heic)');
    }
  };

  const handleUpload = async () => {

    if (!selectedFile || !userId) return;

    const formData = new FormData();
    formData.append('item', selectedFile);
    formData.append('userId', userId); // Include userId in the form data

    try {
      const response = await pb.collection('food').create(formData);
      console.log('Image uploaded successfully:', response);
      fetchImage(response.id); // Fetch the uploaded image
      setSelectedFile(null); // Reset selected file
      setButtonText('Upload'); // Reset button text
      setUploadIcon(<AttachmentIcon />); // Reset icon to AttachmentIcon
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchImage = async (id) => {
    try {
      const record = await pb.collection('food').getOne(id);
      const imageUrl = `http://127.0.0.1:8090/api/files/food/${id}/${record.item[0]}`;
      console.log('Fetched image URL:', imageUrl);
      // You can set the image URL to state if needed
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

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
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton edge="end" color="primary">
            <AccountCircle />
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
              <ListItem
                button={text.toString()}
                key={text}
                onClick={text === 'Upload' ? () => document.getElementById('file-input').click() : (text === 'Submit' ? handleUpload : null)}
                component={((text !== 'Upload' && text !== 'Submit') ? Link : 'div')}
                to={text !== 'Upload' ? `/${text === 'Dashboard' ? 'MainDashboard' : text.toLowerCase().replace(' ', '-')}` : undefined}
              >
                {icon}
                {drawerOpen && <ListItemText sx={{ marginLeft: '10px' }} primary={text} className="page-text-color" />}
              </ListItem>
            ))}
          </List>
          <input
            id="file-input"
            type="file"
            accept=".img,.jpeg,.jpg,.heic"
            onChange={(event) => {
              handleFileChange(event);
            }}
            style={{ display: 'none' }}
          />

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
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        
      </Container>
    </Box>
  );
};

export default Reports;