const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { skill_name, skill_proficiency } = req.body;
    console.log("Received data:", req.body); // Log the received data

    // Validate the received data
    if (!skill_name || !skill_proficiency) {
        return res.status(400).json({ error: 'Both skill_name and skill_proficiency are required' });
    }

    // Validate skill_proficiency value
    const validProficiencies = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
    if (!validProficiencies.includes(skill_proficiency)) {
        return res.status(400).json({ error: 'Invalid skill_proficiency value' });
    }

    try {
        // Insert the data into the database
        const query = `
            INSERT INTO skills (skill_name, skill_proficiency)
            VALUES ($1, $2)
            RETURNING skill_id
        `;
        const values = [skill_name, skill_proficiency];

        const result = await pool.query(query, values);

        return res.status(201).json({
            message: 'Skill saved successfully',
            skill_id: result.rows[0].skill_id
        });
    } catch (error) {
        console.error('Error saving skill:', error);
        return res.status(500).json({ 
            error: 'Failed to save skill',
            details: error.message 
        });
    }
});

module.exports = router;