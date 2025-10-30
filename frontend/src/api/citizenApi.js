import axios from "axios";

const BASE_URL = "http://localhost:5000"; 

//  Citizen Registration
export const registerCitizen = async (formData) => {
  const response = await axios.post(`${BASE_URL}/register`, formData);
  return response.data;
};

//  Citizen Login
export const loginCitizen = async (loginData) => {
  const response = await axios.post(`${BASE_URL}/loginCitizen`, loginData);
  return response.data;
};


//  Forgot Password
export const forgotPassword = async (email) => {
  const response = await axios.post(`${BASE_URL}/forgot-password`, { email });
  return response.data;
};


//  Reset Password
export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${BASE_URL}/reset-newpassword`, {
    token,
    newPassword,
  });
  return response.data;
};



// ---------------- Question API ----------------
// Get all questions
export const getQuestions = async () => {
  const response = await axios.get(`${BASE_URL}/questions`);
  return response.data;
};

// Add new question
export const addQuestion = async (questionText) => {
  const response = await axios.post(`${BASE_URL}/questions`, {
    question_text: questionText,
  });
  return response.data;
};


