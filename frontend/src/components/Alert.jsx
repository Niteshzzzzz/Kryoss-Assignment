import React, { useState, useEffect } from 'react';

const Alert = ({ type = 'info', message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-100',
    error: 'bg-red-100',
    warning: 'bg-yellow-100',
    info: 'bg-blue-100'
  }[type];

  const textColor = {
    success: 'text-green-800',
    error: 'text-red-800',
    warning: 'text-yellow-800',
    info: 'text-blue-800'
  }[type];

  const borderColor = {
    success: 'border-green-400',
    error: 'border-red-400',
    warning: 'border-yellow-400',
    info: 'border-blue-400'
  }[type];

  return (
    <div className={`${bgColor} ${textColor} border-l-4 ${borderColor} p-4 rounded mb-4 flex justify-between items-center`}>
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-lg font-bold hover:opacity-75"
      >
        ×
      </button>
    </div>
  );
};

export default Alert;
