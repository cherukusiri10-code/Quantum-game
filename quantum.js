// ========================================
// QUANTUM DETECTIVE ENGINE
// ========================================

// Possible crime scenarios
//
// Each scenario contains:
// suspect
// keycard
// camera
// footprint
// phone

let scenarios = [

    {
        suspect: "Alex",
        keycard: true,
        camera: true,
        footprint: false,
        phone: false
    },

    {
        suspect: "Alex",
        keycard: false,
        camera: true,
        footprint: true,
        phone: false
    },

    {
        suspect: "Maya",
        keycard: true,
        camera: false,
        footprint: true,
        phone: false
    },

    {
        suspect: "Maya",
        keycard: false,
        camera: true,
        footprint: false,
        phone: true
    },

    {
        suspect: "Ravi",
        keycard: false,
        camera: false,
        footprint: true,
        phone: true
    },

    {
        suspect: "Ravi",
        keycard: true,
        camera: false,
        footprint: false,
        phone: true
    }

];


// ========================================
// QUANTUM AMPLITUDES
// ========================================

let scenarioAmplitudes = [

    { real: 0.50, imaginary: 0 },
    { real: 0.40, imaginary: 0 },

    { real: 0.45, imaginary: 0 },
    { real: 0.40, imaginary: 0 },

    { real: 0.35, imaginary: 0 },
    { real: 0.30, imaginary: 0 }

];


// ========================================
// CALCULATE PROBABILITY
// ========================================

function amplitudeProbability(amplitude) {

    return (
        amplitude.real * amplitude.real +
        amplitude.imaginary * amplitude.imaginary
    );
}


// ========================================
// GET SCENARIO PROBABILITIES
// ========================================

function getScenarioProbabilities() {

    let probabilities = [];

    let total = 0;


    for (let i = 0; i < scenarioAmplitudes.length; i++) {

        let probability =
            amplitudeProbability(
                scenarioAmplitudes[i]
            );

        probabilities.push(probability);

        total += probability;
    }


    // Normalize

    for (let i = 0; i < probabilities.length; i++) {

        probabilities[i] =
            probabilities[i] / total;

    }


    return probabilities;
}


// ========================================
// GET SUSPECT PROBABILITIES
// ========================================

function getSuspectProbabilities() {

    let scenarioProbabilities =
        getScenarioProbabilities();


    let suspects = {

        Alex: 0,
        Maya: 0,
        Ravi: 0

    };


    for (
        let i = 0;
        i < scenarios.length;
        i++
    ) {

        suspects[
            scenarios[i].suspect
        ] += scenarioProbabilities[i];

    }


    return suspects;
}


// ========================================
// MEASURE EVIDENCE
// ========================================

function measureEvidence(evidence) {

    let probabilities =
        getScenarioProbabilities();


    // Randomly choose YES or NO
    // based on the current quantum probabilities

    let totalEvidenceProbability = 0;


    for (
        let i = 0;
        i < scenarios.length;
        i++
    ) {

        if (scenarios[i][evidence] === true) {

            totalEvidenceProbability +=
                probabilities[i];

        }

    }


    let result =
        Math.random() <
        totalEvidenceProbability;


    // Collapse to compatible scenarios

    for (
        let i = 0;
        i < scenarios.length;
        i++
    ) {

        if (
            scenarios[i][evidence] !== result
        ) {

            scenarioAmplitudes[i] = {

                real: 0,

                imaginary: 0

            };

        }

    }


    // Renormalize

    normalizeScenarioAmplitudes();


    return result;

}


// ========================================
// NORMALIZE AMPLITUDES
// ========================================

function normalizeScenarioAmplitudes() {

    let total = 0;


    for (
        let i = 0;
        i < scenarioAmplitudes.length;
        i++
    ) {

        total +=
            amplitudeProbability(
                scenarioAmplitudes[i]
            );

    }


    if (total === 0) {

        return;

    }


    let scale =
        1 / Math.sqrt(total);


    for (
        let i = 0;
        i < scenarioAmplitudes.length;
        i++
    ) {

        scenarioAmplitudes[i].real *= scale;

        scenarioAmplitudes[i].imaginary *= scale;

    }

}


// ========================================
// RESET QUANTUM STATE
// ========================================

function resetQuantumState() {

    scenarioAmplitudes = [

        { real: 0.50, imaginary: 0 },
        { real: 0.40, imaginary: 0 },

        { real: 0.45, imaginary: 0 },
        { real: 0.40, imaginary: 0 },

        { real: 0.35, imaginary: 0 },
        { real: 0.30, imaginary: 0 }

    ];

}