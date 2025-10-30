import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const loginOwnershipOfficer = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/ownership-officer/login`, loginData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server error" };
  }
};
