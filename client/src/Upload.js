import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const Upload = () => {
  const handleUpload = () => {
    // Logic for handling file upload
    console.log("Upload functionality goes here.");
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4">Upload Your Files</Typography>
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
    </Box>
  );
};

export default Upload;