/**
 * User Model
 * Defines the user schema and database structure
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // User's full name
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
  },

  // User's email address - must be unique
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },

  // Hashed password - never stored in plain text
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false, // Don't return password by default
  },

  // User role for role-based access control
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  // Profile picture URL
  profilePicture: {
    type: String,
    default: null,
  },

  // Account creation date
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // Last account update date
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // Last login date
  lastLogin: {
    type: Date,
    default: null,
  },

  // Account active status
  isActive: {
    type: Boolean,
    default: true,
  },
});

// Update the updatedAt field before saving
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
