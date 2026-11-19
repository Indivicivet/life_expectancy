# Calculations and assumptions

The model uses the baseline and four factors from [Li, Hüsing & Kaaks (2014)](https://doi.org/10.1186/1741-7015-12-59), tables 2 and 3, and replaces activity and alcohol and adds sleep using external meta-analyses. See [LIFESTYLE_RESEARCH.md](LIFESTYLE_RESEARCH.md) for the definitions, effect sizes, uncertainty and evidence. The combined model is illustrative and has not been validated against a single cohort.

## Life expectancy

Reference remaining life expectancy at age 40 is 47.5 years for men and 48.7 years for women. The study's reference habits are never smoking, BMI 22.5–24.9, at least 36 MET-hours/week of leisure activity, at least 200 g/day of fruit and vegetables, less than 120 g/day of red and processed meat, and no/light drinking (the study's sex-specific grouping).

The study's Gompertz model found that the individual changes in life expectancy remained approximately constant across other risk factor combinations. We retain the published, mutually adjusted year differences (Table 3) for smoking, BMI, fruit/vegetables and red/processed meat. For activity, alcohol and sleep, we approximate each relative risk as a proportional hazard multiplier and calculate its life-year difference by integrating the reconstructed survival curve with that factor alone, then subtracting the baseline years. The model adds all seven differences. This assumes that the three external estimates apply to the reference population and don't overlap with the other effects. Neither assumption is established. We use the EPIC baseline as an approximate anchor at 300+ moderate-equivalent minutes/week, no alcohol and 7–<9 h sleep. Those new categories are not the original EPIC reference categories.

For example, a male model-reference profile has an estimated age at death of 40 + 47.5 = 87.5. Changing only smoking to more than 10 cigarettes/day gives 87.5 − 9.4 = 78.1. Changing BMI to ≥30 as well gives 78.1 − 3.1 = 75.0. The original EPIC combined estimates no longer correspond to the higher-risk preset because three factors now use different data and categories.

The selectable example lifestyles ("Overweight, active", "Light smoker, lean", and "Higher risk") are example category combinations, not population averages. "Model reference" is the anchor described above.

## Millimorts

One millimort represents a probability of death of 0.001 (one death per thousand people exposed to the same risk). A risk without a time horizon is meaningless for chronic lifestyle factors. We use the ten years following age 40.

The study fitted sex-specific Gompertz proportional-hazards models. The article does not publish the baseline coefficients, so we reconstruct approximate ones from two published life-expectancy estimates per sex and the adjusted hazard ratio for heavy smoking. This is a separate illustrative calculation, not a reported result.

Let t denote years since age 40, h the reference annual hazard at t=0 and k the exponential age coefficient. With a product H of the chosen category hazard ratios, survival is:

`S(t) = exp[-H h (exp(kt) − 1)/k]`

The annual life table integrates survival using the trapezoid rule at integer ages 40 through 110, consistent with the study's extrapolation horizon. For each sex, the model solves for h and k to match the reference life expectancy and the heavy-smoking-only life expectancy (38.1 years for men and 41.4 for women). The heavy smoker hazard ratios are 3.49 and 2.75 respectively. This two-point calibration is sensitive to the paper's rounding, model form and extrapolation.

| Reconstructed estimates | Men | Women |
| --- | ---: | ---: |
| h, annual hazard at age 40 | 0.0001450 | 0.00009568 |
| k, annual exponential coefficient | 0.131361 | 0.137556 |
| Study reference, ten-year millimorts | 3.0 | 2.1 |
| Heavy-smoking only, ten-year millimorts | 10.4 | 5.6 |

Ten-year risk in millimorts is `1000 × (1 − S(10))`. Unlike life-year differences, risk differences are not additive because hazards multiply and survival is nonlinear. To attribute the total risk difference to factors, we average the marginal millimorts avoided by changing each factor across every possible order of the seven choices (a Shapley allocation). This produces signed bars that sum to the displayed total difference; it does not establish causality.

Positive bars mean fewer expected deaths per thousand than the comparison lifestyle; negative bars mean more. Absolute risk values are separately shown for both lifestyles.

## Microlives

A microlife is 30 minutes of expected lifespan (see [Spiegelhalter, 2012](https://doi.org/10.1136/bmj.e8223)). We spread the life-expectancy difference over the comparison lifestyle's expected remaining years:

`microlives per day = difference in life years × 48 / comparison remaining years`

For example, a 2-year difference spread over a 40-year remaining lifespan corresponds to 2.4 microlives per day, or 72 minutes of expected life per day. This is a unit conversion for long-term associations, not the immediate impact of a single day's behaviour.

## External mortality estimates

- Activity: [Garcia et al. (2023), Table 1](https://doi.org/10.1136/bjsports-2022-105669) reports relative risks of 1, 0.77, 0.69 and 0.66 at moderate-equivalent 0, 75, 150 and 300 minutes/week respectively. The 30 and 225 minute options use log-linear interpolation between the adjacent reported estimates. Divide all risks by 0.66 to anchor the most active category; the model caps the benefit above 300 minutes/week as the additional evidence is uncertain.
- Alcohol: [Zhao et al. (2023), Table 4](https://doi.org/10.1001/jamanetworkopen.2023.6185) provides sex-specific relative risk categories, converted to whole UK units/week. We set inconclusive low-dose protective estimates to 1 (neutral), not to the published protective point estimates. No safe-dose claim is implied. High consumption estimates are retained and the top category groups all doses above the study threshold.
- Sleep: [2025 sleep meta-analysis](https://doi.org/10.1007/s11357-025-01592-y) reports pooled hazard ratios of 1.14 for <7 hours and 1.34 for ≥9 hours compared with 7–8 hours. We use these ratios for both sexes and approximate the reference as 7–<9 hours. Long sleep may be a consequence of illness.
