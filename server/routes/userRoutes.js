/**
 * User Routes
 * Routes for user profile management and related operations
 */

const express = require('express');
const router = express.Router();
const { getUserProfile, updateUserProfile, changePassword } = require('../controllers/userController');
const { authenticateToken } = require('../middleware/auth');

/**
 * GET /api/users/profile
 * Get user's profile information
 * @requires Authentication token in Authorization header
 * @returns {Object} User profile data
 */
router.get('/profile', authenticateToken, getUserProfile);

/**
 * PUT /api/users/profile
 * Update user's profile (name and/or email)
 * @requires Authentication token in Authorization header
 * @body {string} name - (Optional) User's new name
 * @body {string} email - (Optional) User's new email
 * @returns {Object} Updated user data
 */
router.put('/profile', authenticateToken, updateUserProfile);

/**
 * PUT /api/users/change-password
 * Change user's password
 * @requires Authentication token in Authorization header
 * @body {string} currentPassword - User's current password
 * @body {string} newPassword - User's new password
 * @body {string} confirmPassword - Confirmation of new password
 * @returns {Object} Success message
 */
router.put('/change-password', authenticateToken, changePassword);

module.exports = router;
