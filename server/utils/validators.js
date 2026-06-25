/**
 * Input Validators
 * Validates user inputs for registration, login, and profile updates
 */

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Validate password strength
 * Password must contain:
 * - Minimum 8 characters
 * - One uppercase letter
 * - One lowercase letter
 * - One number
 * - One special character
 * @param {string} password - Password to validate
 * @returns {Object} Validation result
 */
const validatePassword = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} Is email valid
 */
const validateEmail = (email) => {
  return emailRegex.test(email);
};

/**
 * Validate name
 * @param {string} name - Name to validate
 * @returns {boolean} Is name valid
 */
const validateName = (name) => {
  return name && name.trim().length >= 2;
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/[<>]/g, '')
    .trim();
};

module.exports = {
  validatePassword,
  validateEmail,
  validateName,
  sanitizeInput,
};
