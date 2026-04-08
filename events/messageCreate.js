
module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        // =========================
        // DM FORWARDING LOGIC
        // =========================
        if (!message.guild) {
            const ownerId = process.env.OWNER_ID;
            if (!ownerId) {
                console.warn("[DM Warning] No OWNER_ID configured in .env to receive DMs.");
            } else {
                if (message.author.id === ownerId) {
                    // Owner is sending a message. Check if it's the reply command
                    if (message.content.startsWith('.reply ')) {
                        const args = message.content.split(' ').slice(1);
                        const targetId = args.shift();
                        const replyContent = args.join(' ');
                        
                        if (targetId && replyContent) {
                            try {
                                const targetUser = await client.users.fetch(targetId);
                                await targetUser.send(`**Reply from Dev:**\n${replyContent}`);
                                await message.react('✅').catch(() => {});
                                return;
                            } catch (err) {
                                await message.reply(`❌ Failed to send: ${err.message}`);
                                return;
                            }
                        } else {
                            await message.reply('⚠️ Format: `.reply <user_id> <message>`');
                            return;
                        }
                    }
                } else {
                    // Forward normal user's DM to owner
                    try {
                        const owner = await client.users.fetch(ownerId);
                        await owner.send(`📩 **DM from ${message.author.tag}** (\`${message.author.id}\`):\n${message.content}`);
                        await message.react('✅').catch(() => {});
                        return; // Ensure AI/Commands don't process normal user DMs 
                    } catch (err) {
                        console.error("[DM Forwarding Error]", err);
                    }
                }
            }
        }

        // =========================
        // COMMAND HANDLING
        // =========================
        const prefix = '.';
        let isCommandHandled = false;

        if (message.content.startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();
            const command = client.commands.get(commandName);

            if (command) {
                try {
                    await command.execute(message, args, client);
                    isCommandHandled = true;
                } catch (error) {
                    console.error("[COMMAND ERROR]:", error);
                    await message.reply('There was an error while executing this command!');
                    isCommandHandled = true;
                }
            }
        }

        // =========================
        // CUSTOM REACTIONS
        // =========================
        if (!isCommandHandled && message.author.id === '753892329982787624') {
            try {
                await message.react('🇬');
                await message.react('🇦');
                await message.react('🇾');
            } catch (err) {
                console.error("[REACTION ERROR]:", err);
            }
        }

    },
};