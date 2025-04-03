import { lex } from "./lexer.ts";
import { renderTokens } from "./render.ts";

async function main() {
    let text = await Deno.readTextFile("test.txt");
    let tokens = lex(text);
    let result = renderTokens(tokens);

    console.log(JSON.stringify(tokens, null, 2));
    //console.log(result);
}

main();