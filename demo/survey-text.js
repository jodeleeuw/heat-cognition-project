// ============================================================================
// WHO-5 Well-Being Index
// ============================================================================
const WHO5_PREAMBLE = "Please indicate how you have been feeling over the last 2-3 days.";
const WHO5_SCALE = ["none of the time", "some of the time", "less than half of the time", "more than half of the time", "most of the time", "all of the time"];
const WHO5_PROMPTS = {
    WHO1: "I have felt cheerful and in good spirits.",
    WHO2: "I have felt calm and relaxed.",
    WHO3: "I have felt active and vigorous.",
    WHO4: "I woke up feeling fresh and rested.",
    WHO5: "My daily life has been filled with things that interest me."
};

// ============================================================================
// PHQ-4 Patient Health Questionnaire
// ============================================================================
const PHQ4_PREAMBLE = "Over the last 2-3 days, how often have you been bothered by the following problems?";
const PHQ4_SCALE = ["none of the time", "rarely", "sometimes", "often", "all the time"];
const PHQ4_PROMPTS = {
    PHQ1: "Feeling nervous, anxious, or on edge",
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
    AC1: "It has been very hard for me to concentrate on difficult tasks.",
    AC2: "When I needed to concentrate and solve a problem, I have had trouble focusing my attention.",
    AC3: "When I tried focusing my attention on something, I have had difficulty blocking out distracting thoughts.",
    AC4: "It has been difficult to switch from one task to another."
};

// ============================================================================
// Social Value Orientation
// ============================================================================
const SVO_PREAMBLE = `In this set of questions, we ask you to imagine that you have been randomly paired with another anonymous person, whom we will refer to simply as the "other." You will be making a series of decisions about allocating finances between you and this other person.<br><br>
For each of the following questions, please indicate the distribution you would prefer. You can only make one mark for each question (each row).<br><br>
In the example below, a person has chosen to distribute money so that he/she receives 50, while the anonymous other person receives 40.<br><br>
Please imagine that your decisions will yield money for both yourself and the other person. There are no right or wrong answers, this is all about personal preferences.`;
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
const CCE_SCALE = ["not at all", "a little", "moderately", "quite a bit", "very much"];
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
    CCJ6: "People from communities most affected by climate change should have more of a say in decisions about solutions to climate change than they currently do."
};

// ============================================================================
// Climate Change Attribution
// ============================================================================
const CCA_PREAMBLE = "To what extent do you think climate change has changed the frequency and/or severity of the following weather events?";
const CCA_SCALE = ["strongly decreased", "somewhat decreased", "no change", "somewhat increased", "strongly increased"];
const CCA_PROMPTS = {
    CCA1: "Floods",
    CCA2: "Heatwaves",
    CCA3: "Heavy rains",
    CCA4: "Hurricanes",
    CCA5: "Droughts",
    CCA6: "Extremely cold days",
    CCA7: "Wildfires",
    CCA8: "Earthquakes"
};

// ============================================================================
// Climate Change Beliefs
// ============================================================================
const CCB_PREAMBLE = "How accurate do you think these statements are?";
const CCB_SCALE = ["not at all", "extremely accurate"];
const CCB_PROMPTS = {
    CCB1: "Taking action to fight climate change is necessary to avoid a global catastrophe.",
    CCB2: "Human activities are causing climate change.",
    CCB3: "Climate change poses a serious threat to humanity.",
    CCB4: "Climate change is a global emergency."
};

// ============================================================================
// Thermal Sensation
// ============================================================================
const TS_PREAMBLE = "Please tell us how you currently feel about your thermal environment.";
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
    SL1: "My sleep quality over the last 2-3 days has been bad.",
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
    0: "Extremely liberal/\u200Bleft-wing",
    50: "Moderate",
    100: "Extremely conservative/\u200Bright-wing"
};
const DE_PREFER_NOT_TO_SAY = "Prefer not to say";
const DE_COMMENTS_TITLE = "Do you have any comments for this survey?";
const DE_BUTTON_LABEL = "Continue";

// ============================================================================
// Introduction Screen
// ============================================================================
const INTRO_TITLE = "Welcome to our survey!";
const INTRO_HTML = `
<div style="max-width: 800px; margin: 0 auto; text-align: left; line-height: 1.6;">
  <p>Dear participant,</p>

  <p>We invite you to participate in our study on your cognitive systems and your personal beliefs.</p>

  <p>The expected duration of your participation is 15-18 minutes. You may be asked to play some short games, answer some questions about your beliefs, and report information about your demographics (including age, gender, etc.).</p>

  <p>Please answer as accurately as possible — there are no right or wrong answers.</p>
</div>
`;

