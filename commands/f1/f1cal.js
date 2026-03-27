const { EmbedBuilder } = require('discord.js');
const { fetchData, formatRaceInfo } = require('../../utils/f1Helper');

module.exports = {
    name: 'f1cal',
    description: 'Displays the complete F1 calendar for the current season.',
    async execute(message, args) {
        const thinkingMsg = await message.reply('Fetching season calendar... 🏎️');
        
        try {
            const data = await fetchData('races.json');
            if (!data) return thinkingMsg.edit('Failed to fetch calendar data.');

            const races = data.MRData.RaceTable.Races;
            
            const embed = new EmbedBuilder()
                .setTitle(`🏎️ F1 ${data.MRData.RaceTable.season} Season Calendar`)
                .setColor('#FF1801');
                
            let desc = "";
            let currentChunk = 0;
            const embeds = [embed];
            
            races.forEach((race, i) => {
                const info = formatRaceInfo(race);
                const str = `**R${info.round}.** ${info.name}\n🏁 ${info.circuit}\n📅 ${info.date}\n\n`;
                
                // Keep embeds under limits
                if (desc.length + str.length > 2048) {
                    embeds[currentChunk].setDescription(desc);
                    const newEmbed = new EmbedBuilder().setColor('#FF1801');
                    embeds.push(newEmbed);
                    currentChunk++;
                    desc = str;
                } else {
                    desc += str;
                }
            });
            
            if (desc.length > 0) {
                embeds[currentChunk].setDescription(desc);
            }
            
            await thinkingMsg.edit({ content: null, embeds: embeds });
        } catch (error) {
            console.error('F1 Calendar Error:', error);
            await thinkingMsg.edit('Could not retrieve season calendar.');
        }
    }
};
