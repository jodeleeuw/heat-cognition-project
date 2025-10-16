var jsPsychSurveySvo = (function (jspsych) {
  'use strict';

  var version = "1.0.0";

  const info = {
    name: "survey-svo",
    version,
    parameters: {
      /** Array of question objects */
      questions: {
        type: jspsych.ParameterType.COMPLEX,
        array: true,
        default: void 0,
        nested: {
          /** Array of numbers corresponding to self values (top row) */
          self_values: {
            type: jspsych.ParameterType.INT,
            array: true,
            default: void 0
          },
          /** Array of numbers corresponding to other values (bottom row) */
          other_values: {
            type: jspsych.ParameterType.INT,
            array: true,
            default: void 0
          },
          /** Label for self values */
          self_label: {
            type: jspsych.ParameterType.STRING,
            default: "You receive"
          },
          /** Label for other values */
          other_label: {
            type: jspsych.ParameterType.STRING,
            default: "Other receives"
          },
          /** Name identifier for the question */
          name: {
            type: jspsych.ParameterType.STRING,
            default: ""
          },
          /** Optional prompt/instruction for this specific question */
          prompt: {
            type: jspsych.ParameterType.HTML_STRING,
            default: null
          }
        }
      },
      /** Optional preamble text */
      preamble: {
        type: jspsych.ParameterType.HTML_STRING,
        default: null
      },
      /** Button label for submit button */
      button_label: {
        type: jspsych.ParameterType.STRING,
        default: "Continue"
      },
      /** Require a selection for all questions before continuing */
      require_selection: {
        type: jspsych.ParameterType.BOOL,
        default: true
      },
      /** Randomize question order */
      randomize_question_order: {
        type: jspsych.ParameterType.BOOL,
        default: false
      }
    },
    data: {
      /** The response time in milliseconds */
      rt: {
        type: jspsych.ParameterType.INT
      },
      /** Object with question names as keys and selected options (0 to n-1) as values */
      response: {
        type: jspsych.ParameterType.OBJECT
      },
      /** The order in which questions were presented */
      question_order: {
        type: jspsych.ParameterType.STRING
      }
    }
  };

  class SurveySvoPlugin {
    constructor(jsPsych) {
      this.jsPsych = jsPsych;
    }
    static {
      this.info = info;
    }
    trial(display_element, trial) {
      // Validate that all questions have matching array lengths
      for (let i = 0; i < trial.questions.length; i++) {
        if (trial.questions[i].self_values.length !== trial.questions[i].other_values.length) {
          console.error("plugin-survey-svo: question " + i + ": self_values and other_values must be the same length");
          return;
        }
      }

      let html = '<div id="jspsych-survey-svo-wrapper" style="margin: 50px auto; max-width: 1000px;">';
      
      // Preamble
      if (trial.preamble !== null) {
        html += '<div id="jspsych-survey-svo-preamble" class="jspsych-survey-svo-preamble" style="margin-bottom: 30px; text-align: center;">' + trial.preamble + "</div>";
      }

      html += '<form id="jspsych-survey-svo-form" autocomplete="off">';
      
      // Determine question order
      let questionOrder = [];
      for (let i = 0; i < trial.questions.length; i++) {
        questionOrder.push(i);
      }
      if (trial.randomize_question_order) {
        questionOrder = this.jsPsych.randomization.shuffle(questionOrder);
      }

      for (let i = 0; i < trial.questions.length; i++) {
        let question = trial.questions[questionOrder[i]];
        let questionId = questionOrder[i];
        
        html += '<div class="jspsych-survey-svo-question" style="margin-bottom: 40px;">';
        
        if (question.prompt !== null) {
          html += '<div class="jspsych-survey-svo-prompt" style="margin-bottom: 20px; text-align: center; font-weight: bold;">' + question.prompt + '</div>';
        }
        
        html += '<div class="jspsych-survey-svo-labels" style="display: flex; align-items: center; gap: 20px; justify-content: center;">';
        
        html += '<div style="display: flex; flex-direction: column; justify-content: center; gap: 20px; min-width: 150px;">';
        html += '<div style="font-weight: bold; text-align: right;">' + question.self_label + '</div>';
        html += '<div style="font-weight: bold; text-align: right;">' + question.other_label + '</div>';
        html += '</div>';
        
        html += '<div style="display: flex; flex-direction: row; gap: 10px; flex-wrap: nowrap;">';

        for (let j = 0; j < question.self_values.length; j++) {
          html += '<button type="button" class="jspsych-survey-svo-button jspsych-btn" data-question="' + questionId + '" data-choice="' + j + '" style="display: flex; flex-direction: column; align-items: center; justify-content: space-between; padding: 15px 20px; min-width: 70px; min-height: 100px; box-sizing: border-box; border: 2px solid #ccc;">';
          html += '<div style="font-size: 16px; font-weight: bold;">' + question.self_values[j] + '</div>';
          html += '<div style="font-size: 16px; font-weight: bold; margin-top: 30px;">' + question.other_values[j] + '</div>';
          html += '</button>';
        }

        html += '</div>'; 
        html += '</div>'; 
        html += '</div>'; 
      }
      
      html += '<div style="margin-top: 30px; text-align: center;">';
      html += '<input type="submit" id="jspsych-survey-svo-next" class="jspsych-btn" value="' + trial.button_label + '"';
      if (trial.require_selection) {
        html += ' disabled';
      }
      html += '></input>';
      html += '</div>';
      
      html += '</form>';
      html += '</div>';

      display_element.innerHTML = html;

      let selectedChoices = {};
      let buttons = display_element.querySelectorAll('.jspsych-survey-svo-button');
      
      let checkAllAnswered = () => {
        if (!trial.require_selection) return true;
        
        let allAnswered = true;
        for (let i = 0; i < trial.questions.length; i++) {
          if (selectedChoices[questionOrder[i]] === undefined) {
            allAnswered = false;
            break;
          }
        }
        
        document.getElementById('jspsych-survey-svo-next').disabled = !allAnswered;
        return allAnswered;
      };
      
      buttons.forEach((button) => {
        button.addEventListener('click', function() {
          const questionId = parseInt(button.getAttribute('data-question'));
          const choice = parseInt(button.getAttribute('data-choice'));
          
          const questionButtons = display_element.querySelectorAll('.jspsych-survey-svo-button[data-question="' + questionId + '"]');
          questionButtons.forEach(function(btn) {
            btn.classList.remove('svo-selected');
            btn.style.backgroundColor = '';
            btn.style.borderColor = '#ccc';
          });
          
          button.classList.add('svo-selected');
          button.style.backgroundColor = '#e0e0e0';
          button.style.borderColor = '#333';
          
          selectedChoices[questionId] = choice;
          checkAllAnswered();
        });
      });

      // Handle form submission
      display_element.querySelector('#jspsych-survey-svo-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (trial.require_selection && !checkAllAnswered()) {
          return;
        }
        
        const endTime = performance.now();
        const responseTime = endTime - startTime;

        // Build response object with question names as keys
        let responseObject = {};
        for (let i = 0; i < trial.questions.length; i++) {
          const questionIndex = questionOrder[i];
          const question = trial.questions[questionIndex];
          const name = question.name || ("Q" + questionIndex);
          responseObject[name] = selectedChoices[questionIndex] !== undefined ? selectedChoices[questionIndex] : null;
        }
        
        var trialData = {
          rt: responseTime,
          response: responseObject,
          question_order: JSON.stringify(questionOrder)
        };
        
        this.jsPsych.finishTrial(trialData);
      });

      var startTime = performance.now();
    }
  }

  return SurveySvoPlugin;

})(jsPsychModule);
