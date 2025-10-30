import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import bg from "../assets/images/pa.webp";

export default function Hero() {
  return (
    <section className="relative w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[548px]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25" />
      
      {/* Content inside container */}
      <div className="relative max-w-[1104px] mx-auto h-full flex items-center px-4 sm:px-6 md:px-8">
        <div className="text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-fn font-extrabold leading-tight tracking-[1px]
">
            WELCOME TO <br /> BHUMIMITRA
          </h1>
         <button
  className="absolute left-1/2 -translate-x-1/2 bottom-0 transform translate-y-1/2 
             bg-white text-green-700 
             px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4
             rounded-lg shadow hover:bg-gray-100 
             flex flex-col items-center 
             text-sm sm:text-base md:text-lg
             whitespace-nowrap"
>
  <FaCheckCircle className="text-green-600 text-lg sm:text-xl mb-1" />
  Check Application Status
</button>
        </div>
      </div>
    </section>
  );
}
