import React, { useState, useContext, useEffect } from 'react';
import { Typography, ImageList, ImageListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import PocketBase from 'pocketbase';
import { UserContext } from '../context/UserContext';
import DateCalendarComponent from './DateCalendarComponent';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const pb = new PocketBase('http://127.0.0.1:8090');

const Logging = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { userId } = useContext(UserContext);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString());
  const [userImages, setUserImages] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserImages();
    }
  }, [userId]);

  const fetchUserImages = async () => {
    try {
      const records = await pb.collection('food').getFullList({
        filter: `userId="${userId}"`,
      });

      const images = records.map(record => `http://127.0.0.1:8090/api/files/food/${record.id}/${record.item[0]}`);
      setUserImages(images);

    } catch (error) {
      console.error('Error fetching user images:', error);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setDrawerOpen(true); // Open the drawer when a file is selected
  };

  const handleUpload = async () => {
    if (!selectedFile || !userId) return;

    const formData = new FormData();
    formData.append('item', selectedFile);
    formData.append('userId', userId);

    try {
      const response = await pb.collection('food').create(formData);
      console.log('Image uploaded successfully:', response);
      fetchImage(response.id);
      setUploadSuccess(true);
      fetchUserImages();
      setPreviewUrl(null);

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const fetchImage = async (id) => {
    try {
      const record = await pb.collection('food').getOne(id);
      const imageUrl = `http://127.0.0.1:8090/api/files/food/${id}/${record.item[0]}`;
      setImageUrl(imageUrl);
      console.log('Fetched image URL:', imageUrl);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = () => (
    <Box
      sx={{ width: 250, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {previewUrl && (
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="h6" align="center">Image Preview</Typography>
          <img src={previewUrl} alt="Preview" className="preview-image" />
        </Box>
      )}
      {selectedFile && (
        <Button variant="contained" color="primary" component="span" onClick={handleUpload}>
          Upload
        </Button>
      )}
      <Button variant="outlined" color="secondary" onClick={toggleDrawer(false)} sx={{ marginTop: 2 }}>
        Close Drawer
      </Button>
    </Box>
  );

return (
  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
    <Box sx={{ display: 'flex' }}>
      <Drawer
        anchor="left"
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
          <List className="bottom-list">
            {bottomItems.map(({ text }) => (
              <ListItem button={text.toString()} key={text} component={Link} to={`/${text === 'Sign Out' ? '' : text.toLowerCase().replace(' ', '-')}`}>
                <ListItemText primary={text} className="page-text-color" />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h4" sx={{ mb: 2, textAlign: 'left' }}>Logging</Typography>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </Button>
        </Box>

        <Typography variant="h6" sx={{ mb: 2, textAlign: 'left' }}>Upload Images or Scanned Barcode of Your Food</Typography>
        <Typography variant="body1" sx={{ mb: 2, textAlign: 'left' }}>{currentDate} {currentTime}</Typography>

        <Box sx={{ display: 'flex', width: '100%', height: '100%', mt: 3, alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ flex: 1 }}>
            {previewUrl && (<img src={previewUrl} alt="Preview" className="preview-image" />)}
            <Typography variant="h6">All images:</Typography>
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
              {userImages.map((url, index) => (
                <ImageListItem key={index}>
                  <img
                    srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${url}?w=164&h=164&fit=crop&auto=format`}
                    alt={`Uploaded ${index}`}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box sx={{ flex: 1 }}>
            <DateCalendarComponent />
          </Box>
        </Box>
      </Box>
    </Box>
    <Drawer
      anchor="right"
      open={drawerOpen}
      onClose={toggleDrawer(false)}
    >
      {drawerList()}
    </Drawer>
  </Box>
);
};

export default Logging;