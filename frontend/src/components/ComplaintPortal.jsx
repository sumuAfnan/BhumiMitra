import React, { useState, useEffect } from "react";

const ComplaintPortal = () => {
  const [complaints, setComplaints] = useState(
    JSON.parse(localStorage.getItem("complaints")) || []
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    landId: "",
    complaint: "",
  });
  const [isOfficerLoggedIn, setIsOfficerLoggedIn] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.setItem("complaints", JSON.stringify(complaints));
  }, [complaints]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComplaint = {
      ...formData,
      date: new Date().toLocaleString(),
    };
    setComplaints([...complaints, newComplaint]);
    alert("Complaint submitted successfully!");
    setFormData({ name: "", email: "", landId: "", complaint: "" });
  };

  const handleLogin = () => {
    if (password === "admin123") {
      setIsOfficerLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Poppins', 'Segoe UI', sans-serif",
        backgroundColor: "#ffffff",
        color: "#222",
        lineHeight: "1.6",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#7ac943",
          color: "#111",
          textAlign: "center",
          padding: "1rem 0",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ fontSize: "1.8rem" }}>
          Land Management System - Complaint Portal
        </h1>
      </header>

      <main
        style={{
          maxWidth: "900px",
          margin: "2rem auto",
          padding: "0 1.5rem",
        }}
      >
        {/* Complaint Form */}
        <section
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            marginBottom: "2rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              color: "#4d7c0f",
              marginBottom: "1rem",
              borderLeft: "4px solid #7ac943",
              paddingLeft: "0.5rem",
            }}
          >
            Submit a Complaint
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.3rem" }}>
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                }}
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.3rem" }}>
                Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                }}
              />
            </div>

            {/* Land ID */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.3rem" }}>
                Land ID
              </label>
              <input
                type="text"
                required
                value={formData.landId}
                onChange={(e) =>
                  setFormData({ ...formData, landId: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                }}
              />
            </div>

            {/* Complaint */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", marginBottom: "0.3rem" }}>
                Complaint Details
              </label>
              <textarea
                rows="5"
                required
                value={formData.complaint}
                onChange={(e) =>
                  setFormData({ ...formData, complaint: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              style={{
                backgroundColor: "#7ac943",
                color: "white",
                padding: "0.6rem 1.2rem",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#69b233")
              }
              onMouseOut={(e) => (e.target.style.backgroundColor = "#7ac943")}
            >
              Submit Complaint
            </button>
          </form>
        </section>

        {/* Officer Dashboard */}
        <section
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              color: "#4d7c0f",
              marginBottom: "1rem",
              borderLeft: "4px solid #7ac943",
              paddingLeft: "0.5rem",
            }}
          >
            Complaint Officer Dashboard
          </h2>

          {!isOfficerLoggedIn ? (
            <div style={{ marginBottom: "1rem" }}>
              <input
                type="password"
                placeholder="Enter Officer Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "250px",
                  marginRight: "0.5rem",
                  padding: "0.6rem 0.8rem",
                  border: "1px solid #ccc",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                }}
              />
              <button
                onClick={handleLogin}
                style={{
                  backgroundColor: "#7ac943",
                  color: "white",
                  padding: "0.6rem 1.2rem",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#69b233")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#7ac943")}
              >
                Login
              </button>
            </div>
          ) : (
            <div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                }}
              >
                Submitted Complaints
              </h3>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: "1rem",
                }}
              >
                <thead style={{ backgroundColor: "#d9f2c2" }}>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "0.6rem" }}>
                      Name
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "0.6rem" }}>
                      Email
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "0.6rem" }}>
                      Land ID
                    </th>
                    <th style={{ border: "1px solid #ddd", padding: "0.6rem" }}>
                      Complaint
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((c, index) => (
                    <tr key={index}>
                      <td style={{ border: "1px solid #ddd", padding: "0.6rem" }}>
                        {c.name}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "0.6rem" }}>
                        {c.email}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "0.6rem" }}>
                        {c.landId}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "0.6rem" }}>
                        {c.complaint}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default ComplaintPortal;
