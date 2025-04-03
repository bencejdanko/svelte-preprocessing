export default class Snippet {
    code: string;
    lang: string;
    filename: string;
    unblurredLines: number[];
    blur: boolean;
    startLine: number;

    constructor(
        code: string = "",
        lang: string = "",
        filename: string = "",
        unblurredLines: number[] = [],
        blur: boolean = false,
        startLine: number = 1
    ) {
        this.code = code;
        this.lang = lang;
        this.filename = filename;
        this.unblurredLines = unblurredLines;
        this.blur = blur;
        this.startLine = startLine;
    }
}

export function createSnippet({
    code,
    lang,
    filename,
    unblurredLines,
    blur,
    startLine
}: {
    code?: string,
    lang?: string,
    filename?: string,
    unblurredLines?: number[],
    blur?: boolean,
    startLine?: number
}): Snippet {
    return new Snippet(code || "", lang || "", filename || lang, unblurredLines || [], blur || false, startLine || 1);
}