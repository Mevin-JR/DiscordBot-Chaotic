module.exports = {
    name: 'help',
    description: 'Lists all available commands.',
    async execute(message, args, client) {
        const commandsList = client.commands
            .map(cmd => `**\.${cmd.name}**: ${cmd.description}`)
            .join('\n');
        
        await message.reply({
            content: `**🤖 Available Commands:**\n\n${commandsList}`
        });
    },
};
