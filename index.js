const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  let raw = req.query.q || req.query.args || req.query.msg || req.query.command || "";
  
  // Aggressive cleaning
  let query = raw.replace(/^!grok\s*/i, "").trim();
  
  if (!query || query === "") {
    query = raw; // fallback
  }

  console.log("RAW:", raw);
  console.log("CLEANED QUERY:", query);

  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4.3",
      messages: [
        { 
          role: "system", 
          content: "You are Grok by xAI. Unfiltered, pro-American, America First. Direct answers. Keep short." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 120,
      temperature: 0.8
    });

    res.send(completion.choices[0].message.content.trim());

  } catch (error) {
    res.send("Grok is busy — try again!");
  }
});

app.listen(process.env.PORT || 3000);
