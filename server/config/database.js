/**
 * Database Configuration
 * Handles MongoDB connection and initialization
 */

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

/**
 * Connect to MongoDB database
 * @returns {Promise<boolean>} MongoDB connection promise
 */
const connectDB = async () => {
  mongoose.set('strictQuery', false);

  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/secure-auth-db';

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✓ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.warn('✗ MongoDB connection error:', error.message);
    console.warn('⚠ Falling back to in-memory MongoDB instance. Data will not persist after restart.');

    try {
      const memoryServer = await MongoMemoryServer.create();
      const memoryUri = memoryServer.getUri();

      await mongoose.connect(memoryUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log('✓ Connected to in-memory MongoDB instance');
      return true;
    } catch (memoryError) {
      console.error('✗ In-memory MongoDB connection error:', memoryError.message);
      process.exit(1);
    }
  }
};

module.exports = { connectDB };
