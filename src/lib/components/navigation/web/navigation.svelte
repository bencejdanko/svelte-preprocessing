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

<script lang="ts">
    import { onMount } from "svelte";
    let itemsElement: HTMLTemplateElement;
    let contentsElement: HTMLTemplateElement;
    let items: HTMLElement[] = [];
    let contents: HTMLElement[] = [];
    let highlight: HTMLDivElement;
    let popup: HTMLDivElement;
    let popupTriangle: HTMLDivElement;
    let activeItem: Element | null = null;
    let lastIndex = -1;
    let index = -1;
    let itemsClientWidth: number;
    let mouseIn = false;

    import { fly } from "svelte/transition";

    export let xpadding = 10;
    export let ypadding = 5;
    export let gap = 20;
    export let spreadRight: boolean = true;

    onMount(() => {
        items = Array.from(
            itemsElement.content.children[0].children,
        ) as HTMLElement[];
        contents = Array.from(
            contentsElement.content.children[0].children,
        ) as HTMLElement[];
    });

    function handleMouseEnter(event: MouseEvent | FocusEvent) {

        mouseIn = true;
        const target = event.currentTarget as HTMLElement;
        index = parseInt(target.getAttribute("index") as string);
        activeItem = contents[index];

        const rect = target.getBoundingClientRect();
        highlight.style.width = `${rect.width + 2 * xpadding}px`;
        highlight.style.height = `${rect.height + 2 * ypadding}px`;
        highlight.style.transform = `translate(${target.offsetLeft - xpadding}px, ${target.offsetTop - ypadding}px)`;

        if (activeItem) {
            popup.style.display = "block";
            popup.style.opacity = "1";

            popupTriangle.style.display = "block";
            popupTriangle.style.opacity = "1";
            popupTriangle.style.transform = `translate(${target.offsetLeft + rect.width / 2 - xpadding}px, ${rect.height + ypadding * 2 + window.scrollY}px)`;

            const tempDiv = document.createElement("div");
            tempDiv.style.display = "inline-block";
            tempDiv.style.opacity = "0";
            tempDiv.innerHTML = activeItem?.outerHTML || "";
            document.body.appendChild(tempDiv);
            const popupContentRect = tempDiv.getBoundingClientRect();
            const width = popupContentRect.width;
            const height = popupContentRect.height;
            document.body.removeChild(tempDiv);

            if (spreadRight) {
                popup.style.transform = `translateY(${rect.height + ypadding * 2 + window.scrollY}px)`;
            } else {
                popup.style.transform = `translateY(${rect.height + ypadding * 2 + window.scrollY}px) translateX(-${width - itemsClientWidth}px)`;
            }

            popup.style.width = `${width}px`;
            popup.style.height = `${height}px`;
        }
    }

    function handleMouseLeave() {
        lastIndex = index;
        mouseIn = false;
    }

    function handlePopupMouseEnter(event: MouseEvent | FocusEvent) {
        console.log(mouseIn);
        mouseIn = true;
    }

    function handlePopupMouseLeave() {
        mouseIn = false;
    }

    window.addEventListener("click", () => {
        if (!mouseIn) {
            activeItem = null;
            highlight.style.width = "0";
            popup.style.opacity = "0";
            popupTriangle.style.opacity = "0";
            lastIndex = index;
        }
    });

    function handleKeyDown(event: KeyboardEvent) {
        event.preventDefault();
        if (event.key === "Escape" && activeItem) {
            handleMouseLeave();
            (activeItem as HTMLElement)?.focus();
        }
    }
</script>

<template bind:this={itemsElement}>
    <slot name="items" />
</template>

<template bind:this={contentsElement}>
    <slot name="contents" />
</template>

<div bind:clientWidth={itemsClientWidth} class="relative">
    <div
        bind:this={highlight}
        class="absolute bg-muted -z-10 rounded-full transition-all duration-300 ease-in-out"
    />
    <div style="--gap: {gap}px;" class="flex [&>*]:mr-[var(--gap)]">
        {#each items as item, index}
            <button
                {index}
                tabindex="0"
                aria-haspopup="true"
                aria-expanded={activeItem === item}
                on:mouseenter={handleMouseEnter}
                on:click={handleMouseEnter}
                on:mouseleave={handleMouseLeave}
                on:focus={handleMouseEnter}
                on:blur={handleMouseLeave}
                on:keydown={handleKeyDown}
            >
                {@html item.outerHTML}
            </button>
        {/each}
    </div>
    <div class="relative z-50">
        <div
            bind:this={popup}
            on:mouseenter={handlePopupMouseEnter}
            on:mouseleave={handlePopupMouseLeave}
            class="absolute border-primary border-2 bg-background border transition-all duration-300 ease-in-out overflow-hidden rounded"
            style="display: none;"
            role="dialog"
            aria-hidden={activeItem ? "false" : "true"}
        >
            {#if activeItem}
                {#key activeItem}
                    <div
                        in:fly={{
                            x: lastIndex < index ? -25 : 25,
                            duration: 300,
                        }}
                    >
                        {@html activeItem.outerHTML}
                    </div>
                {/key}
            {/if}
        </div>
        <div
            bind:this={popupTriangle}
            style="display: none;"
            class="popup-triangle"
        />
    </div>
</div>

<style>
    .popup-triangle {
        position: absolute;
        top: -10px;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid hsl(var(--primary));
        transition: all 0.3s ease-in-out;
    }

    .popup-triangle::after {
        content: "";
        position: absolute;
        top: 4px;
        left: -8px;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 8px solid hsl(var(--background));
    }
</style>
