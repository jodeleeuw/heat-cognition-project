// Columbia Card Task - jsPsych v8.2.1 Experiment

// Configuration and text content
const trial_text = {
    // Button texts
    continue_button: "Continue",
    start_button: "Start",
    ready_button: "I'm Ready",
    end_button: "End",
    // Instruction pages buttons text
    next_button: "",
    back_button: "", 
    // Task completion messages
    task_complete_header: "Task Complete!",
    task_complete_message: "Thank you for participating in the Columbia Card Task.",
    
    // Practice phase text
    practice_header: "Practice Round",
    practice_intro_message: "We'll now do a practice round to show you how the task works.",
    practice_look_instruction: "Look at this picture",
    practice_tap_instruction: "Tap the matching picture below",
    practice_complete_header: "Are you ready?",
    practice_complete_message: "Practice complete! Ready for the full test?",
    
    // Main task instructions
    main_task_prompt: "Tap the matching picture below",
    
    // Fixation and inter-trial
    fixation_cross: "+",
    
    // Feedback messages (optional)
    correct_feedback: "Correct!",
    incorrect_feedback: "Try again",
    
    // Timing messages
    too_slow_message: "Please respond faster",
};

const instruction_pages = [
    "In this task, you will see a stack of cards. You turn over cards one by one to collect points, and each card gives you more points.",
    "But there is a risk: Some cards are \"danger\" cards. If you flip one of those, you lose all points from that round.",
    "So, at any point, you may pass, and keep your points for that round."
];

// Constants
const default_n_cards = 16;
const default_cols = 4;
const enable_tts = true;

// Generate 30 trials (3 blocks of 10 trials each)
const rounds_config = Array.from({ length: 30 }, () => ({
    loss_cards: 1, 
    gain_amount: 10, 
    loss_amount: 250 
}));

// Game state
let state = {
    total_score: 0,
    round_data: null,
    rounds_completed: 0
};

// Helper functions for TTS
function speakText(text) {
    if ('speechSynthesis' in window) {
        if ('speechSynthesis' in window) {
            speechSynthesis.cancel();
        }
        
        setTimeout(() => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.8;
            utterance.volume = 0.8;
            utterance.voice = speechSynthesis.getVoices()[0] || null;
            speechSynthesis.speak(utterance);
        }, 100);
    }
}

function extractTextFromHtml(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent?.replace(/\s+/g, ' ').trim() || '';
}

// Reset state function
function resetState() {
    state = {
        total_score: 0,
        round_data: null,
        rounds_completed: 0
    };
}

// End round function
function endRound(jsPsych, cfg, round_num, voluntary) {
    if (!state.round_data) return;
    
    // Clear the timer if it exists
    if (state.round_data.timer_id) {
        clearTimeout(state.round_data.timer_id);
    }
    
    state.total_score += state.round_data.score;
    state.rounds_completed++;
    
    // Store trial data
    jsPsych.data.addProperties({
        task: 'round_complete',
        round: round_num,
        block: Math.ceil(round_num / 10),
        trial_in_block: ((round_num - 1) % 10) + 1,
        loss_cards: cfg.loss_cards,
        gain_amount: cfg.gain_amount,
        loss_amount: cfg.loss_amount,
        cards_selected: state.round_data.cards,
        round_score: state.round_data.score,
        total_score: state.total_score,
        voluntary_stop: voluntary,
        selections: state.round_data.selections,
        rt: Date.now() - state.round_data.start_time
    });
    
    jsPsych.finishTrial();
}

// Setup round function
function setupRound(jsPsych, cfg, round_num, cols, n_cards) {
    // Create card layout
    const lossPositions = [];
    while (lossPositions.length < cfg.loss_cards) {
        const pos = Math.floor(Math.random() * n_cards);
        if (!lossPositions.includes(pos)) lossPositions.push(pos);
    }
    
    state.round_data = {
        score: 0,
        cards: 0,
        ended: false,
        start_time: Date.now(),
        selections: []
    };
    
    // Set up 15-second timer
    const timer_id = window.setTimeout(() => {
        if (state.round_data && !state.round_data.ended) {
            state.round_data.ended = true;
            const messageEl = document.getElementById('message');
            if (messageEl) {
                messageEl.innerHTML = '<b style="color:#1E3A8A">Time expired! Round ended.</b>';
            }
            setTimeout(() => endRound(jsPsych, cfg, round_num, true), 1500);
        }
    }, 15000); // 15 seconds
    
    state.round_data.timer_id = timer_id;
    
    // Card click handlers
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, i) => {
        card.addEventListener('click', function() {
            if (!state.round_data || state.round_data.ended || !this.classList.contains('card-back')) return;
            
            state.round_data.cards++;
            state.round_data.selections.push({card: i, time: Date.now() - state.round_data.start_time});
            
            if (lossPositions.includes(i)) {
                this.className = 'card card-loss';
                this.textContent = `-${cfg.loss_amount}`;
                state.round_data.score -= cfg.loss_amount;
                state.round_data.ended = true;
                const messageEl = document.getElementById('message');
                if (messageEl) {
                    messageEl.innerHTML = '<b style="color:#EF4444">Loss card! Round ended.</b>';
                }
                setTimeout(() => endRound(jsPsych, cfg, round_num, false), 2000);
            } else {
                this.className = 'card card-gain';
                this.textContent = `+${cfg.gain_amount}`;
                state.round_data.score += cfg.gain_amount;
                const scoreEl = document.getElementById('round-score');
                if (scoreEl) {
                    scoreEl.textContent = state.round_data.score.toString();
                }
                
                if (state.round_data.cards === n_cards - cfg.loss_cards) {
                    state.round_data.ended = true;
                    const messageEl = document.getElementById('message');
                    if (messageEl) {
                        messageEl.innerHTML = '<b style="color:#22C55E">All gain cards found!</b>';
                    }
                    setTimeout(() => endRound(jsPsych, cfg, round_num, true), 2000);
                }
            }
        });
    });
    
    // Stop button
    const stopBtn = document.getElementById('stop-btn');
    if (stopBtn) {
        stopBtn.addEventListener('click', function() {
            if (state.round_data && !state.round_data.ended) {
                state.round_data.ended = true;
                const messageEl = document.getElementById('message');
                if (messageEl) {
                    messageEl.innerHTML = '<b style="color:#1E3A8A">Round stopped!</b>';
                }
                setTimeout(() => endRound(jsPsych, cfg, round_num, true), 1500);
            }
        });
    }
}

