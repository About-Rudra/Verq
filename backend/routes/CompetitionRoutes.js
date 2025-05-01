const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { event_id, event_name, event_date, role, achievement, skills } = req.body;
    console.log("Received data:", req.body); // Log the received data

    // Validate the received data
    if (!event_id || !event_name || !event_date || !role || !achievement || !skills) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the data into the database using the pool
        const query = `
            INSERT INTO competetion_event (event_id, event_name, event_date, role, achievement, skills)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [event_id, event_name, event_date, role, achievement, skills];
            
        await pool.query(query, values);

        return res.status(201).json({
            message: 'competetions  saved successfully',
        });
    } catch (error) {
        console.error('Error saving competetions', error);
        return res.status(500).json({ error: 'Failed to save competetion' });
    }
}
);

module.exports = router;