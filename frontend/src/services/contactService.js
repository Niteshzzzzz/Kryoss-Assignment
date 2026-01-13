import api from './api';

// Auth services
export const authService = {
  register: (username, email, password, passwordConfirm) =>
    api.post('/auth/register', { username, email, password, passwordConfirm }),
  
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  
  getMe: () =>
    api.get('/auth/me'),
  
  logout: () => {
    localStorage.removeItem('token');
  }
};

// Contact services
export const contactService = {
  getAll: () =>
    api.get('/contacts'),
  
  getById: (id) =>
    api.get(`/contacts/${id}`),
  
  create: (contactData) =>
    api.post('/contacts', contactData),
  
  update: (id, contactData) =>
    api.put(`/contacts/${id}`, contactData),
  
  partialUpdate: (id, contactData) =>
    api.patch(`/contacts/${id}`, contactData),
  
  delete: (id) =>
    api.delete(`/contacts/${id}`)
};
