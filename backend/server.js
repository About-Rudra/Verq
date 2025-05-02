require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
// const bodyParser = require("body-parser"); // Remove this
// const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorMiddleware");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://verq-pi.vercel.app',
  'https://verq-pcae1zlxv-rudras-projects-cd8653fc.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || origin.includes('vercel.app')) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  exposedHeaders: ['set-cookie'] // Add this line
}));

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("🟢 Backend is live!");
});


// post call Routes
const authRoutes = require("./routes/authRoutes"); 
const personalDetailsRoutes = require("./routes/personal_detailsRoute");
const internshipRoute = require("./routes/internshipRoute");
const volunteerRoutes = require("./routes/volunteerRoute");
const skillsRoute = require("./routes/skillsRoute");
const projectsRoute = require("./routes/projectRoute"); 
const accomplishmentRoute = require("./routes/accomplishmentRoute"); 
const extraCurricularRoute = require("./routes/extra_CurricularRoute");
const competitionRoute = require("./routes/competitionRoute"); 



//post calls routes
app.use("/api/auth", authRoutes);
app.use("/api/personal-details-form", personalDetailsRoutes);
app.use("/api/internship-details-form", internshipRoute);
app.use("/api/volunteer-details-form", volunteerRoutes); 
app.use("/api/skills-form", skillsRoute); // Uncomment if you have a skills route
app.use("/api/projects-form", projectsRoute); 
app.use("/api/accomplishment-form", accomplishmentRoute);
app.use("/api/extra-curricular-form", extraCurricularRoute);
app.use("/api/competitions-form", competitionRoute);

// Add this with your other route imports
const personalDetailsGetRoutes = require('./routes/Dashboard/personalGetDetailsRoute');
const volunteerGetRoutes = require('./routes/Dashboard/volunteeringGetRoute');  

// Add this with your other route middlewares
app.use('/api/personal-details', personalDetailsGetRoutes);
app.use('/api/volunteer-details', volunteerGetRoutes);

// Serve static files from React build folder
app.use(express.static(path.join(__dirname, "dist")));

// Catch-all handler for non-API routes
app.get("*", (req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    return next(); // Let it fall through to 404 or errorHandler
  }
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.use("/api", (req, res, next) => {
  res.status(404).json({ message: "API route not found" });
});


// Error Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});