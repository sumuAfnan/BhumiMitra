const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");  
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");



const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));





{/*=================== MySQL connection Start Here ======================  */}


// ---------------- User DB Connection ----------------//

const userDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.USER_DB,
});

  userDB.connect((err) => {
  if (err) {
    console.error(" User DB connection failed:", err);
  } else {
    console.log(" Connected to User DB");
  }
});


// ---------------- Officer DB Connection ----------------//
const officerDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.OFFICER_DB,
});

officerDB.connect((err) => {
  if (err) {
    console.error("Officer DB connection failed:", err);
  } else {
    console.log(" Connected to Officer DB");
  }
});


// ---------------- Ownership DB Connection ----------------//
const ownershipDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.OWNERSHIP_DB,
});

ownershipDB.connect((err) => {
    if (err) {
        console.error("Ownership DB connection failed:", err);
    } else {
        console.log("Connected to Ownership DB");
    }
});

// ---------------- Admin DB Connection ----------------//

const adminDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.ADMIN_DB,
});
adminDB.connect(err => {
  if (err) console.error("Admin DB connection failed:", err);
  else console.log("Connected to Admin DB");
});








{/*=================== Gmail Connection ======================  */}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
   user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});


// ---------------- USER APIs ----------------

// Get all users
app.get("/users", (req, res) => {
  userDB.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new user
app.post("/users", (req, res) => {
  const { nid, khatian } = req.body;
  if (!nid || !khatian) return res.status(400).json({ error: "NID and Khatian required" });

 userDB.query("INSERT INTO users (nid, khatian) VALUES (?, ?)", [nid, khatian], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User added", id: results.insertId });
  });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  userDB.query("DELETE FROM users WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User deleted" });
  });
});

//====================== CITIZEN PART start here==================//

// ---------------- CITIZEN REGISTRATION API ----------------
app.post("/register", async (req, res) => {
  const { fullName, nid, email, username, password, mobile } = req.body;

  if (!fullName || !nid || !email || !username || !password || !mobile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //  NID check in users table
  userDB.query("SELECT * FROM users WHERE nid = ?", [nid], async (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });

    if (result.length === 0) {
      return res.status(400).json({ message: "NID not found in users table" });
    }

    //  Already registered check 
   userDB.query(
      "SELECT * FROM citizen_reg WHERE email = ? OR username = ? OR nid_number = ?",
      [email, username, nid],
      async (err, existing) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });

        if (existing.length > 0) {
          return res.status(400).json({ message: "User already registered" });
        }

        //  Password hash
        const hashedPassword = await bcrypt.hash(password, 10);

        //  Insert into citizen_reg
        userDB.query(
          "INSERT INTO citizen_reg (full_name, nid_number, email, username, password, mobile) VALUES (?, ?, ?, ?, ?, ?)",
          [fullName, nid, email, username, hashedPassword, mobile],
          (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err });

            res.status(201).json({ message: "Registration successful" });
          }
        );
      }
    );
  });
});

// ===========================Citizen Login API=========================
app.post("/loginCitizen", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = "SELECT * FROM citizen_reg WHERE username = ? AND email = ?";
 userDB.query(sql, [username, email], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error comparing password" });
      }

      if (!match) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      return res.json({ success: true, message: "Login successful", user });
    });
  });
});


// -------------------- Forgot Password---------------------// 

