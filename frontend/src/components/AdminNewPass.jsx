import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/adminApi";

const AdminNewPass = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const t = searchParams.get("token");
    if (!t) return alert("Invalid token");
    setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return alert("Passwords do not match");

    try {
      const res = await resetPassword(token, newPassword);
      alert(res.message);
      navigate("/loginAdmin");
    } catch (err) {
      console.error(err);
      alert("Error resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-[440px]">
        <h2 className="text-[17px] font-medium mb-2">Set New Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border-1 border-lime-300 bg-lime-50 focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded border-1 border-lime-300 bg-lime-50 focus:outline-none focus:ring-2 focus:ring-lime-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 py-2 text-white rounded transition duration-200"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminNewPass;


