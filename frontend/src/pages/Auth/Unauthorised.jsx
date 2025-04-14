import React from 'react';
import { motion } from 'framer-motion';

function Unauthorized() {
  // Retrieve the user details from localStorage (adjust according to your auth implementation)
  const user = JSON.parse(localStorage.getItem('user')) || { name: 'Unknown', email: 'unknown@example.com', role: 'none' };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-red-300 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center"
      >
        <h1 className="text-4xl font-bold text-red-700 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-700 mb-2">
          Hello, <span className="font-semibold">{user.name}</span> (
          {user.email}).
        </p>
        <p className="text-gray-600 mb-2">
          Your credentials indicate a role of <span className="font-semibold">{user.role}</span>.
        </p>
        <p className="text-gray-600 mb-4">
          You have attempted to access a restricted page, and you do not have the necessary permissions.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full transition duration-200"
        >
          Contact Support
        </motion.button>
      </motion.div>
 
    </div>
  );
}

export default Unauthorized;
