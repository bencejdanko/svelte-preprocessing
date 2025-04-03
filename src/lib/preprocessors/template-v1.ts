import { lex } from "./template-v1/lexer.ts";
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
}