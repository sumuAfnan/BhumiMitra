import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Submit a new ownership transfer (user request)
export const submitUserOwnership = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/userowner`, data);
    return response.data;
  } catch (err) {
    console.error("Error submitting ownership transfer:", err);
    throw err;
  }
};

// Approve/transfer ownership (officer)
export const approveUserOwnership = async (applicationId, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/userowner/${applicationId}`, data);
    return response.data;
  } catch (err) {
    console.error("Error approving ownership transfer:", err);
    throw err;
  }
};

export const getOwnershipStatus = async (applicationId) => {
  const response = await axios.get(`${BASE_URL}/userowner/status/${applicationId}`);
  return response.data; // { application: { status: "Pending" } }
};