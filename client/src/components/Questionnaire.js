import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './Questionnaire.css';

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sex, setSex] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const questions = [
    { id: 1, label: "Name" },
    { id: 2, label: "Sex" },
    { id: 3, label: "Current Weight" },
    { id: 4, label: "Target Weight" },
    { id: 5, label: "Activity Level" },
    { id: 6, label: "Medications" },
    { id: 7, label: "Family Medical History" },
    { id: 8, label: "Dietary Preference" },
    { id: 9, label: "Allergies" },
    { id: 10, label: "Fitness Goals" },
    { id: 11, label: "Diet History" },
    { id: 12, label: "Vitamins / Supplements" },
    { id: 13, label: "Diet Rating" },
    { id: 14, label: "Alcohol Use" },
    { id: 15, label: "Tobacco Use" },
    { id: 16, label: "Weight Loss Medicines" },
    { id: 17, label: "Nutrient Knowledge" },
    { id: 18, label: "Food Record" },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div className="questionnaire-container">
      <header className="questionnaire-header">
        <div className="header-left">
          <h1 className="site-title">Clarity</h1>
        </div>
        <div className="header-middle">
          <span className="step">
            <div className={`circle ${currentQuestion >= 1 ? 'filled' : ''}`}>1</div> Create Account <span className="line"></span>
          </span>
          <span className="step">
            <div className={`circle ${currentQuestion >= 18 ? 'filled' : ''}`}>2</div> Complete Questionnaire <span className="line"></span>
          </span>
          <span className="step">
            <div className={`circle ${currentQuestion >= 20 ? 'filled' : ''}`}>3</div> Welcome to Dashboard
          </span>
        </div>
        <div className="header-right">
          <Button variant="secondary" className="header-button">Logout</Button>
        </div>
      </header>
      <div className="main-content">
        <div className="sidebar">
          <h2 className="sidebar-title">Questionnaire</h2>
          <ul>
            {questions.map((question) => (
              <li key={question.id} onClick={() => setCurrentQuestion(question.id)}>
                {question.label}
              </li>
            ))}
          </ul>
        </div>
        <div className="question-box">
          {currentQuestion === 1 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formName" className="mt-4">
                <Form.Label>What is your name?</Form.Label>
                <Form.Control type="text" placeholder="First Name" required />
                <Form.Control type="text" placeholder="Last Name" required />
                <div className="button-group">
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 2 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formSex" className="mt-4">
                <Form.Label>What is your sex?</Form.Label>
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={() => setSex('Male')} className={sex === 'Male' ? 'selected' : ''}>Male</Button>
                  <Button variant="outline-primary" onClick={() => setSex('Female')} className={sex === 'Female' ? 'selected' : ''}>Female</Button>
                  <Button variant="outline-primary" onClick={() => setSex('Other')} className={sex === 'Other' ? 'selected' : ''}>Other</Button>
                </div>
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button" disabled={!sex}>Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 3 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formCurrentWeight" className="mt-4">
                <Form.Label>What is your current weight?</Form.Label>
                <Form.Control type="number" placeholder="in lbs" required className="no-spinner" />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 4 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formTargetWeight" className="mt-4">
                <Form.Label>What is your target weight?</Form.Label>
                <Form.Control type="number" placeholder="in lbs" required className="no-spinner" />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 5 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formActivityLevel" className="mt-4">
                <Form.Label>What is your activity level?</Form.Label>
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={() => setActivityLevel('Sedentary')} className={activityLevel === 'Sedentary' ? 'selected' : ''}>
                    Sedentary (little to no exercise per day)
                  </Button>
                  <Button variant="outline-primary" onClick={() => setActivityLevel('Moderately active')} className={activityLevel === 'Moderately active' ? 'selected' : ''}>
                    Moderately active (3 to 5 days of exercise per week)
                  </Button>
                  <Button variant="outline-primary" onClick={() => setActivityLevel('Vigorously active')} className={activityLevel === 'Vigorously active' ? 'selected' : ''}>
                    Vigorously active (daily exercise or movement throughout the day)
                  </Button>
                </div>
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button" disabled={!activityLevel}>Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 6 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formMedications" className="mt-4">
                <Form.Label>What medications are you currently taking?</Form.Label>
                <Form.Control type="text" placeholder="List your medications" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 7 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formFamilyMedicalHistory" className="mt-4">
                <Form.Label>Any family medical history of (high blood pressure, diabetes, cardiac problems, cholesterol problems, or cancer)?</Form.Label>
                <Form.Control type="text" placeholder="List any family medical history" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 8 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formDietaryPreference" className="mt-4">
                <Form.Label>What is your dietary preference? (n/a, vegan, vegetarian, pescatarian, etc.)</Form.Label>
                <Form.Control type="text" placeholder="Enter your dietary preference" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 9 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formAllergies" className="mt-4">
                <Form.Label>Any allergies or medications or foods?</Form.Label>
                <Form.Control type="text" placeholder="List any allergies" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 10 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formFitnessGoals" className="mt-4">
                <Form.Label>What are your fitness or nutrition goals? (weight loss, muscle gain, etc.)</Form.Label>
                <Form.Control type="text" placeholder="Enter your fitness or nutrition goals" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 11 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formDietHistory" className="mt-4">
                <Form.Label>Have you ever been on a diet before? (yes, no)</Form.Label>
                <Form.Control type="text" placeholder="Yes or No" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 12 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formVitaminsSupplements" className="mt-4">
                <Form.Label>Do you currently take any vitamins or supplements? (yes, no)</Form.Label>
                <Form.Control type="text" placeholder="Yes or No" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 13 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formDietRating" className="mt-4">
                <Form.Label>How would you rate your diet?</Form.Label>
                <Form.Control type="text" placeholder="Rate your diet" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 14 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formAlcoholUse" className="mt-4">
                <Form.Label>Do you use alcohol? (yes, no)</Form.Label>
                <Form.Control type="text" placeholder="Yes or No" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 15 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formTobaccoUse" className="mt-4">
                <Form.Label>Do you use any tobacco products? (yes, no)</Form.Label>
                <Form.Control type="text" placeholder="Yes or No" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 16 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formWeightLossMedications" className="mt-4">
                <Form.Label>Are you on any weight loss medications? (yes, no)</Form.Label>
                <Form.Control type="text" placeholder="Yes or No" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 17 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formNutrientKnowledge" className="mt-4">
                <Form.Label>Do you know what nutrients you have consumed? (I do know all the nutrients, I often check the nutrients list, Not really)</Form.Label>
                <Form.Control type="text" placeholder="Enter your knowledge level" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 18 && (
            <Form onSubmit={handleNext}>
              <Form.Group controlId="formFoodRecord" className="mt-4">
                <Form.Label>Do you usually keep a record of what you eat? (Every meal, I do when I remember, Not at all)</Form.Label>
                <Form.Control type="text" placeholder="Enter your record-keeping habit" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;