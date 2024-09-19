import React from 'react';
import { Button } from 'react-bootstrap';
import './Questionnaire.css';

const Questionnaire = () => {
  return (
    <div className="questionnaire-container">
      <header className="questionnaire-header">
        <div className="header-left">
          <h1 className="site-title">Clarity</h1>
        </div>
        <div className="header-middle">
          <span className="step">
            <div className="circle filled">1</div> Create Account <span className="arrow">→</span>
          </span>
          <span className="step">
            <div className="circle">2</div> Fill out Questionnaire <span className="arrow">→</span>
          </span>
          <span className="step">
            <div className="circle">3</div> Summary of Profile <span className="arrow">→</span>
          </span>
          <span className="step">
            <div className="circle">4</div> Welcome to Dashboard
          </span>
        </div>
        <div className="header-right">
          <Button variant="secondary" className="header-button">Logout</Button>
          <Button variant="secondary" className="header-button">Start Over</Button>
        </div>
      </header>
      <div>
        {/* Content goes here */}
      </div>
    </div>
  );
};

export default Questionnaire;