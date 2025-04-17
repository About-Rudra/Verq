const { Pool } = require('pg');
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.SUPABASE_DB_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;


// const { Pool } = require("pg");


// // PostgreSQL connection pool
// const pool = new Pool({
//   user: process.env.G_USER,
//   host: process.env.PG_HOST,
//   database: process.env.PG_DATABASE,
//   password: process.env.PG_PASSWORD,
//   port: process.env.PG_PORT,
// });

// const dotenv = require("dotenv");
// const result = dotenv.config();

// // if (result.error) {
// //   console.error("Error loading .env file:", result.error);
// // } else {
// //   console.log("Environment variables loaded:", result.parsed);
// // }

// // console.log("DB_user:", process.env.G_USER);
// // console.log("DB_PASSWORD:", process.env.PG_PASSWORD);

// pool.connect()
//   .then(() => console.log("Connected to PostgreSQL"))
//   .catch(err => console.error("Database connection error", err));

// module.exports = pool;



