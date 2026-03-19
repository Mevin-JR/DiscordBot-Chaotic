module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        // Command prefix
        const prefix = '.';
        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);

        if (!command) return;

        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(error);
            message.reply({ content: 'There was an error while executing this command!' });
        }
    },
};
