import React from "react";
import { MdLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import logo from "../assets/images/bangladesh-govt-seeklogo.png";

export default function Footer() {
  return (
    <footer className="bg-[#A0C878] text-gray-700 mt-6 font-fn">
      <div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start gap-4">
        
        {/* Left Section */}
        <div className="flex flex-col items-start gap-1">
          <div className="flex items-center">
            <img
              src={logo}
              alt="BhumiMitra Logo"
              className="h-7 w-7 object-contain"
            />
            <div className="font-semibold text-sm text-green-800 ml-1">
              Bhumi<span className="text-green-600">Mitra</span>
            </div>
          </div>

          <div className="flex gap-1 mt-1">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <div className="bg-blue-600 text-white rounded-full p-1.5">
                <FaLinkedinIn className="text-xs" />
              </div>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <div className="bg-blue-500 text-white rounded-full p-1.5">
                <FaFacebookF className="text-xs" />
              </div>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <div className="bg-sky-500 text-white rounded-full p-1.5">
                <FaTwitter className="text-xs" />
              </div>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <div className="bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white rounded-full p-1.5">
                <FaInstagram className="text-xs" />
              </div>
            </a>
          </div>

          <div className="text-[10px] text-gray-700 mt-1 leading-snug">
            © 2025 BHUMIMITRA. All Rights Reserved. <br />
            <span className="uppercase tracking-wide">Ensuring Trust In Every Land Service</span>
          </div>
        </div>

        {/* Right Section: Contact Info */}
        <div className="text-[12px] text-gray-700 space-y-1 text-left md:text-right">
          <div className="flex items-center gap-1 leading-none">
            <MdLocationOn className="text-sm text-gray-600" />
            <span>60 New Road 0708, BD</span>
          </div>
          <div className="flex items-center gap-1 leading-none">
            <FiPhone className="text-sm text-gray-600" />
            <span>+15678899999</span>
          </div>
          <div className="flex items-center gap-1 leading-none">
            <HiOutlineMail className="text-sm text-gray-600" />
            <a href="mailto:grs@cabinet.gov.bd" className="underline">grs@cabinet.gov.bd</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
