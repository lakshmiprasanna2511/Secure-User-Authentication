/**
 * Home Page
 * Landing page for the application
 */

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Pages.css';

/**
 * Home - Welcome page with features overview
 */
const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="page-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>🔒 Secure User Authentication System</h1>
          <p>
            A modern, secure authentication system built with React, Node.js, Express, and MongoDB.
          </p>

          {!isAuthenticated ? (
            <div className="hero-buttons">
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-large">
                Login
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="btn btn-primary btn-large">
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🔐</span>
            <h3>Secure Passwords</h3>
            <p>Passwords hashed with bcrypt, never stored in plain text</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">🎫</span>
            <h3>JWT Authentication</h3>
            <p>Secure token-based authentication with expiration</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">👥</span>
            <h3>Role-Based Access</h3>
            <p>User and Admin roles with different permissions</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">✅</span>
            <h3>Input Validation</h3>
            <p>Comprehensive validation to prevent malicious input</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">⚡</span>
            <h3>Fast & Reliable</h3>
            <p>Built with modern technologies for optimal performance</p>
          </div>

          <div className="feature-card">
            <span className="feature-icon">📱</span>
            <h3>Responsive Design</h3>
            <p>Works seamlessly on desktop, tablet, and mobile</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="tech-stack-section">
        <h2>Technology Stack</h2>
        <div className="tech-grid">
          <div className="tech-badge">React</div>
          <div className="tech-badge">Node.js</div>
          <div className="tech-badge">Express.js</div>
          <div className="tech-badge">MongoDB</div>
          <div className="tech-badge">JWT</div>
          <div className="tech-badge">bcrypt</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
