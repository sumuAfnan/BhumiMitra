import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Fetch all ownership records
export const getOwnership = async () => {
  const response = await axios.get(`${BASE_URL}/ownership`);
  return response.data;
};

// Add a new ownership record
export const addOwnership = async (record) => {
  const response = await axios.post(`${BASE_URL}/ownership`, record);
  return response.data;
};

// Delete an ownership record
export const deleteOwnership = async (id) => {
  const response = await axios.delete(`${BASE_URL}/ownership/${id}`);
  return response.data;
};
