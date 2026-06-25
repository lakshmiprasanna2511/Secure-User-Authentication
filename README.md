# Secure User Authentication System

A modern, production-ready authentication system built with **React.js, Node.js, Express.js, MongoDB, JWT, and bcrypt**.

## 🌟 Features

### Authentication
- ✅ User Registration with validation
- ✅ Secure Login with JWT tokens
- ✅ User Logout
- ✅ Session Management
- ✅ Token Expiration (7 days default)

### Security
- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT-based authentication
- ✅ Protected API routes with middleware
- ✅ Input validation and sanitization
- ✅ MongoDB injection protection
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Helmet security headers
- ✅ Rate limiting (15 min window, 100 requests limit)

### User Management
- ✅ User registration with email verification
- ✅ Profile viewing and editing
- ✅ Password change functionality
- ✅ Account creation and last login tracking
- ✅ Profile picture support (optional)

### Role-Based Access Control
- ✅ User and Admin roles
- ✅ Protected routes based on roles
- ✅ Admin panel for user management
- ✅ User deletion (admin only)
- ✅ Role assignment (admin only)

### Frontend
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Modern UI with gradient design
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling
- ✅ Toast notifications
- ✅ Dark/Light mode ready

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas)

## 🚀 Installation & Setup

### 1. Clone or Download the Project

```bash
cd SUA
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file (already provided, update if needed)
# Ensure MongoDB is running

# Start server
npm run dev  # Development with nodemon
# or
npm start    # Production
```

**Server runs on:** `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start React development server
npm start
```

**Frontend runs on:** `http://localhost:3000`

## 🗄️ Database Setup

### Option 1: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   - **Windows:** `mongod`
   - **Mac/Linux:** `mongod`

### Option 2: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/secure-auth-db
   ```

## 📁 Project Structure

```
SUA/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth context
│   │   ├── services/      # API services
│   │   ├── routes/        # Route configuration
│   │   ├── App.js         # Main App component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── controllers/        # Request handlers
│   ├── models/            # Database schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Auth & validation
│   ├── config/            # Configuration
│   ├── utils/             # Utility functions
│   ├── server.js          # Server entry point
│   ├── package.json
│   └── .env               # Environment variables
│
└── README.md              # This file
```

## 🔐 Environment Variables

### Server (.env)

```
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/secure-auth-db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS Configuration
CLIENT_URL=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

### Important: Change JWT_SECRET in Production!

## 📚 API Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API endpoints and examples.

### Quick API Overview

#### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

#### User Routes
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password

#### Admin Routes
- `GET /api/admin/users` - Get all users (admin only)
- `DELETE /api/admin/users/:id` - Delete user (admin only)
- `PUT /api/admin/users/:id/role` - Update user role (admin only)

## 🎯 Usage

### 1. Register a New Account

- Navigate to `/register`
- Fill in: Name, Email, Password (with special characters, uppercase, lowercase, numbers)
- Click "Create Account"

### 2. Login

- Navigate to `/login`
- Enter email and password
- Click "Login"

### 3. Access Dashboard

- View user information
- Check account creation date and last login
- Access quick actions

### 4. Manage Profile

- Go to `/profile`
- Edit name and email
- Change password

### 5. Admin Features (Admin Users Only)

- Go to `/admin`
- View all registered users
- Delete users
- Change user roles

## 🔒 Security Features Implemented

1. **Password Security**
   - Bcrypt hashing with 10 salt rounds
   - Strong password requirements validation
   - Never stored in plain text

2. **JWT Security**
   - Token-based authentication
   - 7-day expiration by default
   - Automatic token verification on protected routes

3. **API Security**
   - CORS protection
   - Helmet security headers
   - Rate limiting on login endpoint
   - Input validation and sanitization

4. **Database Security**
   - MongoDB injection protection (mongoose)
   - XSS prevention
   - Secure field selection

## 🧪 Testing the Application

### Test User Registration
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass@123",
  "confirmPassword": "SecurePass@123"
}
```

### Test User Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass@123"
}
```

### Test Protected Route
```bash
GET /api/auth/me
Authorization: Bearer [token_from_login]
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920x1080 and above)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🚢 Deployment

### Frontend - Vercel

```bash
# Build for production
npm run build

# Deploy to Vercel
# Connect GitHub repo to Vercel dashboard
# Vercel automatically deploys on push
```

### Backend - Render

```bash
# 1. Push backend to GitHub
# 2. Create account on render.com
# 3. Connect GitHub repository
# 4. Create new Web Service
# 5. Set environment variables in dashboard
# 6. Deploy
```

### Environment Variables for Production

```
NODE_ENV=production
JWT_SECRET=[long-random-secret-key]
MONGODB_URI=[mongodb-atlas-connection-string]
CLIENT_URL=[your-frontend-url]
```

## 📝 Password Requirements

Passwords must contain:
- ✓ Minimum 8 characters
- ✓ One uppercase letter (A-Z)
- ✓ One lowercase letter (a-z)
- ✓ One number (0-9)
- ✓ One special character (!@#$%^&*()_+)

Example: `SecurePass@123`

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check connection string in .env
- Verify database name and credentials

### CORS Error
- Ensure CLIENT_URL in .env matches frontend URL
- Check browser console for detailed errors

### JWT Token Expired
- Token expires after 7 days (configurable)
- User will be redirected to login
- Login again to get new token

### Port Already in Use
- Backend port 5000: `lsof -ti:5000 | xargs kill`
- Frontend port 3000: `lsof -ti:3000 | xargs kill`

## 📚 Technology Stack

### Frontend
- React 18.2+
- React Router 6.11+
- Axios for API calls
- Context API for state management
- CSS3 for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcryptjs for password hashing
- Helmet for security
- Express Rate Limit

### Database
- MongoDB (NoSQL)

## 🤝 Contributing

Feel free to fork and contribute improvements!

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## ✉️ Support

For issues or questions, please create an issue in the repository.

---

**Happy Coding! 🚀**

Built with ❤️ using modern web technologies
