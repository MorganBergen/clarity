import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Typography, AppBar, Toolbar, IconButton, Container, Card, CardContent } from '@mui/material';
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
import { Grid2 } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';

// import { BarChart } from '@mui/x-charts/BarChart';
// import StatCard from './StatCard';
// import { Gauge } from '@mui/x-charts/Gauge';


// const { Model } = clarifai;

// const model = new Model({
//   authConfig: {
//     userId: "clarifai",
//     appId: "main",
//     pat: "1b2ea09d706a4be48ae4a0a2717f7ddf",
//   },
//   modelId: "food-item-recognition",
// });

const pb = new PocketBase('http://127.0.0.1:8090');

const MainDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState('Upload');
  const [uploadIcon, setUploadIcon] = useState(<AttachmentIcon />);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const { userId } = useContext(UserContext); // Get userId from context
  const [itemData, setItemData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPredictionData] = useState(null);

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


  const card = {
    title: 'Sample Data',
    value: '55',
    interval: 'Random information here',
    trend: 'neutral',
    data: [10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40, 50, 40], // Example data
  };

  const second_card = {
    title: 'More Sample Data',
    value: '9,999',
    interval: 'Small but relevant',
    trend: 'neutral',
    data: [10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40, 50, 40, 30, 20, 10, 20, 30, 40, 50, 40], // Example data
  };

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
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(2) + ' KB');
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
      setButtonText('Submit');
      setUploadIcon(<CloudUploadIcon />);
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
      setFileName('');
      setFileSize('');
      setPreviewUrl(null);
      setButtonText('Upload'); // Reset button text
      setUploadIcon(<AttachmentIcon />); // Reset icon to AttachmentIcon
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const records = await pb.collection('food').getFullList();
        const formattedData = records.map(record => ({
          img: `http://127.0.0.1:8090/api/files/food/${record.id}/${record.item[0]}`,
          title: record.title || 'Untitled',
        }));
        setItemData(formattedData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [userId]);

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

            <input
              id="file-input"
              type="file"
              accept=".img,.jpeg,.jpg,.heic"
              onChange={(event) => {
                handleFileChange(event);
              }}
              style={{ display: 'none' }}
            />

          </List>

          {previewUrl && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
              <img src={previewUrl} alt="Preview" style={{ width: '100px', height: 'auto', borderRadius: '4px' }} />
              <Typography variant="body2">{fileName}</Typography>
              <Typography variant="body2">{fileSize}</Typography>
            </Box>
          )}

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
      <Container sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '64px', padding: 0, marginLeft: drawerOpen ? '0px' : '0px' }}>
        {/* Create a Box with transform scaling */}
        <Box
          sx={{
            display: 'flex', // Use flexbox to align items side by side
            gap: '20px',
            transform: 'scale(0.7)', // Adjust this value to scale the StatCard uniformly (0.8 = 80% of original size)
            transformOrigin: 'center', // Ensure the scaling happens from the center
            marginLeft: drawerOpen ? '-90px' : '-120px', // Adjust this to control left alignment when drawer is open
          }}
        >


          {/* <Gauge width={100} height={100} value={60} startAngle={-90} endAngle={90} /> */}
        </Box>
      </Container>
    </Box>
  );
};

export default MainDashboard;

/*
    <Container
        sx={{
          display: 'flex',
          justifyContent: 'flex-start', // Aligns content to the left
          alignItems: 'flex-start', // Aligns content to the top
          padding: 0, // Removes default padding
          margin: 0, // Removes default margin
        }}
      >
        <Box
          sx={{
            transform: 'scale(0.7)', // Scale the StatCard as needed
            transformOrigin: 'left', // Ensure scaling happens from the left side
            ml: drawerOpen ? '20px' : '10px', // Adjust this to control left alignment when drawer is open
          }}
        >
*/