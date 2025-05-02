const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const authenticateToken = require('../../middleware/authenticationToken');

// Config
require('dotenv').config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Constants
const TABLE_NAME = 'personal_details';
const SELECT_FIELDS = 'first_name, last_name, dob, gender, institute_roll_no, personal_email, phone_number';

/**
 * @route GET /personal
 * @desc Get personal details of authenticated user
 * @access Private
 * @returns {Object} Personal details data
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    // Validate email exists in token
    if (!req.user?.email) {
      return res.status(400).json({ error: 'User email not found in token' });
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select(SELECT_FIELDS)
      .eq('personal_email', req.user.email)
      .single(); // Returns a single object instead of array

    if (error) {
      console.error('[PersonalDetails] Supabase error:', error);
      return res.status(502).json({ error: 'Database error' });
    }

    if (!data) {
      return res.status(404).json({ message: 'Personal details not found' });
    }

    // Format date to ISO string (optional)
    if (data.dob) {
      data.dob = new Date(data.dob).toISOString().split('T')[0];
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('[PersonalDetails] Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;