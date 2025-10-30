
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/registry-officer';

export const loginRegistryOfficer = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data; // { message, officerId }
  } catch (err) {
    throw err.response ? err.response.data : { message: 'Server error' };
  }
};
