// Li, Hüsing & Kaaks (2014), EPIC-Heidelberg, Tables 2 and 3.
// EPIC options contain [men, women] published years and hazard ratios.
// Activity, alcohol and sleep use external relative risks as hazard ratios;
// their life-year estimates are derived from the calibrated baseline.
const factors = [
  {
    id: "smoking", label: "Smoking", help: "Cigarettes per day for current smokers; time since quitting for former smokers.",
    options: [
      { label: "Never", years: [0, 0], hr: [1, 1] },
      { label: "Quit >10 yr", years: [-1.4, -0.2], hr: [1.21, 1.03], ci: [[-2.4, -0.3], [-1.9, 1.4]] },
      { label: "Quit ≤10 yr", years: [-4.8, -0.9], hr: [1.87, 1.14], ci: [[-6.3, -3.3], [-3.2, 1.2]] },
      { label: "≤10/day", years: [-5.3, -5.0], hr: [2.02, 2.00], ci: [[-7.1, -3.6], [-6.6, -3.2]] },
      { label: ">10/day", years: [-9.4, -7.3], hr: [3.49, 2.75], ci: [[-10.6, -8.3], [-8.9, -6.0]] },
    ],
  },
  {
    id: "bmi", label: "BMI", help: "kg/m². Low BMI (<22.5) in cohorts often reflects illness-related weight loss.",
    options: [
      { label: "22.5–24.9", years: [0, 0], hr: [1, 1] },
      { label: "<22.5", years: [-3.5, -2.1], hr: [1.61, 1.34], ci: [[-5.1, -1.8], [-3.6, -0.5]] },
      { label: "25–29.9", years: [-1.1, -0.6], hr: [1.16, 1.08], ci: [[-2.3, -0.1], [-2.3, 0.8]] },
      { label: "≥30", years: [-3.1, -3.2], hr: [1.51, 1.55], ci: [[-4.4, -1.9], [-5.1, -1.8]] },
    ],
  },
  {
    id: "activity", label: "Physical activity", help: "Choose the nearest weekly minutes of moderate activity outside work (e.g. brisk walking); count vigorous minutes twice. Estimated benefit levels off above 300 min.",
    options: [
      // Garcia et al. (2023), Table 1: risks vs inactivity, rebased to 300 min.
      { label: "0 min/wk", hr: [1 / 0.66, 1 / 0.66] },
      { label: "30 min/wk", hr: [0.77 ** (30 / 75) / 0.66, 0.77 ** (30 / 75) / 0.66] },
      { label: "75 min/wk", hr: [0.77 / 0.66, 0.77 / 0.66] },
      { label: "150 min/wk", hr: [0.69 / 0.66, 0.69 / 0.66] },
      { label: "225 min/wk", hr: [Math.sqrt(0.69 / 0.66), Math.sqrt(0.69 / 0.66)] },
      { label: "300+ min/wk", hr: [1, 1] },
    ],
  },
  {
    id: "produce", label: "Fruit & vegetables", help: "Combined daily weight. The study split at its cohort median.",
    options: [
      { label: "≥200 g/day", years: [0, 0], hr: [1, 1] },
      { label: "<200 g/day", years: [-1.3, -0.8], hr: [1.19, 1.11], ci: [[-2.1, -0.4], [-1.9, 0.2]] },
    ],
  },
  {
    id: "meat", label: "Red & processed meat", help: "Combined daily weight of red and processed meat.",
    options: [
      { label: "<120 g/day", years: [0, 0], hr: [1, 1] },
      { label: "≥120 g/day", years: [-1.4, -2.4], hr: [1.21, 1.40], ci: [[-2.2, -0.6], [-3.9, -1.0]] },
    ],
  },
  {
    id: "alcohol", label: "Alcohol", help: "Long-term average UK units per week (1 unit = 8 g ethanol). 14/week = 2/day. Low-dose net mortality effects are uncertain; the UK low-risk limit is 14/week.",
    options: [
      // Zhao et al. (2023), Table 4. Do not credit uncertain low-dose benefits.
      { label: "0 units/wk", hr: [1, 1] },
      { label: "1 unit/wk", hr: [1, 1] },
      { label: "2–21 units/wk", hr: [1, 1] },
      { label: "22–39 units/wk", hr: [1.01, 1.21] },
      { label: "40–56 units/wk", hr: [1.15, 1.34] },
      { label: "57+ units/wk", hr: [1.34, 1.61] },
    ],
  },
  {
    id: "sleep", label: "Sleep duration", help: "Typical hours of sleep per night. Long sleep may reflect underlying illness rather than cause it.",
    options: [
      // Imbalanced sleep (2025) meta-analysis: pooled HRs, both sexes.
      { label: "<7 h", hr: [1.14, 1.14] },
      { label: "7–<9 h", hr: [1, 1] },
      { label: "≥9 h", hr: [1.34, 1.34] },
    ],
  },
];

