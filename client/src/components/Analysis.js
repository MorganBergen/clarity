import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItemText, ListItemButton, Typography, AppBar, Toolbar } from '@mui/material';
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
import { BiSolidToggleLeft } from "react-icons/bi";
import { BiSolidToggleRight } from "react-icons/bi";
import { IoAlbums } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import clarifaiIcon from './clarifai.svg';
import gptIcon from './openai-dark.svg';
import usdaIcon from './usda-logo-color.svg';
import blueGrey from '@mui/material/colors/blueGrey';
import { FaBarcode } from 'react-icons/fa';

const pb = new PocketBase('http://127.0.0.1:8090');

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blueGrey[50],  //  color in rgb(65, 65, 65)
      light: blueGrey[100],
      dark: blueGrey[700],
    },
    secondary: {
      main: blueGrey[400],
      light: blueGrey[300],
      dark: blueGrey[700],
    },
    background: {
      default: blueGrey[50],
      paper: blueGrey[100],
    },
    text: {
      primary: blueGrey[50],
      secondary: blueGrey[400],
    }
  },
  // Rest of your existing theme configuration
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      fontSize: '25px',
      fontWeight: 500,
      color: blueGrey[900],
    },
    h4: {
      fontSize: '24px',
      fontWeight: 500,
      color: blueGrey[900],
    },
    body1: {
      fontSize: '15px',
      color: blueGrey[700],
    },
    body2: {
      fontSize: '12px',
      color: blueGrey[400],
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          boxShadow: 'none',
          border: 'none',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          backgroundColor: 'transparent',
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: 'rgba(233, 234, 236, 0.8)',
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '5px',
          fontSize: '12px',
          padding: '6px 16px',
        }
      }
    },
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#414141',
      light: '#6d6d6d',
      dark: '#2d2d2d',
    },
    secondary: {
      main: '#9c9c9c',
      light: '#cfcfcf',
      dark: '#6d6d6d',
    },
    background: {
      default: '#121212', // Dark background
      paper: 'rgba(18, 18, 18, 0.8)', // Dark paper background
    },
    text: {
      primary: '#ffffff', // Light text for dark mode
      secondary: '#9c9c9c',
    }
  },
  // Rest of the configuration remains the same as lightTheme
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      fontSize: '30px',
      fontWeight: 500,
      color: '', // Updated for dark mode
    },
    h4: {
      fontSize: '24px',
      fontWeight: 500,
      color: '#ffffff', // Updated for dark mode
    },
    body1: {
      fontSize: '15px',
      color: 'rgba(255, 255, 255, 0.7)', // Updated for dark mode
    },
    body2: {
      fontSize: '12px',
      color: '#9c9c9c',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#121212', // Dark background
          boxShadow: 'none',
          border: 'none',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          backgroundColor: 'rgba(18, 18, 18, 0.8)', // Dark background
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)', // Dark mode hover
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '5px',
          fontSize: '12px',
          padding: '6px 16px',
        }
      }
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        }
      }
    }
  }
});

