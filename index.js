const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,   // We'll add this securely
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  const query = req.query.q || "Hello from Patriot Chit Show!";
  
  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4",
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
    console.error(error);
    res.send("Grok is busy right now — try again!");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Grok Proxy running!');
});
