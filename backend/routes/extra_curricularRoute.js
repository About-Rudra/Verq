const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { extra_curricular_id, activity_name, role, organisation, duration } = req.body;
    console.log("Received data:", req.body); // Log the received data

    // Validate the received data
    if (!extra_curricular_id || !activity_name || !role || !organisation || !duration) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the data into the database using the pool
        const query = `
            INSERT INTO extra_curricular (extra_curricular_id, activity_name, role, organisation, duration)
            VALUES ($1, $2, $3, $4, $5)
        `;
        const values = [extra_curricular_id, activity_name, role, organisation, duration];
           
        await pool.query(query, values);

        return res.status(201).json({
            message: 'extra_curricular saved successfully',
        });
    } catch (error) {
        console.error('Error saving extra_curricular:', error);
        return res.status(500).json({ error: 'Failed to save extra_curricular' });
    }
}
);

module.exports = router;