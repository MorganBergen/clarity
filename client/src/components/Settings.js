import React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import './MainDashboard.css';
import PocketBase from 'pocketbase';
import { UserContext } from '../context/UserContext';

const pb = new PocketBase('http://127.0.0.1:8090');

const Settings = () => {
  const { userId } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        try {
          const userRecord = await pb.collection('users').getOne(userId);
          setUserData(userRecord);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };
    fetchUserData();
  }, [userId]);

  const mainItems = [
    { text: 'Dashboard' },
    { text: 'Analysis' },
    { text: 'Logging' },
    { text: 'Reports' },
  ];

  const bottomItems = [
    { text: 'Settings' },
    { text: 'Sign Out' },
  ];

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
        </Box>
      </Drawer>
    </Box>
  );
};

export default Settings;