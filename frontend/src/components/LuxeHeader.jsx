import React from "react";
import HotelImg from "../assets/images/hotal.jpg";
import logoImg from "../assets/images/logo-1.png";
const LuxeHeader = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden font-poppins">
      {/* Hero Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={HotelImg}
          alt="Hotel entrance"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Container for Navbar and Content */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full h-full px-8 md:px-12 flex flex-col ">
        {/* Navbar */}
        <nav className="flex items-center justify-between mt-[14px] w-full">
          {/* Logo */}
          <div className="flex items-center text-2xl font-semibold text-white">
            <img src={logoImg} alt="Luxe Logo" className="h-7 w-auto mr-2" />
          </div>

          {/* Menu */}
          <ul className="hidden md:flex items-center space-x-8 text-white font-medium">
            <li><a href="#" className="hover:text-[#d4c49c] transition">Home</a></li>
            <li><a href="#" className="hover:text-[#d4c49c] transition">Rooms</a></li>
            <li><a href="#" className="hover:text-[#d4c49c] transition">Elements</a></li>
            <li><a href="#" className="hover:text-[#d4c49c] transition">Pages</a></li>
            <li><a href="#" className="hover:text-[#d4c49c] transition">Blogs</a></li>
            <li><a href="#" className="hover:text-[#d4c49c] transition">Contact</a></li>
          </ul>

          {/* Book Button */}
          <button className="hidden md:block bg-[#f8b88b] hover:bg-[#f3a56f] text-white font-semibold px-5 py-1 rounded transition">
            BOOK NOW
          </button>
        </nav>

    
        
      </div>
    </div>
  );
};

export default LuxeHeader;
