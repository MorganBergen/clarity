import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItemText, Typography, AppBar, Toolbar, ListItemButton } from '@mui/material';
import PocketBase from 'pocketbase';
import { UserContext } from '../context/UserContext';
import './MainDashboard.css';
import { TbLayoutSidebarLeftCollapseFilled } from "react-icons/tb";
import { TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { IoBarChart } from "react-icons/io5";
import { FaCalendarAlt } from "react-icons/fa";
import { IoDocument } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import { IoMdAttach } from "react-icons/io";
import { IoSettingsSharp } from "react-icons/io5"; // https://react-icons.github.io/react-icons/search/#q=logout
import { TbLogout2 } from "react-icons/tb";
import { BarChart } from '@mui/x-charts';
import { Gauge } from '@mui/x-charts/Gauge';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import blueGrey from '@mui/material/colors/blueGrey';
import grey from '@mui/material/colors/grey';

const pb = new PocketBase('http://127.0.0.1:8090');

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: grey[50],  
      light: grey[100],
      dark: grey[700],
    },
    secondary: {
      main: grey[400],
      light: grey[300],
      dark: grey[700],
    },
    background: {
      default: grey[50],
      paper: grey[100],
    },
    text: {
      primary: grey[50],
      secondary: grey[400],
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      fontSize: '25px',
      fontWeight: 500,
      color: grey[900],
    },
    h4: {
      fontSize: '24px',
      fontWeight: 500,
      color: grey[900],
    },
    body1: {
      fontSize: '15px',
      color: grey[700],
    },
    body2: {
      fontSize: '12px',
      color: grey[400],
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: 'none',
          backgroundColor: 'white',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
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
    MuiList: {
      styleOverrides: {
        root: {
          
        }
      }
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: grey[900],
      light: grey[800],
      dark: grey[700],
    },
    secondary: {
      main: grey[400],
      light: grey[300],
      dark: grey[700],
    },
    background: {
      default: grey[900],
      paper: 'black', // Dark paper background
    },
    text: {
      primary: grey[50],
      secondary: grey[400],
    }
  },
  // Rest of the configuration remains the same as lightTheme
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h3: {
      fontSize: '25px',
      fontWeight: 500,
      color: grey[50], 
    },
    h4: {
      fontSize: '24px',
      fontWeight: 500,
      color: grey[50],
    },
    body1: {
      fontSize: '15px',
      color: grey[50],
    },
    body2: {
      fontSize: '12px',
      color: grey[400],
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: 'none',
          backgroundColor: '#000000',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
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
          
        }
      }
    }
  }
});

const MainDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [buttonText, setButtonText] = useState('Upload');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const { userId } = useContext(UserContext);
  const [uploadIcon, setUploadIcon] = useState(<IoMdAttach color="#414141" />);
  const [darkMode, setDarkMode] = useState(false);
  const [theme, setTheme] = useState(lightTheme);
    
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    setTheme(darkMode ? lightTheme : darkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

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

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && /\.(img|jpeg|jpg|heic)$/i.test(file.name)) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize((file.size / 1024).toFixed(2) + ' KB');
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
      setButtonText('Submit');
      setUploadIcon(<MdCloudUpload color="#414141" />);
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
      setUploadIcon(<IoMdAttach />); // Reset icon to AttachmentIcon
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
    <CssBaseline />
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
              backgroundColor: 'white',
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

        {/* TOTAL PAGE */}

        <Box sx={{
          marginTop: '65px',
          marginRight: '10px',
          marginBottom: '20px',
          marginLeft: drawerOpen ? '10px' : '10px',
          display: 'flex',
          flexDirection: 'row',
          gap: '10px',
          width: '100%',
          overflow: 'auto',
        }}>

          {/* LEFT SIDE */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            boxSizing: 'border-box',
            borderRadius: '10px',
            width: '100%',
          }}>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
              height: '350px',
              overflow: 'visible',
            }}>

              <Typography variant="h6">Today's Summary</Typography>
              <Typography variant="body2">Nutrient Distribution</Typography>

              <BarChart
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 0,
                  left: 100
                }}
                width={500}
                height={200}
                layout="horizontal"
                xAxis={[{
                  scaleType: 'linear',
                  data: [0, 5, 10, 15, 20]
                }]}
                yAxis={[{
                  scaleType: 'band',
                  data: ['Vitamins', 'Protein', 'Carbohydrates', 'Fatty Acids', 'Fats', 'Minerals', 'Other']
                }]}
                series={[
                  { data: [11, 2, 5, 1, 1, 1, 1], stack: 'A', label: 'Series A1' },
                  { data: [2, 8, 1, 6, 1, 1, 12], stack: 'A', label: 'Series A2' },
                  { data: [14, 6, 5, 1, 1, 1, 1], stack: 'A', label: 'Series B1' },
                  { data: [14, 6, 5, 2, 1, 1, 1], stack: 'A', label: 'Series B1' },
                  { data: [14, 6, 5, 1, 7, 1, 1], stack: 'A', label: 'Series B1' },
                  { data: [3, 6, 5, 9, 1, 1, 14], stack: 'A', label: 'Series B1' },
                ]}
                slotProps={{
                  legend: {
                    direction: 'row',
                    hidden: true,
                    position: { vertical: 'bottom', horizontal: 'middle' },
                    padding: 0
                  }
                }}
              />
            </Box>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
            }}>
              <Typography variant="h6">Calorie Intake</Typography>
              <Typography variant="body2">Total calories consumed today</Typography>
              <Gauge width={100} height={100} value={60} startAngle={-90} endAngle={90} />
            </Box>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
            }}>
              <Typography variant="h6">Logging</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>

            </Box>

          </Box>

          {/* RIGHT SIDE */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '10px',
            borderRadius: '10px',
            alignItems: 'flex-start',
            alignContent: 'flex-start',
          }}>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
              width: 'calc(33.33% - 14px)', // This ensures 3 boxes per row with gap consideration
              minWidth: '170px', // Minimum width to prevent boxes from becoming too narrow
            }}>
              <Typography variant="h6">Carbohydrates</Typography>
              <ListItemText>
                <Typography variant="body2">Carbohydrates</Typography>
                <Typography variant="body2">Sugars</Typography>
                <Typography variant="body2">Sucrose</Typography>
                <Typography variant="body2">Glucose</Typography>
                <Typography variant="body2">Fructose</Typography>
                <Typography variant="body2">Lactose</Typography>
                <Typography variant="body2">Maltose</Typography>
                <Typography variant="body2">Maltodextrin</Typography>
                <Typography variant="body2">Starch</Typography>
                <Typography variant="body2">Polyols</Typography>
              </ListItemText>
            </Box>


            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
              width: 'calc(33.33% - 14px)', // This ensures 3 boxes per row with gap consideration
              minWidth: '170px', // Minimum width to prevent boxes from becoming too narrow
            }}>
              <Typography variant="h6">Vitamins</Typography>
              <ListItemText>
                <Typography variant="body2">Vitamin A</Typography>
                <Typography variant="body2">Vitamin D</Typography>
                <Typography variant="body2">Vitamin E</Typography>
                <Typography variant="body2">Vitamin C</Typography>
                <Typography variant="body2">Vitamin B1</Typography>
                <Typography variant="body2">Vitamin B12</Typography>
                <Typography variant="body2">Vitamin PP</Typography>
                <Typography variant="body2">Vitamin B2</Typography>
                <Typography variant="body2">Vitamin B6</Typography>
                <Typography variant="body2">Vitamin B9</Typography>
                <Typography variant="body2">Biotin</Typography>
                <Typography variant="body2">Pantothenic Acid</Typography>
              </ListItemText>
            </Box>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
              width: 'calc(33.33% - 14px)', // This ensures 3 boxes per row with gap consideration
              minWidth: '170px', // Minimum width to prevent boxes from becoming too narrow
            }}>
              <Typography variant="h6">Minerals</Typography>
              <ListItemText>
                <Typography variant="body2">Calcium</Typography>
                <Typography variant="body2">Phosphorus</Typography>
                <Typography variant="body2">Magnesium</Typography>
                <Typography variant="body2">Sodium</Typography>
                <Typography variant="body2">Potassium</Typography>
                <Typography variant="body2">Chloride</Typography>
                <Typography variant="body2">Iron</Typography>
                <Typography variant="body2">Zinc</Typography>
                <Typography variant="body2">Copper</Typography>
                <Typography variant="body2">Manganese</Typography>
                <Typography variant="body2">Fluoride</Typography>
                <Typography variant="body2">Selenium</Typography>
                <Typography variant="body2">Chromium</Typography>
                <Typography variant="body2">Iodine</Typography>
              </ListItemText>
            </Box>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
              width: 'calc(33.33% - 14px)', // This ensures 3 boxes per row with gap consideration
              minWidth: '170px', // Minimum width to prevent boxes from becoming too narrow
            }}>
              <Typography variant="h6">Proteins</Typography>
              <ListItemText>
                <Typography variant="body2">Protein</Typography>
                <Typography variant="body2">Casein</Typography>
                <Typography variant="body2">Serum Protein</Typography>
                <Typography variant="body2">Nucleotides</Typography>
              </ListItemText>
            </Box>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
              width: 'calc(33.33% - 14px)', // This ensures 3 boxes per row with gap consideration
              minWidth: '170px', // Minimum width to prevent boxes from becoming too narrow
            }}>
              <Typography variant="h6">Fats</Typography>
              <ListItemText>
                <Typography variant="body2">Fat</Typography>
                <Typography variant="body2">Saturated Fat</Typography>
                <Typography variant="body2">Monounsaturated Fat</Typography>
                <Typography variant="body2">Polyunsaturated Fat</Typography>
                <Typography variant="body2">Trans Fats</Typography>
              </ListItemText>
            </Box>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
              width: 'calc(33.33% - 14px)', // This ensures 3 boxes per row with gap consideration
              minWidth: '170px', // Minimum width to prevent boxes from becoming too narrow
            }}>
              <Typography variant="h6">Other</Typography>
              <ListItemText>
                <Typography variant="body2">Fiber</Typography>
                <Typography variant="body2">Silica</Typography>
                <Typography variant="body2">Alcohol</Typography>
                <Typography variant="body2">Caffeine</Typography>
                <Typography variant="body2">pH</Typography>
              </ListItemText>
            </Box>

            <Box sx={{
              backgroundColor: 'rgba(233, 234, 236, 0.5)',
              borderRadius: '10px',
              padding: '10px',
              flexDirection: 'column',
              display: 'flex',
              width: 'calc(33.33% - 14px)', // This ensures 3 boxes per row with gap consideration
              minWidth: '170px', // Minimum width to prevent boxes from becoming too narrowminWidth: '250px', // Minimum width to prevent boxes from becoming too narrow
            }}>
              <Typography variant="h6">Fatty Acids</Typography>
              <ListItemText>
                <Typography variant="body2">Butyric Acid</Typography>
                <Typography variant="body2">Caprylic Acid</Typography>
                <Typography variant="body2">Lauric Acid</Typography>
                <Typography variant="body2">Omega-3</Typography>
                <Typography variant="body2">Omega-6</Typography>
                <Typography variant="body2">Omega-9</Typography>
                <Typography variant="body2">Palmitic Acid</Typography>
                <Typography variant="body2">Myristic Acid</Typography>
                <Typography variant="body2">Stearic Acid</Typography>
                <Typography variant="body2">Gamma-Linolenic Acid</Typography>
                <Typography variant="body2">Nervonic Acid</Typography>
                <Typography variant="body2">Behenic Acid</Typography>
              </ListItemText>
            </Box>
          </Box>
        </Box>
      </Box>
      </ThemeProvider>
  );
};

export default MainDashboard;