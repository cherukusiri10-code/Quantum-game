// ==========================================
// QUANTUM DETECTIVE
// MAIN GAME CONTROLLER
// ==========================================


// ------------------------------------------
// GAME VARIABLES
// ------------------------------------------

let currentLevel = 1;

let selectedEvidence = null;

let evidenceCollected = [];

let score = 0;

let investigationStarted = false;

let gameFinished = false;


// ------------------------------------------
// ELEMENTS
// ------------------------------------------

const measureButton =
    document.getElementById("measure-button");

const resetButton =
    document.getElementById("reset-button");

const interferenceButton =
    document.getElementById("interference-button");

const alexBar =
    document.getElementById("alex-bar");

const mayaBar =
    document.getElementById("maya-bar");

const raviBar =
    document.getElementById("ravi-bar");

const alexProbability =
    document.getElementById("alex-probability");

const mayaProbability =
    document.getElementById("maya-probability");

const raviProbability =
    document.getElementById("ravi-probability");

const stateStatus =
    document.getElementById("state-status");

const gameMessage =
    document.getElementById("game-message");

const interferenceResult =
    document.getElementById("interference-result");


// ------------------------------------------
// UPDATE PROBABILITIES
// ------------------------------------------

function updateProbabilityDisplay() {

    let probabilities =
        getSuspectProbabilities();

    let alex =
        probabilities.Alex * 100;

    let maya =
        probabilities.Maya * 100;

    let ravi =
        probabilities.Ravi * 100;


    alexProbability.textContent =
        alex.toFixed(1) + "%";

    mayaProbability.textContent =
        maya.toFixed(1) + "%";

    raviProbability.textContent =
        ravi.toFixed(1) + "%";


    alexBar.style.width =
        alex + "%";

    mayaBar.style.width =
        maya + "%";

    raviBar.style.width =
        ravi + "%";
}


// ------------------------------------------
// SELECT EVIDENCE
// ------------------------------------------

function selectEvidence(evidence) {

    if (gameFinished) {
        return;
    }

    selectedEvidence = evidence;


    let evidenceNames = {

        keycard: "KEYCARD",

        camera: "SECURITY CAMERA",

        footprint: "FOOTPRINT",

        phone: "PHONE SIGNAL"

    };


    gameMessage.textContent =
        "Selected evidence: " +
        evidenceNames[evidence] +
        ". Click MEASURE to investigate.";


    // Add visual selection
    document
        .querySelectorAll(".evidence-card")
        .forEach(card => {

            card.classList.remove(
                "selected-evidence"
            );

        });


    let selectedCard =
        document.querySelector(
            `[onclick="selectEvidence('${evidence}')"]`
        );


    if (selectedCard) {

        selectedCard.classList.add(
            "selected-evidence"
        );

    }
}


// ------------------------------------------
// MEASURE EVIDENCE
// ------------------------------------------

if (measureButton) {

    measureButton.addEventListener(
        "click",
        function () {

            if (!selectedEvidence) {

                gameMessage.textContent =
                    "⚠️ Select evidence first.";

                return;
            }


            let result =
                measureEvidence(selectedEvidence);


            let name =
                selectedEvidence
                    .toUpperCase();


            let answer =
                result ? "YES" : "NO";


            stateStatus.textContent =
                "STATE COLLAPSED";


            gameMessage.textContent =
                "🔬 Measurement: " +
                name +
                " = " +
                answer;


            if (
                !evidenceCollected.includes(
                    selectedEvidence
                )
            ) {

                evidenceCollected.push(
                    selectedEvidence
                );

                score += 100;

            }


            updateProbabilityDisplay();


            updateGameProgress();

        }
    );

}


// ------------------------------------------
// RESET
// ------------------------------------------

if (resetButton) {

    resetButton.addEventListener(
        "click",
        function () {

            resetQuantumState();

            selectedEvidence = null;

            stateStatus.textContent =
                "SUPERPOSITION";


            gameMessage.textContent =
                "Quantum state reset. Possible cases restored.";


            document
                .querySelectorAll(".evidence-card")
                .forEach(card => {

                    card.classList.remove(
                        "selected-evidence"
                    );

                });


            updateProbabilityDisplay();

        }
    );

}


// ==========================================
// INTERFERENCE
// ==========================================

