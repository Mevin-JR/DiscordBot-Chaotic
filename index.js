require('dotenv').config();

const fs = require('fs');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping
    ],
    partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

// Collections
client.commands = new Collection();

// Load Commands from subfolders
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ('name' in command && 'execute' in command) {
            client.commands.set(command.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "name" or "execute" property.`);
        }
    }
}

// Load Events
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

// Log in to Discord
client.login(process.env.DISCORD_TOKEN);

// Global Error Handlers (prevents bot from crashing on unhandled errors)
process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
