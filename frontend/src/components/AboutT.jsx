import React from 'react'
import { Link } from "react-router-dom"; 
import aboutImg from "../assets/images/flg 1.webp";
const AboutT = () => {
  return (
    <section className="py-12 font-fn bg-white mt-[2px] md:mt-[25px] lg:mt-[180px]">
      {/* Container with consistent width & padding */}
      <div className="relative max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8">
      <div className="grid md:grid-cols-2 gap-8 items-center justify-between ">
        <div>
          <img src={aboutImg} alt="field" className="rounded-lg shadow-lg w-full object-cover" />
        </div>

        <div>
          <p className="text-green-600 font-semibold text-[17px]">What We Do?</p>
          <h2 className="text-2xl font-bold mt-2">We Are In A Mission To Help The People In Land Services</h2>
          <p className="mt-4 text-gray-600 text-justify">
          BhumiMitra is a unified land management web application designed to simplify citizen services.
           It allows users to register with NID, apply for land registration, submit complaints, and check application status.
           </p>

            <p className="mt-4 text-gray-600 text-justify">
             The system connects citizens, officers, and administrators through secure login and role-based access.
           Payments, ownership verification, and land transfer requests are processed digitally to ensure transparency.
</p>

    <Link 
     to="/register"  className="mt-6 inline-block bg-green-500 hover:bg-lime-600 text-white px-4 py-2 rounded"
>
  Registration
</Link>

        </div>
      </div>
    </div>
     </section>
  );
}   

export default AboutT
