import React, { useState, useEffect } from "react";
import logo from "../assets/images/bangladesh-govt-seeklogo.png";
import { approveUserOwnership } from "../api/userownerApi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000";

const OwnershipOfficerPortal = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [verifyAppId, setVerifyAppId] = useState("");
  const [currentOwner, setCurrentOwner] = useState("");
  const [previousOwner, setPreviousOwner] = useState("");
  const [isApproveEnabled, setIsApproveEnabled] = useState(false);
  const [alreadyApproved, setAlreadyApproved] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");


  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/ownership`);
      setApplications(response.data);
    } catch (err) {
      console.error("Error fetching applications:", err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // View application details
  const handleView = (app) => {
    setSelectedApp(selectedApp?.application_id === app.application_id ? null : app);
  };

  // When officer enters Application ID
  const handleVerifyAppIdChange = (id) => {
    setVerifyAppId(id);

    const app = applications.find((a) => String(a.application_id) === String(id));

    if (!app) {
      setCurrentOwner("");
      setPreviousOwner("");
      setIsApproveEnabled(false);
      setAlreadyApproved(false);
      return;
    }

    setCurrentOwner(app.new_owner || "");
    setPreviousOwner(app.current_owner || "");

    if (app.status.toLowerCase() === "pending") {
      setIsApproveEnabled(true);
      setAlreadyApproved(false);
    } else {
      setIsApproveEnabled(false);
      setAlreadyApproved(true);
    }
  };

  // Transfer / Approve ownership
  const handleTransfer = async () => {
    if (!verifyAppId || !isApproveEnabled) return;

    try {
      await approveUserOwnership(verifyAppId, {
        current_owner: currentOwner,
        previous_owner: previousOwner,
      });

      setApplications((prev) =>
        prev.map((a) =>
          String(a.application_id) === String(verifyAppId)
            ? { ...a, current_owner: currentOwner, new_owner: null, status: "Approved" }
            : a
        )
      );

      alert("Ownership transferred successfully!");
      setVerifyAppId("");
      setCurrentOwner("");
      setPreviousOwner("");
      setSelectedApp(null);
      setIsApproveEnabled(false);
      setAlreadyApproved(false);
    } catch (err) {
      console.error("Transfer failed:", err);
      alert("Transfer failed!");
    }
  };

  const navigate = useNavigate(); // react-router-dom useNavigate import korte hobe

const confirmLogout = () => {
  // optional: localStorage.clear() or token remove korte paren
  navigate("/loginOwnershipOfficer"); // login page e redirect
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
            Ownership Officer Portal
          </div>
        </div>

        {/* Applications Table */}
        <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-300">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-blue-100 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 border-b border-gray-300">Application ID</th>
                  <th className="px-4 py-2 border-b border-gray-300">Current Owner</th>
                  <th className="px-4 py-2 border-b border-gray-300">Area</th>
                  <th className="px-4 py-2 border-b border-gray-300">Khatian</th>
                  <th className="px-4 py-2 border-b border-gray-300">NID</th>
                  <th className="px-4 py-2 border-b border-gray-300">Status</th>
                  <th className="px-4 py-2 border-b border-gray-300">View</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={index} className="odd:bg-white even:bg-blue-50 hover:bg-blue-100">
                    <td className="px-4 py-2 border-b border-gray-200">{app.application_id}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{app.current_owner}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{app.area}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{app.khatian}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{app.nid}</td>
                    <td className="px-4 py-2 border-b border-gray-200">{app.status}</td>
                    <td className="px-4 py-2 border-b border-gray-200">
                      <button
                        onClick={() => handleView(app)}
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
            <p><strong>Application ID:</strong> {selectedApp.application_id}</p>
            <p><strong>Previous Owner:</strong> {selectedApp.previous_owner}</p>
            <p><strong>Current Owner:</strong> {selectedApp.current_owner}</p>
            <p><strong>Area:</strong> {selectedApp.area}</p>
            <p><strong>Khatian:</strong> {selectedApp.khatian}</p>
            <p><strong>NID:</strong> {selectedApp.nid}</p>
            <p><strong>Email:</strong> {selectedApp.gmail}</p>
            <p><strong>New Owner:</strong> {selectedApp.new_owner}</p>
            <p><strong>Status:</strong> {selectedApp.status}</p>
          </div>
        )}

        {/* Verification / Transfer Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-blue-600 mt-6 max-w-md mx-auto">
          <h2 className="text-center font-semibold text-blue-700 mb-4">Ownership Transfer</h2>
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
              <label className="w-full sm:w-32 font-semibold text-gray-700">Current Owner</label>
              <input type="text" value={currentOwner} readOnly className="flex-1 px-4 py-2 rounded border border-gray-300 bg-gray-100" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <label className="w-full sm:w-32 font-semibold text-gray-700">Previous Owner</label>
              <input type="text" value={previousOwner} readOnly className="flex-1 px-4 py-2 rounded border border-gray-300 bg-gray-100" />
            </div>

            {alreadyApproved && (
              <p className="text-center text-red-600 font-medium mt-1">Already approved</p>
            )}

            <button
              onClick={handleTransfer}
              disabled={!isApproveEnabled}
              className={`bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition w-full ${!isApproveEnabled ? "cursor-not-allowed" : ""}`}
            >
              Transfer
            </button>

           

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
      </div>
    </div>
    </>
  );
};

export default OwnershipOfficerPortal;
