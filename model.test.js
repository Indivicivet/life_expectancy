const assert = require("node:assert/strict");
const {
  factors,
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
for (const sex of [0, 1]) {
  near(lifeExpectancy(healthy, sex), baselineYears[sex]);
  near(lifeExpectancy(higher, sex), [29.0, 33.0][sex], 0.25);
  const { hazard, slope } = parameters[sex];
  near(gompertzYears(hazard, slope, 1), baselineYears[sex]);
  near(gompertzYears(hazard, slope, factors[0].options[4].hr[sex]),
    baselineYears[sex] + factors[0].options[4].years[sex]);
  assert.ok(mortalityRisk(healthy, sex) > 0);
  assert.ok(mortalityRisk(higher, sex) < 1000);
  assert.ok(mortalityRisk(healthy, sex) < mortalityRisk(higher, sex));
  const smokingOnly = [...healthy];
  smokingOnly[0] = 4;
  const smokingDelta = compare(smokingOnly, healthy, sex);
  assert.ok(smokingDelta[0].risk < 0);
  assert.ok(smokingDelta[0].years < 0);
  smokingDelta.slice(1).forEach(row => near(row.risk, 0));
  for (const factor of factors) {
    for (const option of factor.options) {
      if (!option.ci) continue;
      const [lo, hi] = option.ci[sex];
      assert.ok(lo <= option.years[sex] && option.years[sex] <= hi,
        `${factor.id} ${option.label}: ${option.years[sex]} outside [${lo}, ${hi}]`);
    }
  }
  for (const selected of presets) {
    for (const reference of presets) {
      const rows = compare(selected.choices, reference.choices, sex);
      const years = lifeExpectancy(selected.choices, sex) - lifeExpectancy(reference.choices, sex);
      const risk = mortalityRisk(reference.choices, sex) - mortalityRisk(selected.choices, sex);
      near(rows.reduce((sum, row) => sum + row.years, 0), years);
      near(rows.reduce((sum, row) => sum + row.risk, 0), risk);
      near(rows.reduce((sum, row) => sum + row.microlives, 0),
        48 * years / lifeExpectancy(reference.choices, sex));
      rows.forEach((row, i) => {
        if (selected.choices[i] === reference.choices[i]) {
          near(row.risk, 0);
          near(row.years, 0);
        }
      });
    }
  }
}
console.log("Model checks passed");
