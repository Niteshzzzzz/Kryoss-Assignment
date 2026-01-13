# API Testing Guide

Complete examples for testing the Contacts Manager API.

## 📚 Table of Contents
1. [Authentication Tests](#authentication-tests)
2. [Contact CRUD Tests](#contact-crud-tests)
3. [Error Scenarios](#error-scenarios)
4. [Testing Tools](#testing-tools)

---

## Authentication Tests

### 1. Register New User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123",
    "passwordConfirm": "password123"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1YTAxNDAwNTU0NjIzMDAxMjM0NTY3OCIsImlhdCI6MTcwNTA3NzMwOCwiZXhwIjoxNzA1NjgyMTA4fQ.5Yd8pQ-9hU3wK1mN6sT7vX2yZ0_aB4cD7eF8gH9iJ0k",
  "user": {
    "id": "65a01400554623001234567",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### 2. Login User

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65a01400554623001234567",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### 3. Get Current User

**Request:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "65a01400554623001234567",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

---

## Contact CRUD Tests

### 1. Create Contact

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Alice Smith",
    "email": "alice@example.com",
    "phone": "+1-555-123-4567",
    "address": "123 Main Street, New York, NY 10001"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "65a01400554623001234568",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "phone": "+1-555-123-4567",
    "address": "123 Main Street, New York, NY 10001",
    "isDeleted": false,
    "createdAt": "2024-01-13T10:30:00.000Z",
    "updatedAt": "2024-01-13T10:30:00.000Z",
    "__v": 0
  }
}
```

### 2. Get All Contacts

**Request:**
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "65a01400554623001234568",
      "name": "Alice Smith",
      "email": "alice@example.com",
      "phone": "+1-555-123-4567",
      "address": "123 Main Street, New York, NY 10001",
      "isDeleted": false,
      "createdAt": "2024-01-13T10:30:00.000Z",
      "updatedAt": "2024-01-13T10:30:00.000Z"
    },
    {
      "_id": "65a01400554623001234569",
      "name": "Bob Johnson",
      "email": "bob@example.com",
      "phone": "555-987-6543",
      "address": "456 Oak Avenue",
      "isDeleted": false,
      "createdAt": "2024-01-13T11:00:00.000Z",
      "updatedAt": "2024-01-13T11:00:00.000Z"
    }
  ]
}
```

### 3. Get Single Contact

**Request:**
```bash
curl -X GET http://localhost:5000/api/contacts/65a01400554623001234568 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65a01400554623001234568",
    "name": "Alice Smith",
    "email": "alice@example.com",
    "phone": "+1-555-123-4567",
    "address": "123 Main Street, New York, NY 10001",
    "isDeleted": false,
    "createdAt": "2024-01-13T10:30:00.000Z",
    "updatedAt": "2024-01-13T10:30:00.000Z"
  }
}
```

### 4. Update Contact (PUT)

**Request:**
```bash
curl -X PUT http://localhost:5000/api/contacts/65a01400554623001234568 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Alice Johnson",
    "email": "alice.j@example.com",
    "phone": "+1-555-987-6543",
    "address": "789 Elm Street, Boston, MA 02101"
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65a01400554623001234568",
    "name": "Alice Johnson",
    "email": "alice.j@example.com",
    "phone": "+1-555-987-6543",
    "address": "789 Elm Street, Boston, MA 02101",
    "isDeleted": false,
    "createdAt": "2024-01-13T10:30:00.000Z",
    "updatedAt": "2024-01-13T11:45:00.000Z"
  }
}
```

### 5. Partial Update Contact (PATCH)

**Request:**
```bash
curl -X PATCH http://localhost:5000/api/contacts/65a01400554623001234568 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "phone": "+1-555-111-2222"
  }'
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "_id": "65a01400554623001234568",
    "name": "Alice Johnson",
    "email": "alice.j@example.com",
    "phone": "+1-555-111-2222",
    "address": "789 Elm Street, Boston, MA 02101",
    "isDeleted": false,
    "createdAt": "2024-01-13T10:30:00.000Z",
    "updatedAt": "2024-01-13T11:46:00.000Z"
  }
}
```

### 6. Delete Contact

**Request:**
```bash
curl -X DELETE http://localhost:5000/api/contacts/65a01400554623001234568 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Contact deleted successfully"
}
```

### 7. Health Check

**Request:**
```bash
curl -X GET http://localhost:5000/api/health
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Server is running"
}
```

---

## Error Scenarios

### 1. Invalid Email Format

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test User",
    "email": "invalid-email",
    "phone": "555-123-4567"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Please provide a valid email"
}
```

### 2. Invalid Phone Format

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Please enter a valid phone number (10-15 digits)"
}
```

### 3. Duplicate Email

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Duplicate Test",
    "email": "alice@example.com",
    "phone": "555-000-1111"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Email already exists"
}
```

### 4. Missing Required Fields

**Request:**
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Test User"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Please provide name, email, and phone"
}
```

### 5. Contact Not Found

**Request:**
```bash
curl -X GET http://localhost:5000/api/contacts/invalid-id \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Expected Response (404):**
```json
{
  "success": false,
  "message": "Contact not found"
}
```

### 6. Unauthorized (No Token)

**Request:**
```bash
curl -X GET http://localhost:5000/api/contacts
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 7. Invalid Token

**Request:**
```bash
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer invalid-token"
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Not authorized to access this route"
}
```

### 8. Login Failed

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nonexistent@example.com",
    "password": "wrongpassword"
  }'
