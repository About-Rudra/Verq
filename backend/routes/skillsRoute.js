const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticationToken');
const pool = require('../config/db');

router.post('/', authenticateToken, async (req, res) => {
    const userId = req.user.id;
    
    // Handle both formats: direct array or wrapped in skills property
    let skills = Array.isArray(req.body) ? req.body : req.body.skills;

    if (!Array.isArray(skills)) {
        return res.status(400).json({
            error: 'Invalid request format',
            accepted_formats: [
                "[{skill_name: string, skill_proficiency: string}]",
                "{skills: [{skill_name: string, skill_proficiency: string}]"
            ]
        });
    }
    

    if (skills.length === 0) {
        return res.status(400).json({
            error: 'Empty skills array',
            required_format: [{ skill_name: "JavaScript", skill_proficiency: "Intermediate" }]
        });
    }

    try {
        // Check if personal details exist
        const personalExists = await pool.query(
            'SELECT 1 FROM personal_details WHERE user_id = $1',
            [userId]
        );

        if (personalExists.rows.length === 0) {
            return res.status(403).json({
                error: 'Complete profile setup first',
                solution: 'Submit personal details at /api/personal-details-form'
            });
        }

        // Process each skill
        const results = [];
        for (const skill of skills) {
            const { skill_name, skill_proficiency } = skill;

            if (!skill_name) {
                return res.status(400).json({
                    error: 'Missing skill_name in one or more skills',
                    required: ['skill_name'],
                    optional: ['skill_proficiency']
                });
            }

            // Case-insensitive proficiency check
            const validProficiencies = ['beginner', 'intermediate', 'advanced', 'expert'];
            if (skill_proficiency && !validProficiencies.includes(skill_proficiency.toLowerCase())) {
                return res.status(400).json({
                    error: 'Invalid skill proficiency',
                    allowed_values: validProficiencies
                });
            }

            const result = await pool.query(
                `INSERT INTO skills (user_id, skill_name, skill_proficiency)
                 VALUES ($1, $2, $3)
                 RETURNING skill_id`,
                [userId, skill_name, skill_proficiency || null]
            );
            results.push(result.rows[0]);
        }

        return res.status(201).json({
            message: 'Skill(s) recorded successfully',
            user_id: userId,
            skills: results
        });

    } catch (error) {
        console.error('Database error:', error);

        if (error.code === '23505') {
            return res.status(409).json({
                error: 'Duplicate skill entry',
                details: 'A skill already exists with this name for your account'
            });
        }

        return res.status(500).json({
            error: 'Database operation failed',
            details: error.message
        });
    }
});

module.exports = router;