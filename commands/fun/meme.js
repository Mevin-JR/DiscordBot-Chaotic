module.exports = {
    name: 'meme',
    description: 'Fetches a random meme from the internet.',
    async execute(message, args) {
        try {
            // Using native Node Fetch API (requires Node 18+)
            const response = await fetch('https://meme-api.com/gimme');
            if (!response.ok) {
                throw new Error(`API responded with status: ${response.status}`);
            }
            const data = await response.json();

            // The meme-api returns a JSON object with a url field
            await message.reply(data.url);
        } catch (error) {
            console.error('Meme API error:', error);
            message.reply('Oops! Could not fetch a meme right now. Try again later.');
        }
    },
};
