const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

router.post('/quiz', async (req, res) => {
    try {
        const { text, language } = req.body;
        const response = await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "system",
                    content: "You are a quiz generator."
                },
                {
                    role: "user",
                    content: `Create a quiz from the following notes. Generate 10 multiple choice questions. Each question must have 4 options. Mark the correct answer.Generate the quiz in this language: ${language} Return ONLY JSON in this format:
                    [
                        {
                        "question": "",
                        "options": ["", "", "", ""],
                        "answer": ""
                        }
                    ]
                    Notes:
                    ${text}`
                }
            ],
            max_tokens: 900
        });

         let quiz = response.choices[0].message.content;
        quiz = quiz.replace(/```json|```/g, '').trim();

        res.json({ quiz });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;