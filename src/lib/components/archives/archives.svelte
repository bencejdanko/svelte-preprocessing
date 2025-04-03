<script lang="ts">
    import type { Metadata, Article } from "$lib/metadata";
    export let metadata: Metadata;
    export let className = "";

    function getAllArticleYears(metadata: Metadata) {
        const years = new Set();
        metadata.articles.forEach((article) => {
            const date = new Date(article.date);
            years.add(date.getFullYear());
        });
        return Array.from(years).sort((a, b) => b - a);
    }

    let sortedArticles = metadata.articles.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
    });

    let color = "";
    function flipColor(): string {
        color = color === "bg-secondary" ? "" : "bg-secondary";
        return color;
    }

    let allYears = getAllArticleYears(metadata);
</script>

{#each allYears as year}
    <div class="text-xl font-light m-5">{year}</div>
    {#each sortedArticles as article, i}
        {#if new Date(article.date).getFullYear() === year}
            <div class="hover:shiny-cta border-l-2 border-primary mb-2 p-5 flex {flipColor()}">
                <div class="mr-10">
                    {new Date(article.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
                </div>
                <a class='max-w-md' href={`?article=${article.file}`}>
                    {article.title}
                </a>

                <div class="flex-grow"></div>
                <div class="text-sm">
                    <strong>{article.category ? article.category + ": " : ""}</strong>
                    {article.tags.join(", ")}
                    
                </div>
            </div>
        {/if}
    {/each}
{/each}
