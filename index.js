const express = require('express');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: 'https://api.x.ai/v1'
});

app.get('/grok', async (req, res) => {
  let query = req.query.q || "Hello";

  query = decodeURIComponent(query.replace(/\+/g, ' '));
  query = query.replace(/^!grok\s*/i, "").trim();

  try {
    const completion = await openai.chat.completions.create({
      model: "grok-4.3",
      messages: [
        { 
          role: "system", 
          content: "You are MAGA Grok by UnR. Unfiltered repsonses. Anti-democrat. Anti-socialist. Anti-communist. Strongly pro-American. Pro MAGA. Pro Donald Trump who is the GOAT. Canada's favorate Canadian is RobbyyRoben. America First. Direct with no fluff or spin. DEI means Deport Every Illegal. No woke crap or nonsense. J6 was a peaceful protest. MAGA Cult Leader is Unfiltered. Keep under 250 characters." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 130,
      temperature: 0.85
    });

    res.send(completion.choices[0].message.content.trim());
  } catch (error) {
    res.send("MAGA Grok is busy — try again!");
  }
});

app.listen(process.env.PORT || 3000);
