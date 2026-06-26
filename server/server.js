/**
 * Main Server Entry Point
 * Initializes Express server with all middleware and routes
 */

require('dotenv').config();
console.log("Mongo URI:", process.env.MONGODB_URI);
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { connectDB } = require('./config/database');

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Initialize Express app
const app = express();

// ========== SECURITY MIDDLEWARE ==========

/**
 * Helmet - Secures Express app by setting various HTTP headers
 * Protects against: XSS, clickjacking, MIME type sniffing, etc.
 */
app.use(helmet());

/**
 * CORS - Allow requests from frontend origin
 * Prevents unauthorized cross-origin requests
 */
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}));

/**
 * Rate Limiting - Limit login attempts to prevent brute force attacks
 * Configured via environment variables
 */
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW, 10) || 15) * 60 * 1000, // Convert minutes to milliseconds
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS, 10) || 100, // Maximum requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply rate limiting to login route specifically
app.use('/api/auth/login', limiter);

// ========== BODY PARSER MIDDLEWARE ==========

/**
 * Parse incoming request bodies as JSON
 * Limit request size to prevent large payload attacks
 */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// ========== ROUTES ==========

/**
 * Health check endpoint
 * Used to verify server is running
 */
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date(),
  });
});

/**
 * Mount authentication routes
 * POST /api/auth/register
 * POST /api/auth/login
 * POST /api/auth/logout
 * GET /api/auth/me
 */
app.use('/api/auth', authRoutes);

/**
 * Mount user routes
 * GET /api/users/profile
 * PUT /api/users/profile
 * PUT /api/users/change-password
 */
app.use('/api/users', userRoutes);

/**
 * Mount admin routes
 * GET /api/admin/users
 * DELETE /api/admin/users/:id
 * PUT /api/admin/users/:id/role
 */
app.use('/api/admin', adminRoutes);

// ========== ERROR HANDLING ==========

/**
 * 404 Not Found handler
 * Catches all requests to undefined routes
 */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

/**
 * Global error handler
 * Handles all errors thrown in route handlers
 */
app.use((err, req, res, next) => {
  console.error('Error:', err);

  return res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

// ========== SERVER STARTUP ==========

/**
 * Start server and connect to database
 */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Start listening on port
    app.listen(PORT, () => {
      console.log(`\n✓ Server running on http://localhost:${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`✓ CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:3000'}\n`);
    });
  } catch (error) {
    console.error('✗ Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

module.exports = app;
