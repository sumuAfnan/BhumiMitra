import React, { useState } from 'react';
import { forgotPassword } from "../api/adminApi";

const AdminResetPassword = () => {
  const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

   const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return setMessage('Please enter your email.');

    try {
      const res = await forgotPassword(email);
      setMessage(res.message); 
    } catch (err) {
      console.error(err);
      setMessage("Error sending reset link");
    }
  };

  return (
    
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      
    {/* ==================== Success/Error message Start===================== */}
      {message && (
        <div className="mb-4 text-gray-500 px-4 py-2 text-center w-full max-w-md">
          {message}
        </div>
         )}

        {/* ==================== Success/Error message End ===================== */}

      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            
            className="w-full px-4 py-2 border  rounded border-gray-200 focus:outline-none focus:ring-2 focus:ring-lime-400"
            required  />
          
          <button type="submit" className="w-full bg-lime-500 py-2 text-white rounded
          ">
            Send Reset Link</button>
        </form>
      </div>
    </div>
  );
};

export default AdminResetPassword;
