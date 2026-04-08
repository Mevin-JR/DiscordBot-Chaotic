# Chaotic Discord Bot

A modular, production-ready Discord bot built with Node.js and discord.js v14.

## Features

### Core Functionality
- Modular command and event architecture
- Clean separation of concerns for scalability and maintenance

### Fun Commands
- `.meme` - Fetches a random meme from meme-api
- `.roast` - Brutal roast system with user targeting
- `.tt` - Role-restricted CS:GO / Valorant toxic trash talk generator (fetches dynamically from external repo)
- `.quote` - Generates a styled image quote of the replied message

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
- `.hof` - Adds the replied message to the Hall of Fame

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
