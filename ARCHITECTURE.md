# Project Architecture & Implementation Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER BROWSER                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         React Frontend (Port 3000)                   │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  Pages (Login, Register, Home)              │    │   │
│  │  │  ├─ LoginPage.js                            │    │   │
│  │  │  ├─ RegisterPage.js                         │    │   │
│  │  │  └─ HomePage.js                             │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  Components                                 │    │   │
│  │  │  ├─ ContactForm (Create/Edit)               │    │   │
│  │  │  ├─ ContactList (Display Table)             │    │   │
│  │  │  └─ Alert (Notifications)                   │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │  Services (API Calls)                       │    │   │
│  │  │  ├─ api.js (Axios setup + interceptors)     │    │   │
│  │  │  └─ contactService.js (API endpoints)       │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                             │
              HTTP/REST API (JSON)
                             │
┌─────────────────────────────────────────────────────────────┐
│             Express Backend (Port 5000)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Routes Layer                                        │   │
│  │  ├─ /api/auth (register, login, me)                  │   │
│  │  └─ /api/contacts (CRUD operations)                  │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Middleware Layer                                    │   │
│  │  ├─ auth.js (JWT verification)                       │   │
│  │  └─ errorHandler.js (Error handling)                 │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers Layer                                   │   │
│  │  ├─ authController.js (Auth logic)                   │   │
│  │  └─ contactController.js (Contact logic)             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Models Layer (Mongoose)                             │   │
│  │  ├─ Contact Schema                                   │   │
│  │  └─ User Schema                                      │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                             │
                    MongoDB Driver
                             │
┌─────────────────────────────────────────────────────────────┐
│           MongoDB Database                                    │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Collections                                         │   │
│  │  ├─ users (username, email, password)                │   │
│  │  └─ contacts (name, email, phone, address)           │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow Diagram

### Authentication Flow
```
User Registration/Login
         │
         ↓
   AuthController
    (validate input)
         │
         ↓
   User Schema
  (create/find user)
         │
         ↓
  Generate JWT Token
         │
         ↓
Return Token + User Info
         │
         ↓
Store in localStorage
```

### Contact CRUD Flow
```
User Action (Create/Read/Update/Delete)
         │
         ↓
ContactService (API call)
         │
         ↓
Authorization Header + JWT Token
         │
         ↓
Backend Routes
         │
         ↓
Auth Middleware (Verify JWT)
         │
         ↓
ContactController (Business Logic)
         │
         ↓
ContactSchema (Validate & Query)
         │
         ↓
MongoDB
         │
         ↓
Response (Success/Error)
         │
         ↓
React State Update
         │
         ↓
UI Re-render with Alert
```

## 🔄 Component Interaction

### Frontend Component Tree
```
App.js
├── Router
│   ├── LoginPage
│   │   └── Alert
│   ├── RegisterPage
│   │   └── Alert
│   └── HomePage
│       ├── ContactForm
│       │   └── Alert (on submit)
│       ├── ContactList
│       │   └── Action Buttons
│       └── Alert (notifications)
```

## 📝 File Organization

### Backend Structure
```
backend/
├── src/
│   ├── controllers/
│   │   ├── authController.js      (90 lines)
│   │   └── contactController.js   (150 lines)
│   ├── middleware/
│   │   ├── auth.js                (20 lines)
│   │   └── errorHandler.js        (40 lines)
│   ├── models/
│   │   ├── Contact.js             (40 lines)
│   │   └── User.js                (50 lines)
│   ├── routes/
│   │   ├── auth.js                (10 lines)
│   │   └── contacts.js            (15 lines)
│   └── server.js                  (35 lines)
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

### Frontend Structure
```
frontend/
├── src/
│   ├── components/
│   │   ├── Alert.js               (35 lines)
│   │   ├── ContactForm.js         (100 lines)
│   │   └── ContactList.js         (60 lines)
│   ├── pages/
│   │   ├── LoginPage.js           (85 lines)
│   │   ├── RegisterPage.js        (120 lines)
│   │   └── HomePage.js            (130 lines)
│   ├── services/
│   │   ├── api.js                 (30 lines)
│   │   └── contactService.js      (30 lines)
│   ├── App.js                     (45 lines)
│   ├── index.js                   (10 lines)
│   └── index.css                  (15 lines)
├── public/
│   └── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## 🔐 Authentication & Authorization Flow

