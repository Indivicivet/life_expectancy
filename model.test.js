const assert = require("node:assert/strict");
const {
  factors,
  minAge,
  maxAge,
  calibrationAge,
  endAge,
  maxAlcoholUnits,
  recentAlcoholEvidence,
  baselineYears,
  presets,
  parameters,
  gompertzYears,
  lifeExpectancy,
  mortalityRisk,
  compare,
} = require("./model.js");

function near(actual, expected, tolerance = 1e-8) {
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);
}

const healthy = presets.find(preset => preset.id === "reference").choices;
const higher = presets.find(preset => preset.id === "higher").choices;
const alcoholIndex = factors.findIndex(factor => factor.id === "alcohol");
const activityIndex = factors.findIndex(factor => factor.id === "activity");
for (const sex of [0, 1]) {
  const { hazard, slope } = parameters[sex];
  near(lifeExpectancy(healthy, sex, calibrationAge), baselineYears[sex]);
  near(gompertzYears(hazard, slope, factors[0].options[4].hr[sex], calibrationAge),
    baselineYears[sex] + factors[0].options[4].years[sex]);

  // The same lifestyle must have higher ten-year risk and fewer remaining
  // years at an older starting age, without predicting death before that age.
  let previousRisk = 0;
  let previousYears = Infinity;
  for (const age of [minAge, calibrationAge, 65, 90, maxAge]) {
    const years = lifeExpectancy(healthy, sex, age);
    const risk = mortalityRisk(healthy, sex, age);
    assert.ok(years < previousYears && years > 0 && years <= endAge - age);
    assert.ok(risk > previousRisk && risk <= 1000);
    near(risk, -1000 * Math.expm1(
      -hazard * Math.exp(slope * (age - calibrationAge)) * Math.expm1(slope * 10) / slope));
    previousYears = years;
    previousRisk = risk;
    assert.ok(lifeExpectancy(higher, sex, age) < years);
    assert.ok(mortalityRisk(higher, sex, age) >= risk);

    for (const selected of presets) {
      for (const reference of presets) {
        const rows = compare(selected.choices, reference.choices, sex, age);
        const comparisonYears = lifeExpectancy(reference.choices, sex, age);
        const years = lifeExpectancy(selected.choices, sex, age) - comparisonYears;
        const risk = mortalityRisk(reference.choices, sex, age) -
          mortalityRisk(selected.choices, sex, age);
        near(rows.reduce((sum, row) => sum + row.years, 0), years);
        near(rows.reduce((sum, row) => sum + row.risk, 0), risk);
        near(rows.reduce((sum, row) => sum + row.microlives, 0), 48 * years / comparisonYears);
        rows.forEach((row, i) => {
          for (const key of ["years", "risk", "microlives"]) {
            const range = row.ranges[key];
            if (range) assert.ok(range[0] <= row[key] + 1e-8 && row[key] <= range[1] + 1e-8);
          }
          if (selected.choices[i] === reference.choices[i]) {
            near(row.risk, 0);
            near(row.years, 0);
            assert.deepEqual(row.ranges, { years: [0, 0], risk: [0, 0], microlives: [0, 0] });
          }
        });
      }
    }
  }

  for (const [index, factor] of factors.entries()) {
    for (const [choice, option] of factor.options.entries()) {
      if (option.hrBounds) {
        const [lo, hi] = option.hrBounds[sex];
        assert.ok(lo <= option.hr[sex] && option.hr[sex] <= hi);
      }
      // Verify representative values, including low alcohol doses, at age 40
      // and 65 against the survival calculation with all other effects fixed.
      if (factor.numeric && choice > 21 && choice % 10 !== 0) continue;
      const profile = [...healthy];
      profile[index] = choice;
      for (const age of [calibrationAge, 65]) {
        const years = lifeExpectancy(healthy, sex, age);
        const hr = option.hr[sex] / (factor.riskAnchor ?? 1);
        near(lifeExpectancy(profile, sex, age), gompertzYears(hazard, slope, hr, age));
        const rows = compare(profile, healthy, sex, age);
        near(rows[index].risk, mortalityRisk(healthy, sex, age) - mortalityRisk(profile, sex, age));
        near(rows[index].years, lifeExpectancy(profile, sex, age) - years);
        rows.forEach((row, i) => {
          if (i !== index) {
            near(row.years, 0);
            near(row.risk, 0);
          }
        });
      }
    }
  }
  const activity = factors[activityIndex].options;
  assert.ok(activity.every((option, i) => i === 0 || option.hr[sex] < activity[i - 1].hr[sex]));
  const alcohol = factors[alcoholIndex].options;
  assert.equal(alcohol.length, maxAlcoholUnits + 1);
  assert.equal(alcohol[0].hr[sex], 1);
  assert.ok(new Set(alcohol.slice(1, 15).map(option => option.hr[sex])).size > 7);
  near(alcohol[7].hr[sex], Math.exp(Math.sqrt(8) * (-0.1429 + 0.0405 * Math.log(8))));
  assert.ok(alcohol[4].hr[sex] < alcohol[1].hr[sex]);
  assert.ok(alcohol[4].hr[sex] < alcohol[14].hr[sex]);
  assert.ok(alcohol[60].hr[sex] > 1);
  near(recentAlcoholEvidence(14).hr[sex], sex === 0 ? 0.94 : 0.99);
  assert.deepEqual(recentAlcoholEvidence(14).hrBounds[sex],
    sex === 0 ? [0.88, 1.01] : [0.90, 1.10]);
  const interpolated = [...healthy];
  interpolated[activityIndex] = 1;
  assert.deepEqual(compare(interpolated, healthy, sex, calibrationAge)[activityIndex].ranges,
    { years: null, risk: null, microlives: null });
}
console.log("Model checks passed");
