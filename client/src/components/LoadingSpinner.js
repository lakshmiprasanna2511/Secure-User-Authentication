/**
 * Loading Spinner Component
 * Displays a loading spinner while data is being fetched
 */

import React from 'react';
import './LoadingSpinner.css';

/**
 * LoadingSpinner - Shows a spinning loader animation
 * @param {Object} props - Component props
 * @param {string} props.message - Optional message to display with spinner
 */
const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p className="spinner-message">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
