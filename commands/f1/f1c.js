const { EmbedBuilder } = require('discord.js');
const { fetchData, getCircuitImageUrl } = require('../../utils/f1Helper');

module.exports = {
    name: 'f1c',
    description: 'Search for a circuit to see its info and previous winner.',
    async execute(message, args) {
        const searchTerm = args.join(' ').toLowerCase();
        if (!searchTerm) {
            return message.reply('Please provide a circuit name to search for (e.g. `.f1c bahrain`).');
        }

        const thinkingMsg = await message.reply('Searching for circuit... 🏎️');

        try {
            const circuitsData = await fetchData('circuits.json?limit=1000');
            if (!circuitsData) return thinkingMsg.edit('Failed to fetch circuit data.');

            const circuits = circuitsData.MRData.CircuitTable.Circuits;
            let foundCircuit = null;

            // Direct Search
            for (const c of circuits) {
                if (c.circuitId.toLowerCase() === searchTerm || c.Location.country.toLowerCase() === searchTerm || c.Location.locality.toLowerCase() === searchTerm) {
                    foundCircuit = c; break;
                }
            }
            if (!foundCircuit) {
                for (const c of circuits) {
                    if (c.circuitId.toLowerCase().includes(searchTerm) || c.circuitName.toLowerCase().includes(searchTerm) || c.Location.country.toLowerCase().includes(searchTerm) || c.Location.locality.toLowerCase().includes(searchTerm)) {
                        foundCircuit = c; break;
                    }
                }
            }

            if (!foundCircuit) {
                return thinkingMsg.edit(`Could not find a circuit matching '${searchTerm}'.`);
            }

            const circuitId = foundCircuit.circuitId;
            const racesData = await fetchData(`circuits/${circuitId}/races.json?limit=100`);
            
            let lastWinner = 'Unknown';
            let lastYear = 'Unknown';

            if (racesData && racesData.MRData.RaceTable.Races.length > 0) {
                const races = racesData.MRData.RaceTable.Races;
                const lastRace = races[races.length - 1]; // chronologically last is the most recent
                lastYear = lastRace.season;
                const roundNum = lastRace.round;

                const resultsData = await fetchData(`${lastYear}/${roundNum}/results.json`);
                if (resultsData && resultsData.MRData.RaceTable.Races.length > 0) {
                    const winner = resultsData.MRData.RaceTable.Races[0].Results[0].Driver;
                    lastWinner = `${winner.givenName} ${winner.familyName}`;
                }
            }

            const embed = new EmbedBuilder()
                .setTitle(`🏎️ ${foundCircuit.circuitName}`)
                .setURL(foundCircuit.url || null)
                .setColor('#FF1801')
                .setDescription(`**Location:** ${foundCircuit.Location.locality}, ${foundCircuit.Location.country}\n**Previous Winner (${lastYear}):** ${lastWinner}`)
                .setImage(getCircuitImageUrl(circuitId))
                .setFooter({ text: 'Note: The displayed circuit layout may vary from current FIA regulations' });

            await thinkingMsg.edit({ content: null, embeds: [embed] });
        } catch (error) {
            console.error('F1 Circuit Search Error:', error);
            await thinkingMsg.edit('Could not perform circuit search.');
        }
    }
};