// ============================================================================
// Informed Consent
// ============================================================================
const CONSENT_TITLE = "Informed Consent";
const CONSENT_HTML = `
<div style="max-width: 800px; margin: 0 auto; text-align: left; line-height: 1.6;">
  <h3>Data protection and consent to participate</h3>

  <p>First of all, we would like to ask you to give your consent to the following points. If you do not want to give your consent, you can leave the questionnaire now.</p>

  <p>You can access the Letter of Information with further details here: <a href="https://cloud.uni-konstanz.de/index.php/s/RbQwQSPzf4cQHwj" target="_blank">https://cloud.uni-konstanz.de/index.php/s/RbQwQSPzf4cQHwj</a></p>

  <ol>
    <li>I understand that my participation is voluntary and that I can end my participation at any time without having to give a reason for it and without this restricting my rights.</li>
    <li>I consent that I will provide location data in form of a zip, postal code or segments of IP address. I understand that this kind of location data will be used in an aggregated and anonymized way only.</li>
    <li>I consent that my data from this questionnaire will be used and shared for research purposes (e.g. in publications, journals etc.) and potentially made available for other researchers in open science platforms.</li>
    <li>I consent that my data from this questionnaire will be saved by the researchers, at least until the requirements for publishing one or more articles in a journal are met. This includes my consent to this.</li>
  </ol>

  <p>I hereby certify that I have understood the participation information described above, and that I agree with the above mentioned conditions of participation.</p>

  <p>I hereby certify that I am aware that attention checks will be used to recognize participants whose data we cannot use due to inattentive reading. Unfortunately, if you fail such checks, we cannot pay you.</p>

  <p><strong>Please check all boxes below to continue:</strong></p>
</div>
`;
const CONSENT_CHECKBOXES = [
  "I consent to the above points.",
  "I confirm that I am 18 years or older.",
  "I understand that there will be attention checks and I will not get paid if I fail them."
];

// ============================================================================
// Location Questions
// ============================================================================
const LOC_CITY_TITLE = "What city or region are you currently located in?";
const LOC_COUNTRY_TITLE = "What country are you currently located in?";

// ============================================================================
// Work Conditions
// ============================================================================
const WC_EMPLOYMENT_TITLE = "What is your current employment status?";
const WC_EMPLOYMENT_CHOICES = [
  "Employed full-time",
  "Employed part-time",
  "Self-employed",
  "Unemployed",
  "Student",
  "Retired",
  "Unable to work",
  "Prefer not to say"
];
const WC_LOCATION_TITLE = "Where do you primarily work?";
const WC_LOCATION_CHOICES = [
  "From home",
  "At an office or workplace",
  "Outdoors",
  "Mixed/varies",
  "Not applicable",
  "Prefer not to say"
];
const WC_AC_TITLE = "Does your primary work location have air conditioning?";
const WC_AC_CHOICES = [
  "Yes, and it works well",
  "Yes, but it doesn't work well",
  "No",
  "Not applicable",
  "Don't know"
];

// ============================================================================
// Mental & Physical Health Conditions
// ============================================================================
const MH_PREAMBLE = "Have you ever been diagnosed with any of the following conditions? (Select all that apply)";
const MH_MENTAL_TITLE = "Mental health conditions:";
const MH_MENTAL_CHOICES = [
  "Depression",
  "Anxiety disorder",
  "Bipolar disorder",
  "Post-traumatic stress disorder (PTSD)",
  "Other mental health condition",
  "None of the above",
  "Prefer not to say"
];
const MH_PHYSICAL_TITLE = "Physical health conditions:";
const MH_PHYSICAL_CHOICES = [
  "Cardiovascular disease (heart disease, hypertension, etc.)",
  "Diabetes",
  "Respiratory condition (asthma, COPD, etc.)",
  "Chronic pain condition",
  "Neurological condition",
  "Other chronic physical health condition",
  "None of the above",
  "Prefer not to say"
];

// ============================================================================
// Chronic Pain
// ============================================================================
const CP_PREAMBLE = "The following questions are about chronic pain.";
const CP_EXPERIENCE_TITLE = "Do you experience chronic pain (pain lasting 3 months or longer)?";
const CP_EXPERIENCE_CHOICES = ["Yes", "No", "Prefer not to say"];
const CP_SEVERITY_TITLE = "Over the last 2-3 days, how would you rate your pain on average?";
const CP_SEVERITY_LABELS = ["No pain", "Worst imaginable pain"];

