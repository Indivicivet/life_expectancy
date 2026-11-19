const assert = require("node:assert/strict");
const {
  factors,
  baselineYears,
  presets,
  parameters,
  gompertzYears,
  lifeExpectancy,
  mortalityRisk,
  optionYears,
  optionYearsRange,
  compare,
} = require("./model.js");

function near(actual, expected, tolerance = 1e-8) {
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} != ${expected}`);
}

const healthy = presets.find(preset => preset.id === "reference").choices;
const higher = presets.find(preset => preset.id === "higher").choices;
for (const sex of [0, 1]) {
  near(lifeExpectancy(healthy, sex), baselineYears[sex]);
  assert.ok(lifeExpectancy(higher, sex) < baselineYears[sex]);
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
  for (const id of ["activity", "alcohol", "sleep"]) {
    const index = factors.findIndex(factor => factor.id === id);
    const options = factors[index].options;
    for (const [choice, option] of options.entries()) {
      const profile = [...healthy];
      profile[index] = choice;
      const rows = compare(profile, healthy, sex);
      near(lifeExpectancy(profile, sex),
        gompertzYears(hazard, slope, option.hr[sex] / (factors[index].riskAnchor ?? 1)));
      near(rows[index].risk, mortalityRisk(healthy, sex) - mortalityRisk(profile, sex));
      near(rows[index].years, lifeExpectancy(profile, sex) - baselineYears[sex]);
      rows.forEach((row, i) => {
        if (i !== index) {
          near(row.years, 0);
          near(row.risk, 0);
        }
      });
    }
  }
  const activity = factors.find(factor => factor.id === "activity").options;
  assert.ok(activity.every((option, i) => i === 0 || option.hr[sex] < activity[i - 1].hr[sex]));
  const alcoholIndex = factors.findIndex(factor => factor.id === "alcohol");
  const alcohol = factors[alcoholIndex].options;
  assert.deepEqual(alcohol.map(option => option.hr[sex]),
    sex === 0 ? [1, 1, 0.94, 1.01, 1.15, 1.34] : [1, 0.99, 0.99, 1.21, 1.34, 1.61]);
  const moderate = [...healthy];
  moderate[alcoholIndex] = 2;
  const moderateDelta = compare(moderate, healthy, sex)[alcoholIndex];
  for (const key of ["years", "risk", "microlives"]) {
    assert.ok(moderateDelta[key] > 0);
    assert.ok(moderateDelta.ranges[key][0] < 0 && moderateDelta.ranges[key][1] > 0);
  }
  const [lo, hi] = alcohol[2].hrCI[sex];
  const lowYears = gompertzYears(hazard, slope, hi) - baselineYears[sex];
  const highYears = gompertzYears(hazard, slope, lo) - baselineYears[sex];
  near(moderateDelta.ranges.years[0], lowYears);
  near(moderateDelta.ranges.years[1], highYears);
  const riskAt = hr => -1000 * Math.expm1(-hr * hazard * Math.expm1(slope * 10) / slope);
  near(moderateDelta.ranges.risk[0], riskAt(1) - riskAt(hi));
  near(moderateDelta.ranges.risk[1], riskAt(1) - riskAt(lo));
  const sleep = factors.find(factor => factor.id === "sleep").options;
  assert.ok(sleep[0].hr[sex] > sleep[1].hr[sex] && sleep[2].hr[sex] > sleep[1].hr[sex]);
  for (const factor of factors) {
    for (const option of factor.options) {
      if (!option.hrCI) {
        assert.equal(optionYearsRange(factor, option, sex), null);
        continue;
      }
      const [hrLo, hrHi] = option.hrCI[sex];
      assert.ok(hrLo <= option.hr[sex] && option.hr[sex] <= hrHi);
      const [lo, hi] = optionYearsRange(factor, option, sex);
      const years = optionYears(factor, option, sex);
      assert.ok(lo <= years && years <= hi,
        `${factor.id} ${option.label}: ${years} outside [${lo}, ${hi}]`);
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
        for (const key of ["years", "risk", "microlives"]) {
          const range = row.ranges[key];
          if (!range) continue;
          assert.ok(range[0] <= row[key] + 1e-8 && row[key] <= range[1] + 1e-8);
        }
        if (selected.choices[i] === reference.choices[i]) {
          near(row.risk, 0);
          near(row.years, 0);
          assert.deepEqual(row.ranges, { years: [0, 0], risk: [0, 0], microlives: [0, 0] });
        }
      });
    }
  }
  const activityIndex = factors.findIndex(factor => factor.id === "activity");
  const interpolated = [...healthy];
  interpolated[activityIndex] = 1;
  assert.deepEqual(compare(interpolated, healthy, sex)[activityIndex].ranges,
    { years: null, risk: null, microlives: null });
}
console.log("Model checks passed");
