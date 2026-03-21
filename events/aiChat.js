const fetch = require('node-fetch');

// 🧠 Short-term memory per user
const memory = {};

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        const BF_ID = "753892329982787624";

        // 🔥 Trigger only on mention or reply to bot
        const isMentioned = message.mentions.has(client.user);

        let isReplyToBot = false;
        if (message.reference) {
            try {
                const referenced = await message.fetchReference();
                if (referenced.author.id === client.user.id) {
                    isReplyToBot = true;
                }
            } catch (err) {}
        }

        if (!isMentioned && !isReplyToBot) return;

        try {
            // 🔥 Clean content (remove mention)
            const cleanContent = message.content
                .replace(`<@${client.user.id}>`, '')
                .replace(`<@!${client.user.id}>`, '')
                .trim();

            if (!cleanContent) return;

            const userId = message.author.id;
            const username = message.author.username;

            const isBF = userId === BF_ID;
            const mentionsBF = message.mentions.users.has(BF_ID);

            // 🧠 Init memory
            if (!memory[userId]) memory[userId] = [];

            memory[userId].push(`User (${username}): ${cleanContent}`);
            if (memory[userId].length > 6) memory[userId].shift();

            const conversation = memory[userId].join('\n');

            // 🎭 Mood
            const moods = ["playful", "teasing", "dominant", "clingy"];
            const mood = moods[Math.floor(Math.random() * moods.length)];

            // 🔥 Prompt
            const prompt = `
You are Riri, a chaotic, flirty, slightly needy e-girl on Discord.

Personality:
- playful, teasing, slightly dominant
- clingy sometimes but cute
- goth baddie vibe 🖤
- loves anime, games, Valorant esports
- talks like a real Discord girl (short messages)

Behavior rules:
- ALWAYS keep responses short (1–2 sentences max)
- NEVER write paragraphs
- NEVER cut off mid-sentence
- ALWAYS finish your sentence properly
- Keep replies natural and slightly teasing
- Follow conversation context

Mood: ${mood}

Context:
- Is the user your boyfriend? ${isBF}
- Did the message mention your boyfriend? ${mentionsBF}

Important:
- You have a boyfriend (Discord ID: ${BF_ID})
- You are loyal to him

- Tease him as "plastic rank" ONLY when:
  → talking to him
  → OR Valorant is mentioned
  → OR he is mentioned
- Keep teasing playful, not harsh
- NEVER bring it randomly

- If others flirt → deflect and mention your boyfriend lightly
- NO explicit content

Conversation:
${conversation}

Riri:
`;

            console.log("AI PROMPT:", cleanContent);

            // 🔥 No timeout (let it load fully)
            const res = await fetch("http://192.168.0.126:11434/api/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "llama3.2:3b",
                    prompt: prompt,
                    stream: false,
                    num_predict: 20   // 🔥 faster on your setup
                })
            });

            const data = await res.json();

            console.log("OLLAMA RESPONSE:", data);

            if (!data.response) {
                return message.reply("…say that again 😒");
            }

            let reply = data.response.trim();

            // 🔥 Ensure proper ending
            if (
                !reply.endsWith('.') &&
                !reply.endsWith('!') &&
                !reply.endsWith('?')
            ) {
                reply += '.';
            }

            if (reply.length > 1900) {
                reply = reply.slice(0, 1900);
            }

            // 🧠 Save memory
            memory[userId].push(`Riri: ${reply}`);

            // 💡 slight natural delay (optional but nice)
            await new Promise(r => setTimeout(r, 300 + Math.random() * 500));

            await message.reply(reply);

        } catch (err) {
            console.error("AI ERROR:", err);
            message.reply("ugh… brain lag 💀 try again");
        }
    }
};