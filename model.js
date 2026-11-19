// Li, Hüsing & Kaaks (2014), EPIC-Heidelberg, Tables 2 and 3.
// Each option contains [men, women] estimates in years relative to its
// study reference and mutually adjusted mortality hazard ratios.
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
    id: "activity", label: "Physical activity", help: "Leisure activity (36 MET-h/wk ≈ 9 h of brisk walking). The low group still includes moderately active people.",
    options: [
      { label: "≥36 MET-h/wk", years: [0, 0], hr: [1, 1] },
      { label: "<36 MET-h/wk", years: [-0.4, -1.1], hr: [1.05, 1.16], ci: [[-1.2, 0.3], [-2.1, -0.05]] },
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
    id: "alcohol", label: "Alcohol", help: "Lifetime daily average (1 drink = 12 g ethanol, 1.5 UK units). Women's 0.6–1/day estimate was not statistically significant.",
    options: [
      { label: ["≤2 drinks/day", "≤0.5 drinks/day"], years: [0, 0], hr: [1, 1] },
      { label: ["2.1–4/day", "0.6–1/day"], years: [-1.7, 1.0], hr: [1.24, 0.86], ci: [[-2.7, -0.8], [-0.3, 2.6]] },
      { label: [">4/day", ">1/day"], years: [-3.1, -1.0], hr: [1.50, 1.15], ci: [[-4.0, -1.9], [-2.4, 0.3]] },
    ],
  },
];

const baselineYears = [47.5, 48.7];
const presets = [
  { id: "example", label: "Overweight, active", choices: [0, 2, 0, 1, 0, 1] },
  { id: "comparison", label: "Light smoker, lean", choices: [3, 0, 1, 0, 1, 0] },
  { id: "reference", label: "Study reference", choices: [0, 0, 0, 0, 0, 0] },
  { id: "higher", label: "Higher risk", choices: [4, 3, 1, 1, 1, 2] },
];

const sleepOptions = [
  { label: "<7 h", years: -1.2 },
  { label: "7–9 h", years: 0 },
  { label: ">9 h", years: -2.6 },
];

function optionLabel(option, sex) {
  return Array.isArray(option.label) ? option.label[sex] : option.label;
}

function lifeExpectancy(choices, sex) {
  return baselineYears[sex] + factors.reduce(
    (total, factor, i) => total + factor.options[choices[i]].years[sex], 0,
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

function mortalityRisk(choices, sex) {
  const { hazard, slope } = parameters[sex];
  const hr = factors.reduce((product, factor, i) => product * factor.options[choices[i]].hr[sex], 1);
  return -1000 * Math.expm1(-hr * hazard * Math.expm1(slope * 10) / slope);
}

// Averaging each factor's marginal risk reduction over every possible order
// (Shapley allocation) makes the six bars sum to the total risk difference.
// Only 2^6 combinations are needed.
function riskContributions(choices, reference, sex) {
  const n = factors.length;
  const factorial = [1, 1, 2, 6, 24, 120, 720];
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
    const years = factor.options[choices[i]].years[sex] - factor.options[reference[i]].years[sex];
    return { years, risk: risks[i], microlives: 48 * years / referenceYears };
  });
}

// Also usable in the model tests without a browser.
if (typeof module !== "undefined") {
  module.exports = { factors, baselineYears, presets, parameters, gompertzYears, lifeExpectancy,
    mortalityRisk, riskContributions, compare };
}