const baselineYears = [47.5, 48.7];
const presets = [
  { id: "example", label: "Overweight, active", choices: [0, 2, 5, 1, 0, 3, 1] },
  { id: "comparison", label: "Light smoker, lean", choices: [3, 0, 2, 0, 1, 2, 1] },
  { id: "reference", label: "Model reference", choices: [0, 0, 5, 0, 0, 0, 1] },
  { id: "higher", label: "Higher risk", choices: [4, 3, 0, 1, 1, 5, 0] },
];

function lifeExpectancy(choices, sex) {
  return baselineYears[sex] + factors.reduce(
    (total, factor, i) => total + optionYears(factor.options[choices[i]], sex), 0,
  );
}

// Approximate the study's Gompertz baseline (hazard at age 40 and
// exponential age coefficient) from the reference and heavy-smoking LE.
// Integrate the survival curve to age 110 using annual life-table intervals.
function gompertzYears(hazard, slope, hr) {
  let previous = 1;
  let total = 0;
  for (let t = 1; t <= 70; t++) {
    const survival = Math.exp(-hr * hazard * Math.expm1(slope * t) / slope);
    total += (previous + survival) / 2;
    previous = survival;
  }
  return total;
}

function calibrate(sex) {
  const target = baselineYears[sex];
  const smoker = factors[0].options[4];

  function hazardAt(slope) {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 55; i++) {
      const mid = (lo + hi) / 2;
      if (gompertzYears(mid, slope, 1) > target) lo = mid;
      else hi = mid;
    }
    return (lo + hi) / 2;
  }

  let lo = 0.03;
  let hi = 0.30;
  for (let i = 0; i < 45; i++) {
    const mid = (lo + hi) / 2;
    if (gompertzYears(hazardAt(mid), mid, smoker.hr[sex]) < target + smoker.years[sex]) lo = mid;
    else hi = mid;
  }
  const slope = (lo + hi) / 2;
  return { hazard: hazardAt(slope), slope };
}

const parameters = baselineYears.map((_, sex) => calibrate(sex));

function optionYears(option, sex) {
  if (option.years) return option.years[sex];
  if (option.hr[sex] === 1) return 0;
  const { hazard, slope } = parameters[sex];
  return gompertzYears(hazard, slope, option.hr[sex]) - baselineYears[sex];
}

function mortalityRisk(choices, sex) {
  const { hazard, slope } = parameters[sex];
  const hr = factors.reduce((product, factor, i) => product * factor.options[choices[i]].hr[sex], 1);
  return -1000 * Math.expm1(-hr * hazard * Math.expm1(slope * 10) / slope);
}

// Averaging each factor's marginal risk reduction over every possible order
// (Shapley allocation) makes all bars sum to the total risk difference.
function riskContributions(choices, reference, sex) {
  const n = factors.length;
  const factorial = [1];
  for (let i = 1; i <= n; i++) factorial.push(i * factorial[i - 1]);
  const masks = Array.from({ length: 2 ** n }, (_, mask) => {
    const profile = reference.map((value, i) => mask & (1 << i) ? choices[i] : value);
    return mortalityRisk(profile, sex);
  });
  return factors.map((_, i) => {
    let contribution = 0;
    const bit = 1 << i;
    for (let mask = 0; mask < masks.length; mask++) {
      if (mask & bit) continue;
      const size = mask.toString(2).replaceAll("0", "").length;
      const weight = factorial[size] * factorial[n - size - 1] / factorial[n];
      contribution += weight * (masks[mask] - masks[mask | bit]);
    }
    return contribution;
  });
}

function compare(choices, reference, sex) {
  const referenceYears = lifeExpectancy(reference, sex);
  const risks = riskContributions(choices, reference, sex);
  return factors.map((factor, i) => {
    const years = optionYears(factor.options[choices[i]], sex) - optionYears(factor.options[reference[i]], sex);
    return { years, risk: risks[i], microlives: 48 * years / referenceYears };
  });
}

// Also usable in the model tests without a browser.
if (typeof module !== "undefined") {
  module.exports = { factors, baselineYears, presets, parameters, gompertzYears, lifeExpectancy,
    mortalityRisk, riskContributions, compare };
}
