const instruction_pages = [
  "In this task, you will see symbols appear one at a time on the screen.",
  "When you see a 'go' stimulus, click the button as quickly as possible. <h2 style='font-size: 15vh;'>Y</h2>",
  "But if you see the No-Go symbol, do nothing — don’t press anything. <h2 style='font-size: 15vh;'>X</h2>",
  "Try to be fast, but also careful. Only press when it’s a Go.",
  "Continue when ready to start the practice.",
]

const englishText = {
  // Default stimuli
  defaultGoStimulus: 'Y',
  defaultNoGoStimulus: 'X',
  defaultButtonText: 'Click',

  
  // Page 2: GO Practice
  goPageContent: 
  `<b>GO Trials</b><br>When you see this stimulus, click the button as quickly as possible!`,
  gotItButton: 'Got it!',
  goFeedbackMessage: 'Perfect! You clicked quickly for the GO stimulus.',
  goodJobMessage: 'Good job!',
  
  // Page 3: NO-GO Practice  

  noGoPageContent:
  `<b>NO-GO Trials</b><br>When you see this stimulus, do NOT click the button!`,
  rememberNoGo: 'NO-GO stimulus, do NOT click!',
  noGoFeedbackMessage: 'Good job!',
  
  // Practice completion page

  practiceCompleteContent: '<b>Practice Complete!</b><br>Great job! You have completed the practice session and are ready to begin the actual task.',
  beginTaskButton: 'Begin Task',
  
  // Block instructions

  blockBreakContent: (blockNum, totalBlocks) => '<b>Block ' + blockNum + ' Complete!</b><br>You have completed block ' + blockNum + ' of ' + totalBlocks + '.<br>Take a short break if needed, then click below to continue.',
  blockContinuePrompt: (blockNum) => `Click below to continue to block ${blockNum + 1}.`,

  continueButton: 'Continue',
  
  // Alt text for images
  goStimulusAlt: 'GO stimulus',
  noGoStimulusAlt: 'NO-GO stimulus',
  
  // CSS colors
  goColor: 'green',
  noGoColor: 'red',

  //button labels
  back_button: '',
  next_button: '',
}