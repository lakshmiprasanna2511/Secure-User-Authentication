/**
 * Role-Based Authorization Middleware
 * Verifies user roles for access control
 */

/**
 * Middleware to check if user has required role
 * @param {...string} allowedRoles - Roles that are allowed to access the route
 * @returns {Function} Middleware function
 */
const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
        });
      }

      // Check if user's role is in the allowed roles
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to access this resource',
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Authorization error occurred',
        error: error.message,
      });
    }
  };
};

module.exports = { authorizeRole };
