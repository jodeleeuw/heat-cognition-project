const who5_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "WHO5" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "who5",
            title: WHO5_PREAMBLE,
            rows: Object.keys(WHO5_PROMPTS).map((key) => ({
              value: `A-${key}`,
              text: WHO5_PROMPTS[key],
            })),
            columns: WHO5_SCALE.map((label, i) => ({
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

const phq4_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "PHQ4" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "phq4",
            title: PHQ4_PREAMBLE,
            rows: Object.keys(PHQ4_PROMPTS).map((key) => ({
              value: `A-${key}`,
              text: PHQ4_PROMPTS[key],
            })),
            columns: PHQ4_SCALE.map((label, i) => ({
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

const vams_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "VAMS" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        title: VAMS_PREAMBLE,
        elements: Object.keys(VAMS_PROMPTS).map((key) => ({
          type: "panel",
          name: `vams-panel-${key}`,
          elements: [
            {
              type: "slider",
              name: `M-${key}`,
              title: VAMS_PROMPTS[key],
              min: -50,
              max: 50,
              step: 1,
              isRequired: true,
              customLabels: [
                { value: -50, text: VAMS_LABELS[0] },
                { value: 50, text: VAMS_LABELS[1] },
              ],
            },
          ],
        })),
      },
    ],
  },
  survey_function: function (survey) {
    // Fix: Override BEFORE rendering to avoid SurveyJS duplicate ID bug
    survey.getAllQuestions().forEach((question) => {
      if (question.getType() === "slider") {
        question.handlePointerDown = function (e) {
          question.oldValue = question.renderedValue;
          question.animatedThumb = false;
        };

        question.handlePointerUp = function (event) {
          event.stopPropagation();
          question.setSliderValue(question.renderedValue);
          question.refreshInputRange();
          question.oldValue = null;
        };
      }
    });
  },
  min_width: "min(100vw, 1200px)",
};

const bpaq_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "BPAQ" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        title: BPAQ_PREAMBLE,
        elements: Object.keys(BPAQ_PROMPTS).map((key) => ({
          type: "panel",
          name: `bpaq-panel-${key}`,
          elements: [
            {
              type: "slider",
              name: `M-${key}`,
              title: BPAQ_PROMPTS[key],
              min: -2,
              max: 2,
              step: 1,
              isRequired: true,
              showTicks: true,
              customLabels: [
                { value: -2, text: BPAQ_SCALE[0] },
                { value: -1, text: " " },
                { value: 0, text: " " },
                { value: 1, text: " " },
                { value: 2, text: BPAQ_SCALE[4] },
              ],
            },
          ],
        })),
      },
    ],
  },
  survey_function: function (survey) {
    // Fix: Override BEFORE rendering to avoid SurveyJS duplicate ID bug
    survey.getAllQuestions().forEach((question) => {
      if (question.getType() === "slider") {
        question.handlePointerDown = function (e) {
          question.oldValue = question.renderedValue;
          question.animatedThumb = false;
        };

        question.handlePointerUp = function (event) {
          event.stopPropagation();
          question.setSliderValue(question.renderedValue);
          question.refreshInputRange();
          question.oldValue = null;
        };
      }
    });
  },
  min_width: "min(100vw, 1200px)",
};