// ============================================================================
// Loneliness Scale (UCLA 3-item)
// ============================================================================
const LS_PREAMBLE = "The next questions are about your social connections. Over the last 2-3 days, how often have you felt:";
const LS_SCALE = ["never", "rarely", "sometimes", "often", "always"];
const LS_PROMPTS = {
  LS1: "Lack of companionship",
  LS2: "Left out",
  LS3: "Isolated from others"
};

// ============================================================================
// Brief Resilience Scale
// ============================================================================
const BRS_PREAMBLE = "Please indicate the extent to which you agree with each of the following statements about yourself over the last 2-3 days.";
const BRS_SCALE = ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"];
const BRS_PROMPTS = {
  BRS1: "I tend to bounce back quickly after hard times.",
  BRS2: "I have a hard time making it through stressful events.",
  BRS3: "It does not take me long to recover from a stressful event.",
  BRS4: "It is hard for me to snap back when something bad happens.",
  BRS5: "I usually come through difficult times with little trouble.",
  BRS6: "I tend to take a long time to get over set-backs in my life."
};

// ============================================================================
// Green and Blue Spaces Access
// ============================================================================
const GBS_PREAMBLE = "The following questions are about your access to natural environments.";
const GBS_SCALE = ["strongly disagree", "disagree", "neutral", "agree", "strongly agree"];
const GBS_PROMPTS = {
  GBS1: "I have easy access to green spaces (parks, forests, gardens, etc.).",
  GBS2: "I have easy access to blue spaces (lakes, rivers, oceans, etc.).",
  GBS3: "I regularly spend time in natural outdoor environments.",
  GBS4: "The natural spaces near me are well-maintained and pleasant."
};

// ============================================================================
// Air Conditioning Access
// ============================================================================
const AC_ACCESS_PREAMBLE = "The following questions are about your access to cooling resources.";
const AC_HOME_TITLE = "Does your home have air conditioning?";
const AC_HOME_CHOICES = [
  "Yes, central air conditioning throughout the home",
  "Yes, air conditioning in some rooms",
  "Yes, portable air conditioning unit(s)",
  "No air conditioning",
  "Prefer not to say"
];
const AC_FREQUENCY_TITLE = "Over the last 2-3 days, how often did you use air conditioning at home?";
const AC_FREQUENCY_CHOICES = [
  "Not at all",
  "Rarely",
  "Sometimes",
  "Most of the time",
  "All of the time",
  "Not applicable (no air conditioning)"
];
const AC_PUBLIC_TITLE = "Do you have access to air-conditioned public spaces (libraries, shopping centers, community centers, etc.) in your area?";
const AC_PUBLIC_CHOICES = ["Yes", "No", "Don't know"];

// ============================================================================
// Housing Conditions
// ============================================================================
const HC_PREAMBLE = "The following questions are about your current housing situation.";
const HC_TYPE_TITLE = "What type of housing do you currently live in?";
const HC_TYPE_CHOICES = [
  "Detached single-family home",
  "Attached home (townhouse, duplex, etc.)",
  "Apartment/flat in a building",
  "Mobile home",
  "Other",
  "Prefer not to say"
];
const HC_OWN_TITLE = "Do you own or rent your home?";
const HC_OWN_CHOICES = ["Own", "Rent", "Other arrangement", "Prefer not to say"];
const HC_QUALITY_TITLE = "How would you rate the overall condition of your housing?";
const HC_QUALITY_SCALE = ["very poor", "poor", "fair", "good", "excellent"];
const HC_INSULATION_TITLE = "How well insulated is your home against outdoor temperatures?";
const HC_INSULATION_SCALE = ["very poorly", "poorly", "adequately", "well", "very well"];

// ============================================================================
// Heat Actions - City Level
// ============================================================================
const HA_PREAMBLE = "The following questions are about climate and heat-related actions in your city or community.";
const HA_SCALE = ["strongly disagree", "disagree", "neutral", "agree", "strongly agree", "don't know"];
const HA_PROMPTS = {
  HA1: "My city/community has adequate plans to deal with extreme heat events.",
  HA2: "My city/community provides sufficient cooling centers or public spaces during heat waves.",
  HA3: "My city/community is taking meaningful action to address climate change.",
  HA4: "I am satisfied with my local government's response to climate change.",
  HA5: "My city/community has adequate green spaces and tree cover to provide shade and cooling."
};

// ============================================================================
// Final Comments
// ============================================================================
const FINAL_COMMENTS_TITLE = "Do you have any final comments or feedback about this survey?";
const FINAL_BUTTON_LABEL = "Submit and finish";
