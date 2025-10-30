import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import BhumiLogo from "../assets/images/bangladesh-govt-seeklogo.png";
import { getApplicationById, payApplication } from "../api/landRegApi";
import { generatePDF } from "../assets/Data collect/generatePDF";

const LandRegistryPortal = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [appId, setAppId] = useState("");
  const [fee, setFee] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  // Auto-check Application ID
  useEffect(() => {
    if (!appId) {
      setFee(0);
      setStatus("Pending");
      setError("");
      return;
    }

    const fetchApplication = async () => {
      try {
        const data = await getApplicationById(appId);

        if (!data) {
          setFee(0);
          setStatus("Pending");
          setError("❌ Application ID not found");
        } else if (!data.fee) {
          setFee(0);
          setStatus(data.status || "Pending");
          setError("❌ Fee not set for this application");
        } else if (data.status.toLowerCase() !== "pending") {
          setFee(data.fee);
          setStatus(data.status);
          setError("❌ Payment already completed");
        } else {
          setFee(data.fee);
          setStatus(data.status);
          setError("");
        }
      } catch {
        setFee(0);
        setStatus("Pending");
        setError("❌ Invalid Application ID");
      }
    };

    fetchApplication();
  }, [appId]);

  // Handle Payment & Reset Application ID
  const handlePayment = async () => {
    if (!appId || fee === 0 || status.toLowerCase() !== "pending") return;

    try {
      await payApplication(appId);
      alert("✅ Payment successful!");

      // Reset Application ID, Fee, and Status
      setAppId("");       
      setFee(0);
      setStatus("Pending");
      setError("");

    } catch (err) {
      console.error(err);
      alert("❌ Payment failed: " + (err?.message || "Unknown error"));
    }
  };

  const handleDownloadPDF = async () => {
    try {
      const data = await getApplicationById(appId);

      if (data.status.toLowerCase() === "approved") {
        generatePDF({
          applicationId: data.applicationId,
          name: data.fullName,
          nid: data.nid,
          khatian: data.khatian,
          landArea: data.landArea,
          fee: data.fee,
          status: "Approved",
        });
      } else {
        alert("❌ Certificate not ready yet — waiting for officer approval.");
      }
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("❌ PDF generation failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
      <div className="max-w-[1000px] w-full border border-blue-100 rounded-3xl p-6 bg-white shadow-lg lg:min-h-[450px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-blue-100 rounded-lg p-6 md:p-8 lg:p-6 min-h-[150px] relative lg:min-h-[180px]">
          <div className="flex flex-col items-center gap-2">
            <label className="cursor-pointer block">
              <img
                src={image || "https://via.placeholder.com/100x100.png?text=Upload"}
                alt="User"
                className="w-20 h-20 rounded-full object-cover border-blue-400 border lg:w-24 lg:h-24"
              />
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="text-lg font-semibold outline-none bg-transparent text-center w-full"
            />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-right md:self-end mt-4 md:mt-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 text-blue-900">
            Land Registry Portal
          </h1>

          <div className="flex items-center absolute top-2 right-2 md:top-4 md:right-4">
            <div className="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
              <img src={BhumiLogo} alt="Bhumi Logo" className="w-5 h-5 md:w-8 md:h-8 object-contain" />
            </div>
            <span className="text-blue-900 font-semibold md:text-lg">BhumiMitra</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <button
              className="w-full bg-blue-100 py-2 rounded-md hover:bg-blue-200 transition"
              onClick={() => navigate('/land-form')}
            >
              Registry Form
            </button>

            <div className="bg-blue-100 py-2 rounded-md text-center">
              Status: <span className={`font-bold ${status.toLowerCase() === "paid" ? "text-green-600" : "text-yellow-600"}`}>{status}</span>
            </div>

            {/* Download PDF Button */}
            <button
              disabled={status.toLowerCase() !== "approved"}
              onClick={handleDownloadPDF}
              className={`w-full py-2 rounded-md flex items-center justify-center gap-2 transition
                bg-blue-400 text-white hover:bg-blue-600
                ${status.toLowerCase() !== "approved" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              📄 Download PDF
            </button>
          </div>

          <div className="flex flex-col justify-between">
            <div className="bg-blue-100 py-1 px-4 rounded-md text-center font-medium mb-4">
              <label htmlFor="applicationId" className="block text-sm text-gray-700 mb-1">
                Application ID
              </label>
              <input
                type="text"
                id="applicationId"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="Enter Application ID"
                className="w-full text-center text-gray-800 rounded-md py-1 px-2 text-sm outline-none"
              />
            </div>

            <div className="bg-blue-100 py-6 rounded-md text-center font-medium">
              Total Registry Fee <br />
              <span className="text-xl font-bold text-gray-700">৳ {fee}</span>
              {error && <p className="text-red-600 mt-1">{error}</p>}
            </div>

            <div className="flex justify-center mt-4">
              <button
                disabled={!appId || fee === 0 || status.toLowerCase() !== "pending"}
                onClick={handlePayment}
                className={`py-2 px-6 rounded-full text-base transition bg-green-500 text-white hover:bg-green-600 ${
                  (!appId || fee === 0 || status.toLowerCase() !== "pending") ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandRegistryPortal;
