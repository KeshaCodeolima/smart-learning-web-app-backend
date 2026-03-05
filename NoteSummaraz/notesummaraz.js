const express = require('express');
const router = express.Router(); 

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

router.post('/note', async (req, res) => {
    try {
        const { text } = req.body;
        const result = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: 'user', parts: [{ text: `Summarize these notes: ${text}` }] }]
        });
        res.json({ summary: result.text });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;