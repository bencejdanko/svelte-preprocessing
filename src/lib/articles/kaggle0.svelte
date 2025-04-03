<script lang='ts'>
import CodeBlock from '$lib/components/code-block/code-block.svelte';
import Snippet from '$lib/components/code-block/types';
import { createSnippet } from '$lib/components/code-block/types';
import GlossaryTooltip from '$lib/components/glossary-tooltip/glossary-tooltip.svelte';

</script>

<template lang=1>

[competition link](https://www.kaggle.com/competitions/jane-street-real-time-market-data-forecasting?utm_medium=email&utm_source=gamma&utm_campaign=comp-jane-street2024)

This will be my first submission to Kaggle. Due to the lucrative awards, and free hardware usage, I think Kaggle is a great place to investigate current data science trends and techniques. For example, I am interested in doing audio analysis for my master project, and I will be looking into reports from a [previous competition](https://www.kaggle.com/competitions/birdclef-2024?utm_medium=email&utm_source=gamma&utm_campaign=comp-birdclef-2024) to see some of the techniques that won.

A past competition that evaluated a similar dataset was [this from Ubiquant (3 years ago)](https://www.kaggle.com/competitions/ubiquant-market-prediction), with similar anonomized feature data. I'll be looking into the solutions as a kind of case study for what works.

One important note is that the top scores for Ubiquant reached 0.12, while Jane Street entries are struggling at 0.0082. I think this indicates that the market trends are significantly less correlated. Intuitively I would think that models that benefit from highly correlated data may not be the most effective for noisy ones.

# Analyzing past top model strategies

LGBM model with a TabNet ensemble was the winning approach. I'm not overly familiar with current forecasting models, so I read [this paper](https://www.atlantis-press.com/proceedings/icfied-22/125971542). It's a little sus with spelling errors and dubious english but that just implies it wasn't churned through ChatGPT. A capital critical review if I say so myself ::emot-eng101.gif::

(in progress)

Why is it so slow? [can it render](this?)

</template>

