import React, { useState } from 'react';
import './Questionnaire.css';

const questions = [
  "What is your sex?",
  "What is your age?",
  "What is your height?",
  "Current Weight?",
  "Target Weight?",
  "What's your activity level?",
  "What medications are you currently taking?",
  "What medical conditions do you currently have?",
  "Any family medical history of (high blood pressure, diabetes, cardiac problems, cholesterol problems, or cancer?)",
  "What is your dietary preference? (n/a, vegan, vegetarian, pescatarian, etc.)",
  "Any allergies or medications or foods?",
  "What are your fitness or nutrition goals? (weight loss, muscle gain, etc.)",
  "Have you ever been on a diet before? (yes, no)",
  "Do you currently take any vitamins or supplements? (yes, no)",
  "How would you rate your diet?",
  "Do you use alcohol? (yes, no)",
  "Do you use any tobacco products? (yes, no)",
  "Are you on any weight loss medications? (yes, no)",
  "Do you know what nutrients you have consumed? (I do know all the nutrients, I often check the nutrients list, Not really)",
  "Do you usually keep a record of what you eat? (Every meal, I do when I remember, Not at all)"
];

const questionSummaries = [
  "Sex",
  "Age",
  "Height",
  "Weight",
  "Target Weight",
  "Activity Level",
  "Medications",
  "Medical Conditions",
  "Medical History",
  "Dietary Preference",
  "Allergies",
  "Goals",
  "Diet History",
  "Vitamins or Supplements",
  "Diet Rating",
  "Alcohol Use",
  "Tobacco Use",
  "Weight Loss Medication",
  "Nutrient Intake",
  "Record Keeping"
];

const Questionnaire = () => {
  const [formData, setFormData] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChange = (value) => {
    setFormData({ ...formData, [`question${currentQuestionIndex}`]: value });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="questionnaire-container">
      <h1 className="questionnaire-title">Clarity</h1>
      <div className="questionnaire-content">
        <div className="question-list">
          {questionSummaries.map((summary, index) => (
            <p key={index} className="question-item">{summary}</p>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="questionnaire-form">
          <label>{questions[currentQuestionIndex]}</label>
          {currentQuestionIndex === 0 ? (
            <div>
              <button
                type="button"
                className={`selection-button ${formData.question0 === "Male" ? "selected" : ""}`}
                onClick={() => handleChange("Male")}
              >
                Male
              </button>
              <button
                type="button"
                className={`selection-button ${formData.question0 === "Female" ? "selected" : ""}`}
                onClick={() => handleChange("Female")}
              >
                Female
              </button>
            </div>
          ) : (
            <input
              type="text"
              name={`question${currentQuestionIndex}`}
              value={formData[`question${currentQuestionIndex}`] || ''}
              onChange={(e) => handleChange(e.target.value)}
            />
          )}
          <div className="navigation-buttons">
            <button type="button" className="nav-button back-button" onClick={handleBack}>
              &#8592; 
            </button>
            <button type="button" className="nav-button next-button" onClick={handleNext}>
               &#8594;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Questionnaire;