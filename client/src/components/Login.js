import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { signIn } from '../pocketbaseService'; // Adjust the path as necessary

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsClicked(true);
    
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    try {
      const { token } = await signIn(email, password); // Destructure token from response
      console.log('Generated token:', token); // Log the token
      localStorage.setItem('token', token); // Store token in localStorage
      navigate('/Dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-wrapper">
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
              <h2 className="login-title text-center mb-4">Welcome</h2>
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
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit" 
                  className={`login-button w-100 ${isClicked ? 'clicked' : ''}`}
                  >
                  Login
                </Button>
              </Form>
              <div className="link-container mt-3">
                <Link to="/register" className="small-link">Create an account</Link>
                <Link to="/forgot-password" className="small-link">Forgot your password?</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;