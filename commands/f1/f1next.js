const { EmbedBuilder } = require('discord.js');
const { getNextRace, getCircuitImageUrl } = require('../../utils/f1Helper');

module.exports = {
    name: 'f1next',
    description: 'Displays the next upcoming F1 race schedule.',
    async execute(message, args) {
        const nextRace = await getNextRace();
        if (!nextRace) {
            return message.reply('Could not retrieve next race info.');
        }

        const embed = new EmbedBuilder()
            .setTitle(`🏎️ ${nextRace.name}`)
            .setColor('#FF1801') // F1 Red
            .setDescription(`**Circuit:** ${nextRace.circuit}\n**Time:** 📅 ${nextRace.date}`)
            .setImage(getCircuitImageUrl(nextRace.circuit_id))
            .setFooter({ text: `Note: The displayed circuit layout may vary from current FIA Formula 1 regulations` });

        message.reply({ embeds: [embed] });
    }
};