const ac_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "AC" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "ac",
            title: AC_PREAMBLE,
            rows: Object.keys(AC_PROMPTS).map((key) => ({
              value: `M-${key}`,
              text: AC_PROMPTS[key],
            })),
            columns: AC_SCALE.map((label, i) => ({
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

const svo_trials = {
  timeline: [
    {
      type: jsPsychSurvey,
      data: { survey_page: "SVO" },
      survey_json: function () {
        const trial_index = jsPsych.evaluateTimelineVariable("trial_index");
        const name = jsPsych.evaluateTimelineVariable("name");
        const is_instructions =
          jsPsych.evaluateTimelineVariable("is_instructions");

        const elements = [];

        if (is_instructions) {
          // Instructions page with non-interactive example
          elements.push({
            type: "html",
            name: "svo-instructions",
            html: `<div style="font-size: 14px; line-height: 1.5; max-width: 700px; margin: 0 auto 20px;">
                    <p>In this set of questions, we ask you to imagine that you have been randomly paired with another anonymous person, whom we will refer to simply as the "other." You will be making a series of decisions about allocating finances between you and this other person.</p>
                    <p>For each of the following questions, please indicate the distribution you would prefer. You can only make one mark for each question (each row).</p>
                    <p>In the example below, a person has chosen to distribute money so that he/she receives 50, while the anonymous other person receives 40.</p>
                    <div id="svo-example-container"></div>
                    <p>Please imagine that your decisions will yield money for both yourself and the other person. There are no right or wrong answers, this is all about personal preferences.</p>
                  </div>`,
          });
        } else {
          // Regular question slider
          elements.push({
            type: "slider",
            name: name,
            title: "Select your preference", // Empty title, we'll add custom labels
            min: -4,
            max: 4,
            step: 1,
            isRequired: true,
            showTicks: false, // We'll create custom ticks
          });
        }

        return {
          showQuestionNumbers: false,
          completeText: "Continue",
          pages: [
            {
              elements: elements,
            },
          ],
        };
      },
      survey_function: function (survey) {
        const name = jsPsych.evaluateTimelineVariable("name");
        const self_values = jsPsych.evaluateTimelineVariable("self_values");
        const other_values = jsPsych.evaluateTimelineVariable("other_values");
        const is_instructions =
          jsPsych.evaluateTimelineVariable("is_instructions");

        console.log("SVO survey_function called", {
          name,
          self_values,
          other_values,
          is_instructions,
        });

        // Add step fix for sliders (from earlier fix)
        survey.getAllQuestions().forEach((question) => {
          if (question.getType() === "slider") {
            question.handlePointerDown = function (e) {
              question.oldValue = question.renderedValue;
              question.animatedThumb = false;
            };

            question.handlePointerUp = function (event) {
              event.stopPropagation();
              question.setSliderValue(question.renderedValue);
              question.refreshInputRange();
              question.oldValue = null;
            };
          }
        });

        // Function to create SVO slider HTML
        function createSvoSliderHTML(interactive) {
          const container = document.createElement("div");
          container.className = "svo-dual-slider";
          container.innerHTML = `
                  <div class="svo-labels-container">
                    <div class="svo-row-label">${SVO_SELF_LABEL}</div>
                    <div class="svo-top-labels">
                      ${self_values
                        .map(
                          (val, i) => `
                        <div class="svo-label-box" data-index="${i - 4}">
                          ${val}
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                    <div class="svo-slider-container">
                      <input type="range" class="svo-slider-input" min="-4" max="4" step="1" value="0" ${
                        interactive ? "" : "disabled"
                      }>
                    </div>
                    <div class="svo-bottom-labels">
                      ${other_values
                        .map(
                          (val, i) => `
                        <div class="svo-label-box" data-index="${i - 4}">
                          ${val}
                        </div>
                      `
                        )
                        .join("")}
                    </div>
                    <div class="svo-row-label">${SVO_OTHER_LABEL}</div>
                  </div>
                `;
          return container;
        }

        if (is_instructions) {
          // For instructions page, insert example slider after render
          survey.onAfterRenderQuestion.add(function (sender, options) {
            if (options.question.name === "svo-instructions") {
              const exampleContainer = document.getElementById(
                "svo-example-container"
              );
              if (exampleContainer) {
                const container = createSvoSliderHTML(false);
                exampleContainer.appendChild(container);

                // Set example to middle position (value 0 = index 4)
                const customSlider =
                  container.querySelector(".svo-slider-input");
                const topLabels = container.querySelectorAll(
                  ".svo-top-labels .svo-label-box"
                );
                const bottomLabels = container.querySelectorAll(
                  ".svo-bottom-labels .svo-label-box"
                );

                customSlider.value = 0;
                topLabels[4].classList.add("selected");
                bottomLabels[4].classList.add("selected");
              }
            }
          });
        } else {
          // Add onAfterRenderQuestion handler for interactive sliders
          survey.onAfterRenderQuestion.add(function (sender, options) {
            const question = options.question;
            console.log(
              "onAfterRenderQuestion fired",
              question.name,
              question.getType()
            );

            // Only process SVO slider questions
            if (question.name !== name || question.getType() !== "slider")
              return;

            console.log("Processing SVO slider", name);
            const questionElement = options.htmlElement;

            // Build custom dual-label slider HTML
            const container = createSvoSliderHTML(true);

            // Hide default SurveyJS slider
            const defaultSlider = questionElement.querySelector(".sd-slider");
            if (defaultSlider) {
              defaultSlider.style.display = "none";
            }

            // Insert custom slider
            questionElement.appendChild(container);

            // Sync custom slider with question value
            const customSlider = container.querySelector(".svo-slider-input");
            const topLabels = container.querySelectorAll(
              ".svo-top-labels .svo-label-box"
            );
            const bottomLabels = container.querySelectorAll(
              ".svo-bottom-labels .svo-label-box"
            );

            function updateSelectedLabels(value) {
              // Remove all selected classes
              topLabels.forEach((box) => box.classList.remove("selected"));
              bottomLabels.forEach((box) => box.classList.remove("selected"));

              // Add selected class to the box matching the slider value
              // value ranges from -4 to 4, index ranges from 0 to 8
              const index = parseInt(value) + 4;
              if (index >= 0 && index < 9) {
                topLabels[index].classList.add("selected");
                bottomLabels[index].classList.add("selected");
              }
            }

            customSlider.addEventListener("input", function () {
              const value = parseInt(this.value);
              question.value = value;
              updateSelectedLabels(value);
            });

            customSlider.addEventListener("change", function () {
              const value = parseInt(this.value);
              question.value = value;
              updateSelectedLabels(value);
            });

            // Sync question value to slider (if pre-filled)
            if (question.value !== undefined) {
              customSlider.value = question.value;
              updateSelectedLabels(question.value);
            }
          });
        }
      },
    },
  ],
  timeline_variables: [
    {
      trial_index: 0,
      is_instructions: true,
      self_values: [30, 35, 40, 45, 50, 55, 60, 65, 70],
      other_values: [80, 70, 60, 50, 40, 30, 20, 10, 0],
      name: "svo-instructions",
    },
    {
      trial_index: 1,
      is_instructions: false,
      self_values: [85, 85, 85, 85, 85, 85, 85, 85, 85],
      other_values: [85, 76, 68, 59, 50, 41, 33, 24, 15],
      name: "M-SVOT1",
    },
    {
      trial_index: 2,
      is_instructions: false,
      self_values: [85, 87, 89, 91, 93, 94, 96, 98, 100],
      other_values: [15, 19, 24, 28, 33, 37, 41, 46, 50],
      name: "M-SVOT2",
    },
    {
      trial_index: 3,
      is_instructions: false,
      self_values: [50, 54, 59, 63, 68, 72, 76, 81, 85],
      other_values: [100, 98, 96, 94, 93, 91, 89, 87, 85],
      name: "M-SVOT3",
    },
    {
      trial_index: 4,
      is_instructions: false,
      self_values: [50, 54, 59, 63, 68, 72, 76, 81, 85],
      other_values: [100, 89, 79, 68, 58, 47, 36, 26, 15],
      name: "M-SVOT4",
    },
    {
      trial_index: 5,
      is_instructions: false,
      self_values: [100, 94, 88, 81, 75, 69, 63, 56, 50],
      other_values: [50, 56, 63, 69, 75, 81, 88, 94, 100],
      name: "M-SVOT5",
    },
    {
      trial_index: 6,
      is_instructions: false,
      self_values: [100, 98, 96, 94, 93, 91, 89, 87, 85],
      other_values: [50, 54, 59, 63, 68, 72, 76, 81, 85],
      name: "M-SVOT6",
    },
  ],
};

const tic_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "TIC" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "tic",
            title: TIC_PREAMBLE,
            rows: Object.keys(TIC_PROMPTS).map((key) => ({
              value: `A-${key}`,
              text: TIC_PROMPTS[key],
            })),
            columns: TIC_SCALE.map((label, i) => ({
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

const cce_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "CCE" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "cce",
            title: CCE_PREAMBLE,
            rows: Object.keys(CCE_PROMPTS).map((key) => ({
              value: `M-${key}`,
              text: CCE_PROMPTS[key],
            })),
            columns: CCE_SCALE.map((label, i) => ({
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

const ccj_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "CCJ" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "ccj",
            title: CCJ_PREAMBLE,
            rows: Object.keys(CCJ_PROMPTS).map((key) => ({
              value: `M-${key}`,
              text: CCJ_PROMPTS[key],
            })),
            columns: CCJ_SCALE.map((label, i) => ({
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

const cca_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "CCA" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "matrix",
            name: "cca",
            title: CCA_PREAMBLE,
            rows: Object.keys(CCA_PROMPTS).map((key) => ({
              value: `M-${key}`,
              text: CCA_PROMPTS[key],
            })),
            columns: CCA_SCALE.map((label, i) => ({
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

const ccb_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "CCB" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        title: CCB_PREAMBLE,
        elements: Object.keys(CCB_PROMPTS).map((key) => ({
          type: "slider",
          name: `M-${key}`,
          title: CCB_PROMPTS[key],
          min: -2,
          max: 2,
          step: 1,
          isRequired: true,
          customLabels: [
            { value: -2, text: CCB_SCALE[0] },
            { value: 2, text: CCB_SCALE[1] },
          ],
        })),
      },
    ],
  },
  survey_function: function (survey) {
    // Fix: Override BEFORE rendering to avoid SurveyJS duplicate ID bug
    survey.getAllQuestions().forEach((question) => {
      if (question.getType() === "slider") {
        question.handlePointerDown = function (e) {
          question.oldValue = question.renderedValue;
          question.animatedThumb = false;
        };

        question.handlePointerUp = function (event) {
          event.stopPropagation();
          question.setSliderValue(question.renderedValue);
          question.refreshInputRange();
          question.oldValue = null;
        };
      }
    });
  },
};







const intro_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "Intro" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "html",
            name: "intro",
            html: INTRO_HTML,
          },
        ],
      },
    ],
  },
  min_width: "min(100vw, 1200px)",
};

const consent_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "Consent" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: "Continue",
    pages: [
      {
        elements: [
          {
            type: "html",
            name: "consent-text",
            html: CONSENT_HTML,
          },
          {
            type: "checkbox",
            name: "A-CONSENT1",
            title: " ",
            choices: [CONSENT_CHECKBOXES[0]],
            isRequired: true,
          },
          {
            type: "checkbox",
            name: "A-CONSENT2",
            title: " ",
            choices: [CONSENT_CHECKBOXES[1]],
            isRequired: true,
          },
          {
            type: "checkbox",
            name: "A-CONSENT3",
            title: " ",
            choices: [CONSENT_CHECKBOXES[2]],
            isRequired: true,
          },
        ],
      },
    ],
  },
  min_width: "min(100vw, 1200px)",
};


// Basic demographics - age and gender only
const de_basic_json = {
  elements: [
    {
      name: "A-DE1",
      type: "text",
      title: DE_AGE_TITLE,
      inputType: "number",
      isRequired: true,
    },
    {
      name: "A-DE2",
      type: "radiogroup",
      title: DE_GENDER_TITLE,
      isRequired: true,
      choices: DE_GENDER_CHOICES,
      colCount: 1,
    },
  ],
};

const de_basic_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "Demographics" },
  survey_json: de_basic_json,
  min_width: "min(100vw, 1200px)",
};

// Extended demographics - education and political views
const de_extended_json = {
  elements: [
    {
      name: "A-DE3",
      type: "radiogroup",
      title: DE_HOUSEHOLD_TITLE,
      isRequired: true,
      choices: DE_HOUSEHOLD_CHOICES,
      colCount: 1,
    },
    {
      name: "A-DE4",
      type: "radiogroup",
      title: DE_HOUSEHOLD_CHILDREN_TITLE,
      isRequired: true,
      choices: DE_HOUSEHOLD_CHILDREN_CHOICES,
      colCount: 1,
    },
    {
      name: "A-DE5",
      type: "radiogroup",
      title: DE_RELATIONSHIP_STATUS_TITLE,
      isRequired: true,
      choices: DE_RELATIONSHIP_STATUS_CHOICES,
      colCount: 1,
      showOtherItem: true,
      otherText: DE_RELATIONSHIP_STATUS_OTHER_TEXT,

    },
    {
      name: "A-DE6",
      type: "radiogroup",
      title: DE_PREGNANT_TITLE,
      isRequired: true,
      choices: DE_PREGNANT_CHOICES,
      colCount: 1,
    },
    {
      name: "A-DE7",
      type: "radiogroup",
      title: DE_EDUCATION_TITLE,
      isRequired: true,
      choices: DE_EDUCATION_CHOICES,
      colCount: 1,
    },
    {
      name: "A-DE8",
      type: "radiogroup",
      title: DE_MINORITY_TITLE,
      isRequired: true,
      choices: DE_MINORITY_CHOICES,
      colCount: 1,
      showOtherItem: true,
      otherText: DE_MINORITY_OTHER_TEXT,
    },
    {
      type: "html",
      html: DE_POLITICAL_HTML,
    },
    {
      type: "panel",
      name: "political-social-panel",
      title: DE_POLITICAL_SOCIAL_TITLE,
      elements: [
        {
          name: "A-PO1",
          title: " ",
          type: "slider",
          min: -50,
          max: 50,
          step: 1,
          isRequired: true,
          customLabels: [
            { value: -50, text: DE_POLITICAL_LABELS["0"] },
            { value: 0, text: DE_POLITICAL_LABELS["50"] },
            { value: 50, text: DE_POLITICAL_LABELS["100"] },
          ],
          visibleIf: "{A-PO1a} notcontains 'Prefer not to say'",
        },
        {
          name: "A-PO1a",
          type: "checkbox",
          title: " ",
          choices: [DE_PREFER_NOT_TO_SAY],
        },
      ],
    },
    {
      type: "html",
      html: "<div style='margin-top: 20px;'></div>",
    },
    {
      type: "panel",
      name: "political-economic-panel",
      title: DE_POLITICAL_ECONOMIC_TITLE,
      elements: [
        {
          name: "A-PO2",
          type: "slider",
          title: " ",
          min: -50,
          max: 50,
          step: 1,
          isRequired: true,
          customLabels: [
            { value: -50, text: DE_POLITICAL_LABELS["0"] },
            { value: 0, text: DE_POLITICAL_LABELS["50"] },
            { value: 50, text: DE_POLITICAL_LABELS["100"] },
          ],
          visibleIf: "{A-PO2a} notcontains 'Prefer not to say'",
        },
        {
          name: "A-PO2a",
          type: "checkbox",
          title: " ",
          choices: [DE_PREFER_NOT_TO_SAY],
        },
      ],
    },
  ],
};

const de_extended_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "DemographicsExtended" },
  survey_json: de_extended_json,
  button_label: DE_BUTTON_LABEL,
  on_finish: function (data) {
    if (
      data.response["A-DE7a"] &&
      data.response["A-DE7a"].includes(DE_PREFER_NOT_TO_SAY)
    ) {
      data.response["A-DE7"] = -99;
    }
    if (
      data.response["A-DE8a"] &&
      data.response["A-DE8a"].includes(DE_PREFER_NOT_TO_SAY)
    ) {
      data.response["A-DE8"] = -99;
    }
  },
  min_width: "min(100vw, 1200px)",
};

const final_comments_trial = {
  type: jsPsychSurvey,
  data: { survey_page: "FinalComments" },
  survey_json: {
    showQuestionNumbers: false,
    completeText: FINAL_BUTTON_LABEL,
    pages: [
      {
        elements: [
          {
            name: "A-FINALCOMMENTS",
            type: "comment",
            title: FINAL_COMMENTS_TITLE,
          },
        ],
      },
    ],
  },
  min_width: "min(100vw, 1200px)",
};
