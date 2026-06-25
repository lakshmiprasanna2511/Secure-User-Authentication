/**
 * Authentication Context
 * Manages user authentication state globally using Context API
 */

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create authentication context
export const AuthContext = createContext();

/**
 * AuthProvider component - Wraps the app and provides auth state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set authorization header whenever token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
    }
  }, [token]);

  // Verify token on app load
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('/api/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
          setError(null);
        }
      } catch (err) {
        // Token is invalid or expired
        setToken(null);
        setUser(null);
        setError(err.response?.data?.message || 'Authentication failed');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  /**
   * Register new user
   * @param {Object} userData - Registration data
   * @returns {Promise} Registration result
   */
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/auth/register', userData);

      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @returns {Promise} Login result
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.post('/api/auth/login', credentials);

      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setToken(null);
      setUser(null);
      setError(null);
    }
  };

  /**
   * Update user profile
   * @param {Object} updates - Profile updates
   * @returns {Promise} Update result
   */
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const response = await axios.put('/api/users/profile', updates);

      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Change password
   * @param {Object} passwordData - Current and new passwords
   * @returns {Promise} Password change result
   */
  const changePassword = async (passwordData) => {
    try {
      setLoading(true);
      const response = await axios.put('/api/users/change-password', passwordData);

      if (response.data.success) {
        return { success: true };
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Password change failed';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    token,
    loading,
    error,
    register,
    login,
    logout,
    updateProfile,
    changePassword,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