app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

 userDB.query("SELECT * FROM citizen_reg WHERE email = ?", [email], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (rows.length === 0) return res.status(404).json({ message: "Email not found" });

    const user = rows[0];
    const token = jwt.sign({ id: user.id, email: user.email }, "my_secret_key", { expiresIn: "1h" });

    const resetLink = `http://localhost:5173/reset-newpassword?token=${token}`;

    transporter.sendMail({
      from: "samm181075@gmail.com",
      to: email,
      subject: "Password Reset - BhumiMitra",
      html: `<p>Click to reset your password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
    }, (error, info) => {
      if (error) return res.status(500).json({ message: "Failed to send email" });
      res.json({ message: "Password reset link sent to your email" });
    });
  });
});




// -------------------- Reset Password APi---------------------// 


app.post("/reset-newpassword", async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password required" });
  }

  try {
    const decoded = jwt.verify(token, "my_secret_key");
    const hashed = await bcrypt.hash(newPassword, 10);

   userDB.query("UPDATE citizen_reg SET password = ? WHERE id = ?", [hashed, decoded.id], (err) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json({ message: "Password updated successfully" });
    });
  } catch (err) {
    return res.status(400).json({ message: "Invalid or expired token" });
    
  }
});


// ---------------- Question Submission ---------------- //
app.post("/questions", (req, res) => {
  const { question_text } = req.body;

  if (!question_text) {
    return res.status(400).json({ error: "Question is required" });
  }

  const sql = "INSERT INTO questions (question_text) VALUES (?)";
  userDB.query(sql, [question_text], (err, result) => {
    if (err) {
      console.error("Error inserting question:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Question submitted successfully", id: result.insertId });
  });
});

// Optional: fetch all questions
app.get("/questions", (req, res) => {
  userDB.query("SELECT * FROM questions ORDER BY created_at DESC", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
}); 


// ---------------- Citizen Question view and delet in admin panel ---------------- //
// Get all questions
app.get("/questions", (req, res) => {
   userDB.query("SELECT * FROM questions ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Delete a question by id
app.delete("/questions/:id", (req, res) => {
  const questionId = req.params.id;
 userDB.query(
    "DELETE FROM questions WHERE id = ?",
    [questionId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Question deleted", id: questionId });
    }
  );
});






/*=================== Multer Setup ======================*/

// Land Registration Upload
const landStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "uploads/landDocs");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const landUpload = multer({ storage: landStorage });

/* =================== Land Registration API =================== */
app.post("/api/landreg", landUpload.single("documents"), (req, res) => {
  const {
    fullName, nid, khatian, landArea, landValue, district, dagNumber,
    ownershipType, previousOwner, purchaseDate, landUse, upazila,
    address, landType, mobile, email
  } = req.body;

  const documentPath = req.file ? `/uploads/landDocs/${req.file.filename}` : null;
  const applicationId = "LAND-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

  // only duplicate when 3 field match together
  const checkSql = "SELECT * FROM landreg WHERE fullName=? AND nid=? AND khatian=?";
  userDB.query(checkSql, [fullName, nid, khatian], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });

    if (result.length > 0) {
      return res.json({ success: false, message: "Duplicate entry. Registration not allowed." });
    }

    // otherwise new entry allow
    const insertSql = `INSERT INTO landreg
      (applicationId, fullName, nid, khatian, landArea, landValue, district, dagNumber,
       ownershipType, previousOwner, purchaseDate, landUse, upazila, address, landType, mobile, email, documents)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    userDB.query(insertSql, [
      applicationId, fullName, nid, khatian, landArea, landValue, district, dagNumber,
      ownershipType, previousOwner, purchaseDate, landUse, upazila, address,
      landType, mobile, email, documentPath
    ], (err) => {
      if (err) return res.status(500).json({ success: false, message: "Insert failed" });

      // Send confirmation email
      const mailOptions = {
        from: "samm181075@gmail.com",
        to: email,
        subject: "Land Registration Successful - BhumiMitra",
        html: `<p>Dear ${fullName},</p>
               <p>Your land registration was successful!</p>
               <p><strong>Application ID: ${applicationId}</strong></p>
               <p>Keep this ID for future reference.</p>`
      };
      transporter.sendMail(mailOptions, (error) => {
        if (error) console.error("Email send error:", error);
      });

      res.json({ success: true, message: "Land Registration successful", applicationId });
    });
  });
});



//====================== CITIZEN PART End here==================//



 //====================== OFFICER START here Admin==================//

// Get all officers
app.get("/officers", (req, res) => {
  officerDB.query("SELECT id, role, email, password FROM officers", (err, results) => {
    if (err) {
      console.error("Error fetching officers:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});


// Add new officer
app.post("/officers", async (req, res) => {
  const { role, email, password } = req.body;
  if (!role || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // <-- define here
    officerDB.query(
      "INSERT INTO officers (role, email, password) VALUES (?, ?, ?)",
      [role, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.error("Error adding officer:", err);
          return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "Officer added", id: result.insertId });
      }
    );
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ error: "Server error" });
  }
});


// Delete officer
app.delete("/officers/:id", (req, res) => {
  const { id } = req.params;
  officerDB.query("DELETE FROM officers WHERE id = ?", [id], (err) => {
    if (err) {
      console.error("Error deleting officer:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "Officer deleted" });
  });
});

 //====================== OFFICER START here==================//

//=============Registration officer Start here ====================//

// GET all applications
app.get("/api/applications", (req, res) => {
  const sql = "SELECT applicationId, fullName, nid, status, fee FROM landreg ORDER BY id DESC";
  userDB.query(sql, (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    res.json(results);
  });
});


// GET single application details
app.get("/api/applications/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM landreg WHERE applicationId=?";
  userDB.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }
    res.json(results[0]);
  });
});