```

**Expected Response (401):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

### 9. Password Mismatch on Register

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "new@example.com",
    "password": "password123",
    "passwordConfirm": "password456"
  }'
```

**Expected Response (400):**
```json
{
  "success": false,
  "message": "Passwords do not match"
}
```

---

## Testing Tools

### Using Postman

1. **Create Environment Variables:**
   - `api_url`: http://localhost:5000/api
   - `token`: (auto-populated after login)

2. **Sample Request Setup:**
   ```
   URL: {{api_url}}/contacts
   Method: GET
   Headers:
   - Authorization: Bearer {{token}}
   ```

### Using Thunder Client (VS Code)

1. Install Thunder Client extension
2. Create new collection
3. Add requests with headers and body
4. Use environment variables for token

### Using REST Client Extension (VS Code)

Create `test.http` file:

```http
### Register
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123",
  "passwordConfirm": "test123"
}

### Login
@token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}

### Get Contacts
GET http://localhost:5000/api/contacts
Authorization: Bearer @token

### Create Contact
POST http://localhost:5000/api/contacts
Authorization: Bearer @token
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-123-4567",
  "address": "123 Main St"
}
```

### Using JavaScript/Node.js

```javascript
// test-api.js
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let token = '';

async function runTests() {
  try {
    // Register
    const registerRes = await axios.post(`${API_URL}/auth/register`, {
      username: 'testuser',
      email: 'test@example.com',
      password: 'test123',
      passwordConfirm: 'test123'
    });
    console.log('✓ Register:', registerRes.data.success);
    token = registerRes.data.token;

    // Get all contacts
    const contactsRes = await axios.get(`${API_URL}/contacts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✓ Get Contacts:', contactsRes.data.success);

    // Create contact
    const createRes = await axios.post(`${API_URL}/contacts`, {
      name: 'Alice Smith',
      email: 'alice@example.com',
      phone: '+1-555-123-4567',
      address: '123 Main St'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✓ Create Contact:', createRes.data.success);

  } catch (error) {
    console.error('✗ Error:', error.response?.data || error.message);
  }
}

runTests();
```

---

## Quick Test Sequence

**Complete flow from scratch:**

```bash
# 1. Register
RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "quicktest",
    "email": "quick@test.com",
    "password": "test123",
    "passwordConfirm": "test123"
  }')

TOKEN=$(echo $RESPONSE | jq -r '.token')
echo "Token: $TOKEN"

# 2. Create Contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Contact",
    "email": "contact@test.com",
    "phone": "555-123-4567"
  }'

# 3. Get All Contacts
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer $TOKEN"
```

---

Happy Testing! 🎉
