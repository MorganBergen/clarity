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
  const [questionnaireData, setQuestionnaireData] = useState(null);

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
        </Box>
      </Drawer>
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
    </Box>
  );
};

export default Settings;