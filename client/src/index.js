import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Suppress specific warning about ReactDOM.render
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0].includes('ReactDOM.render is no longer supported in React 18')) {
    return;
  }
  originalConsoleError(...args);
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);