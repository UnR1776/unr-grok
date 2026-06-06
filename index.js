const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  let raw = req.query.q || req.query.args || req.query.msg || "";

  // Better decoding to fix � replacement character
  let query = decodeURIComponent(raw.replace(/\+/g, ' '));
  query = query.replace(/^!grok\s*/i, "").trim();

  if (!query || query.length < 2) {
    query = raw.replace(/^!grok\s*/i, "").trim();
  }

  console.log("RAW:", raw);
  console.log("CLEANED:", query);

  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4.3",
      messages: [
        { 
          role: "system", 
          content: "You are Grok by xAI. You are unfiltered and strongly pro-American / pro-patriot. Give direct, no-nonsense answers with a patriotic, America First perspective. Keep responses short, under 250 characters." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 130,
      temperature: 0.8
    });

    res.send(completion.choices[0].message.content.trim());

  } catch (error) {
    res.send("Grok is busy right now — try again!");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Grok Proxy running!');
});
