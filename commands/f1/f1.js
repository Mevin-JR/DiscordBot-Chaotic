const { EmbedBuilder } = require('discord.js');
const { getDriverStandings, getConstructorStandings, getNextRace } = require('../../utils/f1Helper');

module.exports = {
    name: 'f1',
    description: 'Shows F1 current season overview (Drivers, Constructors, Next Race).',
    async execute(message, args) {
        const thinkingMsg = await message.reply('Fetching F1 season overview... 🏎️');
        
        try {
            const [drivers, constructors, nextRace] = await Promise.all([
                getDriverStandings(),
                getConstructorStandings(),
                getNextRace()
            ]);

            const embed = new EmbedBuilder()
                .setTitle('🏎️ F1 Current Season Overview')
                .setColor('#FF1801'); // F1 Red

            let driverText = drivers.map(d => `**${d.position}.** ${d.Driver.givenName} ${d.Driver.familyName} - ${d.points} pts`).join('\n');
            embed.addFields({ name: 'Top 10 Drivers', value: driverText || 'N/A' });

            let constructorText = constructors.map(c => `**${c.position}.** ${c.Constructor.name} - ${c.points} pts`).join('\n');
            embed.addFields({ name: 'Top 10 Constructors', value: constructorText || 'N/A' });

            if (nextRace) {
                embed.addFields({ name: 'Next Race', value: `**${nextRace.name}**\n${nextRace.circuit}\n📅 ${nextRace.date}` });
            }

            await thinkingMsg.edit({ content: null, embeds: [embed] });
        } catch (error) {
            console.error('F1 Error:', error);
            await thinkingMsg.edit('Failed to fetch F1 data.');
        }
    }
};
