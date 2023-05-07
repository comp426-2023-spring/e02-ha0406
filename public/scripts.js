// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

import { rps } from "./rpsls.js";
import { rpsls } from "./rpsls.js";


// will need: show result, get u mode, get u input, then add event listeners to track and update on interaction

// show result ("find" result dynamically within function):
function show_result(g_outcome, g_play_opponent) {
    // first initialize result container
    const result_container = document.querySelector(".results");
    // opponent play message inner HTML
    if (g_play_opponent == true) {
        result_container.innerHTML = `
            <div class="result-summary">
                <span class="result-owner">You:</span>
                <span class="result-output">${g_outcome.player}</span>
            </div>
            <br />
            <div class="result-summary">
                <span class="result-owner">Your opponent:</span>
                <span class="result-output">${g_outcome.opponent}</span>
            </div>
            <br />
            <div class="result-summary">
                <span class="result-label">Result:</span>
                <span class="result-output"><strong>you ${g_outcome.result.toUpperCase()}<strong></span>
            </div>
            <br />`;
    // single player message innerHTML
    } else {
        result_container.innerHTML = `
            <div class="result-summary">
                <span class="result-output"><strong>${g_outcome.player.toUpperCase()}<strong></span>
            </div>`;
    }
}

// create initial helpers to prepare for dynamic result display:

// establish input values:
// get user mode
function get_u_mode() {
    const u_mode_button = document.querySelector(".mode-selection:checked");
    return u_mode_button ? u_mode_button.getAttribute("id") : null;
}
// get user input
function get_u_input() {
    const u_selection_button = document.querySelector(".selections-button:checked");
    return u_selection_button ? u_selection_button.getAttribute("selection-summary") : null;
}

// now begin to add event listeners to produce the targetted dynamic result:
// start with DOM content function, use all my included doc content as arg
document.addEventListener("DOMContentLoaded", () => {
    // initialize buttons
    const start_over_button = document.querySelector(".start-over-button");
    const play_button = document.querySelector(".play-button");
    
    // create nested event listener for play button (activate on "click")
    play_button.addEventListener("click", () => {
        // initialize opponent? and mode? constants
        const g_play_opponent = document.getElementById("opponent").checked;
        const mode = get_u_mode();
        
        // game logic: call rps and rpsls from rpsls.js
        var g_outcome;
        if (mode == "rps") {
            if (g_play_opponent == true) {
                const u_selection = get_u_input();
                g_outcome = rps(u_selection)
            } else {
                g_outcome = rps();
            }
        } else if (mode == "rpsls") {
            if (g_play_opponent == true) {
                const u_selection = get_u_input();
                g_outcome = rpsls(u_selection);
            } else {
                g_outcome = rpsls();
            } 
        }

        // show result w/ new args
        show_result(g_outcome, g_play_opponent);

        // hide play button so that user will intuitively start over and not be frustrated by unexpected actions
        play_button.setAttribute("hidden", true);
    }); 
    
    // next step: give START OVER button functionality w/ event listener (on click):
    start_over_button.addEventListener("click", () => {
        const result_container = document.querySelector(".results");
        // keep container HTML blank unless causes problems? Do this for others that don't have valid HTML
        result_container.innerHTML = "";

        // reset buttons, prepare for inputs, and reset opponent checkbox (out of caution bc not really button)

        // loop through rps or rpsls selection buttons and reset them (like rock, paper, scissors, etc.)
        // leave rps or rpsls selected
        const u_selection_buttons = document.querySelectorAll(".selections-button");
        u_selection_buttons.forEach((b) => {
            b.checked = false;
        });
        
        // reset checkbox separately
        const opp_checkbox = document.getElementById("opponent");
        opp_checkbox.checked = false;
        
        // unhide play button on reset
        play_button.removeAttribute("hidden");
        
        // container for inputs, prepare container for final HTML to show (depending on rps or rpsls)
        const u_selection_buttons_container = document.querySelector(".inputs");
        u_selection_buttons_container.innerHTML = "";
    });

    // for mode,
    document.querySelectorAll(".mode-selection").forEach((u_mode_button) => {
        // add what will essentially be an observer, watching for button change
        u_mode_button.addEventListener("change", () => {
            const u_selection_buttons_container = document.querySelector(".inputs");
            const g_play_opponent = document.getElementById("opponent").checked;

            // if not playing opponent, essentially do nothing in this func (don't present move selection buttons in single player)
            if (g_play_opponent == false) {
                u_selection_buttons_container.innerHTML = "";
                return;
            }
    
            const mode = get_u_mode();
            if (mode == "rps") {
                u_selection_buttons_container.innerHTML = `
                    <input type="radio" class="selections-button" name="user-choice" value="rock" selection-summary="rock"> Rock
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="paper" selection-summary="paper"> Paper
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="scissors" selection-summary="scissors"> Scissors`;
            } else if (mode == "rpsls") {
                u_selection_buttons_container.innerHTML = `
                    <input type="radio" class="selections-button" name="user-choice" value="rock" selection-summary="rock"> Rock
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="paper" selection-summary="paper"> Paper
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="scissors" selection-summary="scissors"> Scissors
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="lizard" selection-summary="lizard"> Lizard
                    <br />
                    <input type="radio" class="selections-button" name="user-choice" value="spock" selection-summary="spock"> Spock`;
            }
        });
    });
});