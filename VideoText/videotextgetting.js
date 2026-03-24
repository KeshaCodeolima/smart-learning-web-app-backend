const express = require('express');
const router = express.Router();
const Transcript = require('../DBConnection/videotextschema');
const { Language } = require('@google/genai');

router.post('/text', async (req, res) => {
    try {
        const { userId } = req.body;
        const transcriptDoc = await Transcript.findOne({ userId })
        res.json({
            text: transcriptDoc.transcript,
            language: transcriptDoc.language
        })
    } catch (error) {
        console.error("Error fetching transcript:", error);
        res.status(500).json({ error: "Server error" });
    }
})

module.exports = router;

