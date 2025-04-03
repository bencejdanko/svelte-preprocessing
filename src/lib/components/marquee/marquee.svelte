<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    let marqueeContent: HTMLDivElement;
    let marquee: HTMLDivElement;
    let padding: HTMLDivElement;
    let contentWidth: number;
    let contentHeight: number;
    export let gap = 0;
    export let fade = true;
    export let className = '';

    onMount(() => {
        const contentStack: { element: HTMLElement; timestamp: number }[] = [];
        const speed = 1; // Speed of decrementing width in pixels per frame

        const adjustContent = () => {
            const screenWidth = window.innerWidth;
            let totalWidth = 0;

            // Remove existing clones
            while (marquee.lastChild !== padding && marquee.lastChild !== null) {
                marquee.removeChild(marquee.lastChild);
            }
            contentStack.length = 0;

            while (totalWidth < screenWidth + contentWidth) {
                cloneContent();
                totalWidth += contentWidth;
            }
        };

        const cloneContent = () => {
            const content = marqueeContent.firstElementChild as HTMLDivElement;
            const clone = content.cloneNode(true) as HTMLDivElement;
            marquee.appendChild(clone);
        };

        padding.style.width = `${contentWidth}px`;

        adjustContent();

        const animate = () => {
            const currentWidth = parseFloat(padding.style.width);
            const newWidth = currentWidth - speed;
            padding.style.width = `${newWidth}px`;
            // Check if the width has reached zero
            if (newWidth <= 0) {
                // Remove the oldest item from the stack
                const oldestItem = contentStack.shift();
                if (oldestItem) {
                    marquee.removeChild(oldestItem.element);
                }
                // Reset the width of the empty div
                padding.style.width = contentWidth + "px";
            }
            requestAnimationFrame(animate);
        };
        // Start the animation loop
        requestAnimationFrame(animate);

        // Add resize event listener
        window.addEventListener("resize", adjustContent);

        // Cleanup on destroy
        onDestroy(() => {
            window.removeEventListener("resize", adjustContent);
        });
    });
</script>

<div
    bind:this={marqueeContent}
    bind:clientWidth={contentWidth}
    bind:clientHeight={contentHeight}
    class="max-w-max absolute"
    style="transform: translateX(-{contentWidth*10}px);"
>
    <div style="--gap: {gap}px;" class="flex items-center [&>*]:mr-[var(--gap)] shrink-0">
        <slot />
    </div>
</div>

<div class="relative overflow-hidden {className} grid grid-cols-1">
    <div
        class="absolute inset-0 {fade ? 'bg-gradient-to-l via-transparent from-transparent to-background' : ''} z-10 content-center"
    />

    <div
        class="absolute inset-0 {fade ? 'bg-gradient-to-l via-transparent to-transparent from-background' : ''} z-10 content-center"
    />

    <div
        bind:this={marquee}
        class="relative flex items-center whitespace-nowrap"
        style="transform: translateX(-{contentWidth}px);"
    >
        <div class="shrink-0" bind:this={padding}></div>
    </div>
</div>
