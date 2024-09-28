import React, { createContext, useState, useContext } from 'react';

// Create a context for the profile
const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: '',
    sex: '',
    currentWeight: '',
    targetWeight: '',
    activityLevel: '',
    medications: [],
    conditions: [],
    familyConditions: [],
    dietaryPreference: '',
    allergies: [],
    fitnessGoals: [],
    dietHistory: '',
    vitamins: [],
    alcoholUse: '',
    tobaccoUse: '',
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};