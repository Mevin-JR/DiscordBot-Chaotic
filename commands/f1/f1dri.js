const { EmbedBuilder } = require('discord.js');
const { getDriverStandings } = require('../../utils/f1Helper');

module.exports = {
    name: 'f1dri',
    description: 'Displays the current Top 10 F1 Drivers.',
    async execute(message, args) {
        const standings = await getDriverStandings();
        
        const embed = new EmbedBuilder()
            .setTitle('🏎️ F1 Driver Standings Top 10')
            .setColor('#FF1801'); // F1 Red
            
        let desc = '';
        standings.forEach(s => {
            desc += `**${s.position}.** ${s.Driver.givenName} ${s.Driver.familyName} - ${s.points} pts\n`;
        });
        
        embed.setDescription(desc || 'No driver standings available yet.');
        message.reply({ embeds: [embed] });
    }
};
