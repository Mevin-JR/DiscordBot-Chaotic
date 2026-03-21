# Chaotic Discord Bot

A modular, production-ready Discord bot built with Node.js and discord.js v14, now enhanced with a distributed AI system powered by Ollama.

## Features

### Core Functionality
- Modular command and event architecture
- Clean separation of concerns for scalability and maintenance

### AI Integration (New)
- Conversational AI powered by a dedicated Ollama server
- Context-aware replies (short-term memory per user)
- Controlled personality system (Riri persona)
- Triggered only on:
  - Bot mentions
  - Replies to bot messages
- Optimized for low-resource environments (CPU inference)

### Fun Commands
- `.meme` - Fetches a random meme from meme-api
- `.roast` - Developer-style roast system with user targeting

### Moderation Tools
- `.ban`, `.kick`, `.mute` (timeouts), `.role`

### Chaos Features
- `.drag` - Moves muted/deafened users across voice channels periodically
- `.stopdrag` - Stops dragging and restores original state

### General
- `.help` - Displays all available commands dynamically

---

## Architecture Overview

This project follows a distributed system design:

```

[ Main PC ]     → Development
[ Bot PC ]      → Discord bot runtime (PM2)
[ AI Server ]   → Ollama inference node

```

### Key Components

- `index.js`  
  Entry point responsible for loading commands and events dynamically

- `commands/`  
  Organized command modules (`general`, `fun`, `mod`, `chaos`)

- `events/`  
  Event handlers including:
  - `messageCreate.js` (commands)
  - `aiChat.js` (AI interaction layer)
  - `ready.js`, `voiceStateUpdate.js`

- `utils/`  
  Shared logic such as:
  - `stateManager.js`
  - `roastManager.js`

---

## AI System (Ollama Integration)

The bot connects to a remote Ollama instance:

```

http://<AI_SERVER_IP>:11434

````

### Model
- `llama3.2:3b` (CPU inference)

### Behavior
- Short, natural responses (1–2 sentences)
- Context-aware conversation (last 5–6 messages)
- Personality-driven responses
- Avoids unnecessary or random replies

### Performance Notes
- First request may be slow due to model loading (cold start)
- Subsequent responses are significantly faster (warm state)
- Recommended to enable keep-alive to reduce reload times

---

## Setup Instructions

### 1. Install Dependencies

Ensure Node.js v18+ is installed:

```bash
npm install
````

---

### 2. Environment Configuration

Create a `.env` file:

```env
DISCORD_TOKEN=your_bot_token_here
ALLOWED_ROLE_ID=your_role_id_here
```

---

### 3. Start the Bot

```bash
npm start
```

---

## Deployment (PM2)

Recommended for production:

```bash
pm2 start index.js --name riri-ai
pm2 save
pm2 startup
```

### Logs

```bash
pm2 logs riri-ai
```

---

## Ollama Server Setup

On the AI server machine:

```bash
setx OLLAMA_HOST 0.0.0.0
setx OLLAMA_KEEP_ALIVE 30m
setx OLLAMA_NUM_PARALLEL 1
ollama serve
```

### Optional (keep model warm)

Periodic request to prevent cold starts:

```javascript
setInterval(() => {
  fetch("http://<AI_SERVER_IP>:11434/api/generate", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      model: "llama3.2:3b",
      prompt: "ping",
      num_predict: 1,
      stream: false
    })
  });
}, 300000);
```

---

## Required Bot Permissions

### Privileged Gateway Intents

* Server Members Intent
* Message Content Intent

### OAuth2 Permissions

* Send Messages
* Read Message History
* Ban Members
* Kick Members
* Moderate Members
* Manage Roles
* Move Members
* Connect

---

## Performance Considerations

* Designed to run on low-end hardware (4GB RAM + CPU)
* Uses virtual memory when required
* Cold starts are expected; warm state is significantly faster
* Single-model optimization recommended for stability

---

## Future Improvements

* Streaming responses for improved UX
* Persistent long-term memory
* Enhanced personality tuning
* Monitoring and auto-recovery systems

---

## Repository

GitHub: 

```

---

# 🧠 What I improved

- Added **AI system section (important)**
- Explained **your 3-machine architecture**
- Included **Ollama setup (critical for others)**
- Cleaned tone → **professional, no fluff**
- Kept your original structure intact

---