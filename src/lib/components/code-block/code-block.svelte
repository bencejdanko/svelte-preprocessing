<script lang="ts">
    import { onMount } from "svelte";
    import hljs from "highlight.js/lib/core";
    import json from "highlight.js/lib/languages/json";
    import xml from "highlight.js/lib/languages/xml";
    import javascript from 'highlight.js/lib/languages/javascript'
    import typescript from 'highlight.js/lib/languages/typescript'
    hljs.registerLanguage("json", json);
    hljs.registerLanguage("xml", xml);
    hljs.registerLanguage("javascript", javascript);
    hljs.registerLanguage("typescript", typescript)

    import Snippet from "./types"
    import { HealthService } from "pocketbase";

    export let copyLabel = "Copy";

    export let snippets: Snippet[] = [
        new Snippet()
    ]
    
    export let height_strict: number | undefined = undefined

    let height: number = snippets[0].code.split("\n").length * 25;
    
    let highlightedLines = [] as string[];
    let selectedTab = 0;
    let toggleBlur = snippets[selectedTab].blur;

    function highlightCode() {
        const lines = snippets[selectedTab].code.split("\n");
        highlightedLines = lines.map((line) => {
            const highlighted = hljs.highlight(line, { language: snippets[selectedTab].lang }).value;
            return highlighted;
        });
    }

    function selectTab(index: number) {
        selectedTab = index;
        toggleBlur = snippets[selectedTab].blur;
        highlightCode();
    }
    
    onMount(async () => {
        highlightCode();
    });
</script>

<style>
    .selected-button {
        position: relative;
    }

    .selected-button::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px; /* Adjust the height as needed */
    }
</style>

<div class='bg-background rounded m-4 border-primary border-[1px]'>
<div class='rounded-t flex justify-between bg-muted'>
    <div>
    {#each snippets as snippet, index}
    <button class='rounded p-4 {selectedTab === index ? 'bg-secondary text-primary selected-button after:bg-gradient-to-r after:from-cold after:to-hot' : 'text-secondary-foreground'}' on:click={() => selectTab(index)}>{snippet.filename}</button>
    {/each}
</div>
    <button class='text-primary p-4' on:click={()=>{
        navigator.clipboard.writeText(snippets[selectedTab].code);
        copyLabel = "Copied!";
        setTimeout(() => {
            copyLabel = "Copy";
        }, 1000);
    }}>{copyLabel}</button>
</div>
<div style='height: {height_strict ? height_strict : height}px' class='overflow-auto'>
<pre 
style='white-space: pre-wrap; '
class='rounded pt-2'>
{#each highlightedLines as line, index}
{#if snippets[selectedTab].unblurredLines?.includes(index + 1)}
<div class='inline-block flex bg-muted'>
<span class='ml-4'>{index + snippets[selectedTab].startLine}  {@html line}</span>{index !== highlightedLines.length - 1 ? "\n" : ''}
</div>
{:else}
<div class='inline-block flex'>
<span role='presentation' class="{toggleBlur ? "blur-[1px]" : ""} transition-all ml-4" on:mouseover={snippets[selectedTab].blur ? () => {toggleBlur = false} : undefined} on:mouseleave={snippets[selectedTab].blur ? () => {toggleBlur=true} : undefined} on:focus={snippets[selectedTab].blur ? () => {toggleBlur = false} : undefined} >{index + snippets[selectedTab].startLine}  {@html line}</span>{index !== highlightedLines.length - 1 ? "\n" : ''}
</div>
{/if}
{/each}
</pre>
</div>
</div>