import axios from "axios";

const BASE_URL = "http://localhost:5000"; 

// Bring all officer list
export const getOfficers = async () => {
  const response = await axios.get(`${BASE_URL}/officers`);
  return response.data;
};

//Add new officer
export const addOfficer = async (officerData) => {
  // officerData: { role, email, password }
  const response = await axios.post(`${BASE_URL}/officers`, officerData);
  return response.data;
};

// Officer delete 
export const deleteOfficer = async (id) => {
  const response = await axios.delete(`${BASE_URL}/officers/${id}`);
  return response.data;
};
