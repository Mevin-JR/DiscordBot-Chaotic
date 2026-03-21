
const fetch = require('node-fetch');

let isProcessing = false;

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        const isMentioned = message.mentions.has(client.user);

        let isReplyToBot = false;
        if (message.reference) {
            try {
                const referenced = await message.fetchReference();
                if (referenced.author.id === client.user.id) {
                    isReplyToBot = true;
                }
            } catch {}
        }

        if (!isMentioned && !isReplyToBot) return;

        // 🚫 Prevent request stacking
        if (isProcessing) {
            return message.reply("wait… thinking 💭");
        }

        isProcessing = true;

        try {
            const cleanContent = message.content
                .replace(`<@${client.user.id}>`, '')
                .replace(`<@!${client.user.id}>`, '')
                .trim();

            if (!cleanContent) {
                isProcessing = false;
                return;
            }

            console.log("PROMPT:", cleanContent);

            const start = Date.now();

            const res = await fetch("http://192.168.0.126:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "phi",
                    prompt: `You are a flirty Discord girl. Reply in ONE short sentence.\nUser: ${cleanContent}\nRiri:`,
                    stream: false,
                    keep_alive: "5m",
                    options: {
                        num_predict: 12,
                        temperature: 0.7
                    }
                })
            });

            console.log("⏱ Response time:", Date.now() - start, "ms");

            if (!res.ok) {
                isProcessing = false;
                return message.reply("API dead 💀");
            }

            const data = await res.json();

            if (!data.response) {
                isProcessing = false;
                return message.reply("…huh 😒");
            }

            let reply = data.response.trim();

            // clean output
            reply = reply.replace(/\n/g, " ").trim();

            if (!/[.!?]$/.test(reply)) {
                reply += ".";
            }

            if (reply.length > 150) {
                reply = reply.slice(0, 150);
            }

            await message.reply(reply);

        } catch (err) {
            console.error("ERROR:", err);
            message.reply("brain lag 💀");
        } finally {
            isProcessing = false;
        }
    }
};