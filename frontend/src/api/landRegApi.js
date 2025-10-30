import axios from "axios";

const BASE_URL = "http://localhost:5000/api"; 

// ✅ Land Registration (user submits a new application)
export const registerLand = async (formData) => {
  try {
    const response = await axios.post(`${BASE_URL}/landreg`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Land Registration Error:", error.response?.data || error.message);
    throw error.response?.data || { success: false, message: "Something went wrong" };
  }
};

// ✅ Fetch all applications (for officer dashboard)
export const getAllApplications = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/applications`);
    return response.data;
  } catch (error) {
    console.error("Get Applications Error:", error.response?.data || error.message);
    throw error.response?.data || { success: false, message: "Failed to fetch applications" };
  }
};

// ✅ Fetch single application details by ID
export const getApplicationById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/applications/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Application By ID Error:", error.response?.data || error.message);
    throw error.response?.data || { success: false, message: "Application not found" };
  }
};

// ✅ Pay and update status to "Paid"
export const payApplication = async (appId) => {
  try {
    const res = await axios.put(`${BASE_URL}/applications/${appId}/pay`);
    return res.data;
  } catch (error) {
    console.error("Pay Application Error:", error.response?.data || error.message);
    throw error.response?.data || { success: false, message: "Payment failed" };
  }
};

// ✅ Update land registry fee (for officer to set fee)
export const updateApplicationFee = async (appId, fee) => {
  try {
    const res = await axios.put(`${BASE_URL}/applications/${appId}/fee`, { fee });
    return res.data;
  } catch (error) {
    console.error("Update Application Fee Error:", error.response?.data || error.message);
    throw error.response?.data || { success: false, message: "Failed to update fee" };
  }
};

// ✅ Approve application
export const approveApplication = async (appId) => {
  try {
    const res = await axios.put(`${BASE_URL}/applications/${appId}/approve`);
    return res.data;
  } catch (error) {
    console.error("Approve Application Error:", error.response?.data || error.message);
    throw error.response?.data || { success: false, message: "Approval failed" };
  }
};

