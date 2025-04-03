<script>
    import CodeBlock from '$lib/components/code-block/code-block.svelte';
    import TerminalBlock from '$lib/components/terminal-block/terminal-block.svelte';

    let code = 
`{
"name": "Nandana",
"age": 24
}`;
</script>

<template>

# Hello world

## I am 

### rendering

;alt;(smileys/27-smaug.gif) I am this *bold*

[alt | smileys/27-smaug.gif] hehe

::27-smaug.gif:: hehe

</template>

<CodeBlock code={code} lang="json" blur={true} unblurredLines={[2]} />

<CodeBlock code={code} lang="json" blur={false} />

<TerminalBlock code={`echo Hello!`} />
