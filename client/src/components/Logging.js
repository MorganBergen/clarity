import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Typography, IconButton, Button } from '@mui/material';
import { AttachFile, CloudUpload } from '@mui/icons-material'; 
import './MainDashboard.css';
import PocketBase from 'pocketbase';
import { UserContext } from '../context/UserContext';

const pb = new PocketBase('http://127.0.0.1:8090');

const Logging = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [showFileOptions, setShowFileOptions] = useState(false);
  const { userId } = useContext(UserContext);

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
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center' }}
        >

          <Typography variant="h4" sx={{ mb: 2, textAlign: 'left' }}>Logging</Typography>
          <Typography variant="h6" sx={{ mb: 2, textAlign: 'left' }}>Upload Images or Scanned Barcode of Your Food</Typography>
          <Button variant="contained" color="primary" onClick={() => setShowFileOptions(!showFileOptions)}>
            Add Food
          </Button>
          {showFileOptions && (
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, mt: 2 }}>
              <input
                type="file"
                id="file-input"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <label htmlFor="file-input">
                <IconButton color="primary" component="span">
                  <AttachFile />
                </IconButton>
              </label>
              <IconButton color="primary" onClick={handleUpload} disabled={!selectedFile}>
                <CloudUpload />
              </IconButton>
            </Box>
          )}
          {previewUrl && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="h6">File Preview:</Typography>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
            </Box>
          )}
          {imageUrl && (
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Typography variant="h6">Uploaded Image:</Typography>
              <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '200px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} />
              {uploadSuccess && <Typography variant="body2" sx={{ mt: 2, color: 'green' }}>Upload successful!</Typography>}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Logging;