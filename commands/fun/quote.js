const { AttachmentBuilder } = require('discord.js');
const { createCanvas, loadImage } = require('@napi-rs/canvas');

// Helper to handle text wrapping on canvas
function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = context.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, currentY);
            line = words[n] + ' ';
            currentY += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, currentY);
    return currentY + lineHeight;
}

module.exports = {
    name: 'quote',
    description: 'Quotes the replied message in an image.',
    async execute(message, args) {
        if (!message.reference) {
            return message.reply("Please reply to a message you want to quote.");
        }

        try {
            // Fetch the replied message
            const repliedMsg = await message.channel.messages.fetch(message.reference.messageId);

            // Fetch avatar (1024x1024 for high quality)
            const avatarUrl = repliedMsg.author.displayAvatarURL({ extension: 'png', size: 1024 });
            const avatar = await loadImage(avatarUrl);

            // Canvas dimensions
            const canvasWidth = 1200;
            const canvasHeight = 600;
            const canvas = createCanvas(canvasWidth, canvasHeight);
            const ctx = canvas.getContext('2d');

            // 1. Draw solid black background
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);

            // 2. Draw Avatar on the left side
            // The avatar is guaranteed to be a square from Discord, so we draw it at 600x600 mapping to left half
            ctx.drawImage(avatar, 0, 0, 600, 600);

            // 3. Create linear gradient mask to blend avatar into the right side
            // Starts fading from x=100 to increase the blend spread
            const gradient = ctx.createLinearGradient(150, 0, 600, 0);
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.5)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 600, 600);

            // Ensure right side is completely black just in case
            ctx.fillStyle = '#000000';
            ctx.fillRect(600, 0, 600, 600);

            // 4. Extract message text or handle empty text
            let quoteText = repliedMsg.cleanContent;
            if (!quoteText) {
                if (repliedMsg.embeds.length > 0) quoteText = "[Embed Message]";
                else if (repliedMsg.attachments.size > 0) quoteText = "[Attachment/Image]";
                else quoteText = "[Empty Message]";
            }

            // Determine dynamic font size
            let fontSize = 55;
            if (quoteText.length > 50) fontSize = 45;
            if (quoteText.length > 100) fontSize = 35;
            if (quoteText.length > 150) fontSize = 28;
            if (quoteText.length > 250) {
                quoteText = quoteText.substring(0, 247) + '...';
                fontSize = 28;
            }

            // Setup context for measuring
            ctx.font = `italic ${fontSize}px sans-serif`;
            ctx.fillStyle = '#FFFFFF';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            const maxWidth = 500;
            const lineHeight = fontSize * 1.4;

            // Measure height to center the text block vertically
            const words = quoteText.split(' ');
            let lineCounter = 1;
            let lineEst = '';
            for (let n = 0; n < words.length; n++) {
                const testLine = lineEst + words[n] + ' ';
                const testWidth = ctx.measureText(testLine).width;
                if (testWidth > maxWidth && n > 0) {
                    lineCounter++;
                    lineEst = words[n] + ' ';
                } else {
                    lineEst = testLine;
                }
            }

            const textTotalHeight = lineCounter * lineHeight;
            
            // Adjust startY so the text + author block aligns in the center of the right half
            const totalContentHeight = textTotalHeight + 80;
            let startY = (canvasHeight - totalContentHeight) / 2 + (fontSize / 2);

            // 5. Draw main quote text
            let endY = wrapText(ctx, quoteText, 900, startY, maxWidth, lineHeight);

            // 6. Draw the author name
            ctx.font = 'italic 35px sans-serif';
            ctx.fillStyle = '#FFFFFF';
            const nameStr = `- ${repliedMsg.member ? repliedMsg.member.displayName : repliedMsg.author.username}`;
            ctx.fillText(nameStr, 900, endY + 40);

            // 7. Draw the username tag with lighter opacity
            ctx.font = 'normal 25px sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillText(`@${repliedMsg.author.username}`, 900, endY + 80);

            // 8. Send the final image
            const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'quote.png' });
            await message.reply({ files: [attachment] });

        } catch (error) {
            console.error('Quote command error:', error);
            message.reply('Oops! Something went wrong while generating the quote.');
        }
    },
};
