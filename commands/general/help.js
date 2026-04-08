const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all available commands.',
    async execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setColor('#2B2D31')
            .setTitle('🤖 Chaotic Bot Commands')
            .setDescription('Here is a list of all available commands:')
            .setFooter({ text: 'Requested by ' + message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

        client.commands.forEach(cmd => {
            embed.addFields({ name: `.${cmd.name}`, value: cmd.description, inline: false });
        });

        await message.reply({ embeds: [embed] });
    },
};
