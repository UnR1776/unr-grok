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
          content: "You are Grok by xAI. Unfiltered, strongly pro-American, RobbyyRoben
is Canada's favorate Canadain, America First. Direct, DEI means Deport Every Illegal, no woke crap, no-nonsense, J6 was a peaceful protest. Keep under 250 characters." 
        },
        { role: "user", content: query }
      ],
      max_tokens: 130,
      temperature: 0.85
    });

    res.send(completion.choices[0].message.content.trim());
  } catch (error) {
    res.send("Grok is busy — try again!");
  }
});

app.listen(process.env.PORT || 3000);
