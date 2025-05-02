// personalDetailsRouter.js
const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { first_name, last_name, dob, gender, institute_roll_no, personal_email, phone_number } = req.body;
    const authEmail = req.user.email; // From JWT

    try {
        // 1. Find the user_id from authentication table
        const userQuery = await pool.query(
            'SELECT id FROM authentication WHERE primary_email = $1',
            [authEmail]
        );

        if (userQuery.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userId = userQuery.rows[0].id;

        // 2. Insert into personal_details with the obtained user_id
        const insertQuery = `
            INSERT INTO personal_details (
                user_id, first_name, last_name, dob, gender, 
                institute_roll_no, personal_email, phone_number
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING user_id
        `;
        const values = [
            userId,
            first_name, last_name, dob, gender,
            institute_roll_no, personal_email, phone_number
        ];

        const result = await pool.query(insertQuery, values);

        res.status(201).json({
            message: 'Personal information saved successfully',
            user_id: result.rows[0].user_id
        });

    } catch (error) {
        console.error('Error saving personal information:', error);
        
        if (error.code === '23505') { // Unique violation
            if (error.constraint.includes('institute_roll_no')) {
                return res.status(400).json({ error: 'Roll number already exists' });
            }
            if (error.constraint.includes('phone_number')) {
                return res.status(400).json({ error: 'Phone number already exists' });
            }
        }
        
        res.status(500).json({ 
            error: 'Database error',
            details: error.message
        });
    }
});

module.exports = router;