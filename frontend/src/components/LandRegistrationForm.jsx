// LandRegistrationForm.jsx
import React, { useState, useRef } from 'react';
import BhumiLogo from "../assets/images/bangladesh-govt-seeklogo.png";
import { districtsUpazilas } from "../assets/Data collect/districtsUpazilas"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LandRegistrationForm = () => {
  const fileInputRef = useRef();

  const [formData, setFormData] = useState({
    fullName: '',
    nid: '',
    khatian: '',
    landArea: '',
    landValue: '',
    district: '',
    dagNumber: '',
    ownershipType: '',
    previousOwner: '',
    purchaseDate: '',
    landUse: '',
    upazila: '',
    address: '',
    landType: '',
    mobile: '',
    email: '',
    documents: null,
  });

  // Handle changes for input/select/file
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
      ...(name === 'district' && { upazila: '' }), // reset upazila if district changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple required fields check
    const allFilled = Object.entries(formData).every(
      ([key, val]) => key === "previousOwner" || (val !== '' && val !== null)
    );

    if (!allFilled) {
      alert('Please fill in all required fields.');
      return;
    }

    // Use FormData for file upload
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/landreg", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message);
      if(res.data.success){
        // reset form
        setFormData({
          fullName: '',
          nid: '',
          khatian: '',
          landArea: '',
          landValue: '',
          district: '',
          dagNumber: '',
          ownershipType: '',
          previousOwner: '',
          purchaseDate: '',
          landUse: '',
          upazila: '',
          address: '',
          landType: '',
          mobile: '',
          email: '',
          documents: null,
        });
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error("Land Registration Error:", err);
      alert("Error submitting form. Check backend server.");
    }
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-200 rounded-md bg-green-50 focus:outline-none focus:ring-2 focus:ring-lime-400";

  // Upazilas filtered by district
  const upazilas = formData.district ? districtsUpazilas[formData.district] || [] : [];
const navigate = useNavigate();
const [lang, setLang] = useState("EN"); // default language

const toggleLang = () => {
  setLang((prev) => (prev === "EN" ? "BN" : "EN"));
};

  return (
       <>
<header className="fixed top-[0 px] left-0 right-0 bg-blue-400 shadow-md z-10">
  <div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center h-19">
         {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                <img src={BhumiLogo} alt="field" className=" " />
              </div>
              <span className="text-white font-semibold">BhumiMitra</span>
            </div>
             <div className="flex items-center gap-8">
     <button
      onClick={() => navigate("/")}
      className="text-gray-700 hover:text-white font-medium border-2 border-white px-4 py-1 rounded-md hover:bg-green-600 transition-all duration-200"
    >
      Home
    </button>

  {/* Language Button  */}
          <button 
            onClick={toggleLang} 
            className="border-2 border-white px-4 py-1 rounded-lg font-normal hover:bg-white/20"
          >
            {lang}
          </button>
</div>
  </div>
</header>
    <div className="min-h-screen flex items-center justify-center py-50 bg-blue-100 p-4">
      <div className="w-full max-w-2xl md:max-w-xl lg:max-w-lg xl:max-w-md bg-white shadow-md rounded-md p-8">

        {/* Logo and Title */}
        <div className="flex items-center justify-center mb-2 gap-1">
          <img src={BhumiLogo} alt="Bhumi Logo" className="w-7 h-7 md:w-9 md:h-9 object-contain" />
          <span className="text-2xl font-bold text-gray-800">BhumiMitra</span>
        </div>

        <h2 className="text-base font-semibold mb-3 text-gray-700 text-center">Land Registration Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className={inputClass} />
          <input type="text" name="nid" placeholder="NID Number (National ID)" value={formData.nid} onChange={handleChange} className={inputClass} />
          <input type="text" name="khatian" placeholder="Khatian Number" value={formData.khatian} onChange={handleChange} className={inputClass} />
          <input type="text" name="landArea" placeholder="Land Area" value={formData.landArea} onChange={handleChange} className={inputClass} />
          <input type="number" name="landValue" placeholder="Land Value (in BDT)" value={formData.landValue} onChange={handleChange} className={inputClass} min="0" />

          {/* District */}
          <select name="district" value={formData.district} onChange={handleChange} className={inputClass}>
            <option value="">Select District</option>
            {Object.keys(districtsUpazilas).map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>

          <input type="text" name="dagNumber" placeholder="Land Plot Number / Dag Number" value={formData.dagNumber} onChange={handleChange} className={inputClass} />

          <select name="ownershipType" value={formData.ownershipType} onChange={handleChange} className={inputClass}>
            <option value="">Select Ownership Type</option>
            <option value="Individual">Individual</option>
            <option value="Joint">Joint</option>
            <option value="Government">Government</option>
          </select>

          <input type="text" name="previousOwner" placeholder="Previous Owner Name" value={formData.previousOwner} onChange={handleChange} className={inputClass} />
          <input type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} className={inputClass} />

          <select name="landUse" value={formData.landUse} onChange={handleChange} className={inputClass}>
            <option value="">Select Land Use Purpose</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Building">Building</option>
            <option value="Industrial">Industrial</option>
          </select>

          {/* Upazila */}
          <select name="upazila" value={formData.upazila} onChange={handleChange} className={inputClass} disabled={!formData.district}>
            <option value="">{formData.district ? "Select Upazila" : "Select District First"}</option>
            {upazilas.map((u, idx) => (
              <option key={u + idx} value={u}>{u}</option> // duplicate key fix
            ))}
          </select>

          <textarea name="address" placeholder="Detailed Address / Location Description" value={formData.address} onChange={handleChange} className={inputClass} rows={3}></textarea>

          <select name="landType" value={formData.landType} onChange={handleChange} className={inputClass}>
            <option value="">Select Land Type</option>
            <option value="Residential">Residential</option>
            <option value="Agricultural">Agricultural</option>
            <option value="Commercial">Commercial</option>
          </select>

          <input type="text" name="mobile" placeholder="Contact Number" value={formData.mobile} onChange={handleChange} className={inputClass} />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} />

          {/* File Upload */}
          <div className="space-y-2">
            <label htmlFor="documents" className="block text-[12px] text-gray-700 pl-1">
              Upload Documents (Land Deed)
            </label>
            <input ref={fileInputRef} type="file" name="documents" id="documents" onChange={handleChange} className={inputClass} />
            {formData.documents && (
              <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md">
                <span className="text-sm text-gray-700 truncate max-w-[70%]">{formData.documents.name}</span>
                <button type="button" onClick={() => { setFormData({ ...formData, documents: null }); fileInputRef.current.value = null; }} className="text-red-500 text-sm hover:underline ml-4">Remove</button>
              </div>
            )}
          </div>

          <button type="submit" className="w-full bg-green-500 hover:bg-lime-600 text-white py-2 rounded-md transition duration-200">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default LandRegistrationForm;
