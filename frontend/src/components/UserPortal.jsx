import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mosjid from '../assets/images/mosjid.jpg';

// LandServicesPortal Assets
import banner from '../assets/images/userbdportal.jpg'; 
import handIcon from "../assets/images/icons8-important-100.png";

import {
  FaFileAlt,
  FaUserShield,
  FaExchangeAlt,
  FaCheckCircle,
} from 'react-icons/fa';

// UserPortal Assets
import LandRegistrationIcon from "../assets/images/registry.png";
import ComplaintIcon from "../assets/images/complain.png";
import OwnershipTransferIcon from "../assets/images/agreement.png";
import VerifyOwnershipIcon from "../assets/images/mortgage.png";

// LandServicesPortal static services
const staticServices = [
  { title: 'Land Registration', icon: <FaFileAlt className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-blue-600" />, description: 'You can apply for land registry, download your land deed, and check the status of your application.' },
  { title: 'Complaint', icon: <FaUserShield className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-green-600" />, description: 'You can complain about land related problems.' },
  { title: 'Ownership Transfer', icon: <FaExchangeAlt className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-yellow-600" />, description: 'Here you can apply for ownership transfer.' },
  { title: 'Verify Ownership', icon: <FaCheckCircle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-purple-600" />, description: 'You can verify ownership of land.' },
];

// ✅ Updated user services
const userServices = [
  { title: 'Land Registration', icon: LandRegistrationIcon, bgColor: 'bg-blue-500', route: '/portal' },
  { title: 'Complaint', icon: ComplaintIcon, bgColor: 'bg-cyan-400', route: '/userportal' },
  { title: 'Ownership Transfer', icon: OwnershipTransferIcon, bgColor: 'bg-purple-300', route: '/OwnershipPortal' },
  { title: 'Verify Ownership', icon: VerifyOwnershipIcon, bgColor: 'bg-green-400', route: '/userportal' },
];

// Constants                              
const CARD_WIDTH = "w-60";
const ICON_SIZE = "w-10 h-10";
const CARD_TITLE_SIZE = "text-lg";

const UserPortal = () => {

  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("dashboard");

  const handleCardClick = (service) => {
    navigate(service.route);
  };

  const confirmLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/loginCitizen");
  };

  return (
    <div className="bg-white text-gray-800 font-sans">

      {/* ===================== Hero Banner ===================== */}
      <section
        className="relative w-full h-[500px] bg-cover bg-center"
        style={{ backgroundImage: `url(${banner})` }}
      >
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 text-white border-4 border-white px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-16 rounded-3xl text-center w-[90%] sm:w-auto">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold">LAND SERVICES PORTAL</h1>
            <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold mt-2">FOR CITIZEN</h1>
          </div>
        </div>
      </section>

      {/* ===================== Section Title ===================== */}
      <div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8 mt-10 text-center">
        <h2 className="text-2xl font-bold">Land Services For Citizen</h2>
      </div>

{/* ===================== Land Services Cards ===================== */}
<div className="my-6 max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8">
  <div className="flex justify-between flex-wrap gap-4 items-center shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-md p-6">
    {staticServices.map((service, idx) => (
      <div
        key={idx}
        className="flex flex-col items-center flex-1 min-w-[70px] sm:min-w-[120px]"
      >
        {service.icon}
        <p className="mt-2 text-xs sm:text-sm md:text-base text-center font-medium">
          {service.title}
        </p>
      </div>
    ))}
  </div>
</div>



      {/* ===================== Hand Icon + List ===================== */}
      <div className="max-w-[860px] mx-auto flex gap-18 mt-10 px-4 sm:px-6 md:px-8">
        <img
          src={handIcon}
          alt="hand icon"
          className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0"
        />
        <div className="space-y-2 flex-1 mt-20">
          {staticServices.map((service, idx) => (
            <div key={idx} className="flex items-start">
              <span className="text-2xl mr-2">✽</span>
              <p>
                <span className="font-semibold">{service.title} - </span>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== ✅ Updated UserPortal Section ===================== */}
<div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8 mt-16 flex flex-col items-center justify-start">

  {currentView === "dashboard" && (
    <>
      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {userServices.map((service, index) => {
          const isVerifyOwnership = service.title === "Verify Ownership";
          const customClass = isVerifyOwnership ? "lg:col-start-2" : "";

          return (
            <ServiceCard
              key={index}
              service={service}
              onClick={handleCardClick}
              customClass={customClass}
            />
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="flex justify-center mt-4 mb-8 px-4 lg:px-0 w-full">
        <button
          onClick={() => setCurrentView("logout")}
          className="bg-blue-600 text-white font-semibold px-8 py-2 rounded hover:bg-blue-700 lg:w-full max-w-xs transition"
        >
          Log out
        </button>
      </div>
    </>
  )}

  {/* Logout Confirmation Modal */}
  {currentView === "logout" && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#E6F0FB] bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md text-center">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">Log Out</h2>
        <p className="mb-6 text-gray-700">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={confirmLogout}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Yes, Log Out
          </button>
          <button
            onClick={() => setCurrentView("dashboard")}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>

{/* ===================== Low-opacity Image before Footer ===================== */}
<div className="max-w-[1104px] mx-auto w-full flex  flex-col items-center  justify-center mt-6 px-4 sm:px-6 md:px-8">
  <img
    src={mosjid}
    alt="Decorative"
    className="w-[1104] object-cover opacity-20 rounded-lg"
  />
  
</div>

<div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8">
  <p className="max-w-lg text-gray-600 text-sm leading-relaxed mt-6 mx-auto text-justify">
    With our Land Services Portal, citizens can easily manage their land matters — from registration 
    and ownership verification to filing complaints and transferring ownership. Everything is digital, 
    secure, and hassle-free.
  </p>
</div>





      {/* =====================  Footer Section ===================== */}
      <footer className="bg-[#D29342] text-white py-6 mt-12">
        <div className="max-w-[1104px] mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} <span className="font-semibold text-blue-700">BhumiMitra</span>. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-800 mt-1">
            Developed with ❤️ by the Sumaiya Afnan.
          </p>
        </div>
      </footer>
    </div>
  );
};

const ServiceCard = ({ service, onClick, customClass = "" }) => (
  <div
    onClick={() => onClick(service)}
    className={`${CARD_WIDTH} ${customClass} h-[185px] bg-white shadow-lg rounded-sm overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer flex flex-col items-center`}
  >
    <div className={`${service.bgColor} w-full h-16 relative `}>
      <div className="absolute left-1/2 -bottom-8 transform -translate-x-1/2 bg-white rounded-full p-4 shadow-md">
        <img src={service.icon} alt={service.title} className={ICON_SIZE} />
      </div>
    </div>
    <div className="mt-16 mb-4 px-4 text-center">
      <p className={`text-center ${CARD_TITLE_SIZE} font-semibold text-black`}>
        {service.title}
      </p>
    </div>
  </div>
);

export default UserPortal;

