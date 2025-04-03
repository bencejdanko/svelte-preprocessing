<script lang="ts">
  import { onMount } from "svelte";
  import "./app.css";
  import "highlight.js/styles/github.css";

  import WebNavigation from "$lib/components/navigation/web/navigation.svelte";
  import Marquee from "$lib/components/marquee/marquee.svelte";
  import ArticleBlock from "$lib/components/article-block/article-block.svelte";
  import ArticleWrap from "$lib/components/article/article.svelte";
  import Archives from "$lib/components/archives/archives.svelte";

  import { metadata } from "$lib/metadata";
  import type { Metadata, Article } from "$lib/metadata";

  import { Sun, Moon } from "lucide-svelte";

  let currentArticleModule: any = null;
  let currentArticle: Article | null = null;
  let loading = false;

  async function loadArticle(article: string) {
    loading = true;
    const module = await import(`$lib/articles/${article}.svelte`);
    currentArticleModule = module.default;
    window.history.pushState({}, "", `?article=${article}`);
    currentArticle =
      metadata.articles.find((data) => data.file === article) || null;
    loading = false;
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Save the new theme to localStorage
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    const article = params.get("article");
    if (article) {
      loadArticle(article);
    }
    loadTheme();
  });
</script>

<div class="flex justify-center">
  <div
    class="max-w-screen-lg w-full ml-[10%] mr-[10%] items-center flex border-b-foreground border-b-4 border-double p-3 justify-between"
  >
    <div class="flex">
      <a href="/">
        <img
          src="32kb.svg"
          alt="32kb.dev"
          class="border-white border-2 rounded-full h-[50px] mr-5"
        />
      </a>

      <button on:click={toggleTheme}>
        <Moon />
      </button>
    </div>

    <a href='https://github.com/bencejdanko'>Github</a>

    <!-- <WebNavigation spreadRight={false}>
      <div slot="items">
        <div>Contact</div>
      </div>

      <div slot="contents">
        <div class="w-[300px] p-5">
          <div
            class="text-muted-foreground font-[sourcecodepro] border-muted-foreground border-b-2 mb-4"
          >
            Contact
          </div>
          <a href="https://github.com/bencejdanko" class="m-2">Github</a>
        </div>
      </div>
    </WebNavigation> -->
  </div>
</div>

{#if loading}
  Loading...
{:else if currentArticle && currentArticleModule}
  <div class="flex justify-center">
    <div class="sm:ml-[10%] sm:mr-[10%] max-w-screen-lg">
      <ArticleWrap {currentArticleModule} {currentArticle} />
    </div>
  </div>
{:else}
  <div class="flex justify-center">
    <div class="ml-[10%] mr-[10%] max-w-screen-lg sm:grid sm:grid-cols-4">
      <div class="sm:col-span-3">
        <div class="sm:grid grid-cols-2 items-center mt-10 mb-10">
          <div>
            <div class="text-5xl font-bold max-w-xl min-w-auto text-primary">
              {metadata.indexInfo.title}
            </div>
            <div class="text-xl max-w-3xl min-w-auto mt-5">
              {metadata.indexInfo.desc}
            </div>
          </div>
          <Marquee gap={50} className="mt-10">
            {#each metadata.indexInfo.marquee.images as item}
              <img alt={item.alt} src={item.src} />
            {/each}
          </Marquee>
        </div>

        <!-- <ArticleBlock {metadata} /> -->

        <div class="text-2xl font-bold mt-10 mb-10">Archives</div>

        <Archives {metadata} />
      </div>
      <div class='hidden sm:block'>
<template lang=1>
# Datasets

*Kaggle Complete*

- [[]] [writing quality](https://www.kaggle.com/competitions/linking-writing-processes-to-writing-quality?utm_medium=email&utm_source=gamma&utm_campaign=comp-writing-processes-2023)
- [[]] [ovarian cancer](https://www.kaggle.com/competitions/UBC-OCEAN/data)
- [[]] [detect llm](https://mail.google.com/mail/u/0/#search/kaggle/FMfcgzGwHVNKRPMpHCvrkbVhZrZPLLKn)
- [[]] [prosumers](https://www.kaggle.com/competitions/predict-energy-behavior-of-prosumers?utm_medium=email&utm_source=gamma&utm_campaign=comp-enefit-2023)
- [[]] [VCCF](https://www.kaggle.com/competitions/blood-vessel-segmentation?utm_medium=email&utm_source=gamma&utm_campaign=comp-hubmap4-2024)
- [[]] [permutation puzzle](https://www.kaggle.com/competitions/santa-2023?utm_medium=email&utm_source=gamma&utm_campaign=comp-santa-2023)
- [[]] [EEG signals](https://www.kaggle.com/competitions/hms-harmful-brain-activity-classification?utm_medium=email&utm_source=gamma&utm_campaign=comp-hms-2024)
- [[]] [loan defaults](https://www.kaggle.com/competitions/home-credit-credit-risk-model-stability?utm_medium=email&utm_source=gamma&utm_campaign=comp-homecredit23)
- [[]] [continuous audio](https://www.kaggle.com/competitions/birdclef-2024?utm_medium=email&utm_source=gamma&utm_campaign=comp-birdclef-2024)
- [[]] [essay scores](https://www.kaggle.com/competitions/learning-agency-lab-automated-essay-scoring-2?utm_medium=email&utm_source=gamma&utm_campaign=comp-learinglab-essay-2024)
- [[]] [ai math](https://www.kaggle.com/competitions/ai-mathematical-olympiad-prize/?utm_medium=email&utm_source=gamma&utm_campaign=comp-ai-mathematical-olympiad-2024)
- [[]] [predict medicines](https://www.kaggle.com/competitions/leash-belka?utm_medium=email&utm_source=gamma&utm_campaign=comp-predict-new-medicines-with-belka)
- [[]] [climate projections](https://www.kaggle.com/competitions/leap-atmospheric-physics-ai-climsim?utm_medium=email&utm_source=gamma&utm_campaign=comp-ClimSim)
- [[]] [diagnosing images](https://www.kaggle.com/competitions/rsna-2024-lumbar-spine-degenerative-classification?utm_medium=email&utm_source=gamma&utm_campaign=comp-rsna-2024)
- [[]] [skin cancer](https://www.kaggle.com/competitions/isic-2024-challenge?utm_medium=email&utm_source=gamma&utm_campaign=comp-isic-2024)

*Kaggle Ongoing*

- [[]] [_ARC Reasoning_](https://www.kaggle.com/competitions/arc-prize-2024/?utm_medium=email&utm_source=gamma&utm_campaign=comp-arcprize-2024)
- [[]] [MCTS](https://www.kaggle.com/competitions/um-game-playing-strength-of-mcts-variants?utm_medium=email&utm_source=gamma&utm_campaign=comp-mcts-variants)
- [[]] [misconceptions](https://www.kaggle.com/competitions/eedi-mining-misconceptions-in-mathematics?utm_medium=email&utm_source=gamma&utm_campaign=comp-eedi-mining)
- [[]] [NFL stats](https://www.kaggle.com/competitions/nfl-big-data-bowl-2025?utm_medium=email&utm_source=gamma&utm_campaign=comp-bigdatabowl-2025)
- [[]] [market data](https://www.kaggle.com/competitions/jane-street-real-time-market-data-forecasting?utm_medium=email&utm_source=gamma&utm_campaign=comp-jane-street2024)
- [[]] [cryoet object](https://www.kaggle.com/competitions/czii-cryo-et-object-identification?utm_medium=email&utm_source=gamma&utm_campaign=comp-cryo)

</template>
      </div>
    </div>
  </div>
{/if}
