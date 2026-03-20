# Chaotic Discord Bot

A modular Discord bot built with Node.js and discord.js v14.

## Features
- **Modular Commands**: Clean separation of commands and events.
- **Fun, Moderation, and Chaos Features**: Includes commands like `.roast`, `.drag`, `.ban`.
- **AI Chat Integration**: Powered natively by Ollama (`phi`), ping the bot or reply to its messages to experience a witty, confident, and sarcastic personality!

## Prerequisites
- Node.js (v16.9.0 or higher)
- Discord Bot Token
- Local Ollama instance running the `phi` model.

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Adarsh-Aravind/DiscordBot-Chaotic.git
   cd DiscordBot-Chaotic
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(A `requirements.txt` file is included for reference, but since this is a Node.js project, use npm!)*

3. **Configure Environment:**
   Create a `.env` file in the root of your project using the following format:
   ```env
   DISCORD_TOKEN=your_token_here
   ```

4. **Start the Bot:**
   ```bash
   npm start
   ```
