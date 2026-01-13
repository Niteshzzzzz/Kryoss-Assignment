# Frontend - Contacts Manager UI

React application with Tailwind CSS for contacts management.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Opens at `http://localhost:3000`

## Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## Project Structure

```
src/
├── components/
│   ├── Alert.js           - Notification alerts
│   ├── ContactForm.js     - Form for create/edit
│   └── ContactList.js     - Contacts table
├── pages/
│   ├── HomePage.js        - Main dashboard
│   ├── LoginPage.js       - Login form
│   └── RegisterPage.js    - Registration form
├── services/
│   ├── api.js             - Axios client setup
│   └── contactService.js  - API calls
├── App.js                 - Main app component
├── index.js               - React entry point
└── index.css              - Global styles
```

## Features

- User authentication (register/login)
- Create new contacts
- View all contacts in table format
- Edit existing contacts
- Delete contacts (with confirmation)
- Form validation
- Error handling with alerts
- Responsive design with Tailwind CSS
- JWT token management

## Configuration

### API Endpoint
Default: `http://localhost:5000/api`

Set custom endpoint via environment variable:
```bash
REACT_APP_API_URL=http://your-api-url/api
```

### Styling
Uses Tailwind CSS with custom configuration. Styles are in:
- `src/index.css` - Global styles
- Component files - Tailwind classes

## Components

### Alert
- Success, error, warning, and info types
- Auto-dismiss after 4 seconds
- Dismissible button

### ContactForm
- Create/edit form with validation
- Email format validation
- Phone validation (10-15 digits)
- Required field validation
- Clear error messages

### ContactList
- Responsive table layout
- Edit/Delete action buttons
- Empty state message
- Loading state

### Pages
- **LoginPage**: User login with registration link
- **RegisterPage**: User registration with validation
- **HomePage**: Main dashboard with contacts management

## Authentication Flow

1. User registers or logs in
2. JWT token received from API
3. Token stored in localStorage
4. Token sent in Authorization header for API calls
5. Logout clears token and redirects to login

## Validation

- Email: RFC 5322 format validation
- Phone: 10-15 digits format
- Required fields: Name, email, phone
- Duplicate email prevention
- Password confirmation on registration

## Responsive Design

- Mobile-first approach
- Tablet and desktop layouts
- Responsive table with horizontal scroll
- Touch-friendly buttons and inputs
- Flexible form layouts

## Dependencies

- react: UI library
- react-dom: React rendering
- react-router-dom: Client-side routing
- axios: HTTP client
- tailwindcss: CSS framework
- postcss: CSS processing
- autoprefixer: CSS compatibility

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
