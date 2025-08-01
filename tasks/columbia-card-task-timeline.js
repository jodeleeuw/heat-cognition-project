var jsPsychTimelineColumbiaCardTask = (function (exports) {
    'use strict';

    // Default configuration
    const DEFAULT_N_CARDS = 16;
    const DEFAULT_COLS = 4;
    const DEFAULT_ROUNDS = [
        { loss_cards: 1, gain_amount: 10, loss_amount: 250 },
        { loss_cards: 1, gain_amount: 10, loss_amount: 250 },
        { loss_cards: 1, gain_amount: 10, loss_amount: 250 },
        { loss_cards: 1, gain_amount: 10, loss_amount: 250 }
    ];

    // State management
    let state = {
        total_score: 0,
        round_data: null,
        rounds_completed: 0
    };

    function resetState() {
        state = {
            total_score: 0,
            round_data: null,
            rounds_completed: 0
        };
    }

    // Create instructions using the text object
    function createInstructions(textObj, enable_tts = false) {
        return {
            type: jsPsychInstructions,  // Use the global plugin reference
            pages: textObj.instructionPages,
            show_clickable_nav: true,
            allow_keys: true,
            key_forward: 'ArrowRight',
            key_backward: 'ArrowLeft',
            button_label_previous: textObj.buttons.previous,
            button_label_next: textObj.buttons.next,
            data: {
                phase: 'instructions'
            }
        };
    }

    // Create round information display
    function createRoundInfo(round_num, totalRounds, round_config, textObj) {
        return {
            type: jsPsychHtmlKeyboardResponse,  // Use keyboard response like the card game
            stimulus: () => {
                return `<div class="timeline-trial">
                    <div class="round-info">
                        <h2>${textObj.roundInfo.roundHeader(round_num, totalRounds)}</h2>
                        <p>${textObj.roundInfo.lossCards} <b style="color:#EF4444">${round_config.loss_cards}</b></p>
                        <p>${textObj.roundInfo.lossPenalty} <b style="color:#EF4444">-${round_config.loss_amount}</b></p>
                        <p>${textObj.roundInfo.gainPerCard} <b style="color:#22C55E">+${round_config.gain_amount}</b></p>
                        <p>${textObj.roundInfo.totalScore} <span class="score-display">${state.total_score}</span></p>
                    </div>
                    <div class="timeline-btn-container">
                        <button class="timeline-html-btn" id="start-btn">${textObj.buttons.start}</button>
                    </div>
                </div>`;
            },
            choices: 'NO_KEYS',
            on_load: function() {
                const startBtn = document.getElementById('start-btn');
                if (startBtn) {
                    startBtn.addEventListener('click', function() {
                        jsPsych.finishTrial();
                    });
                }
            }
        };
    }

    // Setup round mechanics
    function setupRound(jsPsych, cfg, round_num, cols, n_cards, textObj) {
        // Generate random loss positions
        const lossPositions = [];
        while (lossPositions.length < cfg.loss_cards) {
            const pos = Math.floor(Math.random() * n_cards);
            if (!lossPositions.includes(pos)) lossPositions.push(pos);
        }

        // Initialize round data
        state.round_data = {
            score: 0,
            cards: 0,
            ended: false,
            start_time: Date.now(),
            selections: []
        };

        // Add click handlers to cards
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, i) => {
            card.addEventListener('click', function() {
                if (!state.round_data || state.round_data.ended || !this.classList.contains('card-back')) return;

                state.round_data.cards++;
                state.round_data.selections.push({ 
                    card: i, 
                    time: Date.now() - state.round_data.start_time 
                });

                if (lossPositions.includes(i)) {
                    // Loss card
                    this.className = 'card card-loss';
                    this.textContent = textObj.feedback.lossCardValue(cfg.loss_amount);
                    state.round_data.score -= cfg.loss_amount;
                    state.round_data.ended = true;
                    
                    const messageEl = document.getElementById('message');
                    if (messageEl) {
                        messageEl.innerHTML = `<b style="color:#EF4444">${textObj.feedback.lossCard}</b>`;
                    }
                    
                    setTimeout(() => endRound(jsPsych, cfg, round_num, false), 2000);
                } else {
                    // Gain card
                    this.className = 'card card-gain';
                    this.textContent = textObj.feedback.gainCard(cfg.gain_amount);
                    state.round_data.score += cfg.gain_amount;
                    
                    const scoreEl = document.getElementById('round-score');
                    if (scoreEl) {
                        scoreEl.textContent = state.round_data.score.toString();
                    }
                    
                    // Check if all gain cards found
                    if (state.round_data.cards === n_cards - cfg.loss_cards) {
                        state.round_data.ended = true;
                        const messageEl = document.getElementById('message');
                        if (messageEl) {
                            messageEl.innerHTML = `<b style="color:#22C55E">${textObj.feedback.allGainCards}</b>`;
                        }
                        setTimeout(() => endRound(jsPsych, cfg, round_num, true), 2000);
                    }
                }
            });
        });

        // Stop button handler
        const stopBtn = document.getElementById('stop-btn');
        if (stopBtn) {
            stopBtn.addEventListener('click', function() {
                if (state.round_data && !state.round_data.ended) {
                    state.round_data.ended = true;
                    const messageEl = document.getElementById('message');
                    if (messageEl) {
                        messageEl.innerHTML = `<b style="color:#1E3A8A">${textObj.feedback.roundStopped}</b>`;
                    }
                    setTimeout(() => endRound(jsPsych, cfg, round_num, true), 1500);
                }
            });
        }
    }

    // End round and record data
    function endRound(jsPsych, cfg, round_num, voluntary) {
        if (!state.round_data) return;
        
        state.total_score += state.round_data.score;
        state.rounds_completed++;
        
        // Store the data
        jsPsych.data.addDataToLastTrial({
            task: 'round_complete',
            round: round_num,
            ...cfg,
            cards_selected: state.round_data.cards,
            round_score: state.round_data.score,
            total_score: state.total_score,
            voluntary_stop: voluntary,
            selections: state.round_data.selections,
            rt: Date.now() - state.round_data.start_time
        });
        
        jsPsych.finishTrial();
    }

    // Create card game trial
    function createCardGame(jsPsych, round_num, round_config, n_cards, cols, textObj) {
        return {
            type: jsPsychHtmlKeyboardResponse,  // Use the global plugin reference
            stimulus: function() {
                const cards = Array.from(
                    { length: n_cards },
                    (_, i) => `<div class="card card-back" id="card-${i}">${textObj.gameDisplay.cardSymbol}</div>`
                ).join('');
                
                return `<div class="timeline-trial">
                    <style>.card-grid { grid-template-columns: repeat(${cols}, 1fr) !important; }</style>
                    <div class="game-info">
                        <h3>${textObj.gameDisplay.roundLabel(round_num)}</h3>
                        <p id="round-score">${textObj.gameDisplay.scoreLabel(0, state.total_score)}</p>
                    </div>
                    <div class="card-grid">
                        ${cards}
                    </div>
                    <div class="timeline-btn-container">
                        <button class="stop-button timeline-html-btn" id="stop-btn">${textObj.buttons.stop}</button>
                    </div>
                    <div id="message"></div>
                </div>`;
            },
            choices: 'NO_KEYS',
            on_load: function() {
                setupRound(jsPsych, round_config, round_num, cols, n_cards, textObj);
            }
        };
    }

    // Create results screen
    function createResults(jsPsych, textObj) {
        return {
            type: jsPsychHtmlButtonResponse,  // Use the global plugin reference
            stimulus: function() {
                const data = jsPsych.data.get().filter({ task: 'round_complete' });
                const avg_cards = data.count() > 0 ? data.select('cards_selected').mean() : 0;
                let final_score = 0;
                if (data.count() > 0) {
                    const scores = data.select('total_score').values;
                    final_score = scores[scores.length - 1];
                }
                
                return `<div class="timeline-trial">
                    <div class="round-info">
                        <h2>${textObj.results.header}</h2>
                        <p>${textObj.results.finalScore} <span class="score-display">${final_score}</span></p>
                        <p>${textObj.results.avgCardsSelected} ${avg_cards.toFixed(1)}</p>
                    </div>
                </div>`;
            },
            choices: [textObj.buttons.continue],
            button_html: (choice) => `<button class="timeline-html-btn">${choice}</button>`
        };
    }

    // Main timeline creation function
    function createTimeline(jsPsych, {
        n_cards = DEFAULT_N_CARDS,
        cols = DEFAULT_COLS,
        rounds = DEFAULT_ROUNDS,
        show_instructions = true,
        show_results = true,
        enable_tts = false,
        text = window.ColumbiaCardTaskText
    } = {}) {
        resetState();
        const timeline = [];

        // Add instructions if enabled
        if (show_instructions) {
            timeline.push(createInstructions(text, enable_tts));
        }

        // Add rounds
        rounds.forEach((round_config, idx) => {
            const round_num = idx + 1;
            timeline.push(createRoundInfo(round_num, rounds.length, round_config, text));
            timeline.push(createCardGame(jsPsych, round_num, round_config, n_cards, cols, text));
        });

        // Add results if enabled
        if (show_results) {
            timeline.push(createResults(jsPsych, text));
        }

        return timeline;
    }

    // Export functions
    exports.createTimeline = createTimeline;
    exports.createInstructions = createInstructions;
    exports.createRoundInfo = createRoundInfo;
    exports.createCardGame = createCardGame;
    exports.createResults = createResults;
    exports.utils = {
        resetState,
        setupRound,
        endRound
    };

    return exports;
})({});