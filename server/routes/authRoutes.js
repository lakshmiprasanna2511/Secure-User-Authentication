/**
 * Authentication Routes
 * Routes for user registration, login, logout, and authentication verification
 */

const express = require('express');
const router = express.Router();
const { register, login, getCurrentUser, logout } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

/**
 * POST /api/auth/register
 * Register a new user
 * @body {string} name - User's full name
 * @body {string} email - User's email address
 * @body {string} password - User's password
 * @body {string} confirmPassword - Password confirmation
 * @returns {Object} Success response with JWT token and user data
 */
router.post('/register', register);

/**
 * POST /api/auth/login
 * Login user and generate JWT token
 * @body {string} email - User's email address
 * @body {string} password - User's password
 * @returns {Object} Success response with JWT token and user data
 */
router.post('/login', login);

/**
 * GET /api/auth/me
 * Get current authenticated user's information
 * @requires Authentication token in Authorization header
 * @returns {Object} Current user's information
 */
router.get('/me', authenticateToken, getCurrentUser);

/**
 * POST /api/auth/logout
 * Logout user (client-side token deletion)
 * @returns {Object} Success message
 */
router.post('/logout', logout);

module.exports = router;
