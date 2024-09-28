import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import './MainDashboard.css';
import { useProfile } from './Profile';

const Settings = () => {
    const { profile } = useProfile();
  
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
                <ListItem button key={text} component={Link} to={`/${text === 'Dashboard' ? 'MainDashboard' : text.toLowerCase().replace(' ', '-')}`}>
                  <ListItemText primary={text} className="page-text-color" />
                </ListItem>
              ))}
            </List>
            <div className="separator-line"></div>
            <List className="bottom-list">
              {bottomItems.map(({ text }) => (
                <ListItem button key={text} component={Link} to={`/${ text === 'Sign Out' ? '' : text.toLowerCase().replace(' ', '-')}`}>
                  <ListItemText primary={text} className="page-text-color" />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
          <Typography variant="h4">Settings</Typography>
          <Typography variant="body1">View and edit your profile information.</Typography>
          <div>
            <h3>Profile Information</h3>
            <p><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
            <p><strong>Sex:</strong> {profile.sex}</p>
            <p><strong>Current Weight:</strong> {profile.currentWeight}</p>
            <p><strong>Target Weight:</strong> {profile.targetWeight}</p>
            <p><strong>Activity Level:</strong> {profile.activityLevel}</p>
            <p><strong>Medications:</strong> {profile.medications.join(', ')}</p>
            <p><strong>Conditions:</strong> {profile.conditions.join(', ')}</p>
            <p><strong>Family Conditions:</strong> {profile.familyConditions.join(', ')}</p>
            <p><strong>Dietary Preference:</strong> {profile.dietaryPreference}</p>
            <p><strong>Allergies:</strong> {profile.allergies.join(', ')}</p>
            <p><strong>Fitness Goals:</strong> {profile.fitnessGoals.join(', ')}</p>
            <p><strong>Diet History:</strong> {profile.dietHistory}</p>
            <p><strong>Vitamins:</strong> {profile.vitamins.join(', ')}</p>
            <p><strong>Alcohol Use:</strong> {profile.alcoholUse}</p>
            <p><strong>Tobacco Use:</strong> {profile.tobaccoUse}</p>
          </div>
        </Box>
      </Box>
    );
  };

export default Settings;