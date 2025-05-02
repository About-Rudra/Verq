const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { user_id, company_name, job_title, location, company_sector, 
            start_date, end_date, stipend_salary } = req.body;
    
    console.log("Received data:", req.body);

    // Validate required NOT NULL fields
    if (!user_id || !company_name || !job_title || !location || 
        !company_sector || !start_date || !end_date) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    // Validate date format and logic
    if (new Date(start_date) >= new Date(end_date)) {
        return res.status(400).json({ error: 'End date must be after start date' });
    }

    try {
        // Verify user exists (optional but recommended)
        const userCheck = await pool.query(
            'SELECT 1 FROM personal_details WHERE user_id = $1', 
            [user_id]
        );
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const query = `
            INSERT INTO internships (
                user_id, company_name, job_title, location, 
                company_sector, start_date, end_date, stipend_salary
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING internship_id
        `;
        
        const values = [
            user_id, company_name, job_title, location, 
            company_sector, start_date, end_date, stipend_salary
        ];

        const result = await pool.query(query, values);

        return res.status(201).json({
            message: 'Internship saved successfully',
            internship_id: result.rows[0].internship_id
        });
    } catch (error) {
        console.error('Error saving internship:', error);
        return res.status(500).json({ 
            error: 'Failed to save internship',
            details: error.message 
        });
    }
});

module.exports = router;