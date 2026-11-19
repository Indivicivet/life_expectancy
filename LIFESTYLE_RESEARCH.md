# Lifestyle and life expectancy: research notes

Sources checked 19 November 2026. The numbers below are estimated differences
between population groups, not causal estimates of how long an individual
will live. The age, population, exposure definitions, and reference group
matter.

## Main model: EPIC-Heidelberg

The calculator's main source is [Li, Hüsing and Kaaks, BMC Medicine
2014](https://doi.org/10.1186/1741-7015-12-59), which studied 22,469
German adults (10,235 men and 12,234 women) recruited in 1994–1998 and
followed for an average of 11 years. There were 1,599 deaths during follow-up.
People with diabetes, cardiovascular disease or cancer at recruitment were
excluded. The authors modelled mortality using sex-specific Gompertz
proportional-hazards models and estimated years remaining at age 40 via
life tables.

This paper has two advantages over mixing unrelated studies: the estimates
are mutually adjusted for the same lifestyle factors and it explicitly
examines how the factors combine. This is still a historical observational
study, not a personal clinical risk model.

### Reference profile and life expectancy

The reference profile is a 40-year-old non-smoker (never smoked), BMI
22.5–24.9 kg/m², low alcohol consumption (see sex-specific definitions
below), at least 36 MET-hours/week of leisure activity, less than 120 g/day
of combined processed and red meat, and at least 200 g/day of fruit and
vegetables. These are study categories, not prescribed targets.

When estimating the survival curves, the authors additionally fixed cereal
consumption at ≥200 g/day, fish at ≥15 g/day, dairy at <200 g/day, education
at secondary/professional level, and hypertension and hyperlipidemia as absent.
The fixed diet categories had no individually significant associations with
mortality in the adjusted models and should not be construed as
recommendations.

| Estimated remaining life at age 40 | Men | Women |
| --- | ---: | ---: |
| Reference profile | 47.5 years | 48.7 years |
| Heavy smoking, BMI ≥30, highest alcohol category, low activity, high processed/red meat, low fruit/veg | 29.0 years | 33.0 years |

These correspond to mean attained ages of 87.5 and 88.7 for the reference
profile; 69.0 and 73.0 for the specified adverse profile. The authors'
actual estimates of all combinations are in supplementary Tables S2 and S3.
They report that the individual losses of life expectancy are approximately
additive under their model (rounding/model variation of about ±0.1 years
for an individual factor). In a real population, smoking and body weight
interact, so this model's addition rule must not be taken as independent
causal effects. The study's combined four-factor example gives a loss of
17.0 years for men and 13.9 years for women for heavy smoking, obesity,
heavy drinking and high processed/red meat, compared to the respective
reference categories.

[Full paper, methods and results, pp. 3–6](https://d-nb.info/1107813786/34).

### Original EPIC input values and uncertainty

The calculator now replaces EPIC's activity and alcohol categories with
the meta-analysis estimates below. For context, this table records the original mutually adjusted all-cause mortality hazard
ratios in Table 2 and the estimated residual life expectancy contrasts in
Table 3 from the [primary paper](https://bmcmedicine.biomedcentral.com/counter/pdf/10.1186/1741-7015-12-59).
The sign convention here is reversed from Table 3: a positive change means
longer expected life than that factor's reference category. Parentheses
show the study's 95% confidence intervals. A confidence interval spanning
zero for years, or one for hazard ratios, means this estimate is
inconclusive at the conventional 95% level.

| Factor and category | Men, HR (95% CI) | Women, HR (95% CI) | Men, change in years (95% CI) | Women, change in years (95% CI) |
| --- | ---: | ---: | ---: | ---: |
| Never smoked | 1.00 (ref) | 1.00 (ref) | 0 (ref) | 0 (ref) |
| Quit >10 years ago | 1.21 (1.01, 1.44) | 1.03 (0.80, 1.32) | −1.4 (−2.4, −0.3) | −0.2 (−1.9, 1.4) |
| Quit ≤10 years ago | 1.87 (1.49, 2.35) | 1.14 (0.79, 1.64) | −4.8 (−6.3, −3.3) | −0.9 (−3.2, 1.2) |
| Smoking ≤10 cigarettes/day | 2.02 (1.54, 2.65) | 2.00 (1.52, 2.63) | −5.3 (−7.1, −3.6) | −5.0 (−6.6, −3.2) |
| Smoking >10 cigarettes/day | 3.49 (2.90, 4.18) | 2.75 (2.16, 3.48) | −9.4 (−10.6, −8.3) | −7.3 (−8.9, −6.0) |
| BMI 22.5–24.9 | 1.00 (ref) | 1.00 (ref) | 0 (ref) | 0 (ref) |
| BMI <22.5 | 1.61 (1.23, 2.07) | 1.34 (1.04, 1.73) | −3.5 (−5.1, −1.8) | −2.1 (−3.6, −0.5) |
| BMI 25–29.9 | 1.16 (0.97, 1.38) | 1.08 (0.85, 1.37) | −1.1 (−2.3, −0.1) | −0.6 (−2.3, 0.8) |
| BMI ≥30 | 1.51 (1.23, 1.86) | 1.55 (1.19, 2.02) | −3.1 (−4.4, −1.9) | −3.2 (−5.1, −1.8) |
| Alcohol, men ≤2 / women ≤0.5 drinks/day | 1.00 (ref) | 1.00 (ref) | 0 (ref) | 0 (ref) |
| Alcohol, men 2.1–4 / women 0.6–1 drinks/day | 1.24 (1.07, 1.44) | 0.86 (0.69, 1.08) | −1.7 (−2.7, −0.8) | +1.0 (−0.3, 2.6) |
| Alcohol, men >4 / women >1 drinks/day | 1.50 (1.28, 1.75) | 1.15 (0.92, 1.44) | −3.1 (−4.0, −1.9) | −1.0 (−2.4, 0.3) |
| Leisure activity ≥36 MET-hours/week | 1.00 (ref) | 1.00 (ref) | 0 (ref) | 0 (ref) |
| Leisure activity <36 MET-hours/week | 1.05 (0.93, 1.19) | 1.16 (0.98, 1.37) | −0.4 (−1.2, 0.3) | −1.1 (−2.1, −0.05) |
| Processed/red meat <120 g/day | 1.00 (ref) | 1.00 (ref) | 0 (ref) | 0 (ref) |
| Processed/red meat ≥120 g/day | 1.21 (1.06, 1.38) | 1.40 (1.08, 1.80) | −1.4 (−2.2, −0.6) | −2.4 (−3.9, −1.0) |
| Fruit/veg ≥200 g/day | 1.00 (ref) | 1.00 (ref) | 0 (ref) | 0 (ref) |
| Fruit/veg <200 g/day | 1.19 (1.05, 1.35) | 1.11 (0.93, 1.32) | −1.3 (−2.1, −0.4) | −0.8 (−1.9, 0.2) |

The study defined a drink as 12 g of pure ethanol; this is 1.5
[UK units](https://www.nhs.uk/Live-well/alcohol-advice/calculating-alcohol-units/)
(not one UK unit). Consumption was a weighted average over participants'
reported drinking histories. The smoking categories also describe
accumulated histories, so the displayed years are not how much life is
lost immediately by smoking today or gained immediately by quitting.

MET-hours are activity intensity (multiples of resting metabolic rate)
times duration in hours. Leisure activity includes walking, cycling and
other sport. At least 36 MET-hours/week was a high cutoff in a physically
active cohort, so the low category is not the same as complete inactivity.
For comparison, [Moore et al., PLOS Medicine
2012](https://doi.org/10.1371/journal.pmed.1001335) estimated 4.5 more
years of life expectancy after age 40 for people reporting ≥22.5
MET-hours/week of leisure-time activity versus no activity, in six
prospective cohorts. That is a different contrast and must not be added
to the EPIC activity estimate.

BMI is a group-level proxy for body composition, not a direct behaviour
or a diagnostic target. The authors' <22.5 category includes many people
who are not conventionally underweight. Table 4 suggests that smoking
status modifies the BMI association, including a larger estimated loss
for obesity among never-smoking men than in the overall sample.

The middle alcohol category for women has a positive central estimate
that is not statistically distinguishable from zero. It must not be cited
as evidence of health benefits from starting to drink. A newer
[meta-analysis of 107 cohort studies, Zhao et al., 2023](https://doi.org/10.1001/jamanetworkopen.2023.6185)
found no statistically significant all-cause mortality protection from
low-volume drinking relative to lifetime nondrinkers.
The [WHO alcohol and cancer statement](https://www.who.int/europe/news/item/06-11-2023-joint-statement-by-who-europe-and-iarc-to-the-european-parliament---raising-awareness-of-the-link-between-alcohol-and-cancer)
notes that a cancer-risk-free level of alcohol consumption cannot be
established. The EPIC bins are historical comparisons rather than
modern drinking guidance.

### Alcohol: finer dose categories in UK units

One UK unit is 8 g ethanol. Two units per day therefore means 14 units/week
or 16 g/day. The [NHS alcohol guidance](https://www.nhs.uk/Live-well/alcohol-advice/calculating-alcohol-units/)
advises both men and women not to exceed 14 units/week regularly and to
spread that quantity over at least three days. This is a low-risk limit,
not a risk-free threshold.

The EPIC alcohol bins are too broad to resolve the dose-response. Zhao et
al.'s [2023 meta-analysis, Table 4](https://pmc.ncbi.nlm.nih.gov/articles/PMC10066463/)
pooled 107 cohorts and accounts for several biases, notably inclusion of
former drinkers in the abstaining comparison group. The fully adjusted
all-cause mortality relative risks (RRs) compared with lifetime abstainers
are below. UK weekly units are converted from the original mean daily
grams using `units/week = grams/day × 7 / 8`; the exact boundaries are
shown to avoid cumulative rounding error.

| Original dose (g/day) | Equivalent UK units/week | Men, RR (95% CI) | Women, RR (95% CI) |
| --- | --- | ---: | ---: |
| Lifetime abstention | 0 | 1 (ref) | 1 (ref) |
| >0 to <1.3 | >0 to <1.1375 | 1.00 (0.91–1.09) | 0.99 (0.87–1.11) |
| 1.3 to <25 | 1.1375 to <21.875 | 0.94 (0.88–1.01) | 0.99 (0.90–1.10) |
| 25 to <45 | 21.875 to <39.375 | 1.01 (0.93–1.10) | 1.21 (1.08–1.36) |
| 45 to <65 | 39.375 to <56.875 | 1.15 (1.03–1.28) | 1.34 (1.11–1.63) |
| ≥65 | ≥56.875 | 1.34 (1.23–1.47) | 1.61 (1.44–1.80) |

Two units/day lies in the low-volume category, whose estimates are not
statistically distinguishable from neutral mortality in either sex.
This is consistent with little net change at that dose but does not prove
that the first two units each day are harmless. The analysis does not
resolve differences between doses within each group. The calculator displays
these published central estimates and their uncertainty as a separate check
on the continuous fitted curve, rather than using them to compute the dose's
effect. An estimated association with lower mortality is not
proof that drinking extends life. Above the low-volume category, the
observed risk increases with dose, especially for women. The paper
reports an elevated RR for former drinkers (1.39 for men, 1.27 for women);
zero current consumption does not erase previous exposure or any disease
that prompted quitting.

[Wood et al., Lancet 2018](https://doi.org/10.1016/S0140-6736(18)30134-X)
analysed 599,912 current drinkers across 83 prospective cohorts. Its
all-cause mortality curve had a shallow low-dose region near or below
100 g/week (12.5 UK units/week) and rose nonlinearly at higher intake.
Relative to current drinkers consuming up to 12.5 units/week, estimated
remaining life at age 40 was lower by about six months for >12.5–25 units,
1–2 years for >25–43.75 units, and 4–5 years for >43.75 units/week. These
are comparisons between current drinkers, not against people who have
never drunk. They independently support a nonlinear dose-response, and
should not be added to the calculator's alcohol estimate.

The Wood study also found stronger mortality associations when the same
weekly quantity was drunk less frequently, although smoking and social
factors may confound that result. Average weekly units cannot distinguish
binge patterns; this is a limitation of a quantity-only calculator.

### Alcohol: continuous dose-response evidence

The Zhao meta-analysis is useful for judging potential confounding and
checking the direction of associations, but its low-volume category spans
almost 21 UK units per week. It does not provide a fitted continuous curve.
Several alternative studies resolve doses more finely; their estimates
disagree partly because their reference groups and analytical designs differ.

**MORGAM.** [Di Castelnuovo et al. (2022), Table 2 and Figure 1](https://doi.org/10.1111/add.15593)
studied 142,960 people with 16,907 deaths over a median 11.8 years. The
fully adjusted, sex-pooled all-cause hazard ratios are 0.89 (0.86–0.93)
for 0.1–10 g/day (~0.09–8.75 UK units/week), 0.98 (0.92–1.05) for
10.1–20 g/day (~8.84–17.5 units/week), and 1.13 (1.07–1.20) above
20 g/day. Figure 1a fits a restricted cubic spline with knots at the 5th,
50th and 95th percentiles. Its reference is lifetime abstinence: former
drinkers and people with indeterminate drinking histories were excluded
from this continuous analysis. The text places the fitted minimum near
5 g/day (~4.4 units/week). The graph extends to 50 g/day (43.75 units/week)
and includes confidence bands but the coefficients and exact numerical
curve values are not tabulated. The source is stronger evidence of a
nonlinear shape than the broad Zhao dose bins, but still observational.
Its regional subgroup estimates vary substantially.

**US NHIS.** [Tian et al. (2023), Table 2 and Figure 1](https://doi.org/10.1186/s12916-023-02907-6)
studied 918,529 US adults with 141,512 deaths. Compared with lifetime
abstainers (defined as fewer than 12 drinks ever), adjusted all-cause
hazard ratios were 0.87 (0.84–0.90) for current infrequent drinkers
(1–11 US drinks per year), 0.77 (0.75–0.79) for current light drinkers
(at least 12 drinks per year, at most 3/week), 0.82 (0.80–0.85) for
moderate drinkers, and 1.07 (1.03–1.12) for heavy drinkers. A US standard
drink is defined as 14 g ethanol, so the upper light-drinker boundary is
5.25 UK units/week; moderate-drinker upper boundaries were 12.25 units/week
for women and 24.5 for men. Former drinkers are separate groups.
The study additionally fits a sex-pooled restricted cubic spline using
four knots, but does not tabulate its numerical coordinates or coefficients.
The relatively large apparent protection at low consumption differs from
Zhao's study-level bias-adjusted results.

**EPIC lifetime intake.** [Ferrari et al. (2014), Figure 1](https://doi.org/10.1136/bmjopen-2014-005245)
analysed 380,395 Europeans with 20,453 deaths and separated former drinkers
and lifetime abstainers. The published overall-mortality HRs use light
drinkers (0.1–4.9 g/day) as reference, not abstainers:

| Mean lifetime g/day | Approximate UK units/week | Men, HR (95% CI) | Women, HR (95% CI) |
| --- | ---: | ---: | ---: |
| Never drank | 0 | 1.29 (1.10–1.51) | 1.26 (1.18–1.35) |
| 0.1–4.9 | 0.09–4.29 | 1 (ref) | 1 (ref) |
| 5–14.9 | 4.38–13.04 | 0.93 (0.87–0.99) | 1.02 (0.97–1.06) |
| 15–29.9 | 13.13–26.16 | 0.99 (0.92–1.07) | 1.06 (0.99–1.13) |
| 30–59.9 | 26.25–52.41 | 1.15 (1.06–1.24) | 1.27 (1.13–1.43), for all ≥30 g/day |
| ≥60 | ≥52.5 | 1.53 (1.39–1.68) | Included in ≥30 g/day |

One could rebase the point estimates to never drinking by dividing by
1.29 or 1.26 for men or women, respectively, but rebased limits between
two estimated categories are not a valid 95% CI without their covariance.
The study's supplementary Figures S2 and S3 additionally fit sex-specific
continuous fractional-polynomial curves. Exact fitted coefficients are
not provided in the accessible article text. The extreme-intake men's
hazard ratio attenuated with attained age, suggesting that an
age-invariant alcohol multiplier is itself a simplifying assumption.

**PLCO lifetime intake.** [Kunzmann et al. (2018), Figure 2A and
Supplementary Figure S1](https://doi.org/10.1371/journal.pmed.1002585)
studied 99,654 adults aged 55–74 (9,599 deaths). They fitted a pooled
restricted cubic spline referenced to genuine lifetime abstainers, with
a detailed low-dose plot up to seven US equivalent drinks/week in
Supplementary Figure S1. The lowest estimated all-cause mortality was
at less than half a drink per day. Unlike Zhao, the categorical analysis
distinguishes >0–<1, 1–<3, 3–<5, and 5–<7 drinks/week before the higher
daily categories. The main paper's categories reference light drinkers;
Supplementary Table S1 instead reports sex-specific estimates relative to
never drinkers. The table's numerical contents and finer spline
coordinates were not available through the accessible sources.
Extrapolation of results from older adults to all ages should be avoided.

**A recent continuous slope with numerical estimates and limits.**
[Clay et al. (2025), Table 2](https://doi.org/10.1111/dar.13993)
modelled mortality in 145,760 Canadian past-week drinkers aged 15 or
older (18,160 deaths). The table provides a proportional hazard ratio
for each additional Canadian standard drink/week (13.45 g ethanol,
or 1.68125 UK units/week), adjusted for age, region, education,
income, smoking and other sociodemographic factors:

| Sex | HR per additional Canadian drink/week (95% CI) |
| --- | ---: |
| Male | 1.008 (1.005–1.010) |
| Female | 1.020 (1.011–1.029) |
| Combined | 1.009 (1.007–1.012) |

For an increase of `u` UK units/week, the fitted HR is
`reported_HR ** (u * 8 / 13.45)`; the same transformation applies to the
two coefficient limits. These are dose-specific **increases among
drinkers**, not direct comparisons against lifelong abstainers. For example,
the fitted increase of 7 UK units/week is 1.034 (1.021–1.042) for men
and 1.086 (1.047–1.126) for women, calculated from the published coefficients.
Using the equation all the way to zero drinks extrapolates from this cohort
and must be disclosed; the original study excluded non-drinkers. The model
is also log-linear, so it cannot independently estimate whether a very
small amount of alcohol has a different direction of association from zero.

**An exact older nonlinear model.** [Di Castelnuovo et al. (2006), Table 3](https://doi.org/10.1001/archinte.166.22.2437)
published the coefficient pairs for its best-fitting fractional polynomial
`RR(x) = exp(sqrt(x) * (b1 + b2 * ln(x)))`, with `x` in g ethanol/day
and `RR(0) = 1` by continuity. The pooled age-adjusted subgroup
excluding former and light drinkers from the nondrinking reference
(27 curves, 660,988 participants, 63,004 deaths) has
`b1 = -0.1429` (SE 0.0073) and `b2 = 0.0405` (SE 0.0019).
The sex-specific, age-adjusted subgroups (which include some studies
with mixed reference categories) have coefficients −0.1445 and 0.0388
for men, −0.1719 and 0.0533 for women. Although this permits continuous
evaluation at any dose, it is based on studies through 2005 and estimates
stronger apparent low-dose protection than the more recent bias-adjusted
Zhao analysis. Exact pointwise uncertainty cannot be reconstructed from
separate coefficient standard errors without their covariance.

The calculator uses this strict-reference pooled fitted curve at every
whole UK unit/week from 0 to 70, with the 2023 sex-specific category
estimate displayed alongside it for comparison. The older fitted
association is an estimate, not a causal effect or a consensus curve.
The coefficients' published marginal standard errors support a
conditional sensitivity range, described in [MAGIC_NUMBERS.md](MAGIC_NUMBERS.md);
this is not a published pointwise 95% confidence interval.

The broad-bin estimates, finer categories, fitted curves and drinker-only
slopes answer different questions and should not be added together.
None establishes that starting to drink will extend an individual's life.

## Physical activity: dose-response

[Garcia et al. (2023), Table 1](https://doi.org/10.1136/bjsports-2022-105669)
pooled prospective cohorts of non-occupational physical activity. The largest
mortality risk reductions were at low-to-moderate activity levels, with smaller
additional associations above 150 minutes/week. They use marginal MET-hours
(mMET-hours), which subtract the resting metabolic rate from activity intensity.

| Moderate-equivalent minutes/week | mMET-hours/week | All-cause mortality RR (95% CI) vs inactive |
| ---: | ---: | ---: |
| 0 | 0 | 1 (ref) |
| 75 | 4.375 | 0.77 (0.73–0.80) |
| 150 | 8.75 | 0.69 (0.65–0.73) |
| 300 | 17.5 | 0.66 (0.62–0.70) |

The calculator uses these pooled estimates for both sexes, with 30 and 225
minutes/week estimated by log-linear interpolation. Above 300 minutes/week
it holds the risk constant because additional differences are small and uncertain.
It divides the estimates by 0.66 to use 300+ minutes as its reference; this
replaces rather than adds to EPIC's physical activity estimate. Moderate-equivalent
minutes are an approximate intensity conversion (one vigorous minute counts as two).

## Sleep duration

Sleep is absent from EPIC's model. The [2025 meta-analysis of 79 cohort
studies](https://doi.org/10.1007/s11357-025-01592-y) reports these pooled
all-cause mortality hazard ratios, used for both sexes in the calculator:

| Sleep duration | HR (95% CI) |
| --- | ---: |
| <7 hours/night | 1.14 (1.10–1.18) |
| 7–8 hours/night (modelled as 7–<9) | 1 (ref) |
| ≥9 hours/night | 1.34 (1.26–1.42) |

The calculator models these as mortality multipliers and derives estimated
age-dependent life-year differences on the EPIC-anchored curve. This is not a validated
joint sleep and lifestyle model; the associations may overlap with other habits.
Long sleep can be a symptom of illness, so deliberately reducing it is not
necessarily beneficial. For comparison, the independent [Canadian life-table
study (2022)](https://pubmed.ncbi.nlm.nih.gov/36029755/) estimated 1.2 and
2.6 fewer remaining years at age 20 for short and long sleepers, respectively.
Its life-year estimates are not added to the calculator.

## Risk units and life expectancy

The units answer distinct questions:

- One micromort is a one-in-a-million chance of death; one millimort is
  1,000 micromorts, or a one-in-a-thousand chance of death. A probability
  needs a defined period or exposure (e.g. the next ten years).
  [Spiegelhalter and Pearson's explanation of micromorts](https://plus.maths.org/os/issue55/features/risk/index).
- One microlife is a 30-minute difference in expected lifespan, as
  proposed by [Spiegelhalter, BMJ 2012](https://doi.org/10.1136/bmj.e8223)
  for comparing chronic habits. A year of expected life is about
  17,532 microlives (365.25 × 24 × 2). A daily microlife value also needs
  an assumed duration of exposure, not just this conversion.

A change of one year in life expectancy does not imply a particular
number of additional deaths over ten years. For a hypothetical reference
probability of death p over a given period, proportional hazards imply
a probability of death 1 − (1 − p)^HR at hazard ratio HR. This follows
from applying HR to the reference cumulative hazard. Multiplying the
difference in probabilities by 1,000 gives a difference in millimorts
(expected additional deaths per 1,000). The reference probability must
be stated; it is not the same as an individual's assessed death risk.
The calculator reconstructs the age-40 reference mortality curve from
the study's published reference and heavy-smoking life expectancies and
hazard ratios; see [MAGIC_NUMBERS.md](MAGIC_NUMBERS.md) for the calibration
and calculated probabilities. Hazard ratios multiply in the study's
proportional-hazards model, whereas
absolute risk differences and their confidence intervals do not generally
add. The site can compare profiles by subtracting their modelled risks or
life expectancy estimates; the model derives age-dependent life-year contrasts
from the calibrated conditional survival curve, not from treating the
ten-year cumulative death probability as a lifetime risk.

## Scope and uncertainty

- The seven model factors capture major lifestyle associations, but
  they omit genetics, healthcare, social circumstances, occupational
  exposures and many other determinants of health. Reported predictions
  are model estimates conditional on surviving to the selected age (18–100).
- We calibrate the mortality curve at age 40 and extrapolate it below that
  age and beyond the study's maximum attained age (82) to 110. Its assumptions, including
  proportional hazards, and its German population and period limit
  applicability to other cohorts.
- Diet and exercise were reported by participants, with measurement
  error. Results are conditional on the exact bins and are not intended
  to interpolate arbitrary daily quantities. The three updated factors use risk
  estimates transferred from different populations; the combined estimates
  may double count shared pathways and are not independently validated.
- Individual confidence intervals describe statistical uncertainty in the
  estimates, not the whole range of a person's future lifespan. A combined
  confidence interval cannot be recovered by adding marginal limits;
  the estimates are correlated. The calculator displays the original
  95% confidence intervals and conditional ranges for factor comparisons
  derived from their endpoints (coefficient-limit ranges for alcohol).
  These ranges do not capture uncertainty
  in the model baseline, the joint distribution or the transfer between
  study populations. See [MAGIC_NUMBERS.md](MAGIC_NUMBERS.md).
- For external corroboration, [Lo et al., 2024](https://doi.org/10.2196/57045)
  estimated 7.13 additional years (95% CI 1.33–11.11) for Taiwanese adults
  adhering to all five studied healthy lifestyle factors versus zero or
  one. [Li et al., 2018](https://doi.org/10.1161/CIRCULATIONAHA.117.032047)
  estimated 12.2 additional years for men and 14.0 for women at age 50
  for five versus zero low-risk factors in US cohorts. Different exposure
  definitions and underlying populations explain why no universal
  conversion is justified.
