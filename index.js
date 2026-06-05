const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  const query = req.query.q || "Hello from Patriot Chit Show!";
  
  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4.3",
      messages: [
        { 
          role: "system", 
          content: "You are Grok by xAI. Be helpful, truthful, witty, and maximum truth-seeking. Respond in a straightforward pro-America / patriot-friendly style suitable for the Unfiltered N' Raw / Patriot Chit Show. Keep responses short, under 250 characters." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 120,
      temperature: 0.75
    });

    res.send(completion.choices[0].message.content.trim());
  } catch (error) {
    console.error("Grok API Error:", error.message);
    if (error.message.includes("API key")) {
      res.send("API key error - check your xAI key and Render environment variable.");
    } else if (error.message.includes("billing") || error.message.includes("credit")) {
      res.send("No xAI credits - add funds in console.x.ai");
    } else {
      res.send("Grok API issue: " + error.message.substring(0, 100));
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Grok Proxy running!');
});
