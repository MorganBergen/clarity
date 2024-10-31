import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box, Drawer, List, ListItemText, ListItemButton, Typography, AppBar, Toolbar, Container } from '@mui/material';
import { UserContext } from '../context/UserContext';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AttachmentIcon from '@mui/icons-material/Attachment';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import PocketBase from 'pocketbase';
import './MainDashboard.css';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IoBarChart } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { IoMdAttach } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5"; // https://react-icons.github.io/react-icons/search/#q=logout
import { TbLogout2 } from "react-icons/tb";
import { Stack } from 'react-bootstrap';
import { BiSolidToggleLeft } from "react-icons/bi";
import { BiSolidToggleRight } from "react-icons/bi";
import { borderRadius } from '@mui/system';
import { IoAlbums } from "react-icons/io5";
import { MdCenterFocusStrong } from "react-icons/md";
import { MdCenterFocusWeak } from "react-icons/md";
// require('dotenv').config();
// const apiKey = process.env.CLARIFAI_API_KEY;

// <IoAlbums size={} />

// API_KEY = 'ba1a79a08c8b429fac27697167885767';
// MODEL_ID = 'food-item-recognition';

const pb = new PocketBase('http://127.0.0.1:8090');

const Analysis = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState('Upload');
  const [uploadIcon, setUploadIcon] = useState(<IoMdAttach />);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const { userId } = useContext(UserContext);
  const [itemData, setItemData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showFirstSection, setShowFirstSection] = useState(null);

  const theme = createTheme({
    components: {
      MuiListItemText: {
        styleOverrides: {
          primary: {
            fontSize: '12px',
            color: '#414141',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: '10px',
            '&:hover': {
              backgroundColor: 'rgba(233, 234, 236, 0.8)',
            },
          },
        },
      },
    },
  },
  );

  const mainItems = [
    { text: 'Dashboard', icon: <GoHomeFill color="#414141" /> },
    { text: 'Analysis', icon: <IoBarChart color="#414141" /> },
    { text: 'Logging', icon: <FaCalendarAlt color="#414141" /> },
    { text: 'Reports', icon: <IoDocument color="#414141" /> },
    { text: buttonText, icon: uploadIcon },
  ];

  const bottomItems = [
    { text: 'Settings', icon: <IoSettingsSharp color="#414141" /> },
    { text: 'Sign Out', icon: <TbLogout2 color="#414141" /> },
  ];

  const item_name = "Lay's Flamin Hot Potato Chips";
  const sub_name = "Flavored";

  const toggleSection = () => {
    setShowFirstSection(!showFirstSection);
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

  const handleImageClick = async (item) => {
    setSelectedImage(item);
    // setSelectedImageUrl(item.img);
    console.log("image click");
  };

  const handleBackToList = () => {
    setSelectedImage(null);
  };

  const handleAnalyzeImage = async (imageUrl) => {
    try {
      // Fetch the image as a blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      console.log("Image fetched successfully");

      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result.split(',')[1];

        const raw = JSON.stringify({
          "inputs": [
            {
              "data": {
                "image": {
                  "base64": base64data
                }
              }
            }
          ]
        });

        const requestOptions = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization': `Key 6bd0b7c74ee84bcc9d3b8219fc1f4865`,
          },
          body: raw
        };

        try {
          console.log(requestOptions);

          const apiResponse = await fetch("/v2/users/clarifai/apps/main/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs", requestOptions);

          console.log(apiResponse);

          const result = await apiResponse.json();

          if (apiResponse.ok) {
            console.log("API request successful:", result);
            setAnalysisResult(result);
          } else {
            console.error("API request failed:", result);
          }
        } catch (error) {
          console.error("Error during API request:", error);
        }
      };
    } catch (error) {
      console.error('Error fetching image or processing:', error);
      setAnalysisResult(null);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>

        <AppBar sx={{ backgroundColor: 'white', boxShadow: 'none', border: 'none' }}>
          <Toolbar>
            <button className="menu-toggle-button" style={{ marginLeft: '-10px' }} onClick={toggleDrawer}>
              {drawerOpen ? <TbLayoutSidebarLeftCollapseFilled size={20} /> : <TbLayoutSidebarLeftExpandFilled size={20} />}
            </button>
            <Typography className="title-text" noWrap component="div" sx={{ flexGrow: 1 }}>
              Clarity
            </Typography>
            {/* toggle between first and second sections */}
            <button className="menu-toggle-button" onClick={toggleSection} style={{ marginLeft: '10px' }} >
              {showFirstSection ? <BiSolidToggleRight size={20} /> : <BiSolidToggleLeft size={20} />}
            </button>
            {/* back to list */}
            <button className="menu-toggle-button" onClick={handleBackToList} style={{ marginLeft: '10px' }}>
              {selectedImage ? <IoAlbums size={20} /> : <IoAlbums size={20} />}
            </button>
            {/* analyze image */}
            <button className="menu-toggle-button" onClick={() => handleAnalyzeImage(selectedImage.img)} style={{ marginLeft: '10px' }}>
              {selectedImage && analysisResult ? <MdCenterFocusStrong size={20} /> : <MdCenterFocusWeak size={20} />}
            </button>
            <button className="menu-toggle-button" onClick={toggleTheme} style={{ marginLeft: '10px' }}>
              {darkMode ? <MdOutlineLightMode size={20} /> : <MdDarkMode size={20} />}
            </button>
            <button className="menu-toggle-button" style={{ marginLeft: '10px' }} >
              <FaUser size={15} />
            </button>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerOpen ? 150 : 60,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerOpen ? 150 : 60,
              boxSizing: 'border-box',
              marginTop: '64px',
              height: 'calc(100% - 64px)',
              border: 'none',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '10px',
              marginBottom: '10px',
              height: '100%',
              borderRadius: '10px',
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
            }}>

            <List
              sx={{
                padding: 0,
                '& .MuiListItemButton-root:first-of-type': {
                  marginTop: '0px',
                },
              }}
            >
              {mainItems.map(({ text, icon }) => (
                <ListItemButton
                  key={text}
                  onClick={() => {
                    if (text === 'Upload') {
                      document.getElementById('file-input').click();
                    } else if (text === 'Submit' && selectedFile) {
                      handleUpload();
                    }
                  }}
                  component={((text === 'Upload' || text === 'Submit') ? 'div' : Link)}
                  to={((text !== 'Upload' && text !== 'Submit') ? `/${text === 'Dashboard' ? 'MainDashboard' : text.toLowerCase().replace(' ', '-')}` : undefined)}
                >
                  {icon}
                  {drawerOpen && <ListItemText sx={{ marginLeft: '10px' }} primary={text} />}
                </ListItemButton>
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

            <List sx={{ marginTop: 'auto', padding: 0, marginBottom: '0px' }}>
              {bottomItems.map(({ text, icon }) => (
                <ListItemButton
                  button={text.toString()}
                  key={text}
                  component={Link}
                  to={`/${text === 'Sign Out' ? '' : text.toLowerCase().replace(' ', '-')}`}
                >
                  {icon}
                  {drawerOpen && <ListItemText sx={{ marginLeft: '10px' }} primary={text} className="drawer-items" />}
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* ANALYSIS PAGE */}


        {showFirstSection ? (
          <Box
            sx={{
              height: '100vh',
              width: '100%',
              overflow: 'auto',
              // border: '5px solid black',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              boxSizing: 'border-box',
              borderRadius: '10px',
              marginTop: '64px',
              marginRight: '10px',
              gap: '10px',
              marginLeft: drawerOpen ? '10px' : '10px',
            }}
          >
            <Box
              sx={{
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 'fit-content',
                // backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                height: 'fit-content',
              }}
            >
              <Typography variant="h4">Insights</Typography>
              <Typography variant="body2">Nutrient Distribution</Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 'auto',
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                height: 'fit-content',
              }}
            >
              <Typography variant="body2">August 28, 2024 9:41 PM</Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 'auto',
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                height: 'fit-content',
              }}
            >
              <Typography variant="body2">Image</Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'calc(50% - 10px)',
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                height: 'fit-content',
              }}
            >
              <Typography variant="body2">Ingredients</Typography>
            </Box>

            {/* "Next Column" box, which will appear in the next column */}
            <Box
              sx={{
                flexGrow: 0,
                flexShrink: 1,
                flexBasis: 'calc(50%)', // Ensure it starts on a new "column" or row
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                height: 'fit-content',
              }}
            >
              <Typography>Sodium Content</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'content', // Ensure it starts on a new "column" or row
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                height: 'fit-content',
              }}
            >
              <Typography>Information Key 1</Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'content', // Ensure it starts on a new "column" or row
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                height: 'fit-content',
              }}
            >
              <Typography>Information Key 2</Typography>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                flexShrink: 1,
                flexBasis: 'content',
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                height: 'fit-content',
              }}
            >
              <Typography>Information Key 3</Typography>
            </Box>

            {/* next box in a new column */}
            <Box sx={{
              flexGrow: 0,
              flexShrink: 1,
              flexBasis: 'calc(50%)', // Ensure it starts on a new "column" or row
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              height: 'fit-content',
            }}>
              <Typography>Macro-nutrient Profile</Typography>
            </Box>

            <Box sx={{
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 'auto',
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              height: 'fit-content',
            }}>
              <Typography>Process Level</Typography>
            </Box>

            <Box sx={{
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 'calc(50%)',
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              height: 'fit-content',
            }}>
              <Typography>Nutrient Facts</Typography>
            </Box>
          </Box>
        ) : (
          /* second section */
          <Box
            sx={{
              height: '100vh',
              width: '100%',
              overflow: 'auto',
              // border: '5px solid black',
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
              boxSizing: 'border-box',
              borderRadius: '10px',
              marginTop: '64px',
              marginRight: '10px',
              gap: '10px',
              marginLeft: drawerOpen ? '10px' : '10px',
            }}
          >
            {selectedImage ? (
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                borderRadius: '10px',
                height: 'fit-content',
                paddingLeft: '20px',
                paddingRight: '20px',
                gap: '20px'
              }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  backgroundColor: 'rgba(233, 234, 236, 0.5)',
                  borderRadius: '10px',
                  height: '100%',
                  alignText: 'left',
                  gap: '10px',
                  padding: '20px'
                }}>
                  <Typography style={{ marginBottom: '10px' }} variant='h4'>Image to Analyze</Typography>
                  <img
                    src={selectedImage.img}
                    alt={selectedImage.title}
                    style={{
                      width: '100%',
                      borderRadius: '4px'
                    }}
                  />
                </Box>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  height: '50%',
                  backgroundColor: 'rgba(233, 234, 236, 0.5)',
                  borderRadius: '10px',
                  height: 'fit-content',
                }}>
                  {analysisResult && (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: '100%',
                      backgroundColor: 'rgba(233, 234, 236, 0.5)',
                      borderRadius: '10px',
                      height: '100%',
                      alignText: 'left',
                      gap: '10px',
                      padding: '20px'
                    }}>
                      <Typography style={{ marginBottom: '10px' }} variant='h4'>Analysis Results</Typography>
                      <Typography>concept: confidence percentage %</Typography>
                      {analysisResult.outputs[0].data.concepts.map((concept, index) => (
                        <Typography key={index}>
                          {concept.name}: {(concept.value * 100).toFixed(2)}%
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: 'fit-content',
                borderRadius: '10px',
                height: 'fit-content',
                paddingLeft: '20px',
                paddingRight: '20px',
                gap: '20px'
              }}>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  backgroundColor: 'rgba(233, 234, 236, 0.5)',
                  borderRadius: '10px',
                  height: '100%',
                  alignText: 'left',
                  gap: '10px',
                  padding: '20px'
                }}>
                <Typography variant='h4'>Select an Image</Typography>
                <ImageList sx={{ width: 500, height: 450, borderRadius: '10px' }} cols={3} rowHeight={164}>
                  {itemData.map((item) => (
                    <ImageListItem key={item.img} onClick={() => handleImageClick(item)}>
                      <img
                        srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                        alt={item.title}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>

    </ThemeProvider>
  );
};

export default Analysis;

/*
<Container>
      {selectedImage ? (
        <Box>
          <img src={selectedImage.img} alt={selectedImage.title} style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
          <Button variant="outlined" onClick={() => handleAnalyzeImage(selectedImage.img)}>Analyze</Button>
          {analysisResult && (
            <Box>
              {analysisResult.outputs[0].data.concepts.map((concept, index) => (
                <Typography key={index}>
                  {concept.name}: {(concept.value * 100).toFixed(2)}%
                </Typography>
              ))}
            </Box>
          )}
        </Box>
      ) : (
        <ImageList cols={3} rowHeight={164}>
          {itemData.map((item) => (
            <ImageListItem key={item.img} onClick={() => handleImageClick(item)}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </Container>

# Model version ID is optional. It defaults to the latest model version, if omitted

curl -X POST "https://api.clarifai.com/v2/users/clarifai/apps/main/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs"   
-H "Authorization: Key 6bd0b7c74ee84bcc9d3b8219fc1f4865"  
-H "Content-Type: application/json"  
-d '{
    "inputs": [
      {
        "data": {
          "image": {
            "url": "https://samples.clarifai.com/metro-north.jpg"
          }
        }
      }
    ]
  }'

POST request url - 

https://api.clarifai.com/v2/users/clarifai/apps/main/models/food-item-recognition/versions/1d5fd481e0cf4826aa72ec3ff049e044/outputs

headers - 

Authorization: Key 6bd0b7c74ee84bcc9d3b8219fc1f4865
Content-Type: application/json

body - 

"inputs": [
      {
        "data": {
          "image": {
            "url": "https://samples.clarifai.com/metro-north.jpg"
          }
        }
      }
    ]

*/