
const ColumbiaCardTaskText = {
    // Task title and general text
    taskTitle: "Columbia Card Task",

    // Instructions pages
    instructionPages: [
        `<div class="timeline-instructions">
            <p>You will be playing multiple rounds of a card selection game.</p>
        </div>`,
        `<div class="timeline-instructions">
            <p>In each round, you'll see a grid of face-down cards. Most cards give you points, but some cards lose points and end the round.</p>
        </div>`,
        `<div class="timeline-instructions">
            <p>Click on cards to turn them over and earn points. You can stop anytime to keep your points, or keep selecting for more.</p>
        </div>`,
        `<div class="timeline-instructions">
            <p>Before each round, you'll see how many loss cards there are, how many points you gain per card, and how many points you lose if you hit a loss card.</p>
        </div>`,
        `<div class="timeline-instructions">
            <p>Your goal is to earn as many points as possible across all rounds. Choose your strategy wisely!</p>
        </div>`
    ],

    // Button texts
    buttons: {
        start: "Start",
        stop: "Stop and Keep Points",
        continue: "Continue",
        next: "",  // Arrow will be added
        previous: ""  // Arrow will be added
    },

    // Round information text
    roundInfo: {
        roundHeader: (round, total) => `Round ${round} of ${total}`,
        lossCards: "Loss cards:",
        lossPenalty: "Loss penalty:",
        gainPerCard: "Gain per card:",
        totalScore: "Total score:"
    },

    // Game display text
    gameDisplay: {
        roundLabel: (round) => `Round ${round}`,
        scoreLabel: (score, total) => `Score: ${score} | Total: ${total}`,
        cardSymbol: "?"
    },

    // Feedback messages
    feedback: {
        lossCard: "Loss card! Round ended.",
        allGainCards: "All gain cards found!",
        roundStopped: "Round stopped!",
        gainCard: (amount) => `+${amount}`,
        lossCardValue: (amount) => `-${amount}`
    },

    // Results text
    results: {
        header: "Task Complete!",
        finalScore: "Final Score:",
        avgCardsSelected: "Average cards selected:"
    }
};
