const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authenticateToken = require('../../middleware/authenticationToken'); // Import the middleware

// Load environment variables
require('dotenv').config(); 

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL; // Supabase URL from environment variables
const supabaseKey = process.env.SUPABASE_KEY; // Supabase Key from environment variables
const supabase = createClient(supabaseUrl, supabaseKey);
console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? 'Loaded' : 'Not Loaded');

// GET endpoint to fetch personal information
router.get('/', authenticateToken, async (req, res) => {
  try {

    const userEmail = req.user.email;
    console.log('User email from token:', userEmail); // Log the email for debugging

    // Fetch data from the database
    const { data, error } = await supabase
      .from('personal_details') // Replace with your table name
      .select('first_name, last_name, dob, gender, institute_roll_no, personal_email, phone_number')
      .eq('personal_email', userEmail); // Filter by the user's email

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'No personal information found for this user.' });
    }

    // Send the raw data as a response
    res.status(200).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
});

module.exports = router;