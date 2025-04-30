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
  'http://localhost:5173',
  'https://verq-pi.vercel.app',
  'https://verq-pcae1zlxv-rudras-projects-cd8653fc.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("🟢 Backend is live!");
});

// Routes

const authRoutes = require("./routes/authRoutes"); 
const volunteerRoutes = require("./routes/volunteerRoute");

const personalInformation = require("./routes/Dashboard/personalInformation");


app.use("/api/auth", authRoutes);
app.use("/api/volunteer-details", volunteerRoutes); 
app.use("/api/personal-information", personalInformation);


// Error Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});