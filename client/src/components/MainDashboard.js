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
import { Gauge } from '@mui/x-charts/Gauge';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import grey from '@mui/material/colors/grey';
import { BarChart } from '@mui/x-charts/BarChart';
import { arc } from "d3-shape"
import { scaleLinear } from "d3-scale"


const pb = new PocketBase('http://127.0.0.1:8090');

pb.autoCancellation(false);

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: grey[500],
      light: grey[100],
      dark: grey[700],
    },
    secondary: {
      main: grey[400],
      light: grey[300],
      dark: grey[700],
    },
    background: {
      default: 'white',
      paper: 'white',
    },
    text: {
      primary: grey[500],
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
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          background: 'white',
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
      default: 'black',
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
          backgroundColor: 'black',
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: 'black',
        }
      }
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          border: 'none',
          backgroundColor: 'black',
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
  const [recordImage, setRecordImage] = useState(null);


  const [alldata, setAlldata] = useState(null);

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
      return imageUrl;
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  useEffect(() => {
    const loadImage = async () => {
      const imageUrl = await fetchImage('j394xy12jyylwwv');
      setRecordImage(imageUrl);
    };
    loadImage();
  }, []);

  useEffect(() => {
    const load_data = async () => {
      const record = await pb.collection('food').getOne('j394xy12jyylwwv');
      const pared_record = JSON.stringify(record.gpt_mini);
      setAlldata(pared_record);
    }
    load_data();
  }, []);

  //  macro_calories[0], macro_calories[1]
  const calories = [2000, "kcal"];

  //  daily values
  //  3000+800+15+90+1.2+1.3+1.7+2.4+16+30+5
  //  2500+700+5+50+0.5+0.9+1.5+2.0+10+25+2
  const vitamins = [3296.9, 3962.6, "%"];
  const micro_vitamins_vitamin_a = [2500, 3000, "IU"];
  const micro_vitamins_vitamin_d = [700, 800, "IU"];
  const micro_vitamins_vitamin_e = [5, 15, "mg"];
  const micro_vitamins_vitamin_c = [50, 90, "mg"];
  const micro_vitamins_vitamin_b1 = [0.5, 1.2, "mg"];
  const micro_vitamins_vitamin_b2 = [0.9, 1.3, "mg"];
  const micro_vitamins_vitamin_b6 = [1.5, 1.7, "mg"];
  const micro_vitamins_vitamin_b12 = [2.0, 2.4, "µg"];
  const micro_vitamins_vitamin_pp = [10, 16, "mg"];
  const micro_vitamins_biotin = [25, 30, "µg"];
  const micro_vitamins_pantothenic_acid = [2, 5, "mg"];


  const minerals = [774.4000000000001, "mg"];
  const micro_minerals = [774.4000000000001, "mg"];
  const micro_minerals_calcium = [1000, "mg"];
  const micro_minerals_phosphorus = [700, "mg"];
  const micro_minerals_magnesium = [400, "mg"];
  const micro_minerals_sodium = [2300, "mg"];
  const micro_minerals_potassium = [3500, "mg"];
  const micro_minerals_chloride = [2300, "mg"];
  const micro_minerals_iron = [18, "mg"];
  const micro_minerals_zinc = [11, "mg"];
  const micro_minerals_copper = [0.9, "mg"];
  const micro_minerals_manganese = [2.3, "mg"];
  const micro_minerals_fluoride = [4, "mg"];
  const micro_minerals_selenium = [55, "µg"];
  const micro_minerals_chromium = [35, "µg"];
  const micro_minerals_iodine = [150, "µg"];

  const protein = [150, "g"];
  const micro_proteins_casein = [0, "g"];
  const micro_proteins_serum_protein = [0, "g"];
  const micro_proteins_nucleotides = [0, "g"];

  const fats = [70, "g"];
  const micro_fats_saturated_fat = [20, "g"];
  const micro_fats_monounsaturated_fat = [25, "g"];
  const micro_fats_polyunsaturated_fat = [15, "g"];
  const micro_fats_trans_fats = [0, "g"];

  const fatty_acids = [2, "g"];
  const micro_fatty_acids_butyric_acid = [0, "g"];
  const micro_fatty_acids_caprylic_acid = [0, "g"];
  const micro_fatty_acids_lauric_acid = [0, "g"];
  const micro_fatty_acids_omega_3 = [1.6, "g"];
  const micro_fatty_acids_omega_6 = [17, "g"];
  const micro_fatty_acids_omega_9 = [0, "g"];
  const micro_fatty_acids_palmitic_acid = [0, "g"];
  const micro_fatty_acids_myristic_acid = [0, "g"];
  const micro_fatty_acids_stearic_acid = [0, "g"];
  const micro_fatty_acids_gamma_linolenic_acid = [0, "g"];
  const micro_fatty_acids_nervonic_acid = [0, "g"];
  const micro_fatty_acids_behenic_acid = [0, "g"];

  const carbohydrates = [250, "g"];
  const micro_carbohydrates_sugars = [230, "g"];
  const micro_carbohydrates_sucrose = [50, "g"];
  const micro_carbohydrates_glucose = [30, "g"];
  const micro_carbohydrates_fructose = [20, "g"];
  const micro_carbohydrates_lactose = [0, "g"];
  const micro_carbohydrates_maltose = [0, "g"];
  const micro_carbohydrates_maltodextrin = [0, "g"];
  const micro_carbohydrates_starch = [50, "g"];
  const micro_carbohydrates_polyols = [0, "g"];

  const other = [10.6, "g"];
  const micro_other_fiber = [30, "g"];
  const micro_other_silica = [0.8, "g"];
  const micro_other_alcohol = [0, "g"];
  const micro_other_caffeine = [150, "mg"];
  const micro_other_ph = [0, "g"];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', backgroundColor: (theme) => theme.palette.mode === 'light' ? 'white' : 'black' }}>
        <AppBar>
          <Toolbar sx={{}}>
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
              backgroundColor: (theme) => theme.palette.mode === 'light' ? 'rgba(233, 234, 236, 0.5)' : 'black',
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
          backgroundColor: (theme) => theme.palette.mode === 'light' ? 'white' : 'black', // Conditional color
          border: 'none',
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
              border: 'none',
              padding: '10px',
              flexDirection: 'column  ',
              display: 'flex',
              height: 'auto',
              width: '100%',
              overflow: 'visible',
            }}>
              <Typography variant="h3">Today's Summary</Typography>
              <Typography variant="body1">Nutrient Distribution</Typography>
              <Box padding={0}>
                <BarChart
                  seriesType="band"
                  xAxis={[{
                    width: 100,
                    type: 'linear',
                    min: 0,
                    max: 16,
                    title: 'Nutrient Distribution',
                    label: 'daily value total',
                    labelFontSize: 10,
                    tickLabelPlacement: 'middle',
                    tickSize: 5,
                    tickInterval: 'auto',
                  }]}
                  yAxis={[{
                    scaleType: 'band',
                    tickLabelPlacement: 'middle',
                    tickSize: 5,
                    tickInterval: 'auto',
                    data: ['vitamins', 'protein', 'carbohydrates', 'fatty acids', 'fats', 'minerals', 'other'],
                  }]}
                  margin={{ left: 80 }}
                  sx={{
                    border: '0px solid #e0e0e0',
                    borderRadius: '10px',
                    color: '#FFFFFF',
                    margin: '10px',
                  }}
                  borderRadius={5}
                  width={750}
                  height={500}
                  layout="horizontal"
                  slotProps={{ legend: { hidden: true } }}
                  series={[
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin a', color: '#E0F2E9' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin d', color: '#C3E4D0' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin e', color: '#A4D5B7' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin c', color: '#85C79D' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin b1', color: '#67B984' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin b12', color: '#4AAA6B' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin pp', color: '#2F9B52' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin b2', color: '#178B3A' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin b6', color: '#007921' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'vitamin b9', color: '#006618' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'biotin', color: '#004D10' },
                    { data: [1, 0, 0, 0, 0, 0, 0], stack: 'stack', label: 'pantothenic acid', color: '#00330A' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'calcium', color: '#E0FFF8' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'phosphorus', color: '#BEFFF0' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'magnesium', color: '#A2FFEA' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'sodium', color: '#7AFFE1' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'potassium', color: '#47FFD6' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'chloride', color: '#0EFBC6' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'iron', color: '#00E6C8' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'zinc', color: '#00CCB1' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'copper', color: '#00AD96' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'manganese', color: '#008B8B' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'fluoride', color: '#005F5F' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'selenium', color: '#004B49' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'chromium', color: '#2F4F4F' },
                    { data: [0, 0, 0, 0, 0, 1, 0], stack: 'stack', label: 'iodine', color: '#36454F' },
                    { data: [0, 1, 0, 0, 0, 0, 0], stack: 'stack', label: 'protein', color: '#0D47A1' },
                    { data: [0, 1, 0, 0, 0, 0, 0], stack: 'stack', label: 'casein', color: '#1565C0' },
                    { data: [0, 1, 0, 0, 0, 0, 0], stack: 'stack', label: 'serum protein', color: '#42A5F5' },
                    { data: [0, 1, 0, 0, 0, 0, 0], stack: 'stack', label: 'nucleotides', color: '#81D4FA' },
                    { data: [0, 0, 0, 0, 1, 0, 0], stack: 'stack', label: 'fats', color: '#FF9595' },
                    { data: [0, 0, 0, 0, 1, 0], stack: 'stack', label: 'saturated fat', color: '#FF6262' },
                    { data: [0, 0, 0, 0, 1, 0], stack: 'stack', label: 'monounsaturated fat', color: '#FF0000' },
                    { data: [0, 0, 0, 0, 1, 0], stack: 'stack', label: 'polyunsaturated fat', color: '#C00000' },
                    { data: [0, 0, 0, 0, 1, 0], stack: 'stack', label: 'trans fats', color: '#7A0200' },
                    { data: [0, 0, 0, 1, 0, 0], stack: 'stack', label: 'butyric acid', color: '#FFF3E0' },
                    { data: [0, 0, 0, 1, 0, 0], stack: 'stack', label: 'caprylic acid', color: '#FFE0B2' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'lauric acid', color: '#FFCC80' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'omega 3', color: '#FFB74D' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'omega 6', color: '#FFA726' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'omega 9', color: '#FF9800' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'palmitic acid', color: '#FB8C00' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'myristic acid', color: '#F57C00' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'stearic acid', color: '#EF6C00' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'gamma linolenic acid', color: '#E65100' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'nervonic acid', color: '#D84315' },
                    { data: [0, 0, 0, 1, 0, 0, 0], stack: 'stack', label: 'behenic acid', color: '#BF360C' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'carbohydrates', color: '#FDDEFF' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'sugars', color: '#FABFFF' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'sucrose', color: '#F7A1FF' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'glucose', color: '#F47BFF' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'fructose', color: '#DF57FB' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'lactose', color: '#8945FF' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'maltose', color: '#711FFF' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'maltodextrin', color: '#5D00FE' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'starch', color: '#4B0082' },
                    { data: [0, 0, 1, 0, 0, 0, 0], stack: 'stack', label: 'polyols', color: '#330366' },
                    { data: [0, 0, 0, 0, 0, 0, 1], stack: 'stack', label: 'fiber', color: '#FFFFFF' },
                    { data: [0, 0, 0, 0, 0, 0, 1], stack: 'stack', label: 'silica', color: '#BFBFBF' },
                    { data: [0, 0, 0, 0, 0, 0, 1], stack: 'stack', label: 'alcohol', color: '#999999' },
                    { data: [0, 0, 0, 0, 0, 0, 1], stack: 'stack', label: 'caffeine', color: '#666666' },
                    { data: [0, 0, 0, 0, 0, 0, 1], stack: 'stack', label: 'ph', color: '#373737' },
                  ]}
                  tooltip={{
                    trigger: 'item',
                  }}
                />
              </Box>
            </Box>
            <Box sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '10px',
              width: '100%',
            }}>
              <Box sx={{
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                padding: '10px',
                flexDirection: 'column',
                display: 'flex',
                width: '30%',
              }}>
                <Typography variant="h3">Calorie Intake</Typography>
                <Typography variant="body1">Total</Typography>
                <Typography sx={{ marginTop: 'auto', fontSize: '25px', color: '#008B8B' }}>1,500</Typography>

                <Gauge width={100} height={100} value={75} startAngle={-90} endAngle={90} />

              </Box>

              <Box sx={{
                backgroundColor: 'rgba(233, 234, 236, 0.5)',
                borderRadius: '10px',
                padding: '10px',
                flexDirection: 'column',
                display: 'flex',
                width: '100%'
              }}>
                <Box>
                  <Typography variant="h6">Logging</Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  {recordImage && (
                    <img
                      src={recordImage}
                      alt="calorie intake image"
                      style={{ width: '150px', height: '150px', borderRadius: '10px', marginLeft: '20px' }}
                    />
                  )}



                </Box>
              </Box>



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