// Create instructions trial
function createInstructions() {
    let handleButtonClick = null;

    return {
        type: jsPsychInstructions,
        pages: instruction_pages.map(page => `<div class="instructions-container"><p>${page}</p></div>`),
        show_clickable_nav: true,
        allow_keys: true,
        key_forward: 'ArrowRight',
        key_backward: 'ArrowLeft',
        button_label_previous: trial_text.back_button,
        button_label_next: trial_text.next_button,
        on_start: function() {
            speechSynthesis.cancel();
        },
        on_load: function() {
            if (enable_tts) {
                const speakCurrentPage = () => {
                    const instructionsContent = document.querySelector('.instructions-container');
                    if (instructionsContent) {
                        const pageText = extractTextFromHtml(instructionsContent.innerHTML);
                        if (pageText.trim()) {
                            speakText(pageText);
                        }
                    }
                };

                handleButtonClick = (event) => {
                    const target = event.target;
                    if (target && (target.id === 'jspsych-instructions-next' || target.id === 'jspsych-instructions-back')) {
                        speechSynthesis.cancel();
                        setTimeout(speakCurrentPage, 200);
                    }
                };

                document.addEventListener('click', handleButtonClick);
                setTimeout(speakCurrentPage, 300);
            }
        },
        on_finish: function(data) {
            speechSynthesis.cancel();
            if (handleButtonClick) {
                document.removeEventListener('click', handleButtonClick);
                handleButtonClick = null;
            }
            data.phase = 'instructions';
        }
    };
}

// Create round info trial
function createRoundInfo(round_num, round_config) {
    const block_num = Math.ceil(round_num / 10);
    const trial_in_block = ((round_num - 1) % 10) + 1;
    
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: () => {
            return `<div class="round-info">
                <h2>Block ${block_num} - Trial ${trial_in_block}</h2>
                <p>Loss cards: <b style="color:#EF4444">${round_config.loss_cards}</b></p>
                <p>Loss penalty: <b style="color:#EF4444">-${round_config.loss_amount}</b></p>
                <p>Gain per card: <b style="color:#22C55E">+${round_config.gain_amount}</b></p>
                <p>Total score: <span class="score-display">${state.total_score}</span></p>
                <p><small>15 seconds max per trial</small></p>
            </div>`;
        },
        choices: ['Start']
    };
}

// Create card game trial
function createCardGame(round_num, round_config, n_cards, cols) {
    return {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
            const cards = Array.from({length: n_cards}, (_, i) => 
                `<div class="card card-back" id="card-${i}">?</div>`
            ).join('');
            
            return `<style>.card-grid { grid-template-columns: repeat(${cols}, 1fr) !important; }</style>
                <div class="game-info">
                    <h3>Block ${Math.ceil(round_num / 10)} - Trial ${((round_num - 1) % 10) + 1}</h3>
                    <p>Score: <span id="round-score">0</span> | Total: ${state.total_score}</p>
                </div>
                <div class="card-grid">
                    ${cards}
                </div>
                <div class="button-container">
                    <button class="stop-button" id="stop-btn">Stop and Keep Points</button>
                </div>
                <div id="message"></div>`;
        },
        choices: "NO_KEYS",
        on_load: function() {
            setupRound(jsPsych, round_config, round_num, cols, n_cards);
        }
    };
}

// Create results trial
function createResults() {
    return {
        type: jsPsychHtmlButtonResponse,
        stimulus: function() {
            const data = jsPsych.data.get().filter({task: 'round_complete'});
            const avg_cards = data.count() > 0 ? data.select('cards_selected').mean() : 0;
            
            return `<div class="round-info">
                <h2>Task Complete!</h2>
                <p>Final Score: <span class="score-display">${state.total_score}</span></p>
                <p>Average cards selected: ${avg_cards.toFixed(1)}</p>
                <p>Thank you for participating in the Columbia Card Task.</p>
            </div>`;
        },
        choices: ['Continue']
    };
}

// Initialize jsPsych with JATOS integration
const jsPsych = initJsPsych({
    on_finish: () => jatos.startNextComponent(jsPsych.data.get().json())
});

// Build timeline
function buildTimeline() {
    resetState();
    
    const timeline = [];
    
    // Add instructions
    timeline.push(createInstructions());
    
    // Add rounds
    rounds_config.forEach((round_config, idx) => {
        const round_num = idx + 1;
        
        // Round info
        timeline.push(createRoundInfo(round_num, round_config));
        
        // Card game
        timeline.push(createCardGame(round_num, round_config, default_n_cards, default_cols));
    });
    
    // Add results
    timeline.push(createResults());
    
    return timeline;
}

// Run the experiment with JATOS
jatos.onLoad(() => {
    jsPsych.run(buildTimeline());
});