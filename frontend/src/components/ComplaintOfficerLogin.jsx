import React, { useState } from 'react';
import BhumiLogo from "../assets/images/bangladesh-govt-seeklogo.png";
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

const ComplaintOfficerLogin = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
     role: 'Complaint Officer', // ✅ Role automatically set
  });
 const navigate = useNavigate(); // ✅ Initialize navigate
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allFilled = Object.values(loginData).every(field => field.trim() !== '');
    if (!allFilled) {
      alert('Please fill in all fields.');
      return;
    }

    console.log('Ownership Officer Login submitted:', loginData);
    alert('Complaint Officer login successful!');

    // ✅ Redirect to OwnershipOfficerPortal
    navigate('/');
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100  p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">

        {/* Logo */}
        <div className="flex items-center justify-center mb-2 gap-1">
          <img src={BhumiLogo} alt="Bhumi Logo" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
          <span className="text-2xl font-bold text-gray-800">BhumiMitra</span>
        </div>

        {/* Title */}
        <h2 className="text-base font-semibold mb-3 text-gray-700 text-center">Complaint Officer Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />

           {/* ✅ Role (read-only) */}
          <input
            type="text"
            name="role"
            value={loginData.role}
            readOnly
            className="w-full px-4 py-2 border border-gray-200 rounded-md bg-gray-100 text-gray-700 cursor-not-allowed"
          />
          <button
            type="submit"
            className="w-full mb-1 bg-green-500 hover:bg-lime-600 text-white py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>  
      </div>
    </div>
  );
};

export default ComplaintOfficerLogin;
