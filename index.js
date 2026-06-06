const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  let query = req.query.q || "test query";

  console.log("Raw query received:", query);

  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4.3",
      messages: [
        { 
          role: "system", 
          content: "You are Grok by xAI. Unfiltered, pro-American, America First. Direct and no-nonsense. Keep responses short." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 120,
      temperature: 0.85
    });

    res.send(completion.choices[0].message.content.trim());

  } catch (error) {
    res.send("Error: " + error.message.substring(0, 80));
  }
});

app.listen(process.env.PORT || 3000);
