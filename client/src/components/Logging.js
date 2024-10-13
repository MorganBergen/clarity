import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import './MainDashboard.css';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const Logging = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const mainItems = [
    { text: 'Dashboard' },
    { text: 'Analysis' },
    { text: 'Logging' },
    { text: 'Reports' },
  ];

  const bottomItems = [
    { text: 'Settings' },
    { text: 'Sign Out', link: '/' },
  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await pb.collection('food').create(formData);
      console.log('Image uploaded successfully:', response);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

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
              <ListItem button={text.toString()} key={text} component={Link} to={`/${text === 'Sign Out' ? '' : text.toLowerCase().replace(' ', '-')}`}>
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
        <Typography variant="h4">Logging</Typography>
        <Typography variant="body1">Upload images, or upload scanned barcode of your food</Typography>
        <input type="file" onChange={handleFileChange} />
        <Button variant="contained" onClick={handleUpload}>Upload Image</Button>
      </Box>
    </Box>
  );
};

export default Logging;