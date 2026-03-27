const { EmbedBuilder } = require('discord.js');
const { getConstructorStandings } = require('../../utils/f1Helper');

module.exports = {
    name: 'f1con',
    description: 'Displays the current Top 10 F1 Constructors.',
    async execute(message, args) {
        const standings = await getConstructorStandings();
        
        const embed = new EmbedBuilder()
            .setTitle('🏎️ F1 Constructor Standings Top 10')
            .setColor('#FF1801'); // F1 Red
            
        let desc = '';
        standings.forEach(s => {
            desc += `**${s.position}.** ${s.Constructor.name} - ${s.points} pts\n`;
        });
        
        embed.setDescription(desc || 'No constructor standings available yet.');
        message.reply({ embeds: [embed] });
    }
};
