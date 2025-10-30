import React, { useState } from "react";
import { Link } from "react-router-dom";

import { BiAlignRight } from "react-icons/bi";
import BhumiLogo from "../assets/images/bangladesh-govt-seeklogo.png"
export default function Header() {
  const [open, setOpen] = useState(false); // Hamburger menu
  const [lang, setLang] = useState("EN"); // Language  menu
  const [loginOpen, setLoginOpen] = useState(null); 

  const toggleLang = () => {
    setLang(lang === "EN" ? "BAN" : "EN");
  };

  return (
    <header className="absolute top-[15px] font-semibold left-0 w-full z-30 font-fn text-[20px]">
      <div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between h-[60px] relative">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
            <img src={BhumiLogo} alt="field" className=" " />
          </div>
          <span className="text-white font-semibold">BhumiMitra</span>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6 items-center text-white font-medium relative">
          <Link to="/" className="hover:text-purple-600" onClick={() => setLoginOpen(null)}>
         Home
         </Link>


          {/* Login Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setLoginOpen(loginOpen === "desktop" ? null : "desktop")}
              className="hover:text-purple-600"
            >
              Login
            </button>    

            {loginOpen === "desktop" && (
              <div className="absolute mt-2 w-40 bg-green-50 text-black text-[15px] font-normal rounded-lg shadow-lg overflow-hidden z-50">
               <Link 
                     to="/loginCitizen" 
               className="block px-4 py-2 hover:bg-lime-500"      
               onClick={() => setLoginOpen(null)}>
              Citizen
             </Link>

            <Link to="/loginRegistryOfficer"  className="block px-4 py-2 hover:bg-lime-500" onClick={() => setLoginOpen(null)}>
                 Registry Officer
                </Link>

                 <Link to="/loginComplaintOfficer"  className="block px-4 py-2 hover:bg-lime-500" onClick={() => setLoginOpen(null)}>
                Complaint Officer
                </Link>
                <Link to="/loginOwnershipOfficer"  className="block px-4 py-2 hover:bg-lime-500" onClick={() => setLoginOpen(null)}>
                Ownership Officer
                </Link>
                <Link 
                to="/loginAdmin" className="block px-4 py-2 hover:bg-lime-500" onClick={() => setLoginOpen(null)}>
                  Admin
                     </Link>
              </div>
            )}
          </div>

          <Link to="/aboutlink" className="hover:text-purple-600">About Us</Link>

          {/* Language Button  */}
          <button 
            onClick={toggleLang} 
            className="border border-white px-3 py-1 rounded-lg font-normal hover:bg-white/20"
          >
            {lang}
          </button>

          <Link 
          to="/register"
              className="bg-white text-green-700 font-normal hover:text-white px-4 py-2 rounded-lg shadow hover:bg-lime-500">
             Registration
            </Link>

        </nav>

        {/* Mobile Login + Hamburger */}
        <div className="md:hidden flex items-center gap-3 relative z-50">
          {/* Mobile Login Dropdown */}
          <div className="relative z-50">
            <button
              onClick={() => setLoginOpen(loginOpen === "mobile" ? null : "mobile")}
              className="text-white text-sm border border-white px-3 py-1 rounded-lg hover:bg-lime-600"
            >
              Login
            </button>

            {loginOpen === "mobile" && (
              <div className="absolute right-0 mt-2 w-40 bg-green-50 text-black text-[15px] font-normal rounded-lg shadow-lg 
              overflow-hidden z-50 pointer-events-auto">
                <Link 
                 to="/loginCitizen" className="block px-4 py-2 hover:bg-lime-500"
                onClick={() => {
                setLoginOpen(null);  
                     }}
                      >
                   Citizen
                   </Link>

                 <Link to="/loginRegistryOfficer"  className="block px-4 py-2 hover:bg-lime-500" onClick={() => setLoginOpen(null)} >
                 Registry Officer
                </Link>
                 <Link to="/loginComplaintOfficer"  className="block px-4 py-2 hover:bg-lime-500" onClick={() => setLoginOpen(null)}>
                Complaint Officer
                </Link>
                <Link to="/loginOwnershipOfficer"  className="block px-4 py-2 hover:bg-lime-500" onClick={() => setLoginOpen(null)}>
                Ownership Officer
                </Link>
                <Link 
                to="/loginAdmin"  className="block px-4 py-2 hover:bg-lime-500" onClick={() => setLoginOpen(null)}>
                Admin
               </Link>
              </div>
            )}
          </div>

          {/* Hamburger Icon */}
          <button 
            onClick={() => setOpen(!open)} 
            className="text-white text-2xl focus:outline-none z-50"
          >
            <BiAlignRight />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-black/80 text-white px-6 py-4 space-y-3 z-40">
          <Link to="/" className="hover:text-purple-600" onClick={() => setLoginOpen(null)}>
           Home
          </Link>

          
 <Link to="/aboutlink" className=" block hover:text-purple-600">About Us</Link>
          {/* Language button untouched */}
          <button 
            onClick={toggleLang} 
            className="border border-white px-3 py-1 rounded-lg hover:bg-white/20 w-full"
          >
            {lang}
          </button>

         <Link 
         to="/register"
         className="bg-white text-green-700 px-4 py-2 rounded-lg shadow w-full hover:bg-lime-600 block text-center"
>
  Registration
</Link>

        </div>
      )}
    </header>
  );
}
