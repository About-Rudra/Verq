require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const bodyParser = require("body-parser"); // Remove this
// const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Use only express.json() 

// Routes

const authRoutes = require("./routes/authRoutes"); 

app.use("/api/auth", authRoutes);

// Error Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});