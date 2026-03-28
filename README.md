# Chaotic Discord Bot

A modular, production-ready Discord bot built with Node.js and discord.js v14.

## Features

### Core Functionality
- Modular command and event architecture
- Clean separation of concerns for scalability and maintenance

### Fun Commands
- `.meme` - Fetches a random meme from meme-api
- `.roast` - Developer-style roast system with user targeting
- `.tt` - Role-restricted CS:GO / Valorant toxic trash talk generator (fetches dynamically from external repo)

### Moderation Tools
- `.ban`, `.kick`, `.mute` (timeouts), `.role`

### F1 Commands (Ergast API Integration)
- `.f1` - Current season Drivers/Constructors and Next Race summary.
- `.f1next` - Detailed next race and circuit info.
- `.f1last` - Last completed race results and podium.
- `.f1dri` / `.f1con` - Top 10 Drivers and Constructors standings.
- `.f1cal` - Full season calendar.
- `.f1c <circuit>` - Search for a specific circuit & view the previous winner.
- `.f1res <round>` - Results for a specific race round this season.

### Chaos Features
- `.drag` - Moves muted/deafened users across voice channels periodically
- `.stopdrag` - Stops dragging and restores original state

### General
- `.help` - Displays all available commands dynamically

---

## Setup Instructions

### 1. Install Dependencies

Ensure Node.js v18+ is installed:

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file:

```env
DISCORD_TOKEN=your_bot_token_here
ALLOWED_ROLE_ID=your_role_id_here
```

### 3. Start the Bot

```bash
npm start
```

---

## Deployment (PM2)

Recommended for production:

```bash
pm2 start index.js --name bot
pm2 save
pm2 startup
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

## Optional Recommendation: Adding Ollama AI

If you'd like to make your bot more interactive, you can add an AI chat feature via a local Ollama server. Here is how it was previously implemented:

### 1. Add `node-fetch`
```bash
npm install node-fetch
```

### 2. Add an `aiChat.js` Event Listener
Create a file at `events/aiChat.js` to listen for bot mentions and send a request to your Ollama server:

```javascript
const fetch = require('node-fetch');

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        const isMentioned = message.mentions.has(client.user);
        if (!isMentioned) return;

        try {
            const cleanContent = message.content.replace(`<@${client.user.id}>`, '').trim();
            const res = await fetch("http://<YOUR_OLLAMA_IP>:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3.2:3b",
                    prompt: `You are a flirty Discord girl. Reply in ONE short sentence.\nUser: ${cleanContent}\nRiri:`,
                    stream: false
                })
            });

            const data = await res.json();
            if (data.response) {
                await message.reply(data.response.trim());
            }
        } catch (err) {
            console.error("AI Error:", err);
        }
    }
};
```

### 3. Setup Ollama Server
On your AI server machine run:
```bash
setx OLLAMA_HOST 0.0.0.0
setx OLLAMA_KEEP_ALIVE 30m
setx OLLAMA_NUM_PARALLEL 1
ollama serve
```
Make sure you have downloaded the target model (`ollama run llama3.2:3b`).