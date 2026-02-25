import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const TopBar = () => {
  return (
    <div className="w-full bg-[#eef7f7] py-2 px-4">
      <div className="max-w-7xl mx-auto">

        {/* ---------------- Desktop View ---------------- */}
        <div className="hidden sm:flex justify-between items-center text-sm text-gray-700">

          {/* Left Side */}
          <div className="flex items-center gap-6">

            {/* Email */}
            <div className="flex items-center gap-1">
              <MdEmail />
              <span>eschool@gmail.com</span>
            </div>

            {/* Divider */}
            <div className="relative flex items-center">
              <span className="before:content-[''] before:h-5 before:w-px before:bg-gray-400 before:block"></span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-1">
              <FaPhoneAlt />
              <span>986439777</span>
            </div>

          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <span>Follow Us:</span>
            <FaFacebookF className="cursor-pointer hover:text-blue-600" />
            <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
          </div>

        </div>

        {/* ---------------- Mobile View ---------------- */}
        <div className="sm:hidden text-gray-700 text-sm">

          <div className="flex justify-between items-start">

            {/* Left (Email + Phone vertically stacked) */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <MdEmail />
                <span>eschool@gmail.com</span>
              </div>

              <div className="flex items-center gap-2">
                <FaPhoneAlt />
                <span>986439777</span>
              </div>
            </div>

            {/* Right (Follow Us + icons under it) */}
            <div className="flex flex-col items-start">
              <span>Follow Us:</span>

              <div className="flex gap-2 pt-1">
                <FaFacebookF className="cursor-pointer hover:text-blue-600" />
                <FaLinkedinIn className="cursor-pointer hover:text-blue-700" />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TopBar;