// UPDATE registration fee by Application ID (prevent duplicates)
app.put("/api/applications/:id/fee", (req, res) => {
  const { id } = req.params;
  const { fee } = req.body;

  // Step 1: Check if fee already exists
  const checkSql = "SELECT fee FROM landreg WHERE applicationId=?";
  userDB.query(checkSql, [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    if (results.length === 0) return res.status(404).json({ success: false, message: "Application not found" });

    if (results[0].fee !== null) {
      return res.status(400).json({ success: false, message: "Fee already sent for this application" });
    }

    // Step 2: Fee not set, update it
    const updateSql = "UPDATE landreg SET fee=? WHERE applicationId=?";
    userDB.query(updateSql, [fee, id], (err2, result2) => {
      if (err2) return res.status(500).json({ success: false, message: "Database error" });
      res.json({ success: true, message: "Fee sent successfully" });
    });
  });
});

// UPDATE application payment status to Paid (user pays)
app.put("/api/applications/:id/pay", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE landreg SET status='paid' WHERE applicationId=? AND status='pending'";
  userDB.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    if (results.affectedRows === 0)
      return res.status(400).json({ success: false, message: "Invalid application or already paid" });
    res.json({ success: true, message: "Payment successful" });
  });
});

// Approve application (only if fee already paid)
app.put("/api/applications/:id/approve", (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE landreg SET status='approved' WHERE applicationId=? AND status='paid'";

  userDB.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: "Database error" });
    if (results.affectedRows === 0)
      return res.status(400).json({ success: false, message: "Invalid application or fee not paid yet" });

    res.json({ success: true, message: "Application approved successfully" });
  });
});



// Registry Officer Login API
app.post('/api/registry-officer/login', (req, res) => {
  const { email, password, role } = req.body;

  const query = 'SELECT * FROM officers WHERE email = ? AND role = ?';
officerDB.query(query, [email, role], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or role' });
    }

    const officer = results[0];

    // Compare password using bcrypt
    bcrypt.compare(password, officer.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing password' });

      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      //Success
      return res.json({ message: 'Login successful', officerId: officer.id });
    });
  });
});








//=============Registration officer End  here ====================//
























// GET all ownerships
app.get("/ownership", (req, res) => {
  ownershipDB.query("SELECT * FROM ownership_records", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// POST new ownership
app.post("/ownership", (req, res) => {
  const { previous_owner, current_owner, area, khatian } = req.body;

  if (!previous_owner || !current_owner || !area || !khatian) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const insertQuery = `
    INSERT INTO ownership_records (previous_owner, current_owner, area, khatian)
    VALUES (?, ?, ?, ?)
  `;

  ownershipDB.query(insertQuery, [previous_owner, current_owner, area, khatian], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Ownership record added successfully!" });
  });
});

// DELETE ownership by ID
app.delete("/ownership/:id", (req, res) => {
  const { id } = req.params;
  const deleteQuery = "DELETE FROM ownership_records WHERE id = ?";

  ownershipDB.query(deleteQuery, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Ownership record deleted successfully!" });
  });
});

// ==================== ADMIN APIs ==================== //

// ================= Multer Setup =================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "uploads/admin");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// ---------------- Routes ----------------


// ===========================ADMIN Login API=========================

app.post("/loginAdmin", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sql = "SELECT * FROM admininfo WHERE username = ? AND email = ?";
 adminDB.query(sql, [username, email], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const admin = results[0];

    bcrypt.compare(password, admin.password, (err, match) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Error comparing password" });
      }

      if (!match) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      return res.json({ success: true, message: "Login successful", admin });
    });
  });
});


// -------------------- Forgot Password---------------------// 


