# 🚀 Quick Start Guide - Contacts Manager

## Prerequisites
- Node.js v14+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Step 1: Setup Backend

```bash
cd backend
npm install
cp .env.example .env
```

**Edit `backend/.env`:**
```
MONGODB_URI=mongodb://localhost:27017/contacts-manager
JWT_SECRET=your_super_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Start Backend Server:**
```bash
npm run dev
```
✅ Backend running at `http://localhost:5000`

## Step 2: Setup Frontend (New Terminal)

```bash
cd frontend
npm install
npm start
```
✅ Frontend opens at `http://localhost:3000`

## Step 3: Test the Application

1. **Register a new account**
   - Go to Register page
   - Fill in username, email, password
   - Click Register

2. **Login**
   - Use the credentials you just created
   - You'll be redirected to the dashboard

3. **Create a Contact**
   - Click "Add New Contact"
   - Fill in Name, Email, Phone
   - Click "Save Contact"

4. **Edit a Contact**
   - Click "Edit" button on any contact
   - Modify the information
   - Click "Save Contact"

5. **Delete a Contact**
   - Click "Delete" button
   - Confirm deletion
   - Contact is removed

## 🔧 Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check MONGODB_URI in .env
- For MongoDB Atlas: ensure IP whitelist includes your IP

### Port Already in Use
```bash
# Backend (port 5000)
netstat -ano | findstr :5000

# Frontend (port 3000)
netstat -ano | findstr :3000
```

### CORS Issues
- Make sure backend is running on port 5000
- Frontend will proxy requests to backend

### Form Validation Errors
- Email must be valid format
- Phone must be 10-15 digits
- All fields (name, email, phone) are required

## 📝 Sample Test Data

**Sample Contact:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-123-4567",
  "address": "123 Main Street, New York, NY 10001"
}
```

**Sample User:**
```json
{
  "username": "johndoe",
  "email": "user@example.com",
  "password": "password123"
}
```

## 📚 API Testing with cURL

```bash
# 1. Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123",
    "passwordConfirm": "test123"
  }'

# 2. Login and save token
TOKEN="your_token_from_login"

# 3. Create Contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Alice",
    "email": "alice@example.com",
    "phone": "555-123-4567"
  }'

# 4. Get All Contacts
curl -X GET http://localhost:5000/api/contacts \
  -H "Authorization: Bearer $TOKEN"

# 5. Health Check
curl http://localhost:5000/api/health
```

## 🎯 Key Features Checklist

- ✅ Create contacts (name, email, phone, address)
- ✅ Read/View all contacts
- ✅ Update/Edit contacts
- ✅ Delete contacts (soft delete)
- ✅ Email validation
- ✅ Phone validation
- ✅ Duplicate email prevention
- ✅ User authentication (JWT)
- ✅ Clean responsive UI
- ✅ Error handling with messages
- ✅ Form validation
- ✅ Complete documentation

## 📱 UI/UX Features

- **Login/Register Page**: Beautiful gradient background with form
- **Dashboard**: Header with user info and logout button
- **Contacts Table**: Responsive table with edit/delete buttons
- **Contact Form**: Clean form with real-time validation
- **Alerts**: Success/error notifications auto-dismiss
- **Responsive**: Works on desktop, tablet, and mobile

## 🔐 Security Features

- JWT token authentication (7-day expiration)
- Password hashing with bcrypt
- CORS protection
- Input validation and sanitization
- Secure headers

## 📞 Need Help?

1. Check the console for error messages
2. Verify both servers are running
3. Ensure MongoDB is connected
4. Check .env file configuration
5. Review validation error messages in the UI

## 🎉 You're All Set!

Your Contacts Manager is now ready to use. Enjoy managing your contacts!

For detailed documentation, see [README.md](./README.md)