if (interferenceButton) {

    interferenceButton.addEventListener(
        "click",
        function () {

            let result =
                randomInterference();


            let percentage =
                result.probability * 100;


            if (percentage > 70) {

                interferenceResult.textContent =
                    "🟢 CONSTRUCTIVE INTERFERENCE — " +
                    "The investigation paths reinforce each other! " +
                    percentage.toFixed(1) +
                    "% probability.";

                interferenceResult.className =
                    "constructive";

                score += 150;

            }

            else if (percentage < 20) {

                interferenceResult.textContent =
                    "🔴 DESTRUCTIVE INTERFERENCE — " +
                    "The paths cancel each other! " +
                    percentage.toFixed(1) +
                    "% probability.";

                interferenceResult.className =
                    "destructive";

            }

            else {

                interferenceResult.textContent =
                    "🟡 PARTIAL INTERFERENCE — " +
                    "The paths partially reinforce each other. " +
                    percentage.toFixed(1) +
                    "% probability.";

                interferenceResult.className =
                    "partial";

            }


            gameMessage.textContent =
                "⚛️ Quantum interference completed.";

            updateScore();

        }
    );

}


// ==========================================
// GAME PROGRESS
// ==========================================

function updateGameProgress() {

    let level =
        getCurrentLevel();


    if (
        evidenceCollected.length >=
        level.requiredEvidence
    ) {

        gameMessage.textContent =
            "✅ Level objective completed! " +
            "You can continue the investigation.";

        score += 200;

        showNextLevelButton();

    }


    updateScore();

}


// ------------------------------------------
// SCORE
// ------------------------------------------

function updateScore() {

    let scoreElement =
        document.getElementById("score");

    if (scoreElement) {

        scoreElement.textContent =
            score;

    }

}


// ------------------------------------------
// NEXT LEVEL BUTTON
// ------------------------------------------

function showNextLevelButton() {

    let button =
        document.getElementById(
            "next-level-button"
        );


    if (!button) {

        button =
            document.createElement("button");

        button.id =
            "next-level-button";

        button.textContent =
            "➡️ NEXT LEVEL";

        button.addEventListener(
            "click",
            nextLevel
        );


        document
            .getElementById("game-message")
            .appendChild(button);

    }

}


// ------------------------------------------
// NEXT LEVEL
// ------------------------------------------

function nextLevel() {

    if (currentLevel < levels.length) {

        currentLevel++;

        evidenceCollected = [];

        selectedEvidence = null;

        resetQuantumState();


        stateStatus.textContent =
            "SUPERPOSITION";


        let level =
            getCurrentLevel();


        gameMessage.textContent =
            "LEVEL " +
            level.number +
            ": " +
            level.title +
            " — " +
            level.objective;


        let button =
            document.getElementById(
                "next-level-button"
            );


        if (button) {

            button.remove();

        }


        updateProbabilityDisplay();

    }

    else {

        startFinalCase();

    }

}


// ==========================================
// FINAL CASE
// ==========================================

function startFinalCase() {

    currentLevel = 5;

    gameMessage.textContent =
        "🔎 FINAL CASE: Determine who stole the Quantum Artifact.";


    showFinalCaseButtons();

}


// ------------------------------------------
// FINAL CASE BUTTONS
// ------------------------------------------

function showFinalCaseButtons() {

    let container =
        document.getElementById(
            "final-case"
        );


    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "final-case";

        container.innerHTML = `

            <h2>🕵️ FINAL ACCUSATION</h2>

            <p>
                Based on your quantum investigation,
                identify the suspect.
            </p>

            <button onclick="accuse('Alex')">
                Accuse Alex
            </button>

            <button onclick="accuse('Maya')">
                Accuse Maya
            </button>

            <button onclick="accuse('Ravi')">
                Accuse Ravi
            </button>

        `;


        document
            .querySelector(".game-container")
            .appendChild(container);

    }

}


// ------------------------------------------
// ACCUSE SUSPECT
// ------------------------------------------

function accuse(suspect) {

    if (gameFinished) {
        return;
    }


    if (suspect === correctSuspect) {

        gameFinished = true;

        score += 500;


        gameMessage.textContent =
            "🎉 CASE SOLVED! Maya was the thief. " +
            "Your quantum investigation successfully revealed the culprit.";


        stateStatus.textContent =
            "CASE SOLVED";


        createRestartButton();

    }

    else {

        score -= 100;


        gameMessage.textContent =
            "❌ INCORRECT ACCUSATION. " +
            "The quantum evidence does not support this suspect.";


        updateScore();

    }

}


// ------------------------------------------
// RESTART
// ------------------------------------------

function createRestartButton() {

    let button =
        document.createElement("button");

    button.textContent =
        "🔄 PLAY AGAIN";


    button.onclick =
        function () {

            location.reload();

        };


    document
        .querySelector(".game-container")
        .appendChild(button);

}


// ------------------------------------------
// START INVESTIGATION
// ------------------------------------------

function startInvestigation() {

    investigationStarted = true;

    gameMessage.textContent =
        "🔍 Investigation started. " +
        "The case exists in quantum superposition. " +
        "Choose evidence and measure it.";


    updateProbabilityDisplay();

}


// ------------------------------------------
// INITIALIZE
// ------------------------------------------

updateProbabilityDisplay();

updateScore();

startInvestigation();