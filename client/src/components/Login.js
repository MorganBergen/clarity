import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css';
import ThemeToggle from './ThemeToggle/ThemeToggle';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    console.log('Login attempted with:', { email, password });
    // Here you would typically send a request to the server
  };

  return (
    <div className="login-wrapper">
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6}>
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
                    className="form-control"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" class="login-button" className="login-button w-100">
                  Login
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <Link to="/register" className="small-link">Create an account</Link>
                <br />
                <Link to="/forgot-password" className="small-link">Forgot your password?</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ThemeToggle /> {/* Ensure ThemeToggle is used here */}
    </div>
  );
};

export default Login;