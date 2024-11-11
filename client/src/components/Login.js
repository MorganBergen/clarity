import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { signIn } from '../pocketbaseService';
import { UserContext } from '../context/UserContext';
import PocketBase from 'pocketbase';

// Material UI imports
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const pb = new PocketBase('http://127.0.0.1:8090');

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode toggle state

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const { user } = await signIn(email, password);

      setUserId(user);

      const questionnaireRecord = await pb.collection('questionnaire').getFirstListItem(`userId="${user}"`);

      if (questionnaireRecord.userId === user) {
        navigate('/MainDashboard');
      }
    } catch (err) {
      if (err.message.includes("The requested resource wasn't found.")) {
        navigate('/Dashboard');
      } else if (err.message.includes("Failed to authenticate.")) {
        setError(`Login failed. Please check your credentials and try again. ${err}`);
      } else {
        setError(`Login failed. ${err}`);
      }
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`login-wrapper ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container fluid>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6} className="text-column">
            <div className="text-container">
              <h1 className="site-title">Clarity</h1>
              <p className="site-subtitle">Nutritional Analysis at your Fingertips</p>
            </div>
          </Col>
          <Col xs={12} md={6} className="form-column">
            <div className="login-form-container">
              <h2 className="login-title text-center mb-4">Login</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label className="form-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="login-button w-100">
                  Login
                </Button>
              </Form>
              <div className="link-container">
                <Link to="/register" className="small-link">Don't have an account? Register</Link>
                <Link to="/forgot-password" className="small-link">Forgot Password?</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    <div>
     {/* Theme toggle button */}
     <IconButton
        className="theme-toggle-btn"
        color="inherit"
        onClick={toggleTheme}
        aria-label="toggle dark mode"
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
      </div>
    </div>
  );
};

export default Login;
