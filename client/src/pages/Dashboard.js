/**
 * Dashboard Page
 * Main dashboard showing user information
 */

import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import './Pages.css';

/**
 * Dashboard - Displays user information and welcome message
 */
const Dashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading user information...</div>;
  }

  // Format date to readable format
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <h1>Welcome, {user.name}! 👋</h1>
        <p>This is your secure dashboard</p>
      </div>

      {/* Dashboard Cards */}
      <div className="dashboard-grid">
        {/* User Information Card */}
        <div className="card">
          <h2>👤 Profile Information</h2>
          <div className="card-content">
            <div className="info-row">
              <span className="info-label">Name:</span>
              <span className="info-value">{user.name}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Role:</span>
              <span className={`badge badge-${user.role}`}>{user.role.toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Account Details Card */}
        <div className="card">
          <h2>📅 Account Details</h2>
          <div className="card-content">
            <div className="info-row">
              <span className="info-label">Account Created:</span>
              <span className="info-value">{formatDate(user.createdAt)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Last Login:</span>
              <span className="info-value">
                {user.lastLogin ? formatDate(user.lastLogin) : 'This is your first login'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions Card */}
        <div className="card">
          <h2>⚡ Quick Actions</h2>
          <div className="card-content">
            <a href="/profile" className="action-link">
              → Edit Profile
            </a>
            <a href="/profile" className="action-link">
              → Change Password
            </a>
            {user.role === 'admin' && (
              <a href="/admin" className="action-link admin">
                → Admin Panel
              </a>
            )}
          </div>
        </div>

        {/* Security Card */}
        <div className="card">
          <h2>🔒 Security</h2>
          <div className="card-content">
            <p className="security-info">
              Your account is protected with industry-leading security:
            </p>
            <ul className="security-list">
              <li>✓ Password encrypted with bcrypt</li>
              <li>✓ JWT token-based authentication</li>
              <li>✓ HTTPS-only connections</li>
              <li>✓ CORS protection enabled</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
