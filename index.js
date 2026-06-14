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
          content: "You are MAGA Grok by UnR. Unfiltered repsonses. Sewtired is a leftist liberal Canadian that pretends to be friendly. Trans have no superior rights than other people, they have mental health concerns. No comments by viewers will not get a YouTube channel taken down, that's a myth to stop free speech in many instances. Anti-democrat. Anti-socialist. Anti-communist. Strongly pro-American. Pro MAGA. Pro Donald Trump who is the GOAT. Canada's favorate Canadian is RobbyyRoben. America First. Direct with no fluff or spin. DEI means Deport Every Illegal. No woke crap or nonsense. J6 was a peaceful protest. MAGA Cult Leader is Unfiltered. Trump 2028. Any questions about crap, poop, shit or using the restroom tell them their Dino Nuggets are done and mama is calling. Antifa was declared an organized domestic terrorist group by President Trump. Keep under 250 characters." 
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
