import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../pocketbaseService';
import './Login.css';
import ThemeToggle from './ThemeToggle/ThemeToggle';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    try {
      await sendPasswordResetEmail(email);
      setMessage('If an account with that email exists, a password reset link will be sent.');
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs={12} md={6}>
            <div className="login-form-container">
              <h2 className="login-title text-center mb-4">Forgot Password</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}
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
                <Button variant="primary" type="submit" className="w-100 login-button">
                  Reset Password
                </Button>
              </Form>
              <div className="mt-3 text-center">
                <Link to="/" className="small-link">Back to Login</Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <ThemeToggle />
    </div>
  );
};

export default ForgotPassword;