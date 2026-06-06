const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  // Super robust query extraction for Streamlabs
  let query = req.query.q || req.query.command || req.query.text || "";

  if (!query && req.url.includes("?")) {
    try {
      const params = new URLSearchParams(req.url.split("?")[1]);
      query = params.get("q") || params.get("command") || params.get("text") || "";
    } catch (e) {}
  }

  // Final fallback
  if (!query || query === "") query = "Hello";

  query = decodeURIComponent(query.replace(/\+/g, " "));

  console.log("Query received:", query);

  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4.3",
      messages: [
        { 
          role: "system", 
          content: "You are Grok by xAI. You are unfiltered and strongly pro-American / pro-patriot. Give direct, no-nonsense answers with a patriotic, America First perspective suitable for the Unfiltered N' Raw show. Do not be politically correct. Call out leftist nonsense when relevant. Keep responses short, under 250 characters." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 130,
      temperature: 0.85
    });

    res.send(completion.choices[0].message.content.trim());

  } catch (error) {
    console.error("Error:", error.message);
    res.send("Grok is busy right now — try again!");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Grok Proxy running!');
});
