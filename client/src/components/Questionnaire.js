import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './Questionnaire.css';

const Questionnaire = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    gender: '',
    birthYear: '',
    height: '',
  });

  const questions = [
    {
      question: 'What is your gender?',
      type: 'multiple',
      options: ['Male', 'Female', 'Prefer not to answer'],
      key: 'gender',
    },
    {
      question: 'What is your birth year?',
      type: 'text',
      key: 'birthYear',
    },
    {
      question: 'What is your height?',
      type: 'text',
      key: 'height',
    },
  ];

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Submit the answers
      console.log('Submitted answers:', answers);
    }
  };

  const handleChange = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  return (
    <div className="questionnaire-wrapper">
      <div className="clarity-title">Clarity</div>
      <div className="question-list">
        <ul>
          {questions.map((q, index) => (
            <li key={index} className={index === step ? 'active' : ''}>
              {q.question}
            </li>
          ))}
        </ul>
      </div>
      <div className="question-content">
        <h2>{questions[step].question}</h2>
        {questions[step].type === 'multiple' ? (
          <Form>
            {questions[step].options.map((option, index) => (
              <Form.Check
                key={index}
                type="radio"
                label={option}
                name={questions[step].key}
                value={option}
                checked={answers[questions[step].key] === option}
                onChange={(e) => handleChange(questions[step].key, e.target.value)}
                className="form-check"
              />
            ))}
          </Form>
        ) : (
          <Form.Control
            type="text"
            value={answers[questions[step].key]}
            onChange={(e) => handleChange(questions[step].key, e.target.value)}
            className="form-control"
          />
        )}
        <Button onClick={handleNext} className="btn mt-3">
          {step < questions.length - 1 ? 'Next' : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default Questionnaire;