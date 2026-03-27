const { EmbedBuilder } = require('discord.js');
const { fetchData, getCircuitImageUrl } = require('../../utils/f1Helper');

module.exports = {
    name: 'f1last',
    description: 'Fetches the results to the last completed F1 race.',
    async execute(message, args) {
        const thinkingMsg = await message.reply('Fetching last race results... 🏎️');
        
        try {
            const data = await fetchData('races.json');
            const races = data.MRData.RaceTable.Races;
            const now = new Date();
            let lastRace = null;
            
            for (const race of races) {
                const utcTimeStr = `${race.date}T${race.time || '00:00:00Z'}`;
                const raceStart = new Date(utcTimeStr);
                if (now >= raceStart) {
                    lastRace = race;
                } else {
                    break;
                }
            }
            
            if (!lastRace) {
                return thinkingMsg.edit('No races have started yet this season.');
            }
            
            const resultsData = await fetchData(`${lastRace.round}/results.json`);
            
            const embed = new EmbedBuilder()
                .setTitle(`🏎️ Last Race: ${lastRace.raceName}`)
                .setColor('#FF1801')
                .setDescription(`**Circuit:** ${lastRace.Circuit.circuitName}\n**Date:** ${lastRace.date}`)
                .setImage(getCircuitImageUrl(lastRace.Circuit.circuitId));
                
            if (resultsData && resultsData.MRData.RaceTable.Races.length > 0) {
                const results = resultsData.MRData.RaceTable.Races[0].Results.slice(0, 3);
                let resultText = "🏆 **Podium:**\n";
                const medals = ['🥇', '🥈', '🥉'];
                
                results.forEach((res, i) => {
                    resultText += `${medals[i]} ${res.Driver.givenName} ${res.Driver.familyName} (${res.Constructor.name})\n`;
                });
                embed.addFields({ name: 'Results', value: resultText });
            } else {
                embed.addFields({ name: 'Results', value: 'Results are not yet fully available/tabulated for this race.' });
            }
            
            await thinkingMsg.edit({ content: null, embeds: [embed] });
        } catch (error) {
            console.error('F1 Last Race Error:', error);
            await thinkingMsg.edit('Could not retrieve last race info.');
        }
    }
};
