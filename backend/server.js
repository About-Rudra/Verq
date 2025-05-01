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

const allowedOrigins = [
  'http://localhost:5173', // For local dev (if you're working locally)
  'https://verq-pcae1zlxv-rudras-projects-cd8653fc.vercel.app', // Your frontend on Vercel
];


// Middleware
app.use(cors({
  
    origin: allowedOrigins,
    credentials: true, // if you're sending cookies or auth headers
}));
app.use(express.json()); // Use only express.json() 
app.use(cookieParser()); // Use cookie-parser to parse cookies

// Routes

const authRoutes = require("./routes/AuthRoutes"); 
const volunteerRoutes = require("./routes/VolunteerRoutes");
const accomplishmentRoutes = require("./routes/PersonalDetailsRoutes");
const competitionRoutes = require("./routes/CompetitionRoutes"); 
const educationRoutes = require("./routes/VolunteerRoutes");
const extraCurricularRoutes = require("./routes/PersonalDetailsRoutes");
const internshipRoutes = require("./routes/InternshipRoutes"); 
const projectRoutes = require("./routes/VolunteerRoutes");
const personalDetailsRoutes = require("./routes/PersonalDetailsRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/volunteer-details", volunteerRoutes);
app.use("/api/personal-details", personalDetailsRoutes);
app.use("/api/accomplishments", accomplishmentRoutes);
app.use("/api/competitions", competitionRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/extra-curricular", extraCurricularRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/projects", projectRoutes);


// Error Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});