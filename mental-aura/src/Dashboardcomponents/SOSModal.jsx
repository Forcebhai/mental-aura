import React from 'react';

const SOSModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold">Emergency Support</h3>
        </div>
        <p className="text-gray-600 mb-6">If you're in crisis, please reach out for immediate help:</p>
        <div className="space-y-3 mb-6">
          <a href="tel:988" className="block w-full p-3 bg-danger text-white rounded-lg text-center font-medium hover:bg-red-600 transition-colors">
            Call 988 - Suicide & Crisis Lifeline
          </a>
          <a href="tel:911" className="block w-full p-3 bg-gray-800 text-white rounded-lg text-center font-medium hover:bg-gray-900 transition-colors">
            Call 911 - Emergency Services
          </a>
        </div>
        <button onClick={onClose} className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
          Close
        </button>
      </div>
    </div>
  );
};

export default SOSModal;