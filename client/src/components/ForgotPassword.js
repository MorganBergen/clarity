import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../pocketbaseService';
import './Login.css';

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
                <Button variant="primary" type="submit" className="login-button w-100">
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
    </div>
  );
};

export default ForgotPassword;