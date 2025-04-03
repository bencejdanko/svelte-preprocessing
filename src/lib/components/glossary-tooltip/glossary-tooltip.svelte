<script lang='ts'>

    import { onMount } from "svelte";
    import * as Tooltip from "$lib/components/ui/tooltip";

    type glossaryEntry = {
        term: String;
        definition: String;
    }

    export let term = "";
    let glossaryData: glossaryEntry = { term: "", definition: "" };
    let isHovered = false;

    // Function to fetch JSON data
    async function fetchTooltipContent() {

        if (glossaryData.term === term) {
            return;
        }

        try {
            const response = await fetch(`glossary/${term}.json`);
            const data = await response.json();
            glossaryData = data;
        } catch (error) {
            console.error("Error fetching tooltip content:", error);
        }
    }

    // Function to handle hover event
    function handleHover() {
        if (!isHovered) {
            isHovered = true;
            fetchTooltipContent();
        }
    }
</script>

<Tooltip.Root openDelay={100}>
    <Tooltip.Trigger>
        <div on:mouseover={handleHover} on:focus={handleHover} class='underline-offset-4 underline decoration-dotted'>
            {term}
        </div>
    </Tooltip.Trigger>
    <Tooltip.Content>
        <div class='w-[300px]'>
            <p class='p-1 font-bold'>{glossaryData.term}</p>
            <p class='p-1'>{glossaryData.definition}</p>
            <a href='/glossary'>See Glossary</a>
        </div>
    </Tooltip.Content>
</Tooltip.Root>
