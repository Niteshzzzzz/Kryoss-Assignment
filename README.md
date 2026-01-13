# Contacts Manager Application

A full-stack web application for managing contacts with user authentication. Built with React, Tailwind CSS, Express.js, and MongoDB.

## 📋 Features

### Must-Have Features Implemented
- ✅ **Create**: Add new contacts with name, email, phone, and address
- ✅ **Read**: Display list of all contacts with ability to view individual details
- ✅ **Update**: Edit existing contact information
- ✅ **Delete**: Soft delete contacts (marked as deleted, not permanently removed)
- ✅ **Validation**: 
  - Email format validation (RFC 5322 compliant)
  - Phone number validation (10-15 digits)
  - Required fields validation
  - Duplicate email prevention
- ✅ **UI/UX**: Clean, responsive interface with table view and form for operations
- ✅ **Error Handling**: Clear error messages for all operations
- ✅ **Authentication**: JWT-based user authentication with registration and login
- ✅ **Documentation**: Complete README with setup and run instructions

## 🏗️ Project Structure

```
contacts-manager/
├── backend/                          # Express.js API server
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js    # Authentication logic
│   │   │   └── contactController.js # Contact CRUD operations
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   └── errorHandler.js      # Error handling
│   │   ├── models/
│   │   │   ├── Contact.js           # Contact schema
│   │   │   └── User.js              # User schema
│   │   ├── routes/
│   │   │   ├── auth.js              # Auth routes
│   │   │   └── contacts.js          # Contact routes
│   │   └── server.js                # Server entry point
│   ├── package.json
│   └── .env.example
│
└── frontend/                         # React application
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Alert.js             # Alert notifications
    │   │   ├── ContactForm.js        # Contact form component
    │   │   └── ContactList.js        # Contacts table component
    │   ├── pages/
    │   │   ├── HomePage.js           # Main contacts page
    │   │   ├── LoginPage.js          # Login page
    │   │   └── RegisterPage.js       # Registration page
    │   ├── services/
    │   │   ├── api.js                # API client setup
    │   │   └── contactService.js     # API service calls
    │   ├── App.js                    # Main app component
    │   ├── index.js                  # React entry point
    │   └── index.css                 # Global styles
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create .env file**
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** (edit `.env`)
   ```
   MONGODB_URI=mongodb://localhost:27017/contacts-manager
   JWT_SECRET=your_secure_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

   For MongoDB Atlas:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/contacts-manager
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend application**
   ```bash
   npm run dev
   ```

   Frontend will open at `http://localhost:3000`

## 📡 API Endpoints

### Authentication Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (Protected) |

### Contact Routes (All require JWT authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Get all contacts |
| POST | `/api/contacts` | Create new contact |
| GET | `/api/contacts/:id` | Get specific contact |
| PUT | `/api/contacts/:id` | Update entire contact |
| PATCH | `/api/contacts/:id` | Partial update contact |
| DELETE | `/api/contacts/:id` | Delete contact (soft delete) |
| GET | `/api/health` | Health check |

## 📝 API Request/Response Examples

### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123",
  "passwordConfirm": "securepass123"
}

Response (201):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Login User
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepass123"
}

Response (200):
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Create Contact
```bash
POST /api/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Alice Smith",
  "email": "alice@example.com",
  "phone": "+1-555-123-4567",
  "address": "123 Main St, City, State"
}

Response (201):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "phone": "+1-555-123-4567",
    "address": "123 Main St, City, State",
    "isDeleted": false,
    "createdAt": "2024-01-13T10:30:00.000Z",
    "updatedAt": "2024-01-13T10:30:00.000Z"
  }
}
```

### Get All Contacts
```bash
GET /api/contacts
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Alice Smith",
      "email": "alice@example.com",
      "phone": "+1-555-123-4567",
      "address": "123 Main St, City, State",
      "isDeleted": false,
      "createdAt": "2024-01-13T10:30:00.000Z",
      "updatedAt": "2024-01-13T10:30:00.000Z"
    }
  ]
}
```

### Update Contact
```bash
PUT /api/contacts/507f1f77bcf86cd799439012
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Alice Johnson",
  "email": "alice.j@example.com",
  "phone": "+1-555-987-6543",
  "address": "456 Oak Ave, City, State"
}

Response (200):
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Alice Johnson",
    "email": "alice.j@example.com",
    "phone": "+1-555-987-6543",
    "address": "456 Oak Ave, City, State",
    "isDeleted": false,
    "createdAt": "2024-01-13T10:30:00.000Z",
    "updatedAt": "2024-01-13T11:45:00.000Z"
  }
}
```

