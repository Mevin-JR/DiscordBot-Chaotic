const roasts = [
    "You're not useless... you could at least be used as a bad example.",
    "You don't have bugs... you are the bug.",
    "Your logic has more holes than a poorly written try-catch.",
    "You're the human version of a deprecated function.",
    "You have the confidence of someone who has never checked their own code.",
    "I'd agree with you, but then we'd both be wrong.",
    "Your code base looks like a plate of spaghetti that fell on the floor.",
    "You code like you just discovered the keyboard yesterday.",
    "If ignorance is bliss, you must be the happiest person on earth.",
    "Somewhere out there, a tree is working very hard to replace the oxygen you consume. Apologize to it.",
    "I'd explain it to you, but I left my English-to-idiot dictionary at home.",
    "You're like a software update—whenever I see you, I just want to hit 'Remind me later'.",
    "You bring everyone so much joy, right after you leave the room.",
    "You're proof that evolution can go in reverse.",
    "Are you a `git commit`? Because you bring nothing but bad messages.",
    "If your brain was a hard drive, it would be a floppy disk.",
    "I was hoping you'd be a 404 error and never be found.",
    "Your brain runs on Internet Explorer.",
    "I'd call you a tool, but even tools are useful.",
    "You look like someone who pushes straight to main and blames the compiler.",
    "Your entire personality is a syntax error.",
    "Did you write your personality in Brainfuck?",
    "Every time you speak, a garbage collector gets stressed.",
    "You're as useful as an HTML tag in a Python script.",
    "You're the kind of person who uses `console.log` as a debugger because reading stack traces is too hard.",
    "If I had a dollar for every smart thing you said, I'd have exactly zero dollars.",
    "You write code like you're trying to win a bet against the machine.",
    "I’m not saying you’re stupid, I’m just saying you have bad luck when it comes to thinking.",
    "Your brain is essentially a while(true) loop of bad decisions.",
    "You're as bright as a black hole, and twice as dense."
];

module.exports = {
    /**
     * Get a random developer roast.
     * @returns {string} The roast
     */
    getRandomRoast() {
        return roasts[Math.floor(Math.random() * roasts.length)];
    }
};
