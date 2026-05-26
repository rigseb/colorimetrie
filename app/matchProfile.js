import { PROFILES } from "./data";

function countAxisAnswers(answers, keys) {
  let a = 0;
  let b = 0;

  keys.forEach((key) => {
    if (answers[key] === "A") a += 1;
    if (answers[key] === "B") b += 1;
  });

  return { a, b, total: a + b };
}

function detectAxis(counts, leftValue, rightValue, neutralValue = "équilibré") {
  if (counts.total === 0) return neutralValue;
  if (counts.a > counts.b) return leftValue;
  if (counts.b > counts.a) return rightValue;
  return neutralValue;
}

function detectContrast(counts) {
  if (counts.total === 0) return "équilibré";

  if (counts.b > counts.a) {
    if (counts.b - counts.a >= 1) return "fort";
    return "modéré";
  }

  if (counts.a > counts.b) {
    if (counts.a - counts.b >= 1) return "faible";
    return "modéré";
  }

  return "modéré";
}

function normalizeProfileValue(profileValue) {
  if (!profileValue) return "moyen";
  return profileValue;
}

function scoreAxis(expected, actual, axisName) {
  if (!expected || !actual) return 0;
  if (actual === "équilibré") return 0;

  if (expected === actual) {
    if (axisName === "temperature") return 4;
    if (axisName === "value") return 3;
    if (axisName === "intensity") return 3;
    if (axisName === "contrast") return 2;
    return 1;
  }

  if (axisName === "contrast") {
    const nearPairs = [
      ["fort", "modéré"],
      ["modéré", "fort"],
      ["faible", "modéré"],
      ["modéré", "faible"],
    ];

    const near = nearPairs.some(([a, b]) => expected === a && actual === b);
    if (near) return 1;
  }

  return 0;
}

function scoreProfile(profile, axes) {
  let score = 0;
  const profileAxes = profile?.axes || {};

  score += scoreAxis(profileAxes.temperature, axes.temperature, "temperature");
  score += scoreAxis(normalizeProfileValue(profileAxes.value), axes.value, "value");
  score += scoreAxis(profileAxes.intensity, axes.intensity, "intensity");
  score += scoreAxis(profileAxes.contrast, axes.contrast, "contrast");

  return score;
}

function compareObservation(observation, axes) {
  const checks = [];

  if (observation.temperature !== "équilibré") {
    checks.push({
      axis: "Température",
      observation: observation.temperature,
      calculated: axes.temperature,
      match: observation.temperature === axes.temperature,
    });
  }

  if (observation.value !== "équilibré") {
    checks.push({
      axis: "Valeur",
      observation: observation.value,
      calculated: axes.value,
      match: observation.value === axes.value,
    });
  }

  if (observation.intensity !== "équilibré") {
    checks.push({
      axis: "Intensité",
      observation: observation.intensity,
      calculated: axes.intensity,
      match: observation.intensity === axes.intensity,
    });
  }

  if (observation.contrast !== "équilibré") {
    checks.push({
      axis: "Contraste",
      observation: observation.contrast,
      calculated: axes.contrast,
      match: observation.contrast === axes.contrast,
    });
  }

  const matches = checks.filter((x) => x.match).length;
  const mismatches = checks.filter((x) => !x.match).length;

  let confidence = "Moyen";
  if (checks.length === 0) confidence = "Moyen";
  if (matches >= 3 && mismatches === 0) confidence = "Fort";
  if (mismatches >= 2) confidence = "À revalider";

  return {
    checks,
    matches,
    mismatches,
    confidence,
  };
}

function buildConfidence(primaryScore, secondaryScore, observationCheck) {
  const gap = primaryScore - secondaryScore;

  let confidenceLabel = "Moyen";
  let confidenceScore = 60;

  if (gap >= 4) {
    confidenceLabel = "Fort";
    confidenceScore = 85;
  } else if (gap <= 1) {
    confidenceLabel = "À confirmer";
    confidenceScore = 45;
  }

  if (observationCheck.confidence === "Fort") {
    confidenceScore += 10;
  }

  if (observationCheck.confidence === "À revalider") {
    confidenceScore -= 20;
    confidenceLabel = "À revalider";
  }

  if (confidenceScore > 95) confidenceScore = 95;
  if (confidenceScore < 20) confidenceScore = 20;

  return {
    confidenceLabel,
    confidenceScore,
    scoreGap: gap,
  };
}

export function getProfile(answers, observation = {}) {
  const tempCounts = countAxisAnswers(answers, ["A1"]);
  const valueCounts = countAxisAnswers(answers, ["B1"]);
  const intensityCounts = countAxisAnswers(answers, ["C1"]);
  const contrastCounts = countAxisAnswers(answers, ["D1"]);

  const axes = {
    temperature: detectAxis(tempCounts, "chaud", "froid"),
    value: detectAxis(valueCounts, "clair", "profond", "moyen"),
    intensity: detectAxis(intensityCounts, "doux", "vif"),
    contrast: detectContrast(contrastCounts),
  };

  const observationState = {
    temperature:
      observation.O_TEMP === "A"
        ? "chaud"
        : observation.O_TEMP === "B"
        ? "froid"
        : "équilibré",
    value:
      observation.O_VALUE === "A"
        ? "clair"
        : observation.O_VALUE === "B"
        ? "profond"
        : "équilibré",
    intensity:
      observation.O_INTENSITY === "A"
        ? "doux"
        : observation.O_INTENSITY === "B"
        ? "vif"
        : "équilibré",
    contrast:
      observation.O_CONTRAST === "A"
        ? "faible"
        : observation.O_CONTRAST === "B"
        ? "fort"
        : "équilibré",
  };

  const visibleProfiles = PROFILES.filter((profile) => !profile.hidden);

  const profileScores = visibleProfiles
    .map((profile) => ({
      name: profile.name,
      profile,
      score: scoreProfile(profile, axes),
    }))
    .sort((a, b) => b.score - a.score);

  const primary = profileScores[0] || null;
  const secondary = profileScores[1] || null;

  const observationCheck = compareObservation(observationState, axes);
  const confidence = buildConfidence(
    primary?.score || 0,
    secondary?.score || 0,
    observationCheck
  );

  return {
    profileName: primary?.name || null,
    profile: primary?.profile || null,

    secondaryProfileName: secondary?.name || null,
    secondaryProfile: secondary?.profile || null,

    axes,
    observation: observationState,
    observationCheck,

    confidenceLabel: confidence.confidenceLabel,
    confidenceScore: confidence.confidenceScore,
    scoreGap: confidence.scoreGap,

    scores: profileScores,

    rawCounts: {
      temperature: tempCounts,
      value: valueCounts,
      intensity: intensityCounts,
      contrast: contrastCounts,
    },
  };
}
