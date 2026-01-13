import React from 'react';

const ContactList = ({ contacts, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading contacts...</div>;
  }

  if (contacts.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-8 text-center">
        <p className="text-gray-600 text-lg">No contacts found. Create your first contact!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Name</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Email</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Phone</th>
              <th className="px-6 py-3 text-left text-gray-700 font-semibold">Address</th>
              <th className="px-6 py-3 text-center text-gray-700 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-gray-800">{contact.name}</td>
                <td className="px-6 py-4 text-gray-600">{contact.email}</td>
                <td className="px-6 py-4 text-gray-600">{contact.phone}</td>
                <td className="px-6 py-4 text-gray-600">{contact.address || '-'}</td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onEdit(contact)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(contact._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
