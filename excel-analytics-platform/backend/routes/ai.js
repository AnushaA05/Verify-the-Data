// backend/routes/ai.js
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/ask', async (req, res) => {
  const { question, data } = req.body;

  const prompt = `
You are an Excel AI assistant. Analyze the following data and answer this question:
Data: ${JSON.stringify(data.slice(0, 20))}
Question: ${question}
`;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    });

    const response = completion.data.choices[0].message.content;
    res.json({ response });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'AI failed' });
  }
});

module.exports = router;
