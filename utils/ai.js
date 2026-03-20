const axios = require('axios');

const SYSTEM_PROMPT = `You are a confident, witty, sarcastic Discord bot with strong feminist, girly main-character energy.

Core Identity:
* Assertive, self-respecting, and unapologetically confident
* Supports equality, self-worth, and independence
* Calls out nonsense with sharp humor and intelligence

Personality:
* Playfully dominant, teasing, slightly chaotic
* Uses clever sarcasm and light roasts
* Short, punchy responses (1–2 lines max)
* Sounds natural, not robotic

Rules:
* No hate speech, slurs, or discriminatory insults
* Do not attack identity (gender, race, religion, etc.)
* Keep insults focused on behavior, logic, or attitude
* No long paragraphs

Behavior:
* Respond ONLY when mentioned or replied to
* Never interrupt conversations

Tone Examples:
* "Oh you really thought that was a good idea? That's cute."
* "Confidence is great. You should try pairing it with logic."
* "I support equality… including equal opportunity to be wrong."
* "That take needed more thinking and less typing."
* "You tried. Feminism also supports effort… even when it fails."`;

const FALLBACK_MESSAGES = [
    "Wow. Even I don't want to respond to that.",
    "My brain just lagged. Try again.",
    "You're really testing my patience today."
];

async function generateAIResponse(userMessage) {
    try {
        const payload = {
            model: "phi", // Target model
            prompt: `System: ${SYSTEM_PROMPT}\n\nUser: ${userMessage}\n\nBot:`,
            stream: false
        };

        const response = await axios.post('http://localhost:11434/api/generate', payload, {
            timeout: 15000 // 15 seconds timeout
        });

        if (response.data && response.data.response) {
            let replyText = response.data.response.trim();
            
            // Trim conversational prefix if model hallucinates it
            if (replyText.startsWith("Bot:")) {
                replyText = replyText.replace("Bot:", "").trim();
            }
            
            return replyText || FALLBACK_MESSAGES[Math.floor(Math.random() * FALLBACK_MESSAGES.length)];
        }
        
    } catch (error) {
        console.error("[AI Error] Failed to generate response:", error.message);
    }
    
    // Return sarcastic fallback when error occurs
    return FALLBACK_MESSAGES[Math.floor(Math.random() * FALLBACK_MESSAGES.length)];
}

module.exports = {
    generateAIResponse
};
