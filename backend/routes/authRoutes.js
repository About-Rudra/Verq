const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../config/db"); // Ensure you have a db.js file exporting the PostgreSQL pool
const router = express.Router();



// POST /api/auth
router.post("/", async (req, res) => {
  console.log("Request Body:", req.body || "nobody received");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Check if the user exists
    const userQuery = "SELECT * FROM authentication WHERE primary_email = $1";
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length > 0) {
      // User exists, handle login
      const user = userResult.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({ message: "Login successful", token });
    } else {
      // User does not exist, handle sign-up
      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery =
        "INSERT INTO authentication (primary_email, password) VALUES ($1, $2) RETURNING *";
      const newUserResult = await pool.query(insertQuery, [
        email,
        hashedPassword,
      ]);

      const newUser = newUserResult.rows[0];

      // Generate JWT token
      const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(201).json({ message: "Sign-up successful", token });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" }); 
  }
});

module.exports = router;  

