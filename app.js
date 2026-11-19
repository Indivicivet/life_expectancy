const byId = id => document.getElementById(id);
const initial = presets[0].choices;
let choices = [...initial];
let sex = 0;
let referenceId = "comparison";
let customReference = null;
let metric = "risk";
let sleep = 1;

const metrics = [
  { id: "risk", label: "Millimorts", unit: "mmt / 10 yr", digits: 1,
    left: "More deaths", right: "Fewer deaths",
    note: "Bars show millimorts avoided over 10 years, allocated across factors so they sum to the total difference. Negative means greater risk." },
  { id: "years", label: "Life years", unit: "years", digits: 1,
    left: "Years lost", right: "Years gained",
    note: "Bars use the study's rounded life-expectancy contrasts. Their total approximates the combined modelled difference." },
  { id: "microlives", label: "Microlives/day", unit: "µlives/day", digits: 1,
    left: "Time lost", right: "Time gained",
    note: "One microlife = 30 minutes of expected life. The difference is spread over the comparison lifestyle's estimated remaining years." },
];

function signed(number, digits = 1) {
  const rounded = Number(number.toFixed(digits));
  return (rounded > 0 ? "+" : rounded < 0 ? "−" : "") + Math.abs(rounded).toFixed(digits);
}

function tone(number, digits = 1) {
  const rounded = Number(number.toFixed(digits));
  return rounded > 0 ? "gain" : rounded < 0 ? "loss" : "";
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function buttons(container, options, selected, onSelect) {
  container.replaceChildren(...options.map(({ label, id }) => {
    const button = element("button", "", label);
    button.type = "button";
    button.dataset.value = id;
    button.setAttribute("aria-pressed", String(selected === id));
    button.addEventListener("click", () => {
      onSelect(id);
      render();
    });
    return button;
  }));
}

function setPressed(container, selected) {
  for (const button of container.querySelectorAll("button")) {
    button.setAttribute("aria-pressed", String(button.dataset.value === String(selected)));
  }
}

function referenceProfile() {
  if (referenceId === "custom") return customReference;
  return presets.find(preset => preset.id === referenceId).choices;
}

function renderInputs() {
  byId("inputs").replaceChildren(...factors.map((factor, i) => {
    const section = element("section", "editor-section");
    const header = element("div", "editor-title");
    const label = element("span", "", factor.label);
    const impact = element("span", "field-impact");
    impact.id = "impact-" + factor.id;
    header.append(label, impact);
    const row = element("div", "choices");
    row.id = "choices-" + factor.id;
    row.setAttribute("role", "group");
    row.setAttribute("aria-label", factor.label);
    buttons(row, factor.options.map((option, index) => ({
      id: index, label: optionLabel(option, sex),
    })), choices[i], index => { choices[i] = index; });
    section.append(header, row, element("p", "help", factor.help));
    return section;
  }));
}

function renderChart(contributions, reference) {
  const display = metrics.find(item => item.id === metric);
  const max = Math.max(1, ...contributions.map(row => Math.abs(row[metric])));
  const magnitude = 10 ** Math.floor(Math.log10(max));
  const scale = [1, 2, 2.5, 5, 10].find(n => n * magnitude >= max) * magnitude;
  const chart = element("div", "chart-grid");
  chart.append(element("span"));
  const direction = element("div", "direction");
  direction.append(element("span", "", "← " + display.left), element("span", "", display.right + " →"));
  chart.append(direction, element("span"));
  chart.append(element("span"));
  const axis = element("div", "axis");
  for (const tick of [-1, -0.5, 0, 0.5, 1]) {
    const label = element("span", "", String(Number((tick * scale).toFixed(2))));
    label.style.left = (tick + 1) * 50 + "%";
    axis.append(label);
  }
  chart.append(axis, element("span", "axis-unit", display.unit));
  for (const [i, factor] of factors.entries()) {
    const row = contributions[i];
    const value = row[metric];
    const label = element("div", "factor-label", factor.label);
    const before = optionLabel(factor.options[reference[i]], sex);
    const after = optionLabel(factor.options[choices[i]], sex);
    label.append(element("small", "", before === after ? after : before + " → " + after));
    const track = element("div", "bar-track");
    const bar = element("div", "bar " + tone(value, 4));
    const width = Math.abs(value) * 50 / scale;
    bar.style.width = width + "%";
    bar.style.left = (value < 0 ? 50 - width : 50) + "%";
    track.title = factor.label + ": " + signed(value, display.digits) + " " + display.unit;
    track.append(bar);
    const number = element("div", "bar-number " + tone(value), signed(value, display.digits));
    if (metric !== "years") number.append(element("small", "", signed(row.years) + " yr"));
    else number.append(element("small", "", signed(row.risk) + " mmt"));
    chart.append(label, track, number);
  }
  byId("chart").replaceChildren(chart);
  byId("chart-note").textContent = display.note;
}

function setDelta(id, value, digits = 1) {
  const node = byId(id);
  node.textContent = signed(value, digits);
  node.className = tone(value, digits);
}

function render() {
  const reference = referenceProfile();
  const years = lifeExpectancy(choices, sex);
  const comparisonYears = lifeExpectancy(reference, sex);
  const risk = mortalityRisk(choices, sex);
  const comparisonRisk = mortalityRisk(reference, sex);
  const contributions = compare(choices, reference, sex);
  byId("your-age").textContent = (40 + years).toFixed(1);
  byId("reference-age").textContent = (40 + comparisonYears).toFixed(1);
  byId("your-risk").textContent = risk.toFixed(1) + " millimorts / 10 yr";
  byId("reference-risk").textContent = comparisonRisk.toFixed(1) + " millimorts / 10 yr";
  byId("reference-label").textContent = referenceId === "custom" ? "Custom comparison" :
    presets.find(preset => preset.id === referenceId).label;
  setDelta("years-delta", years - comparisonYears);
  setDelta("risk-delta", comparisonRisk - risk);
  setDelta("sleep-delta", sleepOptions[sleep].years);
  const sleepImpact = byId("sleep-impact");
  sleepImpact.textContent = signed(sleepOptions[sleep].years) + " yr vs recommended";
  sleepImpact.className = "field-impact " + tone(sleepOptions[sleep].years);
  renderChart(contributions, reference);
  for (const [i, factor] of factors.entries()) {
    setPressed(byId("choices-" + factor.id), choices[i]);
    const impact = byId("impact-" + factor.id);
    const value = contributions[i].years;
    impact.textContent = signed(value) + " yr";
    impact.className = "field-impact " + tone(value);
  }
  setPressed(byId("reference-options"), referenceId);
  setPressed(byId("metric-options"), metric);
  setPressed(byId("sex-options"), sex);
  setPressed(byId("sleep-options"), sleep);
  const matching = presets.find(preset => preset.choices.every((value, i) => choices[i] === value));
  setPressed(byId("preset-options"), matching?.id);
}

function renderReferenceButtons() {
  buttons(byId("reference-options"), customReference ? [...presets, { id: "custom", label: "Custom" }] : presets, referenceId,
    id => { referenceId = id; });
}

buttons(byId("sex-options"), [{ label: "Men", id: 0 }, { label: "Women", id: 1 }], sex, id => {
  sex = id;
  renderInputs();
});
buttons(byId("preset-options"), presets, presets[0].id, id => {
  choices = [...presets.find(preset => preset.id === id).choices];
});
buttons(byId("metric-options"), metrics, metric, id => { metric = id; });
buttons(byId("sleep-options"), sleepOptions.map((option, id) => ({ ...option, id })), sleep,
  id => { sleep = id; });
renderReferenceButtons();
renderInputs();
byId("save-reference").addEventListener("click", () => {
  customReference = [...choices];
  referenceId = "custom";
  renderReferenceButtons();
  render();
});
byId("reset").addEventListener("click", () => {
  choices = [...initial];
  sex = 0;
  referenceId = "comparison";
  customReference = null;
  metric = "risk";
  sleep = 1;
  renderReferenceButtons();
  renderInputs();
  render();
});
document.querySelector(".topbar a").addEventListener("click", () => { byId("sources").open = true; });
render();
