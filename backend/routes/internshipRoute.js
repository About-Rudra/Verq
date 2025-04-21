const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { internship_id,  user_id, company_name } = req.body;
    console.log("Received data:", req.body); // Log the received data

    // Validate the received data
    if (!internship_id || !user_id || !company_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the data into the database using the pool
        const query = `
            INSERT INTO internships (internship_id, user_id, company_name)
            VALUES ($1, $2, $3)
        `;
        const values = [internship_id, user_id, company_name];
        
        await pool.query(query, values);

        return res.status(201).json({
            message: 'Internships saved successfully',
        });
    } catch (error) {
        console.error('Error saving Internships :', error);
        return res.status(500).json({ error: 'Failed to save Internships' });
    }
}
);

module.exports = router;