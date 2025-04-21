const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db'); // Import the database connection pool


router.post('/', authenticateToken, async (req, res) => {
    const { location, company_sector, task, start_date, end_date } = req.body;

    // Validate the received data
    if (!location || !company_sector || !task || !start_date || !end_date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the data into the database using the pool
        const query = `
            INSERT INTO volunteering (location, company_sector, task, start_date, end_date)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [location, company_sector, task, start_date, end_date];

        await pool.query(query, values);


        return res.status(201).json({
            message: 'Volunteer details saved successfully',
        });
    } catch (error) {
        console.error('Error saving volunteer details:', error);
        return res.status(500).json({ error: 'Failed to save volunteer details' });
    }
});

module.exports = router;
