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
            <h1 className="welcome-title">Welcome to Clarity!</h1>
            <p className="welcome-subtitle">Advanced Machine Learning for Nutritional Analysis and Healthcare</p>
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