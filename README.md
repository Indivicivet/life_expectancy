# Life expectancy calculator

Explore the relative size of lifestyle-associated mortality risks and changes in life expectancy. The [GitHub Pages URL](https://indivicivet.github.io/life_expectancy/) will be available once the repository is published.

Compare long-term habits in smoking, physical activity, body weight, alcohol, fruit and vegetable intake, and red and processed meat consumption. The main model is based on the German EPIC-Heidelberg cohort at age 40. Sleep uses a separate study. Choose a reference lifestyle and display life years, microlives per day, or estimated 10-year millimorts.

This is a sister project to the [climate impact calculator](https://indivicivet.github.io/climate_impact/). It is an educational comparison of cohort-level associations, not a personal survival or medical assessment.

- [LIFESTYLE_RESEARCH.md](LIFESTYLE_RESEARCH.md): studies, effect sizes, confidence intervals and limitations.
- [MAGIC_NUMBERS.md](MAGIC_NUMBERS.md): model equations, assumptions and worked examples.

## Running and publishing

Open `index.html` in a browser; no build step or dependencies are required. Run `node model.test.js` to check the calculations.

To publish, push the files to the repository's main branch and choose **Settings → Pages → Deploy from a branch → main / (root)**. The expected URL is [indivicivet.github.io/life_expectancy/](https://indivicivet.github.io/life_expectancy/).
