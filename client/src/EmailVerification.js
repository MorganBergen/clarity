/**
 *  @description        responsible for handling the verification process when the user clicks the verification 
 *                      link in the email, then will use the token from the url to confirm the user's email address
 *
 * 
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

/**
 *  responsible for rendering the email verification component
 *  @returns {JSX.Element}
 */
const EmailVerification = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await pb.collection('users').confirmVerification(token);
        setMessage('Email verified successfully!');
      } catch (error) {
        setMessage('Email verification failed. Please try again.');
      }
    };

    verifyEmail();
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default EmailVerification;