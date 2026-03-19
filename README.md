# Chaotic Discord Bot

A modular, production-ready Discord bot built with Node.js and discord.js v14.

## Features

- **Fun Commands:**
  - `.meme` - Fetches a random meme from the meme-api.
  - `.roast` - A structured system delivering high-quality, developer-focused roasts. Mentioning a user targets them directly.
- **Moderation Tools:**
  - `.ban`, `.kick`, `.mute` (timeouts), and `.role` management.
- **Chaos Feature:** 
  - `.drag` - Rapidly moves a self-muted or self-deafened user across randomly selected voice channels every 2.5 seconds until they unmute or undeafen. Requires the designated allowed role.
- **General Menu:**
  - `.help` - Displays a dynamic list of all available commands.

## Setup Instructions

1. **Install Dependencies:**
   Ensure Node.js v18 or newer is installed.
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   - Copy `.env.example` to `.env`.
   - Update `.env` with your Discord Application Bot Token and the required Role ID for restricted commands:
     ```env
     DISCORD_TOKEN=your_bot_token_here
     ALLOWED_ROLE_ID=your_role_id_here
     ```

3. **Start the Application:**
   ```bash
   npm start
   ```

## Required Bot Permissions

When inviting the bot to your server, ensure the following permissions and intents are granted via the Discord Developer Portal:

**Privileged Gateway Intents:**
- **Server Members Intent:** Required for caching roles and referencing users.
- **Message Content Intent:** Required for reading command prefixes.

**OAuth2 Role Permissions:**
- Send Messages
- Read Message History
- Ban Members
- Kick Members
- Moderate Members (for timeouts and mutes)
- Manage Roles
- Move Members (critical for the `.drag` command)
- Connect (required to view and move users across voice channels)

## Architecture Overview

- `index.js`: The main application entry point responsible for dynamically loading commands and events.
- `commands/`: Contains all modular command files categorized by logical function (`general`, `fun`, `mod`, `chaos`).
- `events/`: Houses event handler modules (`ready`, `messageCreate`, `voiceStateUpdate`).
- `utils/`: Contains reusable utilities, including memory state tracking (`stateManager.js`) and predefined roast strings (`roastManager.js`).
