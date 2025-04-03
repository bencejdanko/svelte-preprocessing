<script lang="ts">
    import { onMount } from "svelte";
    import hljs from "highlight.js/lib/core";
    import bash from "highlight.js/lib/languages/bash";
    hljs.registerLanguage("bash", bash);

    export let code = "";
    export let copyLabel = "Copy";
    let highlightedLines = [] as string[];

    onMount(async () => {
        const lines = code.split("\n");
        highlightedLines = lines.map((line) => {
            const highlighted = hljs.highlight(line, { language: "bash" }).value;
            return highlighted;
        });
    });
</script>

<div class='bg-background rounded m-4 border-primary border-[1px]'>
<div class='p-2 rounded-t flex justify-between'>
<button class='ml-2'>
<div class="inline-block rounded-full bg-red-500 w-[10px] h-[10px]"></div>
<div class="inline-block rounded-full bg-yellow-500 w-[10px] h-[10px]"></div>
<div class="inline-block rounded-full bg-green-500 w-[10px] h-[10px]"></div>
</button>
<button class='text-primary px-2 py-1 rounded' on:click={()=>{
navigator.clipboard.writeText(code);
copyLabel = "Copied!";
setTimeout(() => {
    copyLabel = "Copy";
}, 1000);
}}>{copyLabel}</button>
</div>
<pre class='p-5 rounded'>
{#each highlightedLines as line, index}
<span> $ {@html line}</span>{index !== highlightedLines.length - 1 ? "\n" : ''}
{/each}
</pre>
</div>