const Analysis = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState('Upload');
  const [uploadIcon, setUploadIcon] = useState(<IoMdAttach color={blueGrey[900]} />);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const { userId } = useContext(UserContext);
  const [itemData, setItemData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFirstSection, setShowFirstSection] = useState(null);
  const [imageID, setImageID] = useState(null);
  const [gptResults, setGPTResults] = useState(null);
  const [usdaResults, setUSDAResults] = useState(null);
  const [aiyResults, setAIYResults] = useState(null);
  const [clarifaiResults, setClarifaiResults] = useState(null);
  const [theme, setTheme] = useState(lightTheme);

  const mainItems = [
    { text: 'Dashboard', icon: <GoHomeFill color={blueGrey[900]} /> },
    { text: 'Analysis', icon: <IoBarChart color={blueGrey[900]} /> },
    { text: 'Logging', icon: <FaCalendarAlt color={blueGrey[900]} /> },
    { text: 'Reports', icon: <IoDocument color={blueGrey[900]} /> },
    { text: buttonText, icon: uploadIcon },
  ];

  const bottomItems = [
    { text: 'Settings', icon: <IoSettingsSharp color={blueGrey[900]} /> },
    { text: 'Sign Out', icon: <TbLogout2 color={blueGrey[900]} /> },
  ];

  const toggleSection = () => {
    setShowFirstSection(!showFirstSection);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  const toggleTheme = () => {
    setDarkMode(!darkMode);
    setTheme(darkMode ? lightTheme : darkTheme);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && /\.(img|jpeg|jpg|heic)$/i.test(file.name)) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(2) + ' KB');
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
      setButtonText('Submit');
      setUploadIcon(<CloudUploadIcon color={blueGrey[900]} />);
    } else {
      alert('Please select a valid image file (.img, .jpeg, .jpg, .heic)');
    }
  };

  const handleUpload = async () => {

    if (!selectedFile || !userId) return;

    const formData = new FormData();
    formData.append('item', selectedFile);
    formData.append('userId', userId); 

    try {
      const response = await pb.collection('food').create(formData);
      console.log('Image uploaded successfully:', response);
      
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
          recordId: record.id,
        }));

        setItemData(formattedData);

      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [userId]);
  

  const handleImageClick = async (item) => {
    setSelectedImage(item);

    //  extract the id from the imageUrl and set it to a new variable called imageID
    setImageID(item.recordId);

  };

  const handleBackToList = () => {
    setSelectedImage(null);
  };

  const handleClarifaiAnalysis = async () => {

    if (!selectedImage || !imageID) return;

    try {

      const record = await pb.collection('food').getOne(imageID);

      if (record.clarifaiConfidence) {
        
        setClarifaiResults(record.clarifaiConfidence);

      } else {

        const response = await fetch(selectedImage.img);
        const imageBuffer = await response.arrayBuffer();
        const base64data = btoa(
          new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
 
        const clarifaiResponse = await fetch('http://localhost:5001/api/clarifai/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageId: imageID,
            imageBase64: base64data
          })
        });

        if (!clarifaiResponse.ok) {
          throw new Error('client - Clarifai analysis failed');
        }

        const updated_record = await pb.collection('food').getOne(imageID);
        setClarifaiResults(updated_record.clarifaiConfidence);

      }
      
    } catch (error) {
      console.error('Error performing clarifai analysis:', error);
    }
  };

  const handleGPTAnalysis = async () => {

    if (!selectedImage || !imageID) return;

    try {

      const record = await pb.collection('food').getOne(imageID);

      if (record.gpt_mini) {

        setGPTResults(record.gpt_mini);

      } else {

        //  fetch image data
        const response = await fetch(selectedImage.img);
        const imageBuffer = await response.arrayBuffer()
        const base64data = btoa(
          new Uint8Array(imageBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        //  api call to backend endpoint 
        const gptResponse = await fetch('http://localhost:5001/api/gpt/analyze-gpt', {

          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageId: imageID,
            imageBase64: base64data,
            clarifaiConfidence: record.clarifaiConfidence
          })
        });

        if (!gptResponse.ok) {
          throw new Error('GPT analysis failed');
        }

        setGPTResults(gptResponse);

      }

    } catch (error) {
      console.error('Error performing GPT analysis:', error);
    }
  };

  const handleUSDAAnalysis = async () => {
    const record = await pb.collection('food').getOne(imageID);
  
    let food_names = [];
  
    for (let i = 0; i < record.gpt_mini.food_items.length; i++) {
      food_names.push(record.gpt_mini.food_items[i].name);
      console.log(record.gpt_mini.food_items[i].name);
    }
  
    if (food_names.length === 0) return;
  
    try {
      const usda_responses = await Promise.all(
        food_names.map(async (food) => {
          const response = await fetch(`http://localhost:5001/api/usda?q=${encodeURIComponent(food)}`);
  
          if (!response.ok) {
            throw new Error(`Failed to fetch USDA data for ${food}`);
          }
          return response.json();
        })
      );
  
      console.log('USDA data for all foods:', usda_responses);
  
      // Update the record with stringified USDA data
      await pb.collection('food').update(imageID, {
        usda_data: JSON.stringify(usda_responses)
      });

      setUSDAResults(usda_responses);
  
    } catch (error) {
      console.error('Error fetching USDA data:', error);
    }
  };

  const handleAIYAnalysis = async () => {
    if (!selectedImage) return;

    try {
      //  get the record from the database
      const record = await pb.collection('food').getOne(selectedImage.recordId);

      //  check the record for aiy_analysis
      if (record.aiy_analysis) {
        console.log('AIY analysis already exists', record.aiy_analysis);
        setAIYResults(record.aiy_analysis);
        
      } else {

        //  fetch(selectedImage.img) is a http get request to download the actual image data from pocketbase's file storage
        //  response object contains the raw image data as a stream
        //  selectedImage.img is the url of the image, response is the raw image data
        const response = await fetch(selectedImage.img);

        //  image data is then converted to an ArrayBuffer
        const imageBuffer = await response.arrayBuffer();

        //  the ArrayBuffer is then converted into a base64 string
        const base64data = btoa(
          new Uint8Array(imageBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        /**
         * @param method: POST -  http method which is used to send data to the server
         * @param headers: { 'Content-Type': 'application/json' } -  header is set to json so the server can parse the body as json
         * @param body: { image: base64data } -  contains the image data converted to json with image as the base64 encoded string
         * 
         * @see  server/routes/api.js router.post('/api/aiy/analyze') - request handled by express middleware
         * @see  server/services/aiy/server.py -  request is forwarded from express middleware to the python service
         * 
         * client ->  express (:5001/api/aiy)
         * express -> python (:5002/analyze)
         */
        const aiyResponse = await fetch('http://localhost:5001/api/aiy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            image: base64data
          })
        });

        if (!aiyResponse.ok) {
          throw new Error('Failed to perform AIY analysis');
        }

        const analysisData = await aiyResponse.json();

        await pb.collection('food').update(selectedImage.recordId, {
          aiy_analysis: analysisData
        });

        setAIYResults(analysisData);

      }

    } catch (error) {
      console.log('Analysis.js ->  handleAIYAnalysis')
      console.error('Error performing AIY analysis:', error);
    }
  };

  const fetchProductData = async (barcode) => {
    console.log(barcode); // 099900100873

    try {
      const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
      if (response.data.status === 1) {
        console.log('Product data:', response.data.product);

        await pb.collection('food').update(imageID, {
          barcode_open_food_facts: JSON.stringify(response.data.product)
        });

        return response.data.product;
      } else {
        console.error('Product not found');
        return null;
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <AppBar>
          <Toolbar>
            <button className="menu-toggle-button" style={{ marginLeft: '-10px' }} onClick={toggleDrawer}>
              {drawerOpen ? <TbLayoutSidebarLeftCollapseFilled size={20} /> : <TbLayoutSidebarLeftExpandFilled size={20} />}
            </button>

            <Typography variant="h3" noWrap component="div" sx={{ flexGrow: 1, marginLeft: '10px' }}>
              Clarity
            </Typography>

            <button className="menu-toggle-button" onClick={() => fetchProductData('099900100873')} style={{ marginLeft: '10px' }}>
              <FaBarcode size={20} />
            </button>

            {/* clarifai confidence */}
            <button className="menu-toggle-button" onClick={handleClarifaiAnalysis} style={{ marginLeft: '10px' }}>
              <img src={clarifaiIcon} alt="Clarifai" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            </button>

            {/* gpt analysis */}
            <button className="menu-toggle-button" onClick={handleGPTAnalysis} style={{ marginLeft: '10px' }} disabled={!selectedImage}>
              <img src={gptIcon} alt="openai icon" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            </button>

            {/* usda analysis */}
            <button className="menu-toggle-button" onClick={handleUSDAAnalysis} style={{ marginLeft: '10px' }}>
              <img src={usdaIcon} alt="usda icon" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            </button>

            {/* aiy by google analysis */}
            <button className="menu-toggle-button" onClick={handleAIYAnalysis} style={{ marginLeft: '10px' }}>
              <FcGoogle size={20} />
            </button>

            {/* toggle between first and second sections */}
            <button className="menu-toggle-button" onClick={toggleSection} style={{ marginLeft: '10px' }} >
              {showFirstSection ? <BiSolidToggleRight size={20} /> : <BiSolidToggleLeft size={20} />}
            </button>

            {/* back to list */}
            <button className="menu-toggle-button" onClick={handleBackToList} style={{ marginLeft: '10px' }}>
              {selectedImage ? <IoAlbums size={20} /> : <IoAlbums size={20} />}
            </button>

            {/* toggle theme */}
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
                flexBasis: 'content',
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
              marginRight: '0px',
              gap: '10px',
              marginLeft: drawerOpen ? '0px' : '0px',
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
                  borderRadius: '10px',
                }}>

                  {/* aiy results */}
                  {aiyResults && ( 
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 'fit-content',
                      backgroundColor: 'rgba(233, 234, 236, 0.5)',
                      borderRadius: '10px',
                      height: 'fit-content',
                      alignText: 'left',
                      gap: '10px',
                      padding: '20px',
                    }}>
                      <Typography style={{ marginBottom: '10px' }} variant='h4'>record.aiy</Typography>
                      <code style={{ whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(aiyResults, null, 2)}
                      </code>
                    </Box>
                  )}

                  {/* usda results */}
                  {usdaResults && (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 'fit-content',
                      backgroundColor: 'rgba(233, 234, 236, 0.5)',
                      borderRadius: '10px',
                      height: 'fit-content',
                      alignText: 'left',
                      gap: '10px',
                      padding: '20px',
                    }}>
                      <Typography style={{ marginBottom: '10px' }} variant='h4'>record.usda_data</Typography>
                      <code style={{ whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(usdaResults, null, 2)}
                      </code>
                    </Box>
                  )}

                  {gptResults && (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 'fit-content',
                      backgroundColor: 'rgba(233, 234, 236, 0.5)',
                      borderRadius: '10px',
                      height: 'fit-content',
                      alignText: 'left',
                      gap: '10px',
                      padding: '20px',
                    }}>
                      <Typography style={{ marginBottom: '10px' }} variant='h4'>record.gpt_mini</Typography>
                      <code style={{ whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(gptResults, null, 2)}
                      </code>
                    </Box>
                  )}

                  {clarifaiResults && (
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: 'fit-content',
                      backgroundColor: 'rgba(233, 234, 236, 0.5)',
                      borderRadius: '10px',
                      height: 'fit-content',
                      alignText: 'left',
                      gap: '10px',
                      padding: '20px',
                    }}>
                      <Typography style={{ marginBottom: '10px' }} variant='h4'>record.clarifaiConfidence.concepts</Typography>
                      <code style={{ whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(clarifaiResults, null, 2)}
                      </code>
                    </Box>
                  )}
                </Box>
              </Box>
            ) : (
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                width: 'fit-content',
                height: 'fit-content',
                borderRadius: '10px',
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
