const ts_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "TS" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        title: TS_PREAMBLE,
        elements: [
          {
            type: "radiogroup",
            name: "TS1",
            title: TS_PROMPTS.TS1.prompt,
            choices: TS_PROMPTS.TS1.labels.map((label, i) => ({
              value: i,
              text: label,
            })),
            isRequired: true,
          },
          {
            type: "radiogroup",
            name: "TS2",
            title: TS_PROMPTS.TS2.prompt,
            choices: TS_PROMPTS.TS2.labels.map((label, i) => ({
              value: i,
              text: label,
            })),
            isRequired: true,
          },
        ],
      },
    ],
  },
  min_width: "min(100vw, 1200px)",
};

const sta_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "STA" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "sta",
            title: STA_PREAMBLE,
            rows: Object.keys(STA_PROMPTS).map((key) => ({
              value: `A-${key}`,
              text: STA_PROMPTS[key],
            })),
            columns: STA_SCALE.map((label, i) => ({
              value: i,
              text: label,
            })),
            isRequired: true,
          },
        ],
      },
    ],
  },
  min_width: "min(100vw, 1200px)",
};

const sl_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "SL" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "sl",
            title: SL_PREAMBLE,
            rows: Object.keys(SL_PROMPTS).map((key) => ({
              value: `A-${key}`,
              text: SL_PROMPTS[key],
            })),
            columns: SL_SCALE.map((label, i) => ({
              value: i,
              text: label,
            })),
            isRequired: true,
          },
        ],
      },
    ],
  },
  min_width: "min(100vw, 1200px)",
};

const heat_related_timeline = {
  timeline: [ts_trial, sta_trial, sl_trial]
}