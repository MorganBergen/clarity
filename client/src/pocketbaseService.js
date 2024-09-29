/**
 * @description     handles user authentication and account management
 * @function        signUp
 * @function        signIn
 * @function        sendVerificationEmail
 * @function        sendPasswordResetEmail
 * 
 * @see             Login.js
 * @see             ForgotPassword.js
 * @see             ResetPassword.js
 * 
 * @todo            add error handling
 * @todo            add logout function if possible
 * @todo            add user profile update function if possible
 * @todo            add user profile view function if possible
 */

import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

/**
 * registers a new user with provided email, password, and name
 * @param {string} email the email address of the user
 * @param {string} password the password for the user
 * @param {string} name the name of the user
 * @returns {Promise<Object>} the created user object
 */
export const signUp = async (email, password, name) => {
  return await pb.collection('users').create({
    email,
    password,
    passwordConfirm: password,
    name,
  });
};

/**
 * authenticates a user with the provided email and password
 * @param {string} email the email address of the user
 * @param {string} password the password for the user
 * @returns {Promise<Object>} the authenticated user object
 */
export const signIn = async (email, password) => {
  const response = await pb.collection('users').authWithPassword(email, password);
  console.log('response from authwithpassword:', response);
  return {
    token: response.token,
    user: response.record.id,

  };
};
/**
 * sends a verification email to the provided email address
 * @param {string} email the email address to send the verification email to
 * @returns {Promise<Object>} the response from the server
 */
export const sendVerificationEmail = async (email) => {
  return await pb.collection('users').requestVerification(email);
};

/**
 * sends a password reset email to the provided email address
 * @param {string} email the email address to send the password reset email to
 * @returns {Promise<Object>} the response from the server
 */
export const sendPasswordResetEmail = async (email) => {
  return await pb.collection('users').requestPasswordReset(email);
};