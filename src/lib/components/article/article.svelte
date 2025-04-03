<script>
    export let currentArticle;
    export let currentArticleModule;
</script>

<div
    class="text-center block rounded p-2 m-5"
    style="background-image: url({currentArticle?.bg || ''}); 
        background-size: cover; 
        color: {currentArticle?.color !== undefined
        ? currentArticle?.color
        : `hsl(var(--primary))`}"
>
    <div class="text-4xl m-3 font-bold">{currentArticle?.title}</div>
    <div class="font-light m-3">
        {currentArticle?.date}
        {#each currentArticle.tags as tag}
            · <em>{tag} </em>
        {/each}
    </div>
</div>
<div
    class="flex justify-center m-4"
>
    <div class='max-w-2xl text-center'>
        {currentArticle?.desc}
    </div>
</div>
<svelte:component this={currentArticleModule} />
