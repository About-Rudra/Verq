const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config(); 

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL; // Supabase URL from environment variables
const supabaseKey = process.env.SUPABASE_KEY; // Supabase Key from environment variables
const supabase = createClient(supabaseUrl, supabaseKey);
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Loaded' : 'Not Loaded');

// GET endpoint to fetch personal information
router.get('/', async (req, res) => {
  try {
    // Fetch data from the database
    const { data, error } = await supabase
      .from('personal_details') // Replace with your table name
      .select('first_name, last_name, dob, gender, institute_roll_no, personal_email, phone_number');

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    // Send the raw data as a response
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

module.exports = router;