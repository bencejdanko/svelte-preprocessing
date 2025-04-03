//Block tokens
const TEMPLATE = '\n<template lang=1>'
const TEMPLATE_CLOSE = '\n</template>'
const HEADER = '\n# '
const HEADER_ID = '@'
const PARAGRAPH = '\n'
const IMAGE = '\n!['
const IMAGE_CLOSE = ']'
const IMAGE_URL = '('
const IMAGE_URL_CLOSE = ')'
const BLOCKQUOTE = '\n~ '
const LIST = '\n- '
const INNER_LIST = '\n  - '

//Inline tokens
const ITALIC = '_'
const BOLD = '*'
const CODE = '`'
const EMOTICON = '::'
const TOOLTIP = '??'
const HYPERLINK = '['
const HYPERLINK_CLOSE = ']'
const HYPERLINK_URL = '('
const HYPERLINK_URL_CLOSE = ')'
const CHECKBOX = '[['
const CHECKBOX_TICK = 'x'
const CHECKBOX_CLOSE = ']]'

export enum BlockType {
    TemplateBlock = 'TemplateBlock',
    HeaderBlock = 'HeaderBlock',
    ParagraphBlock = 'ParagraphBlock',
    ImageBlock = 'ImageBlock',
    BlockquoteBlock = 'BlockquoteBlock',
    ListBlock = 'ListBlock',
}

export enum InlineType {
    Text = 'Text',
    Italic = 'Italic',
    Bold = 'Bold',
    Code = 'Code',
    Emoticon = 'Emoticon',
    Tooltip = 'Tooltip',
    Hyperlink = 'Hyperlink',
    Href = 'Href',
    HeaderId = 'HeaderId',
    ListItem = 'ListItem',
    Checkbox = 'Checkbox',
}

export interface Token {
    type: BlockType | InlineType;
    value?: string;
    tokens?: Token[];
}

function lexText(src: string, pos: number): { tokens: Token[], pos: number } {
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

}

function lexTemplate(src: string, pos: number): { tokens: Token[], pos: number } {
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
}

