// ========================================
// GAME VARIABLES
// ========================================

let selectedEvidence = null;


// ========================================
// UPDATE PROBABILITY DISPLAY
// ========================================

function updateProbabilityDisplay() {

    let probabilities =
        getSuspectProbabilities();


    // Alex

    let alex =
        probabilities.Alex * 100;

    document.getElementById(
        "alex-probability"
    ).innerText =
        alex.toFixed(1) + "%";

    document.getElementById(
        "alex-bar"
    ).style.width =
        alex + "%";


    // Maya

    let maya =
        probabilities.Maya * 100;

    document.getElementById(
        "maya-probability"
    ).innerText =
        maya.toFixed(1) + "%";

    document.getElementById(
        "maya-bar"
    ).style.width =
        maya + "%";


    // Ravi

    let ravi =
        probabilities.Ravi * 100;

    document.getElementById(
        "ravi-probability"
    ).innerText =
        ravi.toFixed(1) + "%";

    document.getElementById(
        "ravi-bar"
    ).style.width =
        ravi + "%";
}


// ========================================
// SELECT EVIDENCE
// ========================================

function selectEvidence(evidence) {

    selectedEvidence = evidence;


    let message =
        document.getElementById(
            "game-message"
        );


    if (evidence === "keycard") {

        message.innerText =
            "🔑 Keycard selected. Click MEASURE to investigate it.";

    }


    else if (evidence === "camera") {

        message.innerText =
            "📹 Camera selected. Click MEASURE to investigate it.";

    }


    else if (evidence === "footprint") {

        message.innerText =
            "👣 Footprint selected. Click MEASURE to investigate it.";

    }


    else if (evidence === "phone") {

        message.innerText =
            "📱 Phone signal selected. Click MEASURE to investigate it.";

    }

}


// ========================================
// MEASURE BUTTON
// ========================================

document.getElementById(
    "measure-button"
).addEventListener(
    "click",
    function () {


        if (selectedEvidence === null) {

            document.getElementById(
                "game-message"
            ).innerText =
                "⚠️ Select evidence first.";

            return;

        }


        // Perform evidence measurement

        let result =
            measureEvidence(
                selectedEvidence
            );


        updateProbabilityDisplay();


        document.getElementById(
            "state-status"
        ).innerText =
            "STATE COLLAPSED";


        let resultText =
            result ? "YES" : "NO";


        document.getElementById(
            "game-message"
        ).innerText =
            "⚛️ Measurement complete! " +
            selectedEvidence.toUpperCase() +
            " = " +
            resultText +
            ". Quantum state updated.";

    }
);


// ========================================
// RESET BUTTON
// ========================================

document.getElementById(
    "reset-button"
).addEventListener(
    "click",
    function () {

        resetQuantumState();

        updateProbabilityDisplay();


        document.getElementById(
            "state-status"
        ).innerText =
            "SUPERPOSITION";


        document.getElementById(
            "game-message"
        ).innerText =
            "🔄 Quantum state restored.";

    }
);


// ========================================
// INITIALIZE GAME
// ========================================

updateProbabilityDisplay();