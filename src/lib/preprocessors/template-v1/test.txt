<script lang='ts'>
import CodeBlock from '$lib/components/code-block/code-block.svelte';
import Snippet from '$lib/components/code-block/types';
import { createSnippet } from '$lib/components/code-block/types';
import GlossaryTooltip from '$lib/components/glossary-tooltip/glossary-tooltip.svelte';

let code1 = 
`import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import template_v0 from './src/lib/preprocessors/template-v0.js'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  extensions: ['.svelte'],
  preprocess: [
    vitePreprocess(),
    template_v0(), //Our custom processor
  ],
}
`

let code2 = 
`import { tokenize } from "./template-v0/lexer.js";
import { parse } from "./template-v0/parser.js";
import { renderChildren } from "./template-v0/renderer.js";

export default function template_v0() {
    return {
        async markup({ content, filename }) {
            
            const regex = /<\\s*template\s+lang\s*=\s*0\s*>([\s\S]*?)<\/\\s*template\s*>/g;
            let result = '';
            let lastIndex = 0;
            let match;

            while ((match = regex.exec(content)) !== null) {

                // Append content outside the current <template> tags
                result += content.slice(lastIndex, match.index);

                // Process the content within the <template> tags
                let templateContent = match[1];
                
                // Tokenize the template content
                const tokens = tokenize(templateContent);
                const { tree, toc } = parse(tokens);
                templateContent = renderChildren(tree);

                
                if (toc.length !== 0) {
                    const tocHtml = \`<nav class="toc"><ul>\${toc.map(item => \`<li><a href="#\${item.id}">\${renderChildren(item.content)}</a></li>\`).join('')}</ul></nav>\`;
                    templateContent = tocHtml + templateContent;
                }


                // Append the processed template content
                result += templateContent;

                // Update lastIndex to the end of the current match
                lastIndex = regex.lastIndex;
            }

            // Append any remaining content after the last <template> tag
            result += content.slice(lastIndex);

            return {
                code: result,
            }
        }
    }
}`

let code3 = `import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path";

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'


import template_v1 from "./src/lib/preprocessors/template-v1.ts";
//import template_v0 from './src/lib/preprocessors/template-v0.js'


// https://vitejs.dev/config/
export default defineConfig({

  plugins: [svelte({
    preprocess: [vitePreprocess(), template_v1(), ],
    extensions: [".svelte", ".svx"],
  })],

  resolve: {
    alias: {
      $lib: path.resolve("./src/lib")
    },
  },
})`

let code4 = `import { lex } from "./template-v1/lexer.ts";
import { renderTokens } from "./template-v1/render.ts";

export default function template_v1() {
    return {
        async markup({ content, filename }: { content: string; filename?: string }) {
            let tokens = lex(content);
            let result = renderTokens(tokens);

            return {
                code: result,
            };
        }
    };
}`

let snip3 = createSnippet({
  code: code3,
  lang: 'typescript',
  filename: 'vite.config.ts',
  blur: true,
  unblurredLines: [15,16,17,18]
})

let snip = createSnippet({
  code: code1,
  lang: 'javascript',
  filename: 'svelte.config.js',
  blur: true,
  unblurredLines: [8,9,10,11]
});

let snip2 = createSnippet({
  code: code2,
  lang: 'javascript',
  filename: 'src/lib/preprocessors/template-v0.js',
  blur: false
});

let snip4 = createSnippet({
  code: code4,
  lang: 'typescript',
  filename: '/src/lib/preprocessors/template-v1.ts'
})


let code7 = `export interface Token {
    type: BlockType | InlineType;
    value?: string;
    tokens?: Token[];
}`

let code5 = `export function lex(src: string): Token[] {

    src = src
        .trim()
        .replace(/\\r\\n|\\r/g, '\\n');

    let { tokens } = lexText(src, 0);

    return tokens;
}`

let code6 = `function lexText(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {

        if (src.startsWith(TEMPLATE, pos)) {

            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: template_tokens } = lexTemplate(src, pos + TEMPLATE.length);

            tokens.push({ type: BlockType.TemplateBlock, tokens: template_tokens });
            pos = newPos;
            continue;
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };

}`

