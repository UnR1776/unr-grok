const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  const query = req.query.q || "Hello";
  
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
      temperature: 0.8
    });

    res.send(completion.choices[0].message.content.trim());

  } catch (error) {
    console.error("Grok API Error:", error.message);
    if (error.message.includes("credit") || error.message.includes("billing")) {
      res.send("No xAI credits - add funds in console.x.ai");
    } else if (error.message.includes("API key")) {
      res.send("API key issue - check Render environment variable");
    } else {
      res.send("Grok is busy right now — try again in a few seconds!");
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Unfiltered N\' Raw Grok Proxy running!');
});
