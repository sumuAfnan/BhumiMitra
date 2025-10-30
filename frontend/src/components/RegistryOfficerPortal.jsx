import React, { useEffect, useState } from "react";
import logo from "../assets/images/bangladesh-govt-seeklogo.png";
import { useNavigate } from "react-router-dom";

import { 
  getAllApplications, 
  getApplicationById, 
  updateApplicationFee, 
  approveApplication 
} from "../api/landRegApi";
import FileViewer from "./FileViewer"; // for file view

const RegistryOfficerPortal = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [filePath, setFilePath] = useState(null);
  const [currentView, setCurrentView] = useState("dashboard");

  // Calculator states
  const [calcAppId, setCalcAppId] = useState("");
  const [stampDuty, setStampDuty] = useState("");
  const [vat, setVat] = useState("");
  const [totalFee, setTotalFee] = useState("");
  const [isFeeSent, setIsFeeSent] = useState(false);

  // Verification Form states
  const [verifyAppId, setVerifyAppId] = useState("");
  const [verifyName, setVerifyName] = useState("");
  const [verifyNID, setVerifyNID] = useState("");
  const [isApproveEnabled, setIsApproveEnabled] = useState(false);
  const [alreadyApproved, setAlreadyApproved] = useState(false);

const navigate = useNavigate();

  // ================= Fetch Applications ===================
  const fetchApplications = async () => {
    try {
      const data = await getAllApplications();
      setApplications(data);
    } catch (err) {
      console.error("Error loading applications:", err);
    }
  };

  // Load all applications initially and auto-refresh every 5 seconds
  useEffect(() => {
    fetchApplications(); // initial fetch
    const interval = setInterval(() => fetchApplications(), 5000); // auto-refresh
    return () => clearInterval(interval); // cleanup
  }, []);

  // Table row view handler
  const handleView = async (appId) => {
    if (selectedApp?.applicationId === appId) {
      setSelectedApp(null);
      return;
    }
    try {
      const data = await getApplicationById(appId);
      setSelectedApp(data);
    } catch (err) {
      console.error("Error fetching application details:", err);
    }
  };

  // Calculator logic (fetch data & auto calculate)
  const handleCalcApp = async (id) => {
    setCalcAppId(id);
    if (!id) {
      setStampDuty(""); setVat(""); setTotalFee(""); setIsFeeSent(false);
      return;
    }

    try {
      const data = await getApplicationById(id);
      if (!data) { setStampDuty(""); setVat(""); setTotalFee(""); setIsFeeSent(false); return; }

      setIsFeeSent(data.fee !== null);

      if (data.landValue) {
        const value = parseFloat(data.landValue);
        const duty = (value * 0.04).toFixed(2);
        const vatVal = (value * 0.05).toFixed(2);
        const total = (parseFloat(duty) + parseFloat(vatVal)).toFixed(2);

        setStampDuty(duty); setVat(vatVal); setTotalFee(total);
      } else {
        setStampDuty(""); setVat(""); setTotalFee("");
      }
    } catch (err) {
      console.error("Invalid Application ID or error fetching:", err);
      setStampDuty(""); setVat(""); setTotalFee(""); setIsFeeSent(false);
    }
  };

  // Send fee to backend for user
  const handleSendFee = async () => {
    if (!calcAppId || !totalFee) {
      alert("Please select a valid Application ID and calculate fee first.");
      return;
    }

    try {
      await updateApplicationFee(calcAppId, totalFee);
      alert("Fee sent successfully!");
      await fetchApplications();
      setCalcAppId(""); setStampDuty(""); setVat(""); setTotalFee(""); setIsFeeSent(false);
    } catch (err) {
      console.error("Error saving fee:", err);
      alert("Error saving fee.");
    }
  };

  // Verification form auto-fill
 const handleVerifyAppIdChange = async (id) => {
  setVerifyAppId(id);

  if (!id) {
    setVerifyName(""); 
    setVerifyNID(""); 
    setIsApproveEnabled(false); 
    setAlreadyApproved(false);
    return;
  }

  try {
    const data = await getApplicationById(id);
    if (!data) {
      setVerifyName(""); 
      setVerifyNID(""); 
      setIsApproveEnabled(false); 
      setAlreadyApproved(false);
      return;
    }

    setVerifyName(data.fullName);
    setVerifyNID(data.nid);

    if (data.status.toLowerCase() === "paid") {
      setIsApproveEnabled(true);
      setAlreadyApproved(false);
    } else if (data.status.toLowerCase() === "approved") {
      setIsApproveEnabled(false);
      setAlreadyApproved(true);
    } else {
      setIsApproveEnabled(false);
      setAlreadyApproved(false);
    }
  } catch (err) {
    console.error("Verification fetch error:", err);
    setVerifyName(""); 
    setVerifyNID(""); 
    setIsApproveEnabled(false); 
    setAlreadyApproved(false);
  }
};


