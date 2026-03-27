const { EmbedBuilder } = require('discord.js');
const { fetchData, getCircuitImageUrl } = require('../../utils/f1Helper');

module.exports = {
    name: 'f1res',
    description: 'Displays full race results for a specific round (.f1res <round_number>).',
    async execute(message, args) {
        const round = args[0];
        if (!round || isNaN(round)) {
            return message.reply('Please provide a valid round number! Example: `.f1res 1` for the first race of the season.');
        }
        
        const thinkingMsg = await message.reply(`Fetching results for Round ${round}... 🏎️`);

        try {
            const data = await fetchData(`${round}/results.json`);
            if (!data || !data.MRData.RaceTable.Races.length) {
                return thinkingMsg.edit(`Could not find results for round ${round}. Note: The race might not have occurred yet.`);
            }

            const race = data.MRData.RaceTable.Races[0];
            const results = race.Results.slice(0, 10); // Show top 10

            const embed = new EmbedBuilder()
                .setTitle(`🏎️ Round ${round} Results: ${race.raceName}`)
                .setColor('#FF1801')
                .setDescription(`**Circuit:** ${race.Circuit.circuitName}\n**Date:** ${race.date}`)
                .setImage(getCircuitImageUrl(race.Circuit.circuitId));

            let resText = "";
            const medals = ['🥇', '🥈', '🥉'];
            results.forEach((r, i) => {
                const pos = i < 3 ? medals[i] : `**${r.position}.**`;
                resText += `${pos} ${r.Driver.givenName} ${r.Driver.familyName} (${r.Constructor.name}) - ${r.Time ? r.Time.time : r.status}\n`;
            });

            embed.addFields({ name: 'Top 10 Finishers', value: resText });
            await thinkingMsg.edit({ content: null, embeds: [embed] });

        } catch (error) {
            console.error('F1 Results Error:', error);
            await thinkingMsg.edit(`Failed to fetch results for round ${round}.`);
        }
    }
};