### JWT Token Process
```
1. User Registration
   │
   ├─ Validate input
   ├─ Hash password (bcrypt)
   ├─ Save user to DB
   └─ Generate JWT token

2. JWT Token Contains
   ├─ User ID
   ├─ Expiration (7 days)
   └─ Secret signature

3. Token Storage
   └─ localStorage (client-side)

4. API Requests
   ├─ Include token in headers
   └─ Format: "Authorization: Bearer <token>"

5. Server Verification
   ├─ Extract token from headers
   ├─ Verify signature
   ├─ Check expiration
   └─ Attach user data to request

6. Access Control
   ├─ Protected routes require token
   ├─ Invalid/expired token = 401
   └─ Valid token = Proceed with request
```

## ✅ Validation Pipeline

### Frontend Validation
```
User Input
    │
    ├─ Email Format Check
    │   └─ Regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    │
    ├─ Phone Format Check
    │   └─ Regex: /^[+]?[(]?[0-9]{3}[)]?[-\s]?[0-9]{3}[-\s]?[0-9]{4,6}$/
    │
    ├─ Required Fields Check
    │   └─ name, email, phone are mandatory
    │
    └─ Length Checks
        ├─ name: minimum 2 chars
        ├─ username: minimum 3 chars
        └─ password: minimum 6 chars
```

### Backend Validation
```
Request Data
    │
    ├─ Schema Validation (Mongoose)
    │   ├─ Type checking
    │   ├─ Required fields
    │   ├─ String validation
    │   └─ Custom validators
    │
    ├─ Email Validation
    │   ├─ Format check (validator.js)
    │   └─ Uniqueness check (DB query)
    │
    ├─ Phone Validation
    │   └─ Regex pattern match
    │
    └─ Business Logic Validation
        └─ Duplicate email across contacts
```

## 📈 Error Handling Strategy

### Frontend Error Handling
```
API Call
    │
    ├─ Request Interceptor
    │   └─ Add JWT token
    │
    ├─ Response
    │   ├─ Success
    │   │   └─ Handle data
    │   └─ Error
    │       ├─ 400: Validation error
    │       ├─ 401: Unauthorized
    │       ├─ 404: Not found
    │       ├─ 500: Server error
    │       └─ Display Alert
    │
    └─ Automatic Redirect
        └─ 401: Redirect to login
```

### Backend Error Handling
```
Request
    │
    ├─ Route Handler
    │   ├─ Try-Catch Block
    │   │   ├─ Validation errors
    │   │   ├─ Database errors
    │   │   └─ Business logic errors
    │   └─ Error Middleware
    │       ├─ Format error
    │       ├─ Log error
    │       └─ Send response
    │
    └─ Response
        ├─ Success: {success: true, data}
        └─ Error: {success: false, message}
```

## 🚀 Request/Response Cycle

### Example: Create Contact
```
1. Frontend
   ├─ User fills form
   ├─ Click "Save Contact"
   └─ Validation passes

2. API Call
   ├─ POST /api/contacts
   ├─ Headers: Authorization: Bearer {token}
   ├─ Body: {name, email, phone, address}
   └─ contentService.create()

3. Interceptor
   ├─ Add JWT token to headers
   └─ Make HTTP request

4. Backend Route
   ├─ Match POST /api/contacts
   └─ Route handler triggered

5. Middleware
   ├─ Auth middleware
   ├─ Verify JWT token
   ├─ Extract user ID
   └─ Attach to request

6. Controller
   ├─ Extract body data
   ├─ Validate input
   ├─ Check duplicate email
   └─ Create contact document

7. Database
   ├─ Save to MongoDB
   ├─ Return saved document
   └─ Include _id and timestamps

8. Response
   ├─ Status: 201 Created
   ├─ Body: {success: true, data: contact}
   └─ Send to frontend

9. Frontend Handler
   ├─ Check response.success
   ├─ Update state with new contact
   ├─ Show success alert
   ├─ Clear form
   └─ Fetch updated contact list

10. UI Update
    └─ Contact appears in table
```

## 🎯 Testing Scenarios

### User Registration
1. Valid inputs → Success
2. Existing email → Error
3. Password mismatch → Error
4. Short password → Error
5. Invalid email → Error

### Contact Management
1. Create valid contact → Success
2. Duplicate email → Error
3. Invalid phone → Error
4. Empty required fields → Error
5. Update contact → Success
6. Delete contact → Success (soft delete)
7. View updated list → Success

## 📦 Deployment Checklist

- [ ] Environment variables set
- [ ] MongoDB connection verified
- [ ] JWT secret configured
- [ ] CORS settings correct
- [ ] Frontend API URL configured
- [ ] Build process tested
- [ ] Error handling verified
- [ ] Security headers added
- [ ] Rate limiting configured (optional)
- [ ] Monitoring setup (optional)

---

This architecture provides a scalable, maintainable, and secure foundation for the Contacts Manager application.
