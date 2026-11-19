# Calculations and assumptions

The model uses the baseline and four factors from [Li, Hüsing & Kaaks (2014)](https://doi.org/10.1186/1741-7015-12-59), tables 2 and 3, and replaces activity and alcohol and adds sleep using external meta-analyses. See [LIFESTYLE_RESEARCH.md](LIFESTYLE_RESEARCH.md) for the definitions, effect sizes, uncertainty and evidence. The combined model is illustrative and has not been validated against a single cohort.

## Life expectancy

Reference remaining life expectancy at age 40 is 47.5 years for men and 48.7 years for women. The study's reference habits are never smoking, BMI 22.5–24.9, at least 36 MET-hours/week of leisure activity, at least 200 g/day of fruit and vegetables, less than 120 g/day of red and processed meat, and no/light drinking (the study's sex-specific grouping).

The age control accepts whole years from 18 through 100. Both profiles are conditional on survival to the selected age. We retain the published adjusted hazard ratios (Table 2) for smoking, BMI, fruit/vegetables and red/processed meat and approximate each external relative risk as a hazard multiplier. Multiply the seven selected hazard ratios and integrate the resulting survival curve from the selected age to 110 to estimate remaining life expectancy. The source's published age-40 life-year differences (Table 3) are shown in option tooltips for context; the calculator consistently computes its own age-dependent differences instead of adding those fixed values. This assumes that the associations apply at the selected age and that effects from different studies don't overlap. Neither assumption is established. We use the EPIC baseline as an approximate anchor at 300+ moderate-equivalent minutes/week, no alcohol and 7–<9 h sleep. Those new categories are not the original EPIC reference categories.

For example, at 40 a male model-reference profile has an estimated age at death of 40 + 47.5 = 87.5. Changing only smoking to more than 10 cigarettes/day gives 78.1 by construction. At other ages the model conditions the survival integral on reaching that age; it does not subtract years already lived from an unchanged remaining-life estimate. Extrapolation below 40 and above the source study's observed ages is particularly uncertain and the Gompertz model does not explicitly represent accidents or other age-dependent causes of death.

The selectable example lifestyles ("Overweight, active", "Light smoker, lean", and "Higher risk") are example category combinations, not population averages. "Model reference" is the anchor described above.

## Millimorts

One millimort represents a probability of death of 0.001 (one death per thousand people exposed to the same risk). A risk without a time horizon is meaningless for chronic lifestyle factors. We use the ten years following the selected age.

The study fitted sex-specific Gompertz proportional-hazards models. The article does not publish the baseline coefficients, so we reconstruct approximate ones from two published life-expectancy estimates per sex and the adjusted hazard ratio for heavy smoking. This is a separate illustrative calculation, not a reported result.

Let a denote current age, t years from today, h the reference annual hazard at age 40 and k the exponential age coefficient. With a product H of the chosen category hazard ratios, conditional survival is:

`S(t | a) = exp[-H h exp(k(a − 40)) (exp(kt) − 1)/k]`

The annual life table integrates conditional survival using the trapezoid rule at integer ages a through 110, consistent with the study's extrapolation horizon. For each sex, the model solves for h and k to match the reference life expectancy and the heavy-smoking-only life expectancy at age 40 (38.1 years for men and 41.4 for women). The heavy smoker hazard ratios are 3.49 and 2.75 respectively. This two-point calibration is sensitive to the paper's rounding, model form and extrapolation.

| Reconstructed estimates | Men | Women |
| --- | ---: | ---: |
| h, annual hazard at age 40 | 0.0001450 | 0.00009568 |
| k, annual exponential coefficient | 0.131361 | 0.137556 |
| Study reference, ten-year millimorts | 3.0 | 2.1 |
| Heavy-smoking only, ten-year millimorts | 10.4 | 5.6 |

Ten-year risk in millimorts is `1000 × (1 − S(10 | a))`. Neither risk differences nor life-year differences are exactly additive because hazards multiply and survival is nonlinear. We average each factor's marginal effect across every possible order of the seven choices (a Shapley allocation) for both metrics. This produces signed bars that sum to the displayed total difference; it does not establish causality.

