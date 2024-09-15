import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const EmailVerification = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log('Verification token:', token); // Log the token
        await pb.collection('users').confirmVerification(token);
        setMessage('Email verified successfully!');
        setTimeout(() => {
          navigate('/login'); // Redirect to login after 3 seconds
        }, 3000);
      } catch (error) {
        console.error('Verification error:', error); // Log the error
        setMessage('Invalid or expired verification token.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerification;