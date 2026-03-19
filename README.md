# Kaatakada Discord Bot

A clean, modular, production-ready Discord bot built with Node.js and discord.js v14.

## Features
- **Fun:** `#meme` generator (fetches from meme-api), structured `#roast` system with high-quality tech/developer-focused roasts.
- **Moderation:** `#ban`, `#kick`, `#mute` (timeouts), `#role`.
- **Chaos:** `#drag` command (rapidly moves a self-muted or self-deafened user randomly across voice channels every 2.5 seconds until they undeafen/unmute).

## Setup Instructions

1. **Install Dependencies:**
   Ensure you have Node.js v18+ installed. Run the following command in the terminal to install packages:
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   - Copy the `.env.example` file and rename it to `.env`.
   - Open `.env` and paste your actual Discord Application Bot Token:
     ```
     DISCORD_TOKEN=your_bot_token_here
     ```

3. **Start the Bot:**
   ```bash
   npm start
   ```

## Required Bot Permissions
When inviting the bot to your server, ensure you grant the following permissions:

**Discord Developer Portal Intents (Privileged Gateway Intents):**
You must enable these from the Developer Portal -> Bot page:
- **Server Members Intent** (Needed for caching roles and members)
- **Message Content Intent** (Needed for reading `#commands`)

**OAuth2 Permissions for the Bot Role:**
- Send Messages
- Read Message History
- Ban Members
- Kick Members
- Moderate Members (for timeouts/mutes)
- Manage Roles
- Move Members (Critical for the `#drag` command)
- Connect / View Channels (To see and move users between voice channels)

## Architecture Overview
- `index.js`: Main entry point. Dynamically loads external commands and events.
- `commands/`: Folder containing modular commands categorized by logic (`fun`, `mod`, `chaos`).
- `events/`: Event handlers decoupled from the main file (`ready`, `messageCreate`, `voiceStateUpdate`).
- `utils/`: Reusable logic like `stateManager.js` (Memory map tracking active dragged users) and `roastManager.js` (Roast dictionary).
