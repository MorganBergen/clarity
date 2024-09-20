import React, { useState, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './Questionnaire.css';

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [sex, setSex] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [medications, setMedications] = useState('');
  const [medicationSuggestions, setMedicationSuggestions] = useState([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const weightInputRef = useRef(null);
  const targetWeightInputRef = useRef(null);

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

  const handleMedicationChange = async (e) => {
    const query = e.target.value;
    setMedications(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${query}*&limit=10`);
        setMedicationSuggestions(response.data.results.map(result => result.openfda.brand_name[0]));
      } catch (error) {
        console.error('Error fetching medication data:', error);
      }
    } else {
      setMedicationSuggestions([]);
    }
  };

  const handleMedicationSelect = (medication) => {
    setMedications(medication);
    setMedicationSuggestions([]);
  };

  const handleWeightFocus = (inputRef, weight) => {
    if (inputRef.current) {
      const length = weight.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  const handleWeightInput = (e, setWeight, inputRef) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setWeight(value);
    const input = inputRef.current;
    if (input) {
      const position = value.length;
      setTimeout(() => input.setSelectionRange(position, position), 0);
    }
  };

  // const handleWeightChange = (e) => {
  //   const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  //   setCurrentWeight(value);
  // };

  // const handleTargetWeightChange = (e) => {
  //   const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  //   setTargetWeight(value);
  // };

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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                const nextButton = document.querySelector('.next-button');
                if (nextButton) {
                  nextButton.focus();
                  nextButton.click();
                }
              }
            }}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
            <Form.Group controlId="formCurrentWeight" className="mt-4">
              <Form.Label>What is your current weight?</Form.Label>
              <Form.Control
                type="text"
                placeholder="in lbs"
                value={currentWeight ? `${currentWeight} lbs` : ''}
                onChange={(e) => handleWeightInput(e, setCurrentWeight, weightInputRef)}
                onFocus={() => handleWeightFocus(weightInputRef, currentWeight)}
                ref={weightInputRef}
                required
                className="no-spinner"
              />
              <div className="button-group">
                <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                <Button type="submit" className="next-button" disabled={!currentWeight}>Next</Button>
              </div>
            </Form.Group>
          </Form>
          )}
          {currentQuestion === 4 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formTargetWeight" className="mt-4">
                <Form.Label>What is your target weight?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="in lbs"
                  value={targetWeight ? `${targetWeight} lbs` : ''}
                  onChange={(e) => handleWeightInput(e, setTargetWeight, targetWeightInputRef)}
                  onFocus={() => handleWeightFocus(targetWeightInputRef, targetWeight)}
                  ref={targetWeightInputRef}
                  required
                  className="no-spinner"
                />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button" disabled={!targetWeight}>Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 5 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
                    Vigorously active (daily movement)
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formMedications" className="mt-4">
                <Form.Label>What medications are you currently taking?</Form.Label>
                <p>As you type, suggestions will appear below</p>
                <Form.Control
                  type="text"
                  placeholder="List your medications"
                  value={medications}
                  onChange={handleMedicationChange}
                  required
                />
                {medicationSuggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {medicationSuggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => handleMedicationSelect(suggestion)}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 7 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formAllergies" className="mt-4">
                <Form.Label>Any allergies to medications or foods?</Form.Label>
                <Form.Control type="text" placeholder="List any allergies" required />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 10 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
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