const handleApprove = async () => {
  if (!verifyAppId) {
    console.warn("No Application ID provided");
    return;
  }

  if (!isApproveEnabled) {
    console.warn("Approve button is disabled or application not paid yet");
    return;
  }

  // Form reset immediately
  const appIdToApprove = verifyAppId; // save current ID
  setVerifyAppId("");
  setVerifyName("");
  setVerifyNID("");
  setIsApproveEnabled(false);
  setAlreadyApproved(false);

  try {
    // backend call
    const res = await approveApplication(appIdToApprove);

    // show backend message or default message
    alert(res?.message || "Application approved successfully");

    // refresh applications list
    await fetchApplications();
  } catch (err) {
    console.error("Approval error:", err);

    // show error message
    const msg = err?.message || err?.msg || "Failed to approve application.";
    alert(msg);
  }
};



 const confirmLogout = () => {
 
  navigate("/loginRegistryOfficer");
};

  return (
   <>
<header className="fixed top-[0 px] left-0 right-0 bg-white shadow-md z-50">
  <div className="max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8 flex justify-between items-center h-16">
    <button
      onClick={() => navigate("/")}
      className="text-gray-700 hover:text-white font-medium border-2 border-green-600 px-4 py-1 rounded-md hover:bg-green-600 transition-all duration-200"
    >
      Home
    </button>
  </div>
</header>


    <div className="min-h-screen bg-[#E6F0FB] py-12">
      <div className="relative max-w-[1104px] mx-auto px-4 sm:px-6 md:px-8 pt-[80px]">
        {/* Header */}
        <div className="relative w-full mb-6 flex flex-col items-center gap-4 lg:flex-row lg:items-center lg:justify-end">
          <div className="flex items-center gap-1 order-2 lg:order-1 mr-4 lg:mr-0">
            <img src={logo} alt="logo" className="w-10 h-10 rounded-full" />
            <span className="text-blue-700 font-semibold">BhumiMitra</span>
          </div>
          <div className="order-1 lg:order-2 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 border border-blue-200 px-6 py-2 rounded-full bg-white shadow text-blue-900 font-semibold whitespace-nowrap text-center">
            Land Registry Officer Portal
          </div>
        </div>

        {/* Applications Table */}
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-300">
          <div className="overflow-y-auto max-h-[400px]">
            <table className="w-full text-left border-collapse min-w-[768px]">
              <thead className="bg-blue-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300">Application ID</th>
                  <th className="px-4 py-2 border-b border-gray-300">Name</th>
                  <th className="px-4 py-2 border-b border-gray-300">NID</th>
                  <th className="px-4 py-2 border-b border-gray-300">Status</th>
                  <th className="px-4 py-2 border-b border-gray-300">View</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index} className="odd:bg-white even:bg-blue-50 hover:bg-blue-100">
                    <td className="px-4 py-2 border-b border-gray-200">{app.applicationId}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{app.fullName}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{app.nid}</td>
                    <td className="px-4 py-2 border-b border-gray-200 flex items-center gap-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        app.status.toLowerCase() === "pending" ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"
                      }`}>
                        {app.status}
                      </span>
                      {app.fee !== null && app.status.toLowerCase() === "pending" && (
                        <span className="text-green-600 font-bold text-lg">✔</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <button
                        onClick={() => handleView(app.applicationId)}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Application Details */}
        {selectedApp && (
          <div className="mt-6 p-4 bg-white shadow-lg rounded-xl border border-gray-300">
            <h2 className="text-blue-700 font-semibold mb-3">Application Details</h2>
            <p><strong>ID:</strong> {selectedApp.applicationId}</p>
            <p><strong>Name:</strong> {selectedApp.fullName}</p>
            <p><strong>NID:</strong> {selectedApp.nid}</p>
            <p><strong>Khatian:</strong> {selectedApp.khatian}</p>
            <p><strong>Land Area:</strong> {selectedApp.landArea}</p>
            <p><strong>Land Value:</strong> {selectedApp.landValue}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>

            {selectedApp.documents && (
              <button
                onClick={() => setFilePath(selectedApp.documents)}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                View Document
              </button>
            )}
          </div>
        )}

        {/* Forms Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Application Verification Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
            <h2 className="text-center font-semibold text-blue-700 mb-4">Application Verification</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor="verifyAppId" className="w-full sm:w-32 font-semibold text-gray-700">Application ID</label>
                <input
                  id="verifyAppId"
                  type="text"
                  value={verifyAppId}
                  onChange={(e) => handleVerifyAppIdChange(e.target.value)}
                  className="flex-1 px-4 py-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor="verifyName" className="w-full sm:w-32 font-semibold text-gray-700">Name</label>
                <input id="verifyName" type="text" value={verifyName} readOnly className="flex-1 px-4 py-2 rounded border border-gray-300 bg-gray-100" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor="verifyNID" className="w-full sm:w-32 font-semibold text-gray-700">NID</label>
                <input id="verifyNID" type="text" value={verifyNID} readOnly className="flex-1 px-4 py-2 rounded border border-gray-300 bg-gray-100" />
              </div>
              
              {alreadyApproved && (
  <p className="text-center text-red-600 font-medium mt-1">Already approved</p>
)}

             <button
  onClick={handleApprove}
  disabled={!isApproveEnabled}
  className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-2 w-full ${
    !isApproveEnabled ? "cursor-not-allowed" : ""
  }`}
