import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm.jsx';
import ContactList from '../components/ContactList.jsx';
import Alert from '../components/Alert.jsx';
import { contactService } from '../services/contactService';

const HomePage = ({ onLogout }) => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setIsLoading(true);
    try {
      const response = await contactService.getAll();
      setContacts(response.data.data);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to fetch contacts'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveContact = async (contactData) => {
    setFormLoading(true);
    try {
      if (editingContact) {
        await contactService.update(editingContact._id, contactData);
        setAlert({ type: 'success', message: 'Contact updated successfully' });
      } else {
        await contactService.create(contactData);
        setAlert({ type: 'success', message: 'Contact created successfully' });
      }
      
      setShowForm(false);
      setEditingContact(null);
      await fetchContacts();
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Operation failed';
      setAlert({ type: 'error', message: errorMessage });
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.delete(contactId);
        setAlert({ type: 'success', message: 'Contact deleted successfully' });
        await fetchContacts();
      } catch (error) {
        setAlert({
          type: 'error',
          message: error.response?.data?.message || 'Failed to delete contact'
        });
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingContact(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Contacts Manager</h1>
            <p className="text-gray-600">Welcome, {user.username || user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingContact ? 'Edit Contact' : 'Your Contacts'}
          </h2>
          {!showForm && (
            <button
              onClick={() => {
                setShowForm(true);
                setEditingContact(null);
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              + Add New Contact
            </button>
          )}
        </div>

        {showForm ? (
          <ContactForm
            contact={editingContact}
            onSave={handleSaveContact}
            onCancel={handleCancel}
            isLoading={formLoading}
          />
        ) : (
          <ContactList
            contacts={contacts}
            onEdit={handleEditContact}
            onDelete={handleDeleteContact}
            isLoading={isLoading}
          />
        )}
      </main>
    </div>
  );
};

export default HomePage;
