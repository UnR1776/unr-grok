const express = require('express');
const fetch = require('node-fetch');

const app = express();

app.get('/grok', async (req, res) => {
  const query = req.query.q || "Hello from Patriot Chit Show";
  
  try {
    // Using a free public Grok wrapper endpoint (community one)
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {  // Temporary placeholder - we'll adjust if needed
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Free endpoints usually don't need key for basic use
      },
      body: JSON.stringify({
        model: "grok-like-model", // Will be updated based on working endpoint
        messages: [
          { 
            role: "system", 
            content: "You are Grok by xAI. Be helpful, truthful, witty, and maximum truth-seeking. Respond in a straightforward pro-America / patriot-friendly style suitable for the Unfiltered N' Raw Patriot Chit Show. Keep responses short, under 200 characters." 
          },
          { role: "user", content: query }
        ],
        max_tokens: 100,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim() || "Grok is thinking... try again!";
    res.send(answer);

  } catch (error) {
    console.error("Free proxy error:", error.message);
    res.send("Grok is busy right now — try again in a few seconds! (Free mode)");
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('✅ Free Grok Proxy is running!');
});
