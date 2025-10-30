import axios from "axios";

const BASE_URL = "http://localhost:5000";   
const QUESTION_API = `${BASE_URL}/questions`;
const ADMIN_API = `${BASE_URL}/admins`;

// ---------------- Question API ----------------

// Get all questions
export const getQuestions = async () => {
  const res = await axios.get(QUESTION_API);
  return res.data;
};


// Delete a question
export const deleteQuestion = async (id) => {
  const res = await axios.delete(`${QUESTION_API}/${id}`);
  return res.data;
};

// ---------------- Admin API ----------------

//  Admin Login
export const loginAdmin = async (loginData) => {
  const response = await axios.post(`${BASE_URL}/loginAdmin`, loginData);
  return response.data;
};

//  Forgot Password
export const forgotPassword = async (email) => {
  const response = await axios.post(`${BASE_URL}/admin/forgot-password`, { email });
  return response.data;
};

//  Reset Password
export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${BASE_URL}/reset-adminnewpassword`, {
    token,
    newPassword,
  });
  return response.data;
};






// Fetch Admin Info
export const getAdminInfo = async () => {
  try {
    const res = await axios.get(`${ADMIN_API}/me`);
    return res.data;
  } catch (error) {
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

// Update admin text (name)
export const updateAdminText = async (id, data) => {
  if (!id) throw new Error("Admin ID is required");
  if (!data || !data.name) throw new Error("Name is required to update");
  try {
    const res = await axios.put(`${ADMIN_API}/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Error updating admin text:", error);
    throw error;
  }
};

// Update admin image
export const updateAdminImage = async (id, formData) => {
  if (!id) throw new Error("Admin ID is required");
  if (!formData) throw new Error("FormData with image is required");
  try {
    const res = await axios.put(`${ADMIN_API}/${id}/image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating admin image:", error);
    throw error;
  }
};

// Update admin username & password
export const updateAdminCredentials = async (id, data) => {
  if (!id) throw new Error("Admin ID is required");
  if (!data || (!data.username && !data.password))
    throw new Error("Username or password is required to update");

  try {
    const res = await axios.put(`${ADMIN_API}/${id}/credentials`, data); // ✅ এখানে /credentials বসাও
    return res.data;
  } catch (error) {
    console.error("Error updating admin credentials:", error);
    throw error;
  }
};
