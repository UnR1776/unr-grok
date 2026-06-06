const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  let raw = req.query.q || "";

  // Aggressive cleaning for !grok
  let query = decodeURIComponent(raw.replace(/\+/g, ' '));
  query = query.replace(/^!grok\s*/i, "").trim();

  console.log("RAW:", raw);
  console.log("FINAL QUERY:", query);

  if (!query || query.length < 3) {
    res.send("Grok here. Ask a real question, patriot.");
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4.3",
      messages: [
        { 
          role: "system", 
          content: "You are Grok by xAI. Unfiltered, strongly pro-American, America First. Direct, no-nonsense answers. Keep under 250 characters." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 130,
      temperature: 0.85
    });

    res.send(completion.choices[0].message.content.trim());

  } catch (error) {
    res.send("Grok is busy right now — try again!");
  }
});

app.listen(process.env.PORT || 3000);