let code8 = `function lexTemplate(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(TEMPLATE_CLOSE, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }
            pos += TEMPLATE_CLOSE.length;
            return { tokens, pos };
        } else if (src.startsWith(HEADER, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: header_tokens } = lexHeader(src, pos + HEADER.length);
            tokens.push({ type: BlockType.HeaderBlock, tokens: header_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(IMAGE, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: image_tokens } = lexImage(src, pos + IMAGE.length);
            tokens.push({ type: BlockType.ImageBlock, tokens: image_tokens });
            pos = newPos;
            continue;

        } else if (src.startsWith(BLOCKQUOTE, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: blockquote_tokens } = lexBlockquote(src, pos + BLOCKQUOTE.length);
            tokens.push({ type: BlockType.BlockquoteBlock, tokens: blockquote_tokens });
            pos = newPos;
            continue;
        
        } else if (src.startsWith(LIST, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: list_tokens } = lexList(src, pos);
            tokens.push({ type: BlockType.ListBlock, tokens: list_tokens });
            pos = newPos;
            continue;
        
        } else if (src.startsWith(PARAGRAPH, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: paragraph_tokens } = lexParagraph(src, pos + PARAGRAPH.length);

            if (paragraph_tokens.length > 0) {
                tokens.push({ type: BlockType.ParagraphBlock, tokens: paragraph_tokens });
            }

            pos = newPos;
            continue;
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}`

let code10 = `import type { Token } from "./lexer.ts";
import { InlineType, BlockType } from "./lexer.ts";

export function renderTokens(tokens: any[]): string {
    return tokens.map(renderToken).join("");
}

function renderToken(token: Token): string {
    switch (token.type) {
        case InlineType.Text:
            return token.value || '';
        case BlockType.TemplateBlock:
            return \`<div>\${renderTokens(token.tokens || [])}</div>\`;
        case BlockType.ParagraphBlock:
            return \`<p>\${renderTokens(token.tokens || [])}</p>\`;
        case BlockType.HeaderBlock:
            const idToken = token.tokens?.find(t => t.type === InlineType.HeaderId);
            const id = idToken ? idToken.value : '';
            return \`<h2 id='\${id}'>\${renderTokens(token.tokens || [])}</h2>\`;
        case InlineType.Italic:
            return \`<i>\${renderTokens(token.tokens || [])}</i>\`;
        case InlineType.Bold:
            return \`<b>\${renderTokens(token.tokens || [])}</b>\`;
        case InlineType.Code:
            return \`<code>\${renderTokens(token.tokens || [])}</code>\`;
        case InlineType.Hyperlink:
            const hrefToken = token.tokens?.find(t => t.type === InlineType.Href);
            const href = hrefToken ? hrefToken.value : '#';
            const linkText = renderTokens(token.tokens?.filter(t => t.type !== InlineType.Href) || []);
            return \`<a href='\${href}'>\${linkText}</a>\`;
        case InlineType.Emoticon:
            return \`<img class='smiley' src="smileys/\${renderTokens(token.tokens || [])}" alt="\${renderTokens(token.tokens || [])}">\`;
        case InlineType.Tooltip:
            return \`<GlossaryTooltip term='\${renderTokens(token.tokens || [])}'/>\`;
        case BlockType.ImageBlock:
            const srcToken = token.tokens?.find(t => t.type === InlineType.Href);
            const src = srcToken ? srcToken.value : '';
            const alt = renderTokens(token.tokens?.filter(t => t.type !== InlineType.Href) || []);
            return \`<div class='images'><img src="\${src}" alt="\${alt}"><p>\${alt}</p></div>\`;
        case BlockType.BlockquoteBlock:
            return \`<blockquote>\${renderTokens(token.tokens || [])}</blockquote>\`;
        case BlockType.ListBlock:
            return \`<div class='toc'><ul>\${renderTokens(token.tokens || [])}</ul></div>\`;
        case InlineType.ListItem:
            return \`<li>\${renderTokens(token.tokens || [])}</li>\`;
        default:
            return '';
    }
}`

let snip10 = createSnippet({
  code: code10,
  lang: 'typescript',
  filename: 'render.ts'
})

let snip5 = createSnippet({
  code: code5,
  lang: 'typescript',
  filename: 'lexer.ts'
})

let snip6 = createSnippet({
  code: code6,
  lang: 'typescript',
  filename: 'lexer.ts'
})

let snip7 = createSnippet({
  code: code7,
  lang: 'typescript',
  filename: 'lexer.ts'
})

let snip8 = createSnippet({
  code: code8,
  lang: 'typescript',
  filename: 'lexer.ts'
})

