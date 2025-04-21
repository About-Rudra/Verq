const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { project_id, user_id, project_title, description, tech_stack, project_link,  role } = req.body;
    console.log("Received data:", req.body); // Log the received data

    // Validate the received data
    if (!project_id || !user_id || !project_title || !description || !tech_stack || !project_link || !role) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Insert the data into the database using the pool
        const query = `
            INSERT INTO projects (project_id, user_id, project_title, description, tech_stack, project_link, role)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const values = [project_id, user_id, project_title, description, tech_stack, project_link, role];

        await pool.query(query, values);

        return res.status(201).json({
            message: 'Projects saved successfully',
        });
    } catch (error) {
        console.error('Error saving Projects:', error);
        return res.status(500).json({ error: 'Failed to save Projects' });
    }
}
);

module.exports = router;