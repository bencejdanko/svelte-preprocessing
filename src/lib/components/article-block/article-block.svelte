<script lang="ts">
    import type { Metadata } from "$lib/metadata";

    export let metadata: Metadata;
    export let className = "";
    export let style = "";

    //let selectedCategory = Object.entries(metadata.categories)[0];

    import { Calendar, Tags } from "lucide-svelte";

    function timeAgo(input: string) {
        const date = new Date(input);
        const formatter = new Intl.RelativeTimeFormat("en");
        const ranges = {
            years: 3600 * 24 * 365,
            months: 3600 * 24 * 30,
            weeks: 3600 * 24 * 7,
            days: 3600 * 24,
            hours: 3600,
            minutes: 60,
            seconds: 1,
        };
        const secondsElapsed = (date.getTime() - Date.now()) / 1000;
        for (let key in ranges) {
            if (ranges[key] < Math.abs(secondsElapsed)) {
                const delta = secondsElapsed / ranges[key];
                return formatter.format(Math.round(delta), key);
            }
        }
    }
</script>

<div class={className} style={style}>
    <!-- <div
        class="bg-background flex flex-wrap sm:block border-r-secondary border-r-[1px]"
    >
        {#each Object.entries(metadata.categories) as [category, Icon]}
            <button
                on:click={() => {
                    selectedCategory = [category, Icon];
                }}
                class="flex content-center items-center w-full hover:text-primary {selectedCategory[0] ===
                category
                    ? 'btn before:bg-muted gradient-bottom'
                    : 'hover:bg-muted'}"
            >
                <div
                    class="z-10 mt-4 mb-4 ml-4 w-10 h-10 bg-secondary rounded flex items-center justify-center {selectedCategory[0] ===
                    category
                        ? 'bg-gradient-to-br from-hot to-cold'
                        : ''}"
                >
                    <Icon />
                </div>
                <div class="z-10 m-4">{category}</div>
            </button>
        {/each}
    </div> -->

    {#each metadata.articles as article}
        <button
            on:click={() => { window.location.href = `?article=${article.file}` }}
            class="hover:bg-primary-foreground bg-muted border-secondary-foreground border-2 border-primary-foreground grid grid-cols-2 text-left w-[100%] h-[200px] overflow-hidden rounded mb-2"
        >
            <div class='relative p-3 overflow-hidden w-full h-full'>
                <div class="text-lg text-primary">
                    {article.title}
                </div>
                <div class="font-light text-ellipsis overflow-hidden" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
                    {article.desc}
                </div>

                <div class="grid grid-cols-2 sm:grid-cols-3 absolute bottom-4 left-3 w-full">
                    <div class="text-xs font-light flex items-center">
                        <Calendar class="mr-2" />
                        {timeAgo(article.date)}
                    </div>

                    <div class="text-xs font-light flex items-center">
                        <svelte:component this={metadata.categories[article.category]} class="mr-2" />
                        {article.category}
                    </div>

                    <div class="text-xs font-light items-center hidden sm:flex">
                        {article.tags.join(", ")}
                    </div>
                </div>

            </div>

            <img src={article.showcase} alt={article.title} class="overflow-hidden" />
        </button>
    {/each}
</div>

<style>
    .btn::before {
        content: "";
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 1px;
        left: 0px;
    }

    .btn {
        position: relative;
        background: linear-gradient(to right, #00ffa3, #dc1fff);
    }
</style>
