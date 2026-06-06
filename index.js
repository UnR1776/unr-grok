const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  // Improved query extraction
  let query = req.query.q || req.query.command || req.query.text || "";
  
  // If nothing in query params, try to parse from full URL
  if (!query && req.url.includes('?')) {
    const urlParams = new URLSearchParams(req.url.split('?')[1]);
    query = urlParams.get('q') || urlParams.get('command') || urlParams.get('text') || "Hello";
  }

  query = decodeURIComponent(query.replace(/\+/g, ' '));

  console.log("Received query from chat:", query);

  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4.3",
      messages: [
        { 
          role: "system", 
          content: "You are Grok by xAI. You are unfiltered and strongly pro-American / pro-patriot. Give direct, no-nonsense answers with a patriotic, America First perspective suitable for the Unfiltered N' Raw show. Do not be politically correct. Call out leftist nonsense, globalism, or anti-American garbage when relevant. Keep responses short, under 250 characters." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 130,
      temperature: 0.85
    });

    res.send(completion.choices[0].message.content.trim());

  } catch (error) {
    console.error("Grok API Error:", error.message);
    res.send("Grok is busy right now — try again!");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Unfiltered N\' Raw Grok Proxy running!');
});
