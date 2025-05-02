const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { accomplishment_id, title, institution, type, description, accomplishment_date,  rank } = req.body;
    console.log("Received data:", req.body); // Log the received data

    // Validate the received data
    if (!accomplishment_id || !title || !institution || !type || !description || !accomplishment_date || !rank) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the data into the database using the pool
        const query = `
            INSERT INTO accomplishments (accomplishment_id, title, institution, type, description, accomplishment_date, rank)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [ accomplishment_id, title, institution, type, description, accomplishment_date, rank];

        await pool.query(query, values);

        return res.status(201).json({
            message: 'accomplishments saved successfully',
        });
    } catch (error) {
        console.error('Error saving accomplishments:', error);
        return res.status(500).json({ error: 'Failed to save accomplishments' });
    }
}
);

module.exports = router;