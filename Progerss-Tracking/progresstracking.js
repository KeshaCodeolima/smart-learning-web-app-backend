const express = require('express');
const router = express.Router();
const Quizget = require('../DBConnection/quizsaveschema');

router.get('/getdetail', async (req, res) => {
    try {
        const { userId } = req.query;

        const lastweek = new Date();
        lastweek.setDate(lastweek.getDate() - 7);

        const quizdata = await Quizget.find({ userId: userId, saveAt: { $gte: lastweek } })
        const results = quizdata.map(q => ({
            topic: q.topic,
            score: ((q.score / q.totalQuestions) * 100),
            totalQuestions: q.totalQuestions
        }));
        const weaktopics = results.filter(r => r.score < 50);

        let totalPercentage = 0;
        quizdata.forEach(q => {
            const percentage = (q.score / q.totalQuestions) * 100;
            totalPercentage += percentage;
        });

        const averageprogress = quizdata.length > 0 ? totalPercentage / quizdata.length : 0;

        res.json({
            allResults: results,
            weakTopics: weaktopics,
            averageprogress: averageprogress
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

module.exports = router;