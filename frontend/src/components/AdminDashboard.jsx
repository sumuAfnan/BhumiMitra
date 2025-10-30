import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, createUser, deleteUserApi } from "../api/userApi";
import { getOfficers, addOfficer as addOfficerApi, deleteOfficer as deleteOfficerApi } from "../api/officerApi";
import {  getOwnership, addOwnership as addOwnershipApi, deleteOwnership as deleteOwnershipApi } from "../api/ownershipApi";
import { getQuestions, deleteQuestion } from "../api/adminApi";
import { getAdminInfo, updateAdminText, updateAdminImage,updateAdminCredentials } from "../api/adminApi";


import { FaTachometerAlt, FaCog, FaPowerOff, FaBars } from "react-icons/fa";
import BhumiLogo from "../assets/images/bangladesh-govt-seeklogo.png";
import AdminUser from "../assets/images/woman.png";
import Officer from "../assets/images/business.png";
import List from "../assets/images/list.png";
import Question from "../assets/images/clipboard.png";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   // Admin states
  const [admin, setAdmin] = useState({ id: "", name: "", image_url: "" });
  const [adminName, setAdminName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
   const navigate = useNavigate();

 
  const [successMsg, setSuccessMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // User Data States
  const [nidInput, setNidInput] = useState("");
  const [khatianInput, setKhatianInput] = useState("");
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Officer Data States
  const [officerData, setOfficerData] = useState([]);
  const [officerRole, setOfficerRole] = useState("");
  const [officerEmail, setOfficerEmail] = useState("");
  const [officerPassword, setOfficerPassword] = useState("");

  // Land Ownership States
  const [ownershipData, setOwnershipData] = useState([]);
const [prevOwner, setPrevOwner] = useState("");
const [currOwner, setCurrOwner] = useState("");
const [landArea, setLandArea] = useState("");
const [landKhatian, setLandKhatian] = useState("");
const [landSearch, setLandSearch] = useState("");

  // Citizen Questions State
const [citizenQuestions, setCitizenQuestions] = useState([]);
 



 // ------------------- FETCH DATA Start -------------------
  useEffect(() => {
    fetchUsers();
     fetchOfficers();
      fetchOwnership();
       fetchQuestions();
     fetchAdmin();
       const interval = setInterval(() => {
    
  }, 1000);

  return () => clearInterval(interval);
  }, []);

    // Fetch user data
const fetchUsers = async () => {
  try {
    const data = await getUsers();
    setUserData(data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

// Fetch officer data
  const fetchOfficers = async () => {
    try {
      const data = await getOfficers();
      setOfficerData(data);
    } catch (error) {
      console.error("Error fetching officers:", error);
    }
  };

  // Fetch ownership data
const fetchOwnership = async () => {
  try {
    const data = await getOwnership();
    setOwnershipData(data);
  } catch (error) {
    console.error("Error fetching ownership records:", error);
  }
};

 // Fetch Questions data
const fetchQuestions = async () => {
  try {
    const data = await getQuestions(); 
    setCitizenQuestions(data);
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

// Fetch Admin data
const fetchAdmin = async () => {
  try {
    const data = await getAdminInfo(); 
    setAdmin(data);
    setAdminName(data.name || "");
    setAdminUsername(data.username || "");   
    setAdminPassword("");                   
    setPreviewImage(data.image_url ? `http://localhost:5000${data.image_url}` : "");
  } catch (err) {
    console.error(err);
  }
};





// ------------------- FETCH DATA  End -------------------//



  // ------------------- USER  Start -------------------//

  // Add a user

const addUserData = async () => {
  if (!nidInput || !khatianInput) return;

  try {
    const newUser = { nid: nidInput, khatian: khatianInput };
    await createUser(newUser);   
    await fetchUsers();          
    setNidInput("");
    setKhatianInput("");
  } catch (error) {
    console.error("Error adding user:", error);
  }
};

// Delete a user
  const deleteUser = async (id) => {
  try {
    await deleteUserApi(id);   
    await fetchUsers();        
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

 // Filtered data for search
  const filteredData = userData.filter(
    (user) =>
      user.nid.includes(searchQuery) || user.khatian.includes(searchQuery)
  );


// ------------------- USER  End  -------------------//



 // ------------------- OFFICER Start -------------------//

  // Add officer
  const addOfficer = async () => {
    if (!officerRole || !officerEmail || !officerPassword) return;
    try {
      await addOfficerApi({ role: officerRole, email: officerEmail, password: officerPassword });
      await fetchOfficers();
      setOfficerRole("");
      setOfficerEmail("");
      setOfficerPassword("");
    } catch (error) {
      console.error("Error adding officer:", error);
    }
  };


  
  // Delete officer
 const deleteOfficer = async (id) => {
    try {
      await deleteOfficerApi(id);
      await fetchOfficers();
    } catch (error) {
      console.error("Error deleting officer:", error);
    }
  };

// ------------------- OFFICER End -------------------//



//=================OWNERSHIP START========================//

 //=================OWNERSHIP START========================//

// Add new ownership record
const addOwnership = async () => {
  if (!prevOwner || !currOwner || !landArea || !landKhatian) return;

  try {
    await addOwnershipApi({ previous_owner: prevOwner, current_owner: currOwner, area: landArea, khatian: landKhatian });
    await fetchOwnership(); // fresh fetch from backend

    setPrevOwner("");
    setCurrOwner("");
    setLandArea("");
    setLandKhatian("");
    setLandSearch(""); // reset search
  } catch (error) {
    console.error("Error adding ownership record:", error);
  }
};



// Delete ownership record
const deleteOwnership = async (id) => {
  try {
    await deleteOwnershipApi(id);

    // Refetch ownership data after deleting
    await fetchOwnership();
  } catch (error) {
    console.error("Error deleting ownership record:", error);
  }
};

// Filtered ownership data (search)
const filteredOwnership = ownershipData.filter(
  (record) =>
    record.previous_owner.toLowerCase().includes(landSearch.toLowerCase()) ||
    record.current_owner.toLowerCase().includes(landSearch.toLowerCase()) ||
    record.khatian.includes(landSearch)
);


 // Delete a question
  const handleDeleteQuestion = async (id) => {
  try {
    await deleteQuestion(id); // questionApi.js থেকে DELETE API
    setCitizenQuestions(citizenQuestions.filter(q => q.id !== id));
  } catch (error) {
    console.error("Error deleting question:", error);
  }
};

//=================OWNERSHIP END========================//


//=================AMDIN START========================//

// --------------------- Admin Image Update ---------------------
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file)); // immediate preview
  }
};

const handleAdminUpdate = async () => {
  if (!admin?.id) {
    alert("Admin ID is missing!");
    return;
  }

  try {
    // Update Name
    if (adminName.trim() !== admin.name) {
      await updateAdminText(admin.id, { name: adminName });
    }

    // Update Image
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const res = await updateAdminImage(admin.id, formData);

      // Force kore instant refresh, bypass browser cache. Image up korar por refresh kora lagto

      setPreviewImage(`http://localhost:5000${res.image}?t=${Date.now()}`);

      setSelectedImage(null); // reset selected image
    }

    setSuccessMsg(" Successfully updated !");
    setTimeout(() => setSuccessMsg(""), 3000);

   
    fetchAdmin(); 
  } catch (err) {
    console.error(err);
  }
};

   //=================AMDIN END========================//

// Logout handler
const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
  navigate("/loginAdmin"); 
};



  return (
    
    <div className="w-full min-h-screen flex justify-center items-start bg-gray-100 p-4 relative ">

        

            

      {/*   mobile transparent overlay*/}

      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-transparent md:hidden"
        ></div>
      )}

      <div className="w-full max-w-[1100px] flex flex-col md:flex-row rounded-lg overflow-hidden shadow border border-gray-200 relative z-40 mt-20">


        {/* Sidebar */}
        <div
          className={`fixed md:static top-0 left-0 z-40 h-full md:h-auto bg-[#F5FBF8] w-[250px] md:w-[220px] flex flex-col py-6 px-4 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
       
          
           {/* Profile Section */}
           <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <div className="flex flex-col items-center mb-4">
        <label className="cursor-pointer block">
          <div className="w-20 h-20 rounded-full border border-blue-300 bg-gray-200 flex items-center justify-center text-gray-500">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Admin"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              "Upload"
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
        <input
          type="text"
          value={adminName}
          onChange={(e) => setAdminName(e.target.value)}
          placeholder="Admin Name"
          className="mt-2 text-sm font-semibold outline-none bg-transparent text-center w-full"
        />
      </div>

      <button
        onClick={handleAdminUpdate}
        className="w-full py-1 px-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Save Changes
      </button>
    </div>

          <div className="border-t border-gray-300 my-4"></div>

          {/* Menu */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                setActiveTab("dashboard");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2 h-10 transition-colors duration-200 rounded-md focus:outline-none ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <FaTachometerAlt className="mr-2" />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("userData");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2 h-10 transition-colors duration-200 rounded-md focus:outline-none ${
                activeTab === "userData"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <img src={AdminUser} alt="User Data" className="w-5 h-5 mr-2" />
              <span>User Data</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("officerData");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2 h-10 transition-colors duration-200 rounded-md focus:outline-none ${
                activeTab === "officerData"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <img src={Officer} alt="Officer Data" className="w-5 h-5 mr-2" />
              <span>Officer Data</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("ownershipInfo");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2 h-10 transition-colors duration-200 rounded-md focus:outline-none ${
                activeTab === "ownershipInfo"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <img src={List} alt="Ownership Info" className="w-5 h-5 mr-2" />
              <span>Ownership Info</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("citizensQuestion");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2 h-10 transition-colors duration-200 rounded-md focus:outline-none ${
                activeTab === "citizensQuestion"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <img src={Question} alt="Citizens Question" className="w-5 h-5 mr-2" />
              <span>Citizens Question</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("settings");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2 h-10 transition-colors duration-200 rounded-md focus:outline-none ${
                activeTab === "settings"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <FaCog className="mr-2" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("logout");
                setIsSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2 h-10 transition-colors duration-200 rounded-md focus:outline-none ${
                activeTab === "logout"
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              <FaPowerOff className="mr-2" />
              <span>Log out</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#E6F0FB] p-4 sm:p-6 z-10 relative">
          
          {/* Topbar */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-blue-200 pb-4 sm:pb-0 sm:h-16 mb-6">
            <div className="sm:hidden flex items-center justify-start w-full mb-2">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="text-blue-800 text-2xl p-2"
              >
                <FaBars />
              </button>
            </div>

           <div className="mb-2 sm:mb-0 sm:ml-[125px] flex-1 flex justify-center relative">
  {/* Success message */}
  {successMsg && (
    <div className="absolute -top-10 px-4 py-2 text-sm  text-gray-700">
      {successMsg}
    </div>
  )}

          <button className="px-4 py-2 border border-blue-400 rounded-full font-medium text-gray-700 bg-white">
           Admin Panel
        </button>
         </div>



            <h1 className="text-lg text-blue-900 font-semibold flex items-center gap-1 mr-[8px] sm:ml-0">
              <img src={BhumiLogo} alt="logo" className="w-8 h-8" />
              <span>BhumiMitra</span>
            </h1>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <>
              <h2 className="text-lg font-semibold mb-4 sm:mb-6">Dashboard</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
                <div
                  onClick={() => setActiveTab("userData")}
                  className="flex flex-col items-center bg-white border border-blue-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                >
                  <img src={AdminUser} alt="User Data" className="w-20 h-20" />
                  <p className="mt-2 font-medium text-center">User Data</p>
                </div>
                <div
                  onClick={() => setActiveTab("officerData")}
                  className="flex flex-col items-center bg-white border border-blue-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                >
                  <img src={Officer} alt="Officer Data" className="w-20 h-20" />
                  <p className="mt-2 font-medium text-center">Officer Data</p>
                </div>
                <div
                  onClick={() => setActiveTab("ownershipInfo")}
                  className="flex flex-col items-center bg-white border border-blue-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                >
                  <img src={List} alt="Ownership Info" className="w-20 h-20" />
                  <p className="mt-2 font-medium text-center">Ownership Info</p>
                </div>
                <div
                  onClick={() => setActiveTab("citizensQuestion")}
                  className="flex flex-col items-center bg-white border border-blue-200 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-shadow duration-200 sm:col-span-2 lg:col-span-1 lg:col-start-2"
                >
                  <img src={Question} alt="Citizens Question" className="w-20 h-20" />
                  <p className="mt-2 font-medium text-center">Citizens Question</p>
                </div>
              </div>
            </>
          )}

          {/* User Data */}
          {activeTab === "userData" && (
            <div className="bg-white p-4 rounded-xl shadow border border-blue-200 max-w-4xl mx-auto mt-6">
              <h3 className="text-md font-semibold mb-3">User Data Management</h3>
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Enter NID Number"
                  value={nidInput}
                  onChange={(e) => setNidInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  placeholder="Enter Khatian Number"
                  value={khatianInput}
                  onChange={(e) => setKhatianInput(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button type="button"
                  onClick={addUserData}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
                >
                  Add
                </button>
              </div>
              <input
                type="text"
                placeholder="Search by NID or Khatian"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full mb-4 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300 text-left text-sm">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="border px-2 py-1">NID Number</th>
                      <th className="border px-2 py-1">Khatian Number</th>
                      <th className="border px-2 py-1">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-100 text-xs">
                        <td className="border px-2 py-1">{user.nid}</td>
                        <td className="border px-2 py-1">{user.khatian}</td>
                        <td className="border px-2 py-1">
                          <button type="button"
               onClick={() => deleteUser(user.id)} 
                 className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition"
                   >
              Delete
                 </button>

                        </td>
                      </tr>
                    ))}
                    {filteredData.length === 0 && (
                      <tr>
                        <td colSpan={3} className="text-center py-2 text-gray-500 text-sm">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Officer Data */}
{activeTab === "officerData" && (
  <div className="bg-white p-4 rounded-xl shadow border border-blue-200 max-w-full mx-auto mt-6">
    <h3 className="text-md font-semibold mb-3">Officer Management</h3>

    {/* Add Officer Form */}
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <select
        value={officerRole}
        onChange={(e) => setOfficerRole(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Select Role</option>
        <option value="Land Registry Officer">Land Registry Officer</option>
        <option value="Complaint Officer">Complaint Officer</option>
        <option value="Ownership Transfer Officer">Ownership Transfer Officer</option>
      </select>

      <input
        type="email"
        placeholder="Email"
        value={officerEmail}
        onChange={(e) => setOfficerEmail(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        value={officerPassword}
        onChange={(e) => setOfficerPassword(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={async () => {
          if (!officerRole || !officerEmail || !officerPassword) return;
          try {
            await addOfficer({ role: officerRole, email: officerEmail, password: officerPassword });
            const updatedOfficers = await getOfficers();
            setOfficerData(updatedOfficers);

            // Reset form fields
            setOfficerRole("");
            setOfficerEmail("");
            setOfficerPassword("");
          } catch (error) {
            console.error("Error adding officer:", error);
          }
        }}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>

    {/* Officer List Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-left text-sm">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-2 py-1">Role</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Password</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {officerData.length > 0 ? (
            officerData.map((officer) => (
              <tr key={officer.id} className="hover:bg-gray-100 text-xs">
                <td className="border px-2 py-1">{officer.role}</td>
                <td className="border px-2 py-1">{officer.email}</td>
                <td className="border px-2 py-1">{officer.password}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={async () => {
                      try {
                        await deleteOfficer(officer.id);
                        const updatedOfficers = await getOfficers();
                        setOfficerData(updatedOfficers);
                      } catch (error) {
                        console.error("Error deleting officer:", error);
                      }
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-2 text-gray-500 text-sm">
                No officer found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}


          {/* Ownership Info */}
          {activeTab === "ownershipInfo" && (
  <div className="bg-white p-4 rounded-xl shadow border border-blue-200 max-w-full mx-auto mt-6">
    <h3 className="text-md font-semibold mb-3">Ownership Info Management</h3>

    {/* Add Ownership Form */}
    <div className="flex flex-col sm:flex-row gap-2 mb-4">
      <input
        type="text"
        placeholder="Previous Owner"
        value={prevOwner}
        onChange={(e) => setPrevOwner(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Current Owner"
        value={currOwner}
        onChange={(e) => setCurrOwner(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Area (in acres)"
        value={landArea}
        onChange={(e) => setLandArea(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        placeholder="Khatian Number"
        value={landKhatian}
        onChange={(e) => setLandKhatian(e.target.value)}
        className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={addOwnership}
        className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
      >
        Add
      </button>
    </div>

    {/* Search */}
    <input
      type="text"
      placeholder="Search by Owner or Khatian"
      value={landSearch}
      onChange={(e) => setLandSearch(e.target.value)}
      className="w-full mb-4 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* Ownership Table */}
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 text-left text-sm">
        <thead className="bg-blue-100">
          <tr>
            <th className="border px-2 py-1">Previous Owner</th>
            <th className="border px-2 py-1">Current Owner</th>
            <th className="border px-2 py-1">Area</th>
            <th className="border px-2 py-1">Khatian</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOwnership.map((record) => (
            <tr key={record.id} className="hover:bg-gray-100 text-xs">
              <td className="border px-2 py-1">{record.previous_owner}</td>
              <td className="border px-2 py-1">{record.current_owner}</td>
              <td className="border px-2 py-1">{record.area}</td>
              <td className="border px-2 py-1">{record.khatian}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => deleteOwnership(record.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredOwnership.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-2 text-gray-500 text-sm">
                No ownership records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

          {/* Citizens Question */}
{activeTab === "citizensQuestion" && (
  <div className="bg-white p-4 rounded-xl shadow border border-blue-200 max-w-full mx-auto mt-6">
    <h3 className="text-md font-semibold mb-3">Citizen Questions</h3>
    <div className="overflow-x-auto">
      <table className="min-w-[600px] border-collapse border border-gray-300 text-left text-sm">
        <thead className="bg-blue-100 sticky top-0">
          <tr>
            <th className="border px-2 py-2">Question</th>
            <th className="border px-2 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {citizenQuestions.map((q) => (
            <tr key={q.id} className="hover:bg-gray-100 text-xs">
              <td className="border px-2 py-1">{q.question_text}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {citizenQuestions.length === 0 && (
            <tr>
              <td colSpan={2} className="text-center py-2 text-gray-500 text-sm">
                No questions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

          
          {/* Settings Tab */}
          {activeTab === "settings" && (
  <div>
    <h2 className="text-base ml-[19px] font-normal mb-4">
      Change admin username and password
    </h2>
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-blue-200 max-w-full sm:max-w-lg">
      <form
  className="space-y-4"
  onSubmit={async (e) => {
    e.preventDefault();
    try {
      await updateAdminCredentials(admin.id, {
        username: adminUsername,
        password: adminPassword,
      });

      setAdmin((prev) => ({
        ...prev,
        username: adminUsername,
      }));

      setAdminPassword(""); 

      //success message
      setSuccessMessage("Admin Username and Password updated successfully!!");

      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

    } catch (err) {
      console.error(err);
      setSuccessMessage("Failed to update Admin Username and Password");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }
  }}
>
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
      {successMessage && (
        <p className="mt-3 text-sm text-gray-700">{successMessage}</p>
      )}
    </div>
  </div>
)}

       {/* Logout Tab */}
{/* Logout Tab */}
{activeTab === "logout" && (
  <div className="flex flex-col items-center justify-center h-full text-center">
    <h2 className="text-lg font-semibold mb-4 text-blue-600">
      Log Out
    </h2>
    <p className="mb-6">
      Are you sure you want to log out?
    </p>
    <div className="flex space-x-4">
      {/* ✅ Yes Button */}
      <button
        onClick={handleLogout}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Yes, Log Out
      </button>

      {/* ❌ Cancel Button */}
      <button
        onClick={() => setActiveTab("dashboard")}
        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        Cancel
      </button>
    </div>
  </div>
)}


        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 
