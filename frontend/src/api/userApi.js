import axios from "axios";

const BASE_URL = "http://localhost:5000";   
const USER_API = `${BASE_URL}/users`;

// ---------------- User API ----------------
export const getUsers = async () => {
  const res = await axios.get(USER_API);
  return res.data;
};

export const createUser = async (user) => {
  const res = await axios.post(USER_API, user);
  return res.data;
};

export const deleteUserApi = async (id) => {
  const res = await axios.delete(`${USER_API}/${id}`);
  return res.data;
};


