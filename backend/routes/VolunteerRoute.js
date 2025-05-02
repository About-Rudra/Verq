const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { user_id, location, company_sector, task, start_date, end_date } = req.body;

    // Validate required fields
    if (!user_id || !location || !company_sector || !task || !start_date || !end_date) {
        return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate date range
    if (new Date(start_date) >= new Date(end_date)) {
        return res.status(400).json({ error: 'End date must be after start date' });
    }

    try {
        // Verify user exists
        const userCheck = await pool.query(
            'SELECT 1 FROM personal_details WHERE user_id = $1', 
            [user_id]
        );
        if (userCheck.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Insert with returning clause
        const query = `
            INSERT INTO volunteering (
                user_id, location, company_sector, 
                task, start_date, end_date
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING volunteering_id
        `;
        const values = [
            user_id, location, company_sector, 
            task, start_date, end_date
        ];

        const result = await pool.query(query, values);

        return res.status(201).json({
            message: 'Volunteering record saved successfully',
            volunteering_id: result.rows[0].volunteering_id
        });
    } catch (error) {
        console.error('Error saving volunteering details:', error);
        
        // Handle foreign key violation
        if (error.code === '23503') {
            return res.status(400).json({ error: 'Invalid user_id' });
        }
        
        return res.status(500).json({ 
            error: 'Failed to save volunteering details',
            details: error.message 
        });
    }
});

module.exports = router;