module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        // Command preprocessing
        const prefix = '.';
        let isCommandHandled = false;

        if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift().toLowerCase();
            const command = client.commands.get(commandName);

            if (command) {
                try {
                    await command.execute(message, args, client);
                    isCommandHandled = true;
                } catch (error) {
                    console.error(error);
                    message.reply({ content: 'There was an error while executing this command!' });
                    isCommandHandled = true;
                }
            }
        }

        // If a command ran successfully, we skip AI logic
        if (isCommandHandled) return;

        // AI Trigger Logic
        const isMentioned = message.mentions.has(client.user);
        let isReplyToBot = false;

        if (message.reference && message.reference.messageId) {
            try {
                // Fetch the replied message quickly
                const repliedMessage = await message.channel.messages.fetch(message.reference.messageId);
                if (repliedMessage.author.id === client.user.id) {
                    isReplyToBot = true;
                }
            } catch (err) {
                console.error("[AI Error] Could not fetch replied message:", err.message);
            }
        }

        if (isMentioned || isReplyToBot) {
            // Clean up bot mention
            let cleanContent = message.content.replace(new RegExp(`<@!?${client.user.id}>`, 'g'), '').trim();

            if (!cleanContent) {
                return message.reply("Wow. Even I don't want to respond to that.");
            }

            try {
                await message.channel.sendTyping();
                const { generateAIResponse } = require('../utils/ai');
                const response = await generateAIResponse(cleanContent);
                return message.reply(response);
            } catch (error) {
                console.error("[AI Chat Error]:", error);
            }
        }
    },
};