### Delete Contact
```bash
DELETE /api/contacts/507f1f77bcf86cd799439012
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

### Error Response Example
```bash
POST /api/contacts
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Bob",
  "email": "invalid-email",
  "phone": "123"
}

Response (400):
{
  "success": false,
  "message": "Please provide a valid email, Please provide a valid phone number (10-15 digits)"
}
```

## 🔒 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. **Register**: Create a new user account
2. **Login**: Get JWT token
3. **Token Storage**: Token is stored in localStorage
4. **Protected Routes**: All contact endpoints require valid JWT token
5. **Token Expiration**: Tokens expire after 7 days

### Using the API with Authentication

```bash
# Get token first
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'

# Use token in subsequent requests
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer <your_token_here>"
```

## ✅ Validation Rules

### Contact Fields
- **Name**: 
  - Required
  - Minimum 2 characters
  - String type

- **Email**: 
  - Required
  - Valid email format (RFC 5322 compliant)
  - Unique (no duplicates allowed)
  - Converted to lowercase

- **Phone**: 
  - Required
  - Format: 10-15 digits with optional country code
  - Valid formats: `123-456-7890`, `(123) 456-7890`, `+1-555-123-4567`

- **Address**: 
  - Optional
  - String type
  - Trimmed whitespace

### User Fields
- **Username**: 
  - Required
  - Minimum 3 characters
  - Unique

- **Email**: 
  - Required
  - Valid email format
  - Unique

- **Password**: 
  - Required
  - Minimum 6 characters
  - Hashed with bcrypt

## 🎨 User Interface

### Login/Register Page
- Clean form with email and password fields
- Links to switch between login and registration
- Real-time validation
- Success/error alerts

### Home Page (Contacts Dashboard)
- Header with welcome message and logout button
- "Add New Contact" button
- Responsive contacts table with columns:
  - Name
  - Email
  - Phone
  - Address
  - Action buttons (Edit, Delete)
- Contact form for creating/editing
- Alert notifications for operations

## 🐛 Error Handling

The application handles various error scenarios:

| Error | Status | Message |
|-------|--------|---------|
| Invalid email format | 400 | "Please provide a valid email" |
| Duplicate email | 400 | "Email already exists" |
| Invalid phone | 400 | "Please enter a valid phone number" |
| Missing required field | 400 | "[Field] is required" |
| Contact not found | 404 | "Contact not found" |
| Invalid token | 401 | "Not authorized to access this route" |
| Server error | 500 | "Server Error" |

## 📦 Dependencies

### Backend
- `express`: Web framework
- `mongoose`: MongoDB ORM
- `jsonwebtoken`: JWT authentication
- `bcryptjs`: Password hashing
- `cors`: Cross-origin requests
- `validator`: Data validation
- `dotenv`: Environment variables
- `nodemon` (dev): Auto-reload server

### Frontend
- `react`: UI library
- `react-dom`: React DOM renderer
- `react-router-dom`: Routing
- `axios`: HTTP client
- `tailwindcss`: Utility-first CSS
- `postcss`: CSS processing
- `autoprefixer`: CSS vendor prefixes

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/contacts-manager
JWT_SECRET=your_very_secure_secret_key_change_this
PORT=5000
NODE_ENV=development
```

**Frontend (.env.local)** (optional)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Responsive table with horizontal scroll on mobile
- Mobile-friendly forms and buttons
- Touch-friendly UI elements

## 🚀 Deployment

### Deploy Backend (e.g., Heroku)

```bash
# Install Heroku CLI
# Create Heroku app
heroku create contacts-manager-api

# Set environment variables
heroku config:set JWT_SECRET=your_secret_key
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### Deploy Frontend (e.g., Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🧪 Testing API with cURL

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'

# Login
TOKEN=$(curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}' \
  | jq -r '.token')

# Get all contacts
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer $TOKEN"

# Create contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1-555-123-4567",
    "address": "123 Main St"
  }'
```

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Environment variable protection
- Secure password confirmation
- Token expiration (7 days)

## 📞 Support & Documentation

For issues or questions:
1. Check the error message displayed in the UI
2. Review console logs for detailed error information
3. Ensure MongoDB is running and properly configured
4. Verify JWT_SECRET is set in .env
5. Check that ports 3000 (frontend) and 5000 (backend) are available

## 📄 License

MIT License

## 👨‍💻 Author

Contacts Manager Application - Full Stack Project

---

**Happy managing contacts!** 🎉