Positive bars mean fewer expected deaths per thousand than the comparison lifestyle; negative bars mean more. Absolute risk values are separately shown for both lifestyles.

## Microlives

A microlife is 30 minutes of expected lifespan (see [Spiegelhalter, 2012](https://doi.org/10.1136/bmj.e8223)). We spread the life-expectancy difference over the comparison lifestyle's expected remaining years:

`microlives per day = difference in life years × 48 / comparison remaining years`

For example, a 2-year difference spread over a 40-year remaining lifespan corresponds to 2.4 microlives per day, or 72 minutes of expected life per day. This is a unit conversion for long-term associations, not the immediate impact of a single day's behaviour.

## External mortality estimates

- Activity: [Garcia et al. (2023), Table 1](https://doi.org/10.1136/bjsports-2022-105669) reports relative risks of 1, 0.77, 0.69 and 0.66 at moderate-equivalent 0, 75, 150 and 300 minutes/week respectively. The 30 and 225 minute options use log-linear interpolation between the adjacent reported estimates. Divide all risks by 0.66 to anchor the most active category; the model caps the benefit above 300 minutes/week as the additional evidence is uncertain.
- Alcohol: [Di Castelnuovo et al. (2006), Table 3](https://doi.org/10.1001/archinte.166.22.2437) reports a fitted continuous model for 27 adjusted curves (660,988 participants) excluding light and former drinkers from the nondrinker reference. Put `x = UK units/week × 8 / 7` in grams of ethanol/day. The published curve is `RR(x) = exp(sqrt(x) × (-0.1429 + 0.0405 × ln(x)))` and `RR(0) = 1` by continuity. We use the pooled curve for both sexes and evaluate it for 0–70 whole units/week. The input cap is a model choice, not a safe limit or a claim about the range of individual data. These older studies estimate considerably more low-dose protection than [Zhao et al. (2023), Table 4](https://doi.org/10.1001/jamanetworkopen.2023.6185), whose broad-bin sex-specific estimates are shown separately. Neither study establishes a causal benefit. The calculator does not combine their estimates.
- Sleep: [2025 sleep meta-analysis](https://doi.org/10.1007/s11357-025-01592-y) reports pooled hazard ratios of 1.14 for <7 hours and 1.34 for ≥9 hours compared with 7–8 hours. We use these ratios for both sexes and approximate the reference as 7–<9 hours. Long sleep may be a consequence of illness.

## Uncertainty

The inputs show the original all-cause mortality HR or RR and its published 95% confidence interval (CI) where available. For the continuous alcohol curve, the two estimated coefficient standard errors are 0.0073 and 0.0019, but their covariance was not published. Consequently we vary the coefficients over their individual approximate 95% normal-theory limits, yielding a log-RR sensitivity width of `1.96 × sqrt(x) × (0.0073 + abs(ln(x)) × 0.0019)`. Exponentiate the central log-RR plus and minus that width. It is not a published pointwise confidence interval or an estimate of disagreement across studies. The activity source uses inactivity as its reference even though the model anchors the mortality curve to the 300-minute estimate. The chart's whiskers are **conditional source-limit ranges**, not joint 95% confidence intervals:

- Transform each RR/HR endpoint through the same age-conditioned calibrated survival curve (the upper hazard limit gives the lower life-year endpoint). For activity, divide each source endpoint by the fixed anchor of 0.66 as for the central estimate.
- For two different options, recompute the factor's Shapley-allocated life-year and 10-year risk difference with its selected and comparison hazard endpoints varied in opposite directions; all other factor effects stay at their central estimates.
- Convert the life-year endpoints into microlives using the central comparison life expectancy. If both profiles select the same option, its contribution and range are exactly zero because the same uncertain effect cancels.
- Interpolated activity levels (30 and 225 min/week) have no individual published confidence intervals, so comparisons involving them have no whisker. The source-reference category has a relative risk or hazard ratio of exactly one by definition, not an independently estimated zero-width CI.

The endpoints illustrate sensitivity to published uncertainty. They are not a joint confidence interval for a contrast between two non-reference categories (the covariance is unknown), and do not include calibration or cross-study uncertainty. In particular, we do not add whiskers to produce a confidence interval on the overall lifespan, mortality or microlife totals.
