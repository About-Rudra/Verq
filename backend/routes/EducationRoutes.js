const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const { user_id, program, branch, course_start_date, course_end_date, batch, 
            uni_roll_no, current_semester, school_10, board_10, cgpa_10, 
            start_date_10, end_date_10, school_12, board_12, cgpa_12, 
            start_date_12, end_date_12, gap_year_start, gap_year_end } = req.body;
    
    // Validate required NOT NULL fields
    if (!user_id || !program || !branch || !course_start_date || !course_end_date || 
        !batch || !uni_roll_no || !school_10 || !board_10 || !start_date_10 || !end_date_10) {
        return res.status(400).json({ error: 'Required fields are missing' });
    }

    try {
        const query = `
            INSERT INTO education (
                user_id, program, branch, course_start_date, course_end_date, 
                batch, uni_roll_no, current_semester, school_10, board_10, 
                cgpa_10, start_date_10, end_date_10, school_12, board_12, 
                cgpa_12, start_date_12, end_date_12, gap_year_start, gap_year_end
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
            RETURNING education_id`;
        
        const values = [
            user_id, program, branch, course_start_date, course_end_date, 
            batch, uni_roll_no, current_semester, school_10, board_10, 
            cgpa_10, start_date_10, end_date_10, school_12, board_12, 
            cgpa_12, start_date_12, end_date_12, gap_year_start, gap_year_end
        ];

        const result = await pool.query(query, values);

        return res.status(201).json({
            message: 'Education information saved successfully',
            education_id: result.rows[0].education_id
        });
    } catch (error) {
        console.error('Error saving education information:', error);
        return res.status(500).json({ error: 'Failed to save education information' });
    }
});

module.exports = router;