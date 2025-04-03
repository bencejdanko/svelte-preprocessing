import { lex } from "./template-v1/lexer.js";
import { renderTokens } from "./template-v1/render.js";

export default function template_v1() {
    return {
        async markup({ content, filename }) {

            let tokens = lex(content);
            let result = renderTokens(tokens);
            return {
                code: result,
            };
        }
    };
}