app.post("/admin/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  adminDB.query("SELECT * FROM admininfo WHERE email = ?", [email], (err, rows) => {
    if (err) return res.status(500).json({ message: "DB error" });
    if (rows.length === 0) return res.status(404).json({ message: "Email not found" });

    const admin = rows[0];
    const token = jwt.sign({ id: admin.id, email: admin.email }, "my_secret_key", { expiresIn: "1h" });

    const resetLink = `http://localhost:5173/reset-adminnewpassword?token=${token}`;

    transporter.sendMail({
      from: "samm181075@gmail.com",
      to: email,
      subject: "Password Reset - Admin BhumiMitra",
      html: `<p>Click to reset your admin password:</p><p><a href="${resetLink}">${resetLink}</a></p>`
    }, (error, info) => {
      if (error) return res.status(500).json({ message: "Failed to send email", error });
      return res.json({ success: true, message: "Password reset link sent to your email" });
    });
  });
});




// -------------------- Reset Password APi---------------------// 
app.post("/reset-adminnewpassword", (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: "Token and new password required" });
  }

  try {
    
    const decoded = jwt.verify(token, "my_secret_key");

    adminDB.query("SELECT * FROM admininfo WHERE id = ?", [decoded.id], (err, rows) => {
      if (err) {
        console.error("DB error:", err);
        return res.status(500).json({ message: "DB error" });
      }

      if (rows.length === 0) {
        return res.status(404).json({ message: "Admin not found" });
      }
      bcrypt.hash(newPassword, 10, (hashErr, hashedPassword) => {
        if (hashErr) {
          console.error("Hash error:", hashErr);
          return res.status(500).json({ message: "Error hashing password" });
        }

        adminDB.query(
          "UPDATE admininfo SET password = ? WHERE id = ?",
          [hashedPassword, decoded.id],
          (updateErr, result) => {
            if (updateErr) {
              console.error("DB update error:", updateErr);
              return res.status(500).json({ message: "DB error while updating password" });
            }

            return res.json({ success: true, message: "Password updated successfully" });
          }
        );
      });
    });
  } catch (err) {
    // token invalid or expired
    console.error("Token verify error:", err);
    return res.status(400).json({ message: "Invalid or expired token" });
  }
});


// Get current admin info
app.get("/admins/me", (req, res) => {
  adminDB.query("SELECT * FROM admininfo WHERE id = 1", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result[0]); 
  });
});



// Update admin name
app.put("/admins/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!id) return res.status(400).json({ message: "Admin ID is required" });
  adminDB.query("UPDATE admininfo SET name=? WHERE id=?", [name, id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Admin name updated" });
  });
});

// Update admin image
app.put("/admins/:id/image", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const imagePath = `/uploads/admin/${req.file.filename}`;
  adminDB.query(
    "UPDATE admininfo SET image_url=? WHERE id=?",
    [imagePath, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Admin image updated", image_url: imagePath });
    }
  );
});

// Update admin username & password with bcrypt
app.put("/admins/:id/credentials", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  if (!username && !password) {
    return res.status(400).json({ message: "Username or password is required" });
  }

  let query = "UPDATE admininfo SET ";
  const params = [];

  if (username) {
    query += "username = ?";
    params.push(username);
  }

  if (password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 = saltRounds
      if (username) query += ", ";
      query += "password = ?";
      params.push(hashedPassword);
    } catch (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Error hashing password" });
    }
  }

  query += " WHERE id = ?";
  params.push(id);

 adminDB.query(query, params, (err, result) => {
    if (err) {
      console.error("Error updating credentials:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ message: "Admin credentials updated successfully" });
  });
});

// For officer

officerDB.connect(err => {
  if (err) {
    console.log('DB connection error:', err);
  } else {
    console.log('MySQL connected!');
  }
});

//  Ownership Officer Login API
app.post('/api/ownership-officer/login', (req, res) => {

  const { email, password, role } = req.body;

  const query = 'SELECT * FROM officers WHERE email = ? AND role = ?';
officerDB.query(query, [email, role], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or role' });
    }

    const officer = results[0];

    // Compare password using bcrypt
    bcrypt.compare(password, officer.password, (err, isMatch) => {
      if (err) return res.status(500).json({ message: 'Error comparing password' });

      if (!isMatch) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      //Success
      return res.json({ message: 'Login successful', officerId: officer.id });
    });
  });
});







