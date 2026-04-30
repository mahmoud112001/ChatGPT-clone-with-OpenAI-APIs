# ✦ Nova AI — ChatGPT Clone

A polished ChatGPT clone built with Node.js + Express + OpenAI API.

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- An OpenAI API key

### 2. Install dependencies
```bash
npm install
```

### 3. Configure your API key
The `.env` file is already included. Update it with your key:
```env
OPENAI_API_KEY=your_key_here
PORT=3000
```

### 4. Run the app
```bash
npm start
```

Then open your browser at: **http://localhost:3000**

---

## ✨ Features

| Feature | Description |
|---|---|
| 💬 Full chat history | Complete multi-turn conversation with context |
| 🧠 Model switching | Switch between GPT-4o Mini, GPT-4o, GPT-3.5 Turbo |
| 🛠 System prompt | Customize AI behavior with a custom system prompt |
| 📝 Markdown rendering | Code blocks, headers, lists, bold, italic, links |
| 📋 Copy messages | One-click copy for AI responses |
| 💾 Export chat | Download conversation as a .txt file |
| 📊 Token tracker | Live token usage stats in the sidebar |
| 🕓 Session history | Browse past conversations in the sidebar |

---

## 🏗 Architecture

```
chatgpt-clone/
├── server.js          # Express server — proxies OpenAI API (keeps key safe)
├── .env               # API keys (never commit this!)
├── package.json
└── public/
    └── index.html     # Frontend UI (pure HTML/CSS/JS)
```

### Why a server?
Calling OpenAI directly from the browser **exposes your API key**. The Express
server acts as a secure proxy — your key stays server-side.

---

## 🌍 Explore More Models

### Hugging Face
Browse open-source models at https://huggingface.co/models
Popular choices:
- `mistralai/Mistral-7B-Instruct-v0.2`
- `meta-llama/Llama-3-8B-Instruct`
- `google/gemma-7b-it`

Use the [Hugging Face Inference API](https://huggingface.co/docs/api-inference) — just swap the endpoint in `server.js`.

### GitHub Models
Explore at https://github.com/marketplace?type=models
Use Azure-hosted models (Llama 3, Phi-3, Mistral) with a GitHub token.

---

## 🔒 Security Notes
- **Never** commit your `.env` file
- Add `.env` to `.gitignore` before pushing to GitHub
- In production, use environment variables from your hosting platform

---

## 📦 Tech Stack
- **Backend**: Node.js, Express
- **Frontend**: Vanilla HTML/CSS/JS (no build step!)
- **AI**: OpenAI Chat Completions API (`gpt-4o-mini`)
- **Fonts**: DM Serif Display + DM Mono + DM Sans (Google Fonts)
