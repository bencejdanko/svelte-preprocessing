export const BlockType = {
    TemplateBlock: 'TemplateBlock',
    HeaderBlock: 'HeaderBlock',
    ParagraphBlock: 'ParagraphBlock',
    ImageBlock: 'ImageBlock',
    BlockquoteBlock: 'BlockquoteBlock',
    ListBlock: 'ListBlock',
};

export const InlineType = {
    Text: 'Text',
    Italic: 'Italic',
    Bold: 'Bold',
    Code: 'Code',
    Emoticon: 'Emoticon',
    Tooltip: 'Tooltip',
    Hyperlink: 'Hyperlink',
    Href: 'Href',
    HeaderId: 'HeaderId',
    ListItem: 'ListItem',
    Checkbox: 'Checkbox',
};

// export interface Token {
//     type: BlockType | InlineType;
//     value?: string;
//     tokens?: Token[];
// }

export function renderTokens(tokens) {
    return tokens.map(renderToken).join("");
}

function renderToken(token) {
    switch (token.type) {
        case InlineType.Text:
            return token.value || '';
        case BlockType.TemplateBlock:
            return `<div>${renderTokens(token.tokens || [])}</div>`;
        case BlockType.ParagraphBlock:
            return `<p>${renderTokens(token.tokens || [])}</p>`;
        case BlockType.HeaderBlock:
            const idToken = token.tokens?.find(t => t.type === InlineType.HeaderId);
            const id = idToken ? idToken.value : '';
            return `<h2 id='${id}'>${renderTokens(token.tokens || [])}</h2>`;
        case InlineType.Italic:
            return `<i>${renderTokens(token.tokens || [])}</i>`;
        case InlineType.Bold:
            return `<b>${renderTokens(token.tokens || [])}</b>`;
        case InlineType.Code:
            return `<code>${renderTokens(token.tokens || [])}</code>`;
        case InlineType.Hyperlink:
            const hrefToken = token.tokens?.find(t => t.type === InlineType.Href);
            const href = hrefToken ? hrefToken.value : '#';
            const linkText = renderTokens(token.tokens?.filter(t => t.type !== InlineType.Href) || []);
            return `<a target='_blank' href='${href}'>${linkText}</a>`;
        case InlineType.Emoticon:
            return `<img class='smiley' src="smileys/${renderTokens(token.tokens || [])}" alt="${renderTokens(token.tokens || [])}">`;
        case InlineType.Tooltip:
            return `<GlossaryTooltip term='${renderTokens(token.tokens || [])}'/>`;
        case BlockType.ImageBlock:
            const srcToken = token.tokens?.find(t => t.type === InlineType.Href);
            const src = srcToken ? srcToken.value : '';
            const alt = renderTokens(token.tokens?.filter(t => t.type !== InlineType.Href) || []);
            return `<div class='images'><img src="${src}" alt="${alt}"><p>${alt}</p></div>`;
        case BlockType.BlockquoteBlock:
            return `<blockquote>${renderTokens(token.tokens || [])}</blockquote>`;
        case BlockType.ListBlock:
            return `<div class='toc'><ul>${renderTokens(token.tokens || [])}</ul></div>`;
        case InlineType.ListItem:
            return `<li>${renderTokens(token.tokens || [])}</li>`;
        case InlineType.Checkbox:
            if (token.value === 'checked') {
                return `<input type='checkbox' checked disabled>${renderTokens(token.tokens || [])}`;
            } else {
                return `<input type='checkbox' disabled>${renderTokens(token.tokens || [])}`;
            }   
        default:
            return '';
    }
}