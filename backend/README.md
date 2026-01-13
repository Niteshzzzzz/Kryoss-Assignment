# Backend - Contacts Manager API

Express.js REST API for contacts management with JWT authentication.

## Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure MongoDB URI and JWT_SECRET in .env
# MONGODB_URI=mongodb://localhost:27017/contacts-manager
# JWT_SECRET=your_secret_key

# Start server
npm start

# Start with auto-reload (development)
npm run dev
```

Server runs on `http://localhost:5000`

## API Routes

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Contacts (All require JWT token)
- `GET /api/contacts` - Get all contacts
- `POST /api/contacts` - Create contact
- `GET /api/contacts/:id` - Get single contact
- `PUT /api/contacts/:id` - Update contact
- `PATCH /api/contacts/:id` - Partial update
- `DELETE /api/contacts/:id` - Delete contact (soft delete)

### Health Check
- `GET /api/health` - Health check endpoint

## Environment Variables

```
MONGODB_URI=mongodb://localhost:27017/contacts-manager
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

## Features

- User authentication with JWT
- CRUD operations for contacts
- Input validation
- Error handling middleware
- Soft delete for contacts
- Duplicate email prevention
- Phone number validation

## Database Schema

### User
- username (String, unique, min: 3)
- email (String, unique, valid email)
- password (String, hashed, min: 6)
- timestamps

### Contact
- name (String, required, min: 2)
- email (String, required, unique, valid email)
- phone (String, required, valid phone format)
- address (String, optional)
- isDeleted (Boolean, default: false)
- timestamps

## Dependencies

- express: Web server framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT authentication
- bcryptjs: Password hashing
- cors: Cross-origin requests
- validator: Input validation
- dotenv: Environment variables
- nodemon: Development auto-reload
