require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ─── OpenAI Chat Endpoint ────────────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { messages, model, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required" });
  }

  const selectedModel = model || "gpt-4o-mini";

  // Build the messages array with optional system prompt
  const apiMessages = [];
  if (systemPrompt && systemPrompt.trim()) {
    apiMessages.push({ role: "system", content: systemPrompt.trim() });
  }
  apiMessages.push(...messages);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 2048,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      return res.status(response.status).json({
        error: errorData.error?.message || "OpenAI API request failed",
      });
    }

    const data = await response.json();
    const assistantMessage = data.choices[0]?.message;

    res.json({
      message: assistantMessage,
      usage: data.usage,
      model: data.model,
    });
  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
});

// ─── Available Models Endpoint ───────────────────────────────────────────────
app.get("/api/models", (req, res) => {
  const models = [
    {
      id: "gpt-4o-mini",
      name: "GPT-4o Mini",
      provider: "OpenAI",
      description: "Fast, affordable, and capable",
      icon: "⚡",
    },
    {
      id: "gpt-4o",
      name: "GPT-4o",
      provider: "OpenAI",
      description: "Most capable multimodal model",
      icon: "🧠",
    },
    {
      id: "gpt-3.5-turbo",
      name: "GPT-3.5 Turbo",
      provider: "OpenAI",
      description: "Fast and cost-effective",
      icon: "🚀",
    },
  ];
  res.json(models);
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✦ ChatGPT Clone running at http://localhost:${PORT}`);
  console.log(`  ✦ Using model: gpt-4o-mini (default)\n`);
});
