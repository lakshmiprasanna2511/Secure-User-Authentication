/**
 * Navbar Component
 * Navigation bar with user menu and logout functionality
 */

import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css';

/**
 * Navbar - Displays navigation and user menu
 */
const Navbar = () => {
  const { user, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand */}
        <Link to="/" className="navbar-logo">
          🔒 SecureAuth
        </Link>

        {/* Navigation Links */}
        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              {/* Authenticated User Menu */}
              <div className="navbar-user-menu">
                <button
                  className="navbar-user-button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  👤 {user?.name}
                </button>

                {isMenuOpen && (
                  <div className="navbar-dropdown">
                    <Link
                      to="/dashboard"
                      className="navbar-dropdown-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      className="navbar-dropdown-item"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="navbar-dropdown-item admin"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      className="navbar-dropdown-item logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Unauthenticated User Links */}
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
