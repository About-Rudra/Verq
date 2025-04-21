const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { education_id , user_id, program } = req.body;
    console.log("Received data:", req.body); // Log the received data

    // Validate the received data
    if (!education_id || !user_id || !program) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the data into the database using the pool
        const query = `
            INSERT INTO education (education_id , user_id, program)
            VALUES ($1, $2, $3)
        `;
        const values = [education_id , user_id, program];

        await pool.query(query, values);

        return res.status(201).json({
            message: ' education information saved successfully',
        });
    } catch (error) {
        console.error('Error saving education information:', error);
        return res.status(500).json({ error: 'Failed to save education information' });
    }
}
);

module.exports = router;