import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  TextField,
  Button,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  AccountCircle,
  Dashboard as DashboardIcon,
  Assessment as AssessmentIcon,
  CalendarMonth as CalendarMonthIcon,
  Report as ReportIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  CloudUpload as CloudUploadIcon,
  Attachment as AttachmentIcon,
} from '@mui/icons-material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { UserContext } from '../context/UserContext';
import PocketBase from 'pocketbase';
import './MainDashboard.css';

// React Icons
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoBarChart, IoDocument, IoMdAttach, IoSettingsSharp, IoAlbums } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { BiSolidToggleLeft, BiSolidToggleRight } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";

// Custom Icons
import clarifaiIcon from './clarifai.svg';
import gptIcon from './openai-dark.svg';
import usdaIcon from './usda-logo-color.svg';

// Colors
import blueGrey from '@mui/material/colors/blueGrey';

const pb = new PocketBase('http://127.0.0.1:8090');

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: blueGrey[100],  //  color in rgb(65, 65, 65)
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
    
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-input': {
              color: blueGrey[400], // Text color inside the input
            },
            '& .MuiInputLabel-root': {
              color: blueGrey[700], // Label color
              '&.Mui-focused': {
                color: blueGrey[900], // Label color when focused
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: blueGrey[900], // Default border color
              },
              '&:hover fieldset': {
                
              },
              '&.Mui-focused fieldset': {
                borderColor: blueGrey[900], // Border color when focused
              },
            },
          },
        },
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

const Settings = () => {

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState('Upload');
  const [uploadIcon, setUploadIcon] = useState(<AttachmentIcon />);
  const { userId } = useContext(UserContext); // Get userId from context
  const [userData, setUserData] = useState(null);
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [fileSize, setFileSize] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFirstSection, setShowFirstSection] = useState(null);
  const [imageID, setImageID] = useState(null);
  const [gptResults, setGPTResults] = useState(null);
  const [usdaResults, setUSDAResults] = useState(null);
  const [aiyResults, setAIYResults] = useState(null);
  const [clarifaiResults, setClarifaiResults] = useState(null);
  const [theme, setTheme] = useState(lightTheme);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const handleUserDataChange = async (e) => {

    const { name, value } = e.target;

    const updatedUserData = {
      ...userData,
      [name]: value
    };

    setUserData(updatedUserData);

    try {
      await pb.collection('users').update(userId, {
        [name]: value
      });
    } catch (error) {
      console.log('Error updating user data:', error);
    }
  };

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

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          console.log(`user record:`);

          const userRecord = await pb.collection('users').getOne(userId);
          setUserData(userRecord);
          console.log(userRecord);

          let id = userRecord.id;

          const questionnaireRecord = await pb.collection('questionnaire').getFirstListItem(`userId="${id}"`);
          console.log(questionnaireRecord);
          setQuestionnaireData(questionnaireRecord);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [userId]);


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
    } catch (error) {
      console.error('Error fetching image:', error);
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
  <Container sx={{ display: 'flex', marginTop: '64px', marginLeft: drawerOpen ? '10px' : '10px', alignItems: 'left', height: '100vh' }}>

      {userData && (
      <Box sx={{ padding: 2 }}>
        <h3>User Information</h3>
        {isEditing ? (
          <>
            <TextField
              name="username"
              label="Username"
              value={userData.username}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="email"
              label="Email"
              value={userData.email}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="name"
              label="Name"
              value={userData.name}
              onChange={handleUserDataChange}
              fullWidth
              margin="normal"
            />
            <Button 
              variant="contained" 
              onClick={() => setIsEditing(false)}
              sx={{ mt: 2 }}
            >
              Save Changes
            </Button>
          </>
        ) : (
          <>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <p>Name: {userData.name}</p>
            <p>Created: {new Date(userData.created).toLocaleString()}</p>
            <p>Updated: {new Date(userData.updated).toLocaleString()}</p>
            <Button 
              variant="contained" 
              onClick={() => setIsEditing(true)}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </>
        )}
        </Box>
      )}
      
      </Container>
    </Box>
    </ThemeProvider>
  );
};

export default Settings;

/**
 
{userData && (
        <Box sx={{ padding: 2 }}>
          <h3>User Information</h3>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <p>Name: {userData.name}</p>
          <p>Created: {new Date(userData.created).toLocaleString()}</p>
          <p>Updated: {new Date(userData.updated).toLocaleString()}</p>
        </Box>
      )}
      {questionnaireData && (
        <Box sx={{ padding: 2 }}>
          <h3>Questionnaire Data</h3>
          <p>First Name: {questionnaireData.firstName}</p>
          <p>Last Name: {questionnaireData.lastName}</p>
          <p>Age: {questionnaireData.age}</p>
          <p>Sex: {questionnaireData.sex}</p>
          <p>Activity Level: {questionnaireData.activityLevel}</p>
          <p>Medications: {Array.isArray(questionnaireData.medications) ? questionnaireData.medications.join(', ') : questionnaireData.medications}</p>
          <p>Current Weight: {questionnaireData.currentWeight}</p>
          <p>Target Weight: {questionnaireData.targetWeight}</p>
          <p>Conditions: {Array.isArray(questionnaireData.conditions) ? questionnaireData.conditions.join(', ') : questionnaireData.conditions}</p>
          <p>Family Conditions: {Array.isArray(questionnaireData.familyConditions) ? questionnaireData.familyConditions.join(', ') : questionnaireData.familyConditions}</p>
          <p>Dietary Preference: {questionnaireData.dietaryPreference}</p>
          <p>Allergies: {Array.isArray(questionnaireData.allergies) ? questionnaireData.allergies.join(', ') : questionnaireData.allergies}</p>
          <p>Fitness Goals: {Array.isArray(questionnaireData.fitnessGoals) ? questionnaireData.fitnessGoals.join(', ') : questionnaireData.fitnessGoals}</p>
          <p>Diet History: {questionnaireData.dietHistory}</p>
          <p>Vitamins: {Array.isArray(questionnaireData.vitamins) ? questionnaireData.vitamins.join(', ') : questionnaireData.vitamins}</p>
          <p>Alcohol Use: {questionnaireData.alcoholUse}</p>
          <p>Tobacco Use: {questionnaireData.tobaccoUse}</p>
        </Box>
      )}

 */