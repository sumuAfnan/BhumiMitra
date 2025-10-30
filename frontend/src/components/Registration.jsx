import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BhumiLogo from "../assets/images/bangladesh-govt-seeklogo.png";
import { registerCitizen } from "../api/citizenApi";

const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    nid: "",
    email: "",
    username: "",
    password: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const allFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    if (!allFilled) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
     const { message } = await registerCitizen(formData);
     alert(message);
      
      navigate("/userportal", { state: { name: formData.fullName } });

   
      setFormData({
        fullName: "",
        nid: "",
        email: "",
        username: "",
        password: "",
        mobile: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server not reachable");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-md p-8">
        {/* Logo & Title */}
        <div className="flex items-center justify-center mb-2 gap-1">
          <img
            src={BhumiLogo}
            alt="Bhumi Logo"
            className="w-7 h-7 md:w-9 md:h-9 object-contain"
          />
          <span className="text-2xl font-bold text-gray-800">BhumiMitra</span>
        </div>

        {/* Registration Title */}
        <h2 className="text-base font-semibold mb-3 text-gray-700 text-center">
          Register New Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />
          <input
            type="text"
            name="nid"
            placeholder="NID Number"
            value={formData.nid}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none bg-green-50 focus:ring-2 focus:ring-lime-400"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full mb-7 bg-green-500 hover:bg-lime-600 text-white py-2 rounded-md transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
