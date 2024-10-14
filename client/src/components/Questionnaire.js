import React, { useState, useRef, useContext, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Questionnaire.css';
import './MainDashboard.js';
import PocketBase from 'pocketbase';
import { UserContext } from '../context/UserContext';

const pb = new PocketBase('http://127.0.0.1:8090');

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [medications, setMedications] = useState('');
  const [medicationSuggestions, setMedicationSuggestions] = useState([]);
  const [addedMedications, setAddedMedications] = useState([]);
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const weightInputRef = useRef(null);
  const targetWeightInputRef = useRef(null);

  const [conditions, setConditions] = useState([]);
  const [conditionInput, setConditionInput] = useState('');
  const [conditionSuggestions, setConditionSuggestions] = useState([]);

  const [familyConditions, setFamilyConditions] = useState([]);
  const [familyConditionInput, setFamilyConditionInput] = useState('');
  const [familyConditionSuggestions, setFamilyConditionSuggestions] = useState([]);

  const [allergies, setAllergies] = useState('');
  const [addedAllergies, setAddedAllergies] = useState([]);

  const [dietaryPreference, setDietaryPreference] = useState('');
  const [fitnessGoals, setFitnessGoals] = useState([]);
  const [isNoneSelected, setIsNoneSelected] = useState(false);
  const [dietHistory, setDietHistory] = useState('');
  const [vitamins, setVitamins] = useState('');
  const [addedVitamins, setAddedVitamins] = useState([]);
  const [alcoholUse, setAlcoholUse] = useState('');
  const [tobaccoUse, setTobaccoUse] = useState('');
  const { userId } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    let record = await pb.collection('users').getOne(userId);

    try {
      const data = {
        userId: record.id,
        firstName,
        lastName,
        age,
        sex,
        activityLevel,
        medications: isNoneSelected ? 'None' : addedMedications.join(', '),
        currentWeight,
        targetWeight,
        conditions: conditions.length === 0 ? 'None' : conditions.join(', '),
        familyConditions: familyConditions.length === 0 ? 'None' : familyConditions.join(', '),
        dietaryPreference,
        allergies: addedAllergies.length === 0 ? 'None' : addedAllergies.join(', '),
        fitnessGoals: fitnessGoals.length === 0 ? 'None' : fitnessGoals.join(', '),
        dietHistory,
        vitamins: addedVitamins.length === 0 ? 'None' : addedVitamins.join(', '),
        alcoholUse,
        tobaccoUse,
      };
      console.log(`creating questionnaire data records into pb collection.....`);
      console.log(data);
      await pb.collection('questionnaire').create(data);
      navigate('/MainDashboard');
    } catch (error) {
      console.error('Error saving questionnaire data:', error);
    }
  };

  const questions = [
    { id: 1, label: "Name" },
    { id: 2, label: "Age" },
    { id: 3, label: "Sex" },
    { id: 4, label: "Current Weight" },
    { id: 5, label: "Target Weight" },
    { id: 6, label: "Activity Level" },
    { id: 7, label: "Medications" },
    { id: 8, label: "Medical Conditions" },
    { id: 9, label: "Family Medical History" },
    { id: 10, label: "Dietary Preference" },
    { id: 11, label: "Allergies" },
    { id: 12, label: "Fitness Goals" },
    { id: 13, label: "Diet History" },
    { id: 14, label: "Vitamins / Supplements" },
    { id: 15, label: "Alcohol Use" },
    { id: 16, label: "Tobacco Use" },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
      navigate('/MainDashboard'); // Redirect to MainDashboard
    }
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
        const response = await axios.get(`http://localhost:5001/api/medications?q=${query}`);
        setMedicationSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching medication data:', error);
        setMedicationSuggestions([]);
      }
    } else {
      setMedicationSuggestions([]);
    }
  };

  const handleMedicationSelect = (medication) => {
    setMedications(medication);
    setMedicationSuggestions([]);
  };

  const handleAddMedication = () => {
    if (medications && !addedMedications.includes(medications)) {
      setAddedMedications([...addedMedications, medications]);
      setMedications('');
    }
  };

  const handleRemoveMedication = (index) => {
    setAddedMedications(addedMedications.filter((_, i) => i !== index));
  };

  const handleSetMedicationsNone = () => {
    setIsNoneSelected((prev) => !prev);
    if (!isNoneSelected) {
      setMedications('None');
      setAddedMedications([]);
    }
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

  useEffect(() => {
    if (conditionInput.length > 2) {
      const fetchConditions = async () => {
        try {
          const response = await axios.get(`https://clinicaltables.nlm.nih.gov/api/conditions/v3/search?terms=${conditionInput}&maxList=10`);
          if (response.data && Array.isArray(response.data[3])) {
            setConditionSuggestions(response.data[3]);
          } else {
            console.error('Unexpected response structure:', response.data);
            setConditionSuggestions([]);
          }
        } catch (error) {
          console.error('Error fetching condition data:', error);
          setConditionSuggestions([]);
        }
      };
      fetchConditions();
    } else {
      setConditionSuggestions([]);
    }
  }, [conditionInput]);

  const handleAddCondition = () => {
    if (conditionInput && !conditions.includes(conditionInput)) {
      setConditions([...conditions, conditionInput]);
      setConditionInput('');
    }
  }

  const handleRemoveCondition = (index) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const handleSetConditionsNone = () => {
    setIsNoneSelected((prev) => !prev);
    if (!isNoneSelected) {
      setConditions(['None']);
    } else {
      setConditions([]);
    }
  }

  useEffect(() => {
    if (familyConditionInput.length > 2) {
      const fetchFamilyConditions = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/api/conditions?q=${familyConditionInput}`);
          setFamilyConditionSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching family condition data:', error);
          setFamilyConditionSuggestions([]);
        }
      };
      fetchFamilyConditions();
    } else {
      setFamilyConditionSuggestions([]);
    }
  }, [familyConditionInput]);

  useEffect(() => {

    if (conditionInput.length > 2) {
      const fetchConditions = async () => {
        try {
          const response = await axios.get(`http://localhost:5001/api/conditions?q=${conditionInput}`);
          setConditionSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching condition data:', error);
          setConditionSuggestions([]);
        }
      };
      fetchConditions();
    } else {
      setConditionSuggestions([]);
    }

  }, [conditionInput]);

  const handleAddFamilyCondition = () => {
    if (familyConditionInput && !familyConditions.includes(familyConditionInput)) {
      setFamilyConditions([...familyConditions, familyConditionInput]);
      setFamilyConditionInput('');
    }
  };

  const handleRemoveFamilyCondition = (index) => {
    setFamilyConditions(familyConditions.filter((_, i) => i !== index));
  };

  const handleAddAllergy = () => {
    if (allergies && !addedAllergies.includes(allergies)) {
      setAddedAllergies([...addedAllergies, allergies]);
      setAllergies('');
    }
  };

  const handleRemoveAllergy = (index) => {
    setAddedAllergies(addedAllergies.filter((_, i) => i !== index));
  };

  const handleSetAllergiesNone = () => {
    setIsNoneSelected((prev) => !prev);
    if (!isNoneSelected) {
      setAllergies('');
      setAddedAllergies([]);
    }
  };

  const toggleFitnessGoal = (goal) => {
    setFitnessGoals((prevGoals) =>
      prevGoals.includes(goal)
        ? prevGoals.filter((g) => g !== goal)
        : [...prevGoals, goal]
    );
  };

  const handleSetVitaminsNone = () => {
    setIsNoneSelected((prev) => !prev);
    if (!isNoneSelected) {
      setVitamins('');
      setAddedVitamins([]);
    }
  };

  const handleAddVitamin = () => {
    if (vitamins && !addedVitamins.includes(vitamins)) {
      setAddedVitamins([...addedVitamins, vitamins]);
      setVitamins('');
    }
  };

  const handleRemoveVitamin = (index) => {
    const newVitamins = [...addedVitamins];
    newVitamins.splice(index, 1);
    setAddedVitamins(newVitamins);
  };

  const handleVitaminChange = (e) => {
    setVitamins(e.target.value);
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
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formName" className="mt-4">
                <Form.Label>What is your name?</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <div className="button-group">
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 2 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formAge" className="mt-4">
                <Form.Label>What is your age?</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button" disabled={!age}>Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 3 && (
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
          {currentQuestion === 4 && (
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
          {currentQuestion === 5 && (
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
          {currentQuestion === 6 && (
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
          {currentQuestion === 7 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formMedications" className="mt-4">
                <Form.Label>What medications are you currently taking?</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>As you type, suggestions will appear below</p>
                  <Button className='add-medication-button' onClick={handleAddMedication} disabled={!medications || isNoneSelected}>Add</Button>
                </div>
                <Form.Control
                  type="text"
                  placeholder="List your medications"
                  value={medications}
                  onChange={handleMedicationChange}
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
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={handleSetMedicationsNone} className={isNoneSelected ? 'selected' : ''}>None</Button>
                </div>
                {!isNoneSelected && addedMedications.length > 0 && (
                  <div className="added-medications-list">
                    {addedMedications.map((medication, index) => (
                      <div key={index} className="added-medication-item">
                        <Button className="remove-medication-button" size="sm" onClick={() => handleRemoveMedication(index)}>x</Button>
                        <li>{medication}</li>
                      </div>
                    ))}
                  </div>
                )}
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 8 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formMedicalConditions" className="mt-4">
                <Form.Label>What are your current medical conditions?</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>As you type, suggestions will appear below</p>
                  <Button className='add-medication-button' onClick={handleAddCondition} disabled={!conditionInput || isNoneSelected}>Add</Button>
                </div>
                <Form.Control
                  type="text"
                  placeholder="List your conditions"
                  value={conditionInput}
                  onChange={(e) => setConditionInput(e.target.value)}
                />
                {conditionSuggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {conditionSuggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => setConditionInput(suggestion)}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={handleSetConditionsNone} className={isNoneSelected ? 'selected' : ''}>None</Button>
                </div>
                {!isNoneSelected && conditions.length > 0 && (
                  <div className="added-medications-list">
                    {conditions.map((condition, index) => (
                      <div key={index} className="added-medication-item">
                        <Button className="remove-medication-button" size="sm" onClick={() => handleRemoveCondition(index)}>x</Button>
                        <li>{condition}</li>
                      </div>
                    ))}
                  </div>
                )}
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 9 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formFamilyMedicalHistory" className="mt-4">
                <Form.Label>Any family medical history?</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>As you type, suggestions will appear below</p>
                  <Button className='add-medication-button' onClick={handleAddFamilyCondition} disabled={!familyConditionInput}>Add</Button>
                </div>
                <Form.Control
                  type="text"
                  placeholder="List family medical conditions"
                  value={familyConditionInput}
                  onChange={(e) => setFamilyConditionInput(e.target.value)}
                />
                {familyConditionSuggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {familyConditionSuggestions.map((suggestion, index) => (
                      <li key={index} onClick={() => setFamilyConditionInput(suggestion)}>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={() => setFamilyConditions(['None'])} className={familyConditions.includes('None') ? 'selected' : ''}>None</Button>
                </div>
                {!familyConditions.includes('None') && familyConditions.length > 0 && (
                  <div className="added-medications-list">
                    {familyConditions.map((condition, index) => (
                      <div key={index} className="added-medication-item">
                        <Button className="remove-medication-button" size="sm" onClick={() => handleRemoveFamilyCondition(index)}>x</Button>
                        <li>{condition}</li>
                      </div>
                    ))}
                  </div>
                )}
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 10 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formDietaryPreference" className="mt-4">
                <Form.Label>What is your dietary preference?</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>Select all that apply or none if you do not have any dietary preferences</p>
                </div>
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={() => setDietaryPreference('vegan')} className={dietaryPreference === 'vegan' ? 'selected' : ''}>Vegan</Button>
                  <Button variant="outline-primary" onClick={() => setDietaryPreference('vegetarian')} className={dietaryPreference === 'vegetarian' ? 'selected' : ''}>Vegetarian</Button>
                  <Button variant="outline-primary" onClick={() => setDietaryPreference('pescatarian')} className={dietaryPreference === 'pescatarian' ? 'selected' : ''}>Pescatarian</Button>
                  <Button variant="outline-primary" onClick={() => setDietaryPreference('gluten-free')} className={dietaryPreference === 'gluten-free' ? 'selected' : ''}>Gluten-free</Button>
                  <Button variant="outline-primary" onClick={() => setDietaryPreference('dairy-free')} className={dietaryPreference === 'dairy-free' ? 'selected' : ''}>Dairy-free</Button>
                  <Button variant="outline-primary" onClick={() => setDietaryPreference('None')} className={dietaryPreference === 'None' ? 'selected' : ''}>None</Button>
                </div>
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 11 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formAllergies" className="mt-4">
                <Form.Label>Any allergies to medications or foods?</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>Type your allergies and press add to include them in the list</p>
                  <Button className='add-allergy-button' onClick={handleAddAllergy} disabled={!allergies}>Add</Button>
                </div>
                <Form.Control
                  type="text"
                  placeholder="List your allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                />
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={handleSetAllergiesNone} className={isNoneSelected ? 'selected' : ''}>None</Button>
                </div>
                {!isNoneSelected && addedAllergies.length > 0 && (
                  <div className="added-allergies-list">
                    {addedAllergies.map((allergy, index) => (
                      <div key={index} className="added-allergy-item">
                        <Button className="remove-allergy-button" size="sm" onClick={() => handleRemoveAllergy(index)}>x</Button>
                        <li>{allergy}</li>
                      </div>
                    ))}
                  </div>
                )}
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 12 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formFitnessGoals" className="mt-4">
                <Form.Label>What are your fitness or nutrition goals?</Form.Label>
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={() => toggleFitnessGoal('Weight loss')} className={fitnessGoals.includes('Weight loss') ? 'selected' : ''}>Weight loss</Button>
                  <Button variant="outline-primary" onClick={() => toggleFitnessGoal('Muscle gain')} className={fitnessGoals.includes('Muscle gain') ? 'selected' : ''}>Muscle gain</Button>
                  <Button variant="outline-primary" onClick={() => toggleFitnessGoal('Endurance')} className={fitnessGoals.includes('Endurance') ? 'selected' : ''}>Endurance</Button>
                  <Button variant="outline-primary" onClick={() => toggleFitnessGoal('Flexibility')} className={fitnessGoals.includes('Flexibility') ? 'selected' : ''}>Flexibility</Button>
                  <Button variant="outline-primary" onClick={() => toggleFitnessGoal('General health')} className={fitnessGoals.includes('General health') ? 'selected' : ''}>General health</Button>
                </div>
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 13 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formDietHistory" className="mt-4">
                <Form.Label>Have you ever been on a diet before?</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>Select one of the options below</p>
                </div>
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={() => setDietHistory('Yes')} className={dietHistory === 'Yes' ? 'selected' : ''}>Yes</Button>
                  <Button variant="outline-primary" onClick={() => setDietHistory('No')} className={dietHistory === 'No' ? 'selected' : ''}>No</Button>
                </div>
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 14 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formVitaminsSupplements" className="mt-4">
                <Form.Label>Any vitamins or supplements?</Form.Label>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p>After you type add your vitamins or supplements to the list or select none if you do not take any</p>
                  <Button className='add-vitamin-button' onClick={handleAddVitamin} disabled={!vitamins}>Add</Button>
                </div>
                <Form.Control
                  type="text"
                  placeholder="List your vitamins or supplements"
                  value={vitamins}
                  onChange={handleVitaminChange}
                />
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={handleSetVitaminsNone} className={isNoneSelected ? 'selected' : ''}>None</Button>
                </div>
                {!isNoneSelected && addedVitamins.length > 0 && (
                  <div className="added-vitamins-list">
                    {addedVitamins.map((vitamin, index) => (
                      <div key={index} className="added-vitamin-item">
                        <Button className="remove-vitamin-button" size="sm" onClick={() => handleRemoveVitamin(index)}>x</Button>
                        <li>{vitamin}</li>
                      </div>
                    ))}
                  </div>
                )}
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 15 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formAlcoholUse" className="mt-4">
                <Form.Label>Do you use Alcohol?</Form.Label>
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={() => setAlcoholUse('Yes')} className={alcoholUse === 'Yes' ? 'selected' : ''}>Yes</Button>
                  <Button variant="outline-primary" onClick={() => setAlcoholUse('No')} className={alcoholUse === 'No' ? 'selected' : ''}>No</Button>
                </div>
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Next</Button>
                </div>
              </Form.Group>
            </Form>
          )}
          {currentQuestion === 16 && (
            <Form onSubmit={handleNext} onKeyDown={(e) => e.key === 'Enter' && handleNext(e)}>
              <Form.Group controlId="formTobaccoUse" className="mt-4">
                <Form.Label>Do you use Tobacco?</Form.Label>
                <div className="button-group-vertical">
                  <Button variant="outline-primary" onClick={() => setTobaccoUse('Yes')} className={tobaccoUse === 'Yes' ? 'selected' : ''}>Yes</Button>
                  <Button variant="outline-primary" onClick={() => setTobaccoUse('No')} className={tobaccoUse === 'No' ? 'selected' : ''}>No</Button>
                </div>
                <div className="button-group">
                  <Button variant="secondary" onClick={handleBack} className="back-button">Back</Button>
                  <Button type="submit" className="next-button">Submit</Button>
                </div>
              </Form.Group>
            </Form>
          )}
        </div>
      </div >
    </div >
  );
};

export default Questionnaire;