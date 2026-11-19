# Calculations and assumptions

The main calculator uses the six mutually adjusted factors in [Li, Hüsing & Kaaks (2014)](https://doi.org/10.1186/1741-7015-12-59), tables 2 and 3. See [LIFESTYLE_RESEARCH.md](LIFESTYLE_RESEARCH.md) for the category definitions, hazard ratios, confidence intervals and evidence. The numbers are population estimates for age 40, not predictions for a particular individual.

## Life expectancy

Reference remaining life expectancy at age 40 is 47.5 years for men and 48.7 years for women. The study's reference habits are never smoking, BMI 22.5–24.9, at least 36 MET-hours/week of leisure activity, at least 200 g/day of fruit and vegetables, less than 120 g/day of red and processed meat, and no/light drinking (the study's sex-specific grouping).

The study's Gompertz model found that the individual changes in life expectancy remained approximately constant across other risk factor combinations. We add the rounded, mutually adjusted differences (Table 3) to the reference remaining life expectancy. The study reports a smoking–BMI interaction; the simple additive estimate does not reproduce that nuance. We do not combine the marginal confidence intervals, since their covariance is not available.

For example, a male study-reference profile has an estimated age at death of 40 + 47.5 = 87.5. Changing only smoking to more than 10 cigarettes/day gives 87.5 − 9.4 = 78.1. Changing BMI to ≥30 as well gives 78.1 − 3.1 = 75.0. For the higher-risk preset, the rounded changes give 47.5 − 9.4 − 3.1 − 0.4 − 1.3 − 1.4 − 3.1 = 28.8 remaining years, close to the published combined estimate of 29.0 years. The women's equivalent is 48.7 − 7.3 − 3.2 − 1.1 − 0.8 − 2.4 − 1.0 = 32.9 years, versus the paper's 33.0.

The selectable example lifestyles ("Overweight, active", "Light smoker, lean", and "Higher risk") are example category combinations, not population averages. "Study reference" is the paper's baseline category.

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

Ten-year risk in millimorts is `1000 × (1 − S(10))`. Unlike life-year differences, risk differences are not additive because hazards multiply and survival is nonlinear. To attribute the total risk difference to factors, we average the marginal millimorts avoided by changing each factor across every possible order of the six choices (a Shapley allocation). This produces signed bars that sum to the displayed total difference; it does not establish causality.

Positive bars mean fewer expected deaths per thousand than the comparison lifestyle; negative bars mean more. Absolute risk values are separately shown for both lifestyles.

## Microlives

A microlife is 30 minutes of expected lifespan (see [Spiegelhalter, 2012](https://doi.org/10.1136/bmj.e8223)). We spread the life-expectancy difference over the comparison lifestyle's expected remaining years:

`microlives per day = difference in life years × 48 / comparison remaining years`

For example, a 2-year difference spread over a 40-year remaining lifespan corresponds to 2.4 microlives per day, or 72 minutes of expected life per day. This is a unit conversion for long-term associations, not the immediate impact of a single day's behaviour.

## Sleep

The [Canadian sleep duration study (2022)](https://pubmed.ncbi.nlm.nih.gov/36029755/) estimated life expectancy at age 20 to be 1.2 years longer among adults meeting the sleep duration recommendations than those sleeping too little, and 2.6 years longer than those sleeping too much. We show the signed contrast against the recommended group separately. Sleep is not included in the German cohort life expectancy, millimort, or microlife totals, because the study populations and models differ.
