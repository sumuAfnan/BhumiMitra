import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginCitizen } from "../api/citizenApi"; 

import BhumiLogo from "../assets/images/bangladesh-govt-seeklogo.png";

const CitizenLogin = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    email: '',
    password: '',
  });
const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const allFilled = Object.values(loginData).every(field => field.trim() !== '');
  if (!allFilled) {
    alert('Please fill in all fields.');
    return;
  }

  try {
    const res = await loginCitizen(loginData);

    if (res.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", "citizen");

      setSuccessMsg(" Login Successful! Redirecting...");

      setTimeout(() => {
        navigate("/userportal");
      }, 1000);
    } else {
      alert(res.message || "Invalid login credentials");
    }
  } catch (err) {
    console.error("Login error:", err);
    alert("Server error. Please try again.");
  }
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
        <h2 className="text-base font-semibold mb-3 text-gray-700 text-center">Citizen Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={loginData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />
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
          <button
            type="submit"
            className="w-full mb-1 bg-green-500 hover:bg-lime-600 text-white py-2 rounded-md transition duration-200"
          >
            Login
          </button>
        </form>

         {/* Success Message */}
        {successMsg && (
          <div className="mb-3 p-2 text-green-700 bg-green-100 border border-green-300 rounded-md text-center">
            {successMsg}
          </div>
        )}

        {/* Reset Password Link */}
        <div className="text-center mt-3">
          <Link
            to="/reset-password-citizen"
            className="text-sm text-green-700 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CitizenLogin;
