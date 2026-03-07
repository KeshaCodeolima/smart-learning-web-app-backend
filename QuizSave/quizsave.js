const express = require('express');
const router = express.Router();
const Quiz = require('../DBConnection/quizsaveschema');

router.post('/save', async (req, res) => {
    try {
        const { userId, topic, score, totalQuestions } = req.body;

        const quiz = await Quiz.findOneAndUpdate(
            { userId: userId, topic: topic },
            { score, totalQuestions},
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        res.json({ message: "Quiz saved successfully!", quiz});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;