</script>

<template lang=1>

- [Why?](#y)
- [The svelte preprocessor](#pp)
- [entrypoint](#entry)
- [parser](#lexer)
- [rendering](#render)

# Why? @y

Creating a complete preprocessor, with actual parsing, will give you fine-grain control over markup extensibility. Simple examples are tooltips and smileys on this site. `??jwt??` will result in this tooltip: ??jwt??. `::emot-clap.gif::` results in ::emot-clap.gif::. Shorthand can make blogging much more pleasant.
There are many Markdown preprocessors packages that already exist. An approach may be to just combine their processing outputs with your own, a pipeline of sorts, to achieve the results you want.

# The svelte preprocessor @pp

If your preprocessor is just javascript, you can just pop it in your `svelte.config.js` file like so: 

</template>

<CodeBlock snippets={[snip, snip2]} />

<template lang=1>

`template_v0` was my first simple regex parser. It got out of hand very quickly. But modularizing your regex functions, and making sure they operate on a small defined subset you know of, is not a bad approach.

If you want Typescript, can also just add your preprocessor to your svelte config in `vite.config.ts`:

</template>

<CodeBlock snippets={[snip3]} />

<template lang=1>

Yay! typescript.

~ Note: the _SvelteKit_ plugin in `vite.config.ts` has no arguments, meaning no easy Typescript preprocessors.

# entrypoint @entry

Technically our implementation here is only a parser and renderer, no lexer. A lexer is when you identify particular tokens, not compute higher level structures like here. I just left the terminology as `lex` since I actually did try tokenization at the beginning which could be a thing. 

Here is the entrypoint:

</template>

<CodeBlock snippets={[snip4]} />

<template lang=1>

We have two main stages: first, we turn our raw input into objects we know of (`tokens`). Then we just iterate through those objects and render them one by one into the .svelte content we want (just a string).

# parser @lexer

I was primarily inspired by this [talk on lexers](https://www.youtube.com/watch?v=HxaD_trXwRE) from Rob Pike. He introduced a ??state-machine?? approach to parsing tokens. I just adapted his approach to Typescript.

Another useful document is the [CommonMark spec.](https://spec.commonmark.org/0.22/) This spec is used to define Markdown implementations, which we want to replicate as needed. What is most useful to us is the parsing strategy, and implementing _blocks_ and _inline blocks_.

To start, we define our entrypoint to the state machine, `lex`:

</template>

<CodeBlock snippets={[snip5]} />

<template lang=1>

First we clean standardize the newlines with a regex, and then we simply start our state machine using `lexText` as a starting point, from character 0.

To clarify, our tokens take on this interface:

</template>

<CodeBlock snippets={[snip7]} />

<template lang=1>

What's kind of ugly here is that some tokens can have a value, and some cannot.

You can see how our state functions generally work with `lexText`: we initialize tokens for the block, and we loop until the end of the document, searching for valid tokens. If we can't find anything until then, we just return a default text buffer of the consumed text. Once we do find some token, we enter into another state function and demand its own nested tokens. 

</template>

<CodeBlock snippets={[snip6]} height_strict={400} />

<template lang=1>

How about `lexTemplate`?

</template>

<CodeBlock snippets={[snip8]} height_strict={400} />

<template lang=1>

There is probably some better layer of abstraction I could layer for initiating each state machine. My attempts ended up not very useful as I did end up needing to fine tune some interactions.

This first layer of the machine defines the blocks: headers, images, blockquotes, lists, and paragraphs. As we get deeper and deeper we end up also defining the inline functions, and these get nested inside each block.

# rendering @render

</template>

<CodeBlock snippets={[snip10]} height_strict={400} />

<template lang=1>

Completely abandoning our state machine philosophy here, a simple switch statement here works since we don't have to care about nested structures anymore, we just want to print out the tokens in their serialized order.

# Future work

State machine initialization could use better abstractions. If we improve our implementation, it could be very trivial to add certain block types. 

The coolest thing is that we can render and hot-reload our markup, such as our own custom svelte components. We could invest in a tool that makes it very easy to configure new tokens for any component in a svelte project.

I have plans for some kind of live-editor, beyond svelte. Something similar to Latex and Typst. A state machine approach does seem like a kind of natural way to develop a tokenizer for such a project.

</template>

<div style='padding-bottom: 300pt'></div>
