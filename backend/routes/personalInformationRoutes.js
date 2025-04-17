const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { first_name, last_name, dob, gender, institute_roll_no, personal_email,  phone_number } = req.body;
    console.log("Received data:", req.body); // Log the received data

    // Validate the received data
    if (!first_name || !last_name || !dob || !gender || !institute_roll_no || !personal_email || !phone_number ) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the data into the database using the pool
        const query = `
            INSERT INTO personal_details (first_name, last_name, dob, gender, institute_roll_no, personal_email,  phone_number)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [first_name, last_name, dob, gender, institute_roll_no, personal_email,  phone_number];

        await pool.query(query, values);

        return res.status(201).json({
            message: 'Personal information saved successfully',
        });
    } catch (error) {
        console.error('Error saving personal information:', error);
        return res.status(500).json({ error: 'Failed to save personal information' });
    }
}
);

module.exports = router;