function lexParagraph(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(PARAGRAPH, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            return { tokens, pos };
        } else if (src.startsWith(ITALIC, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: italic_tokens } = lexItalic(src, pos + ITALIC.length);
            tokens.push({ type: InlineType.Italic, tokens: italic_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(BOLD, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: bold_tokens } = lexBold(src, pos + BOLD.length);
            tokens.push({ type: InlineType.Bold, tokens: bold_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(CODE, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: code_tokens } = lexCode(src, pos + CODE.length);
            tokens.push({ type: InlineType.Code, tokens: code_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(EMOTICON, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: emoticon_tokens } = lexEmoticon(src, pos + EMOTICON.length);
            tokens.push({ type: InlineType.Emoticon, tokens: emoticon_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(TOOLTIP, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: tooltip_tokens } = lexTooltip(src, pos + TOOLTIP.length);
            tokens.push({ type: InlineType.Tooltip, tokens: tooltip_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(HYPERLINK, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: hyperlink_tokens } = lexHyperlink(src, pos + HYPERLINK.length);
            tokens.push({ type: InlineType.Hyperlink, tokens: hyperlink_tokens });
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
}

function lexBlockquote(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(PARAGRAPH, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            return { tokens, pos };
        } else if (src.startsWith(ITALIC, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: italic_tokens } = lexItalic(src, pos + ITALIC.length);
            tokens.push({ type: InlineType.Italic, tokens: italic_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(BOLD, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: bold_tokens } = lexBold(src, pos + BOLD.length);
            tokens.push({ type: InlineType.Bold, tokens: bold_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(CODE, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: code_tokens } = lexCode(src, pos + CODE.length);
            tokens.push({ type: InlineType.Code, tokens: code_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(EMOTICON, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: emoticon_tokens } = lexEmoticon(src, pos + EMOTICON.length);
            tokens.push({ type: InlineType.Emoticon, tokens: emoticon_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(TOOLTIP, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: tooltip_tokens } = lexTooltip(src, pos + TOOLTIP.length);
            tokens.push({ type: InlineType.Tooltip, tokens: tooltip_tokens });
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

}

function lexImage(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(IMAGE_CLOSE, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            pos += IMAGE_CLOSE.length;

            if (src.startsWith(IMAGE_URL, pos)) {
                pos += IMAGE_URL.length;

                while (true) {

                    if (src.startsWith(IMAGE_URL_CLOSE, pos)) {

                        if (buffer) {
                            tokens.push({ type: InlineType.Href, value: buffer });
                            buffer = "";
                        }

                        pos += IMAGE_URL_CLOSE.length;
                        return { tokens, pos };

                    }

                    if (pos >= src.length) break;
                    buffer += src[pos];
                    pos++;

                }

            }

            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

function lexHeader(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {

        if (src.startsWith(HEADER_ID, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            pos += HEADER_ID.length;

            while(true) {

                if (src.startsWith('\n', pos)) {
                    if (buffer) {
                        tokens.push({ type: InlineType.HeaderId, value: buffer });
                        buffer = "";
                    }

                    return { tokens, pos };
                }

                if (pos >= src.length) break;
                buffer += src[pos];
                pos++;

            }

        }

        if (src.startsWith('\n', pos)) {

            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            return { tokens, pos };
        }

        if (src.startsWith(ITALIC, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: italic_tokens } = lexItalic(src, pos + ITALIC.length);
            tokens.push({ type: InlineType.Italic, tokens: italic_tokens });
            pos = newPos;
            continue;
        }

        if (src.startsWith(BOLD, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Bold, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: bold_tokens } = lexBold(src, pos + BOLD.length);
            tokens.push({ type: InlineType.Text, tokens: bold_tokens });
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
}

function lexList(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(LIST, pos)) {
            let { pos: newPos, tokens: list_tokens } = lexListItem(src, pos + LIST.length);
            tokens.push({ type: InlineType.ListItem, tokens: list_tokens });
            pos = newPos;
            continue;
        
        } else if (src.startsWith(INNER_LIST, pos)) {
            let { pos: newPos, tokens: list_block_tokens } = lexInnerList(src, pos);
            tokens.push({ type: BlockType.ListBlock, tokens: list_block_tokens });
            pos = newPos;
            continue;
        
        } else if (src.startsWith('\n', pos)) {
            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

function lexInnerList(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(INNER_LIST, pos)) {
            let { pos: newPos, tokens: list_tokens } = lexListItem(src, pos + INNER_LIST.length);
            tokens.push({ type: InlineType.ListItem, tokens: list_tokens });
            pos = newPos;
            continue;
        
        }  else if (src.startsWith('\n', pos)) {
            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

function lexListItem(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {

        if (src.startsWith(ITALIC, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: italic_tokens } = lexItalic(src, pos + ITALIC.length);
            tokens.push({ type: InlineType.Italic, tokens: italic_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith(BOLD, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: bold_tokens } = lexBold(src, pos + BOLD.length);
            tokens.push({ type: InlineType.Bold, tokens: bold_tokens });
            pos = newPos;
            continue;

        } else if (src.startsWith(CHECKBOX, pos)) {

            let value = undefined;

            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            pos += CHECKBOX.length;

            if (src.startsWith(CHECKBOX_TICK, pos)) {
                value = 'checked';
                pos += CHECKBOX_TICK.length;
            }

            if (src.startsWith(CHECKBOX_CLOSE, pos)) {
                pos += CHECKBOX_CLOSE.length;
            }

            tokens.push({ type: InlineType.Checkbox, value: value });

            continue;
        } else if (src.startsWith(HYPERLINK, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: hyperlink_tokens } = lexHyperlink(src, pos + HYPERLINK.length);
            tokens.push({ type: InlineType.Hyperlink, tokens: hyperlink_tokens });
            pos = newPos;
            continue;
        } else if (src.startsWith('\n', pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

function lexHyperlink(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(HYPERLINK_CLOSE, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            pos += HYPERLINK_CLOSE.length;

            if (src.startsWith(HYPERLINK_URL, pos)) {
                pos += HYPERLINK_URL.length;

                while (true) {

                    if (src.startsWith(HYPERLINK_URL_CLOSE, pos)) {

                        if (buffer) {
                            tokens.push({ type: InlineType.Href, value: buffer });
                            buffer = "";
                        }

                        pos += HYPERLINK_URL_CLOSE.length;
                        return { tokens, pos };

                    }

                    if (pos >= src.length) break;
                    buffer += src[pos];
                    pos++;

                }

            }

            return { tokens, pos };
        }

        if (src.startsWith(ITALIC, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: italic_tokens } = lexItalic(src, pos + ITALIC.length);
            tokens.push({ type: InlineType.Italic, tokens: italic_tokens });
            pos = newPos;
            continue;
        }

        if (src.startsWith(BOLD, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }

            let { pos: newPos, tokens: bold_tokens } = lexBold(src, pos + BOLD.length);
            tokens.push({ type: InlineType.Bold, tokens: bold_tokens });
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
}

function lexItalic(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(ITALIC, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }
            pos += ITALIC.length;
            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

function lexBold(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(BOLD, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }
            pos += BOLD.length;
            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

function lexCode(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(CODE, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }
            pos++;
            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

function lexEmoticon(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(EMOTICON, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }
            pos += EMOTICON.length;
            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

function lexTooltip(src: string, pos: number): { tokens: Token[], pos: number } {
    const tokens: Token[] = [];
    let buffer = "";

    while (true) {
        if (src.startsWith(TOOLTIP, pos)) {
            if (buffer) {
                tokens.push({ type: InlineType.Text, value: buffer });
                buffer = "";
            }
            pos += TOOLTIP.length;
            return { tokens, pos };
        }

        if (pos >= src.length) break;
        buffer += src[pos];
        pos++;
    }

    if (buffer) {
        tokens.push({ type: InlineType.Text, value: buffer });
    }

    return { tokens, pos };
}

export function lex(src: string): Token[] {

    src = src
        .trim()
        .replace(/\r\n|\r/g, '\n');

    let { tokens } = lexText(src, 0);

    return tokens;
}