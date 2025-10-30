import React, { useState } from "react";
import {
  FaFileAlt,
  FaUserShield,
  FaExchangeAlt,
  FaCheckCircle,
} from "react-icons/fa";
import farmer from "../assets/images/indian-woman-farming-water-field-260nw-2374767721.jpg";
import banner from "../assets/images/grass.webp";
import mapImg from "../assets/images/map.webp"; // 🆕 Add an image for right side
import { submitUserOwnership, getOwnershipStatus } from "../api/userownerApi"; // API import

const OwnershipTransferPortal = () => {
  // Form state
  const [formData, setFormData] = useState({
    previous_owner: "",
    current_owner: "",
    nid: "",
    khatian: "",
    area: "",
    gmail: "",
  });

  // Status check state
  const [statusAppId, setStatusAppId] = useState("");
  const [applicationStatus, setApplicationStatus] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit ownership transfer
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await submitUserOwnership(formData);
      alert(
        `Ownership transfer application submitted!\nYour Application ID: ${response.application.application_id}`
      );
      setFormData({
        previous_owner: "",
        current_owner: "",
        nid: "",
        khatian: "",
        area: "",
        gmail: "",
      });
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong!");
    }
  };

  // Check application status by Application ID
  const handleStatusCheck = async (e) => {
    e.preventDefault();
    if (!statusAppId) return;
    try {
      const response = await getOwnershipStatus(statusAppId);
      setApplicationStatus(response.application.status);
    } catch (err) {
      setApplicationStatus(
        `Error: ${err.response?.data?.error || "Application not found"}`
      );
    }
  };

  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Hero Banner */}
      <section
        className="relative w-full h-[500px] flex items-center justify-start bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="relative z-10 w-full">
          <div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl sm:text-5xl font-semibold leading-snug text-white">
              Welcome To <br /> Ownership Transfer Portal
            </h1>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Services Section */}
        <section className="py-12 ">
          <h2 className="text-xl font-medium mb-15">
            Top-quality land services for your development needs -
          </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 justify-items-center">

            <ServiceCard
              icon={<FaFileAlt className="text-3xl text-[#7e9e21]" />}
              title="Land Registration Service"
            />
            <ServiceCard
              icon={<FaUserShield className="text-3xl text-[#7e9e21]" />}
              title="Citizen Complaint Service"
            />
            <ServiceCard
              icon={<FaExchangeAlt className="text-3xl text-[#7e9e21]" />}
              title="Ownership Transfer Service"
            />
            <ServiceCard
              icon={<FaCheckCircle className="text-3xl text-[#7e9e21]" />}
              title="Ownership Verify Service"
            />
          </div>
        </section>

        {/* Instructions */}
        <section className="text-center px-4 sm:px-6 md:px-8">
          <p className="text-gray-700 mb-4">
            Here, you can transfer your land to another person.
          </p>
          <p className="text-gray-600 mb-6">
            To complete the transfer, please provide the following information:
          </p>

          <div className="border rounded-xl p-4 max-w-md mx-auto bg-gray-50 text-left text-sm leading-relaxed">
            <p>• Your National ID Card number</p>
            <p>• The name of the person to whom you want to transfer the land</p>
            <p>• Khatian Number</p>
            <p>• The total Land Area</p>
          </div>
        </section>

        {/* Ownership Transfer Form + Image */}
        <section className="flex flex-col md:flex-row items-center justify-between mt-[110px] gap-8 px-4 sm:px-6 md:px-8 sm:justify-center">
          {/* Form Box */}
          <div
            className="rounded-2xl p-8 w-full max-w-xl bg-white"
            style={{ boxShadow: "0 0 15px 5px rgba(126,158,33,0.4)" }}
          >
            <h3 className="text-lg font-medium text-center mb-6">
              Ownership Transfer
            </h3>

            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              onSubmit={handleSubmit}
            >
              <input
                name="previous_owner"
                value={formData.previous_owner}
                onChange={handleChange}
                type="text"
                placeholder="Current Owner"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <input
                name="current_owner"
                value={formData.current_owner}
                onChange={handleChange}
                type="text"
                placeholder="New Owner"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <input
                name="nid"
                value={formData.nid}
                onChange={handleChange}
                type="text"
                placeholder="National ID Number"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <input
                name="khatian"
                value={formData.khatian}
                onChange={handleChange}
                type="text"
                placeholder="Khatian Number"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <input
                name="gmail"
                value={formData.gmail}
                onChange={handleChange}
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400 md:col-span-2"
              />
              <input
                name="area"
                value={formData.area}
                onChange={handleChange}
                type="text"
                placeholder="Land Area"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400 md:col-span-2"
              />
              <button
                type="submit"
                className="bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-lg px-6 py-2 mt-4 md:col-span-2 mx-auto"
              >
                Transfer
              </button>
            </form>
          </div>

          {/* Right Side Image */}
          <div className="w-[70%] md:w-[30%] flex justify-center opacity-40">
            <img
              src={mapImg}
              alt="Map"
              className="  w-[90%] md:w-full object-cover"
            />
          </div>
        </section>

        {/* Application Status */}
        <section className="flex justify-center mt-[90px] mb-14 px-4 sm:px-6 md:px-8">
          <div
            className="rounded-2xl p-6 w-full max-w-sm bg-white"
            style={{ boxShadow: "0 0 15px 5px rgba(126,158,33,0.4)" }}
          >
            <h3 className="text-lg font-medium text-center mb-4">
              Check Your Application Status
            </h3>
            <form
              className="flex flex-col items-center gap-3"
              onSubmit={handleStatusCheck}
            >
              <input
                type="text"
                placeholder="Application ID"
                value={statusAppId}
                onChange={(e) => setStatusAppId(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
              <button
                type="submit"
                className="bg-lime-500 hover:bg-lime-600 text-white font-medium rounded-lg px-6 py-2 w-full"
              >
                Check
              </button>
            </form>
            {applicationStatus && (
              <p className="mt-3 text-center font-medium">
                Status: <span className="text-blue-700">{applicationStatus}</span>
              </p>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 text-center px-4 sm:px-6 md:px-8">
          <div className="flex flex-col items-center justify-center space-y-3">
            <img src={farmer} alt="Farmer" className="w-28 opacity-80" />
            <p className="max-w-lg text-gray-600 text-sm leading-relaxed">
              With our Land Transfer Service, you can easily hand over your
              land to a new owner. Just share the required details — we’ll take
              care of the documentation and processing for you.
            </p>
          </div>
        </footer>
      </div>

      <div className="bg-[#7e9e21] h-8"></div>
    </div>
  );
};

// Service Card Component
const ServiceCard = ({ icon, title }) => (
  <div className="w-full max-w-[250px] flex flex-col items-center gap-3
    rounded-2xl bg-white py-6 px-4
    shadow-[0_10px_15px_rgba(0,0,0,0.25),0_-10px_15px_rgba(0,0,0,0.1)]
    hover:shadow-[0_15px_25px_rgba(0,0,0,0.3),0_-15px_25px_rgba(0,0,0,0.15)]
    transition-all duration-300 hover:scale-105
  ">
    {icon}
    <p className="text-sm font-semibold text-gray-600 text-center">{title}</p>
  </div>
);


export default OwnershipTransferPortal;
