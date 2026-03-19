const stateManager = require('../../utils/stateManager');
const roastManager = require('../../utils/roastManager');

module.exports = {
    name: 'stopdrag',
    description: 'Manually stops dragging a user and returns them to their original channel.',
    async execute(message, args) {
        const allowedRoleId = process.env.ALLOWED_ROLE_ID;
        if (!message.member.roles.cache.has(allowedRoleId)) {
            const roast = roastManager.getRandomRoast();
            return message.reply(`You are not authorized to stop the chaos. ${roast}`);
        }

        const target = message.mentions.members.first();
        if (!target) return message.reply('Please mention a valid user to stop dragging.');

        if (!stateManager.has(target.id)) {
            return message.reply('This user is not currently being dragged.');
        }

        const dragData = stateManager.get(target.id);
        
        // Stop the interval
        clearInterval(dragData.intervalId);

        try {
            // Attempt to move them back if they are still in a voice channel
            if (target.voice.channelId) {
                await target.voice.setChannel(dragData.originalChannelId);
            }
            message.reply(`Successfully stopped dragging ${target.user.tag} and returned them to their original channel.`);
        } catch (error) {
            console.error(`Failed to move user ${target.id} back to original channel:`, error);
            message.reply(`Stopped dragging ${target.user.tag}, but could not move them back to their original channel.`);
        } finally {
            stateManager.remove(target.id);
        }
    },
};
