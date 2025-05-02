const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');
router.post('/', authenticateToken, async (req, res) => {
    const { activity_name, role, organization, duration } = req.body;
    console.log("Received data:", req.body);

    // Validate the received data (optional since DB allows nulls)
    if (!activity_name || !role || !organization || !duration) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const query = `
            INSERT INTO extra_curricular 
            (activity_name, role, organization, duration)
            VALUES ($1, $2, $3, $4)
            RETURNING extra_curricular_id
        `;
        const values = [activity_name, role, organization, duration];
           
        const result = await pool.query(query, values);

        return res.status(201).json({
            message: 'Extra curricular activity saved successfully',
            extra_curricular_id: result.rows[0].extra_curricular_id
        });
    } catch (error) {
        console.error('Error saving extra curricular:', error);
        return res.status(500).json({ 
            error: 'Failed to save extra curricular',
            details: error.message 
        });
    }
});

module.exports = router;