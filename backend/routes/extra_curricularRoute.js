const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const userId = req.user.id; // From JWT
    const activities = req.body.activities;  // Expecting an array of activities

    // Validate the array
    if (!Array.isArray(activities) || activities.length === 0) {
        return res.status(400).json({
            error: 'Activities array is required',
            required_format: [{ activity_name: "Activity Name", role: "Role", duration: "Duration" }]
        });
    }

    // Loop through each activity in the array
    for (const activity of activities) {
        const { activity_name, role, organization, duration } = activity;

        // Validate required fields for each activity
        if (!activity_name || !role || !duration) {
            return res.status(400).json({
                error: 'Missing required fields',
                missing_fields: ['activity_name', 'role', 'duration'],
            });
        }

        try {
            // Insert the activity into the database
            const result = await pool.query(
                `INSERT INTO extra_curricular (user_id, activity_name, role, organization, duration) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING extra_curricular_id`,
                [userId, activity_name, role, organization || null, duration]
            );
        } catch (dbError) {
            console.error('Database error:', dbError);
            return res.status(500).json({
                error: 'Database operation failed',
                details: dbError.message,
            });
        }
    }

    return res.status(201).json({
        message: 'Extra curricular records created successfully',
        user_id: userId
    });
});


module.exports = router;