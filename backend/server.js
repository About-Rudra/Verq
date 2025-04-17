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
app.use(cookieParser()); // Use cookie-parser to parse cookies

// Routes

const authRoutes = require("./routes/authRoutes"); 
const volunteerRoutes = require("./routes/volunteerRoute");
const personalInformationRoutes = require("./routes/personalInformationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/volunteer-details", volunteerRoutes);
app.use("/api/personal-information", personalInformationRoutes);

// Error Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});