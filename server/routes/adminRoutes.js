/**
 * Admin Routes
 * Routes for admin-specific operations (user management, role assignment)
 */

const express = require('express');
const router = express.Router();
const { getAllUsers, deleteUser, updateUserRole } = require('../controllers/adminController');
const { authenticateToken } = require('../middleware/auth');
const { authorizeRole } = require('../middleware/roleAuth');

/**
 * GET /api/admin/users
 * Get all users (Admin only)
 * @requires Authentication token in Authorization header
 * @requires Admin role
 * @returns {Object} Array of all users with their information
 */
router.get('/users', authenticateToken, authorizeRole('admin'), getAllUsers);

/**
 * DELETE /api/admin/users/:id
 * Delete a user by ID (Admin only)
 * @requires Authentication token in Authorization header
 * @requires Admin role
 * @param {string} id - User ID to delete
 * @returns {Object} Success message with deleted user info
 */
router.delete('/users/:id', authenticateToken, authorizeRole('admin'), deleteUser);

/**
 * PUT /api/admin/users/:id/role
 * Update user's role (Admin only)
 * @requires Authentication token in Authorization header
 * @requires Admin role
 * @param {string} id - User ID
 * @body {string} role - New role ("user" or "admin")
 * @returns {Object} Updated user data with new role
 */
router.put('/users/:id/role', authenticateToken, authorizeRole('admin'), updateUserRole);

module.exports = router;
