import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material'; // TextField
//  import { CloudUpload } from '@mui/icons-material';
import './MainDashboard.css';
import PocketBase from 'pocketbase';
import { UserContext } from '../context/UserContext';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers';
// import { DatePicker } from '@mui/x-date-pickers';

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
      setPreviewUrl(null)

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

  return (
    
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
              <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileChange} />
              <label htmlFor="file-input">
                <Button variant="contained" color="primary" component="span">
                  Add Food
                </Button>
              </label>
            </Box>

            <Typography variant="h6" sx={{ mb: 2, textAlign: 'left' }}>Upload Images or Scanned Barcode of Your Food</Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'left' }}>{currentDate} {currentTime}</Typography>

            {selectedFile && (
              <Button variant="contained" color="primary" component="span" onClick={handleUpload}>
                Upload
              </Button>
            )}

            

            <Box sx={{ mt: 3 }}>

              {previewUrl && (<img src={previewUrl} alt="Preview" className="preview-image" />)}

              <Typography variant="h6">Your Uploaded Images:</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {userImages.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="uploaded-image"
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    
  );
};

export default Logging;