// ==================== User Ownership Transfer API ====================
// ==================== Submit User Ownership Transfer API ====================
app.post("/userowner", (req, res) => {
  const { previous_owner, current_owner, nid, khatian, area, gmail } = req.body;

  if (!previous_owner || !current_owner || !nid || !khatian || !area || !gmail) {
    return res.status(400).json({ error: "All fields are required!" });
  }

  //  Check if ownership record exists
  const checkQuery = `
    SELECT * FROM ownership_records 
    WHERE current_owner = ? AND khatian = ? AND area = ?
  `;

  ownershipDB.query(checkQuery, [previous_owner, khatian, area], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ error: "Database error!" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Ownership record not found or mismatch!" });
    }

    //  Generate Application ID
    const applicationId = "APP-" + crypto.randomBytes(4).toString("hex").toUpperCase();

    //  Update ownership record with new owner info
    const updateQuery = `
      UPDATE ownership_records
      SET new_owner = ?, nid = ?, gmail = ?, status = ?, application_id = ?
      WHERE current_owner = ? AND khatian = ? AND area = ?
    `;

    ownershipDB.query(
      updateQuery,
      [current_owner, nid, gmail, "Pending", applicationId, previous_owner, khatian, area],
      (err2) => {
        if (err2) {
          console.error("Update Error:", err2);
          return res.status(500).json({ error: "Update failed!" });
        }

        //  Send confirmation email to new owner
        const mailOptions = {
          from: "samm181075@gmail.com",
          to: gmail,
          subject: "Ownership Transfer Application ID",
          text: `Dear ${current_owner},\n\nYour ownership transfer application has been submitted successfully!\n\nApplication ID: ${applicationId}\n\nThank you.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending mail:", error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });

        //  Fetch updated record to return to frontend
        const selectUpdatedQuery = `
          SELECT id, application_id, previous_owner, current_owner, area, khatian, nid, gmail, new_owner, status
          FROM ownership_records
          WHERE khatian = ? AND area = ?
        `;

        ownershipDB.query(selectUpdatedQuery, [khatian, area], (err3, updatedResults) => {
          if (err3) {
            console.error("Select Error:", err3);
            return res.status(500).json({ error: "Error fetching updated record!" });
          }

          return res.json({
            message: "Ownership transfer application submitted successfully!",
            application: updatedResults[0],
          });
        });
      }
    );
  });
});

// ==================== Approve User Ownership Transfer API ====================
app.put("/userowner/:applicationId", (req, res) => {
  const { applicationId } = req.params;

  //  Find the record by application_id
  const selectQuery = `
    SELECT * FROM ownership_records
    WHERE application_id = ?
  `;

  ownershipDB.query(selectQuery, [applicationId], (err, results) => {
    if (err) {
      console.error("Select Error:", err);
      return res.status(500).json({ error: "Database error!" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Application not found!" });
    }

    

    //  Update ownership: set current_owner = new_owner, clear new_owner, mark Approved
    const updateQuery = `
      UPDATE ownership_records
      SET previous_owner = current_owner,
          current_owner = new_owner,
          new_owner = NULL,
          status = 'Approved'
      WHERE application_id = ?
    `;

    ownershipDB.query(updateQuery, [applicationId], (err2) => {
      if (err2) {
        console.error("Update Error:", err2);
        return res.status(500).json({ error: "Failed to approve transfer!" });
      }

      //  Fetch and return updated record
      const selectUpdatedQuery = `
        SELECT id, application_id, previous_owner, current_owner, area, khatian, nid, gmail, new_owner, status
        FROM ownership_records
        WHERE application_id = ?
      `;

      ownershipDB.query(selectUpdatedQuery, [applicationId], (err3, updatedResults) => {
        if (err3) {
          console.error("Select Error:", err3);
          return res.status(500).json({ error: "Error fetching updated record!" });
        }

        return res.json({
          message: "Ownership transfer approved successfully!",
          application: updatedResults[0],
        });
      });
    });
  });
});


// ==================== Ownership Transfer Status Check API ====================
app.get("/userowner/status/:applicationId", (req, res) => {
  const { applicationId } = req.params;

  const query = `
    SELECT application_id, status, current_owner, new_owner, khatian, area
    FROM ownership_records
    WHERE application_id = ?
  `;
  
  ownershipDB.query(query, [applicationId], (err, results) => {
    if (err) {
      console.error("Status Check Error:", err);
      return res.status(500).json({ error: "Database error!" });
    }

    if (results.length === 0)
      return res.status(404).json({ error: "Application not found!" });

    return res.json({
      message: "Application status fetched successfully!",
      application: results[0],
    });
  });
});



// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

