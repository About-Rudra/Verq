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
        // Convert skills to PostgreSQL array format
        const skillsArray = Array.isArray(skills)
            ? skills
            : skills.replace(/[{}]/g, '').split(',').map(skill => skill.trim());

        // Insert the data into the database using the pool
        const query = `
            INSERT INTO competition_events (event_id, event_name, event_date, role, achievement, skills)
            VALUES ($1, $2, $3, $4, $5, $6)
        `;
        const values = [event_id, event_name, event_date, role, achievement, skillsArray];

        await pool.query(query, values);

        return res.status(201).json({
            message: 'Competitions saved successfully',
        });
    } catch (error) {
        console.error('Error saving competitions:', error);
        return res.status(500).json({ error: 'Failed to save competition' });
    }
});

module.exports = router;