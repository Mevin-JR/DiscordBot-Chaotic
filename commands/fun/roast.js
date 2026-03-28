const roastManager = require('../../utils/roastManager');

module.exports = {
    name: 'roast',
    description: 'Delivers a brutal roast. Optionally mention a user.',
    async execute(message, args) {
        const roast = roastManager.getRandomRoast();
        const target = message.mentions.users.first();

        if (target) {
            // Lowercase the first letter slightly for grammatical flow, unless it is "I" or starts with "I'"
            let formattedRoast = roast;
            if (!roast.startsWith("I") && !roast.startsWith("I'd") && !roast.startsWith("I'm")) {
                formattedRoast = roast.charAt(0).toLowerCase() + roast.slice(1);
            }
            return message.reply(`${target.toString()}, ${formattedRoast}`);
        }

        return message.reply(roast);
    },
};
