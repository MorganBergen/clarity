import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import Questionnaire from './Questionnaire';
import './Dashboard.css';

const Dashboard = () => {
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  return (
    <div className="dashboard-wrapper">
      {!showQuestionnaire ? (
        <div className="dashboard-container">
          <div className="dashboard-content">
            <h1 className="welcome-title">Welcome to Clarity</h1>
            <p className="welcome-subtitle">Your personalized nutrition and health journey starts here.</p>
            <p className="welcome-paragraph">
              Clarity uses machine learning to provide tailored nutritional insights and health recommendations based on your unique profile. 
              Additionally, you have the option to share relevant information regarding your consumption patterns with your healthcare provider. 
              To get started, we'll ask you a few questions to better understand your health status, goals, and dietary needs.
            </p>
            <p className="welcome-paragraph">
              Let's create your profile and begin your path to a healthier, more informed lifestyle.
            </p>
            <Button onClick={() => setShowQuestionnaire(true)} className="get-started-button">Get Started</Button>
          </div>
        </div>
      ) : (
        <Questionnaire />
      )}
    </div>
  );
};

export default Dashboard;