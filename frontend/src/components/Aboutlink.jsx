import React from 'react';
import { Link } from "react-router-dom"; 
import aboutImg from "../assets/images/flg 1.webp";
import BhumiLogo from "../assets/images/bangladesh-govt-seeklogo.png";

const Navbar = () => {
  return (
    <nav className="fixed top-[15px] left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
            <img src={BhumiLogo} alt="field" className="w-full h-full object-contain" />
          </div>
          <span className="text-black font-semibold">BhumiMitra</span>
        </div>

        {/* Navigation Menu */}
        <ul className="flex gap-6">
          <li>
            <Link 
              to="/" 
              className="text-gray-700 hover:text-white font-medium border-2 border-green-600 px-4 py-1 rounded-md hover:bg-green-600 transition-all duration-200"
            >
              Home
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const Aboutlink = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Navbar */}

      {/* ===================== About Section ===================== */}
      <main className="flex-1 py-12 font-fn bg-white mt-[90px]">
        <div className="relative max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center justify-between">
            <div>
              <img 
                src={aboutImg} 
                alt="field" 
                className="rounded-lg shadow-lg w-full object-cover" 
              />
            </div>

            <div>
              <p className="text-green-600 font-semibold text-[17px]">What We Do?</p>
              <h2 className="text-2xl font-bold mt-2">
                We Are In A Mission To Help The People In Land Services
              </h2>
             <p className="mt-4 text-gray-600 text-justify">
            BhumiMitra is a unified land management web application designed to simplify citizen services.
            It allows users to register with NID, apply for land registration, submit complaints, and check application status.
            </p>
            <p className="mt-4 text-gray-600 text-justify">
            The system connects citizens, officers, and administrators through secure login and role-based access.
            Payments, ownership verification, and land transfer requests are processed digitally to ensure transparency.
            </p>


              <Link 
                to="/register"  
                className="mt-6 inline-block bg-green-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
              >
                Registration
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* ===================== Footer Section ===================== */}
      <footer className="bg-green-500 text-white py-6 mt-12">
        <div className="max-w-[1104px] mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">
            © {new Date().getFullYear()} <span className="font-semibold text-blue-700">BhumiMitra</span>. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray-800 mt-1">
            Developed with ❤️ by <span className="font-semibold">Sumaiya Afnan</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Aboutlink;
