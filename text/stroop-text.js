const InstructionsText = {
    pages: [
        `In this task, you will see words that name colors (like RED, BLUE, GREEN)`,
        `The color of the letters might not match the word. For example:
        <br><span style="color: blue;">RED</span>
        <br><span style="color: green;">BLUE</span>
        <br>Your job is to press the button that matches the color of the word, not what the word says.`,
        `If the word is <span style="color: red;">YELLOW</span>, then you should press the button labelled RED.`,
        `If the word is <span style="color: green;">BLUE</span>, then you should press the button labelled GREEN.`,
        `Try to go as fast and as accurately as possible.`
    ]
};

const practiceDebrief = {
    debrief: [
        `<strong>Practice Complete!</strong>`,
        `Remember, respond to the ink color, not the word. Be as fast and accurate as possible.`,
    ],
    continueButton: 'Continue',
};

const practiceFeedback = {
    debriefCorrect: [
        `CORRECT!`
    ],
    continueButton: 'Continue',
}

const blockCompletion = {
    debrief: [
        `<strong>Block Complete!</strong>
        <br>You have completed a block of trials. You can take a break before continuing to the next block.
        <br><strong>Remember:</strong>
        <br>
        <br>Respond to the ink color, not the word. Be as fast and accurate as possible.`
    ],
    continueButton: 'Continue',
}