>
  Approve
</button>



            </div>
          </div>

          {/* Calculator Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600">
            <h2 className="text-center font-semibold text-blue-700 mb-4">Calculator</h2>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor="calcAppId" className="w-full sm:w-32 font-semibold text-gray-700">Application ID</label>
                <input
                  id="calcAppId"
                  type="text"
                  value={calcAppId}
                  onChange={(e) => handleCalcApp(e.target.value)}
                  className="flex-1 px-4 py-2 rounded border border-gray-300"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor="stampDuty" className="w-full sm:w-32 font-semibold text-gray-700">Stamp Duty (4%)</label>
                <input id="stampDuty" type="text" value={stampDuty} readOnly className="flex-1 px-4 py-2 rounded border border-gray-300 bg-gray-100" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor="vat" className="w-full sm:w-32 font-semibold text-gray-700">VAT (5%)</label>
                <input id="vat" type="text" value={vat} readOnly className="flex-1 px-4 py-2 rounded border border-gray-300 bg-gray-100" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <label htmlFor="totalFee" className="w-full sm:w-32 font-semibold text-gray-700">Total Registration Fee</label>
                <input id="totalFee" type="text" value={totalFee} readOnly className="flex-1 px-4 py-2 rounded border border-gray-300 bg-gray-100" />
              </div>
              {isFeeSent && (
                <p className="text-center text-red-600 font-medium mb-2">Already amount sent</p>
              )}
              <button
                onClick={handleSendFee}
                disabled={isFeeSent}
                className={`py-2 px-6 rounded text-white transition mt-2 ${isFeeSent ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="flex justify-center mt-9">
          <button
            onClick={() => setCurrentView("logout")}
            className="bg-blue-600 text-white font-semibold px-8 py-2 rounded hover:bg-blue-700 lg:w-full max-w-xs transition"
          >
            Log out
          </button>
        </div>

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

        {/* File Viewer Modal */}
        {filePath && <FileViewer filePath={filePath} onClose={() => setFilePath(null)} />}
      </div>
    </div>
      </>
  );
};

export default RegistryOfficerPortal;
