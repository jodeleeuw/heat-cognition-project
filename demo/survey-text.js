// ============================================================================
// WHO-5 Well-Being Index
// ============================================================================
const WHO5_PREAMBLE = "Please indicate how you have been feeling over the last 2-3 days.";
const WHO5_SCALE = ["none of the time", "some of the time", "less than half of the time", "more than half of the time", "most of the time", "all of the time"];
const WHO5_PROMPTS = {
    WHO1: "I have felt cheerful and in good spirits",
    WHO2: "I have felt calm and relaxed",
    WHO3: "I have felt active and vigorous",
    WHO4: "I woke up feeling fresh and rested",
    WHO5: "My daily life has been filled with things that interest me"
};

// ============================================================================
// PHQ-4 Patient Health Questionnaire
// ============================================================================
const PHQ4_PREAMBLE = "Over the last 2-3 days, how often have you been bothered by the following problems?";
const PHQ4_SCALE = ["none of the time", "rarely", "sometimes", "often", "all the time"];
const PHQ4_PROMPTS = {
    PHQ1: "Feeling nervous, anxious or on edge",
    PHQ2: "Not being able to stop or control worrying",
    PHQ3: "Feeling down, depressed or hopeless",
    PHQ4: "Little interest or pleasure in doing things"
};

// ============================================================================
// Visual Analogue Mood Scales
// ============================================================================
const VAMS_PREAMBLE = "Click on the answer that bests represents how you feel right now.";
const VAMS_LABELS = ["not at all", "extremely"];
const VAMS_PROMPTS = {
    VA1: "Happy",
    VA2: "Sad",
    VA3: "Calm",
    VA4: "Tense",
    VA5: "Energetic",
    VA6: "Sleepy"
};

// ============================================================================
// Brief Physical Aggression Questionnaire
// ============================================================================
const BPAQ_PREAMBLE = "Please rate how much each of the following statements describes you over the last 2-3 days.";
const BPAQ_SCALE = ["very unlike me", "", "", "", "very like me"];
const BPAQ_PROMPTS = {
    BP1: "I could have hit someone if sufficiently provoked",
    BP3: "I have found myself often disagreeing with people.",
    BP4: "I could not help getting into arguments when people disagreed with me.",
    BP5: "I have had angry outbursts for no good reason.",
    BP6: "I felt like other people have had it easier than me.",
    BP7: "I have had trouble controlling my temper.",
    BP8: "I have felt bitter about things.",
    BP9: "I have felt on the verge of an angry outburst."
};

// ============================================================================
// Attentional Control
// ============================================================================
const AC_PREAMBLE = "Over the last 2-3 days, how often have you been bothered by the following?";
const AC_SCALE = ["none of the time", "rarely", "sometimes", "often", "all of time"];
const AC_PROMPTS = {
    AC1: "It has been very hard for me to concentrate on the difficult tasks.",
    AC2: "When I needed to concentrate and solve a problem, I have had trouble focusing my attention.",
    AC3: "When I tried focusing my attention on something, I have had difficulty blocking out distracting thoughts.",
    AC4: "It has been difficult to switch from one task to another."
};

// ============================================================================
// Social Value Orientation
// ============================================================================
const SVO_PREAMBLE = `In this set of questions, we ask you to imagine that you have been randomly
paired with <b>another person</b>, whom we will refer to simply as the "<b>other</b>." You
will be making a series of decisions <b>about allocating finances between you
and this other person.</b><br>
For each of the following questions, please indicate the distribution you would
prefer. You can only make one mark for each question (each row).<br>
Please imagine that your decisions will yield money for both yourself and the
other person`;
const SVO_SELF_LABEL = "You receive";
const SVO_OTHER_LABEL = "Other receives";
const SVO_BUTTON_LABEL = "Submit";

// ============================================================================
// Trust in Institutions and Communities
// ============================================================================
const TIC_PREAMBLE = "Using a scale from 1 to 5, where 1 means 'no trust at all' and 5 means 'complete trust', how much do you personally trust...";
const TIC_SCALE = ["not at all", "a little", "sometimes", "quite a bit", "very much"];
const TIC_PROMPTS = {
    TIC1: "the government in the country you're currently based in?",
    TIC2: "scientific institutions?",
    TIC3: "climate scientists?",
    TIC4: "people from other cultures?",
    TIC5: "people from your country?",
    TIC6: "people in your neighborhood?"
};

// ============================================================================
// Climate Change Emotions
// ============================================================================
const CCE_PREAMBLE = "Right now, thinking about climate change makes me feel...";
const CCE_SCALE = ["not at all", "a little", "moderately", "quite a bit", "very much:"];
const CCE_PROMPTS = {
    CCE1: "concerned",
    CCE2: "tense",
    CCE3: "worried",
    CCE4: "anxious",
    CCE5: "depressed",
    CCE6: "hopeless",
    CCE7: "powerless",
    CCE8: "sad",
    CCE9: "helpless",
    CCE10: "hopeful",
    CCE11: "frustrated",
    CCE12: "angry",
    CCE13: "indifferent"
};

