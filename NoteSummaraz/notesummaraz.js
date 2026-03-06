const express = require('express');
const router = express.Router(); 
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.post('/note', async (req, res) => {
  try {

    const { text, language } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: "You are an assistant that summarizes lecture notes in the language they are given. Respond in the same language as the text."
        },
        {
          role: "user",
          content: `Summarize the following notes in bullet points in ${language}:\n\n${text}`
        }
      ],
      max_tokens: 200
    });

    const summary = response.choices[0].message.content;

    // const bulletPoints = summary
    //   .split("\n")
    //   .map(point => point.replace(/^[-•]\s*/, "").trim())
    //   .filter(point => point.length > 0);


    res.json({ summary});

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;