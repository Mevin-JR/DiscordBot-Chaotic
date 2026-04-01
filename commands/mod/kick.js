const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a member from the server.',
    async execute(message, args) {
        const allowedRoleId = '1322261748895711353';
        if (!message.member.roles.cache.has(allowedRoleId)) {
            return message.reply('You do not have permission to use this command.');
        }

        const target = message.mentions.members.first();
        if (!target) return message.reply('Please mention a valid user to kick.');

        if (!target.kickable) {
            return message.reply('I cannot kick this user. They may have a higher role than me.');
        }

        const reason = args.slice(1).join(' ') || 'No reason provided';

        try {
            await target.kick(reason);
            message.reply(`Successfully kicked ${target.user.tag}. Reason: ${reason}`);
        } catch (error) {
            console.error(error);
            message.reply('There was an error trying to kick that user.');
        }
    },
};
