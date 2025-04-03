import { tokenize } from "./template-v0/lexer.js";
import { parse } from "./template-v0/parser.js";
import { renderChildren } from "./template-v0/renderer.js";

export default function template_v0() {
    return {
        async markup({ content, filename }) {
            
            const regex = /<\s*template\s+lang\s*=\s*0\s*>([\s\S]*?)<\/\s*template\s*>/g;
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
                    const tocHtml = `<nav class="toc"><ul>${toc.map(item => `<li><a href="#${item.id}">${renderChildren(item.content)}</a></li>`).join('')}</ul></nav>`;
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
}