// ============================================================================
// Climate Change Justice
// ============================================================================
const CCJ_PREAMBLE = "The following statements relate to social and global inequalities in the context of climate change. Please indicate how much you agree or disagree with each statement.";
const CCJ_SCALE = ["strongly disagree", "somewhat disagree", "neither agree nor disagree", "somewhat agree", "strongly agree"];
const CCJ_PROMPTS = {
    CCJ1: "People living in poverty suffer worse effects from climate change.",
    CCJ2: "Around the world, people who are least responsible for causing climate change suffer the most severe climate change impacts.",
    CCJ3: "Climate change affects women worse than men around the world.",
    CCJ4: "Climate change will worsen existing oppressions and inequalities (for example, the gap between rich and poor countries).",
    CCJ5: "Solving climate change requires redistributing resources from the wealthy to those who have less.",
    CCJ6: "People from communities most affected by climate change should have more of a say in decisions about solutions to climate change than they currently do"
};

// ============================================================================
// Climate Change Attribution
// ============================================================================
const CCA_PREAMBLE = "To what extent do you think climate change has changed the frequency and/or severity of the following weather events?";
const CCA_SCALE = ["not at all", "a little", "moderately", "quite a bit", "very much"];
const CCA_PROMPTS = {
    CCA1: "Floods",
    CCA2: "Heatwaves",
    CCA3: "Heavy rains",
    CCA4: "Hurricanes",
    CCA5: "Droughts",
    CCA6: "Extremely cold days",
    CCA7: "Wildfires"
};

// ============================================================================
// Climate Change Beliefs
// ============================================================================
const CCB_PREAMBLE = "How accurate do you think these statements are?";
const CCB_SCALE = ["not at all", "", "", "", "extremely accurate"];
const CCB_PROMPTS = {
    CCB1: "Taking action to fight climate change is necessary to avoid a global catastrophe.",
    CCB2: "Human activities are causing climate change.",
    CCB3: "Climate change poses a serious threat to humanity.",
    CCB4: "Climate change is a global emergency."
};

// ============================================================================
// Thermal Sensation
// ============================================================================
const TS_PROMPTS = {
    TS1: {
        prompt: "How do you feel right now?",
        labels: ["cold", "cool", "slightly cool", "neutral (your ideal temperature)", "slightly warm", "warm", "hot"]
    },
    TS2: {
        prompt: "How satisfied are you with the thermal environment right now?",
        labels: ["very dissatisfied", "dissatisfied", "slightly dissatisfied", "neutral", "slightly satisfied", "satisfied", "very satisfied"]
    }
};

// ============================================================================
// Subjective Temperature Attribution
// ============================================================================
const STA_PREAMBLE = "How much have the temperatures you experienced over the last 2-3 days affected:";
const STA_SCALE = ["not at all", "a little", "moderately", "quite a bit", "very much"];
const STA_PROMPTS = {
    STA1: "Your ability to concentrate",
    STA2: "Your memory",
    STA3: "Your mood",
    STA4: "Your quality of sleep",
    STA5: "Your overall health",
    STA6: "Your well-being",
    STA7: "The well-being of your friends and family"
};

// ============================================================================
// Sleep Quality
// ============================================================================
const SL_PREAMBLE = "The next questions are about your sleep in the last 2-3 days. How much do you agree with the following statements?";
const SL_SCALE = ["strongly disagree", "somewhat disagree", "neither agree nor disagree", "somewhat agree", "strongly agree"];
const SL_PROMPTS = {
    SL1: "My sleep quality over the past 2-3 days has been bad.",
    SL2: "I feel that I have not gotten enough sleep over the last 2-3 days.",
    SL3: "I have had difficulties sleeping because I was feeling too hot.",
    SL4: "I have had difficulties sleeping for some other reason."
};

// ============================================================================
// Demographics
// ============================================================================
const DE_AGE_TITLE = "What is your age?";
const DE_GENDER_TITLE = "What is your gender?";
const DE_GENDER_CHOICES = ["Female", "Male", "Non-binary/Other", "Prefer not to say"];
const DE_EDUCATION_TITLE = "How many years of formal education have you completed? Please select the one that is closest to your level of education.";
const DE_EDUCATION_CHOICES = [
    "0-6 (Up to grade school/elementary school)",
    "7-12 (Up to high school)",
    "13-16 (College/undergraduate university/certificate training)",
    "17+ (doctorate degree, medical degree, etc.)"
];
const DE_POLITICAL_HTML = "What is your <b>political orientation</b> for the issues listed below?<br>Please note, by 'liberal' we mean classically left-wing, and by 'conservative', we mean classically right-wing.";
const DE_POLITICAL_SOCIAL_TITLE = "For social issues (e.g., health care, education, etc.)";
const DE_POLITICAL_ECONOMIC_TITLE = "For economic issues (e.g., taxes)";
const DE_POLITICAL_LABELS = {
    0: "Extremely liberal/left-wing",
    50: "Moderate",
    100: "Extremely conservative/right-wing"
};
const DE_PREFER_NOT_TO_SAY = "Prefer not to say";
const DE_COMMENTS_TITLE = "Do you have any comments for this survey?";
const DE_BUTTON_LABEL = "Submit and finish";
