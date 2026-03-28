const roasts = [
    "You're not useless... you could at least be used as a bad example.",
    "I'd agree with you, but then we'd both be wrong.",
    "Your life is more of a cautionary tale than a success story.",
    "You have the confidence of someone who has never been right.",
    "If ignorance is bliss, you must be the happiest person on earth.",
    "Somewhere out there, a tree is working very hard to replace the oxygen you consume. Apologize to it.",
    "I'd explain it to you, but I left my English-to-idiot dictionary at home.",
    "You bring everyone so much joy, right after you leave the room.",
    "You're proof that evolution can go in reverse.",
    "I was hoping you'd be an illusion, but unfortunately you're here.",
    "I'd call you a tool, but even tools have a purpose.",
    "Did you fall from heaven? Because so did Satan.",
    "Every time you speak, my brain cells commit suicide.",
    "If I had a dollar for every smart thing you said, I'd have exactly zero dollars.",
    "I’m not saying you’re stupid, I’m just saying you have bad luck when it comes to thinking.",
    "You're as bright as a black hole, and twice as dense.",
    "You have your entire life to be an idiot. Why not take today off?",
    "Your family tree must be a cactus because you're a prick.",
    "You are the human equivalent of a participation award.",
    "If laughter is the best medicine, your face must be curing the world."
];

module.exports = {
    /**
     * Get a random roast.
     * @returns {string} The roast
     */
    getRandomRoast() {
        return roasts[Math.floor(Math.random() * roasts.length)];
    }
};
