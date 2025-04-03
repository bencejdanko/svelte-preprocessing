const patterns = [
    { type: 'header1', regex: /^# (.+)$/ },
    { type: 'header2', regex: /^## (.+)$/ },
    { type: 'header3', regex: /^### (.+)$/ },
    { type: 'blockquote', regex: /^~ (.+)$/ },
    { type: 'title', regex: /\(\((.*?)\)\)/ },
    { type: 'paragraph', regex: /^(.*)$/ },

];

const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
const boldRegex = /\=([^\*]+)\=/g;
const italicRegex = /\*([^\*]+)\*/g;
const codeRegex = /\`([^\*]+)\`/g;
const imageRegex = /\[(.*?) \| (.*?) \| (.*?)\]/g;
const emoticonRegex = /::(.*?)::/g;
const tooltipRegex = /;;(.*?);;/g;

const idRegex = /\$([^\*]+)\$/g;

export function tokenize(input) {
    const tokens = [];
    const lines = input.split('\n');

    for (const line of lines) {
        for (const { type, regex } of patterns) {
            const match = line.match(regex);
            if (match) {

                let content = match[1];
                if (content.trim().length === 0) {
                    continue;
                }

                const inlineTokens = [];
                let lastIndex = 0;

                let lineId = '';
                content.replace(idRegex, (idMatch, id, offset) => {
                    if (offset > lastIndex) {
                        inlineTokens.push({ type: 'text', content: content.slice(lastIndex, offset) });
                    }
                    lineId = id;
                    lastIndex = offset + idMatch.length;
                    return '';
                });

                content.replace(imageRegex, (imageMatch, alt, src, details, offset) => {
                    if (offset > lastIndex) {
                        inlineTokens.push({ type: 'text', content: content.slice(lastIndex, offset) });
                    }
                    inlineTokens.push({ type: 'image', alt, src, details });
                    lastIndex = offset + imageMatch.length;
                    return '';
                });

                content.replace(emoticonRegex, (emoticonMatch, emoticon, offset) => {
                    if (offset > lastIndex) {
                        inlineTokens.push({ type: 'text', content: content.slice(lastIndex, offset) });
                    }
                    inlineTokens.push({ type: 'emoticon', emoticon });
                    lastIndex = offset + emoticonMatch.length;
                    return '';
                });

                content.replace(tooltipRegex, (tooltipMatch, tooltip, offset) => {
                    if (offset > lastIndex) {
                        inlineTokens.push({ type: 'text', content: content.slice(lastIndex, offset) });
                    }
                    inlineTokens.push({ type: 'tooltip', content: tooltip });
                    lastIndex = offset + tooltipMatch.length;
                    return '';
                });

                content.replace(linkRegex, (linkMatch, text, url, offset) => {
                    if (offset > lastIndex) {
                        inlineTokens.push({ type: 'text', content: content.slice(lastIndex, offset) });
                    }
                    inlineTokens.push({ type: 'link', content: text, url: url });
                    lastIndex = offset + linkMatch.length;
                    return '';
                });

                content.replace(boldRegex, (boldMatch, text, offset) => {
                    if (offset > lastIndex) {
                        inlineTokens.push({ type: 'text', content: content.slice(lastIndex, offset) });
                    }
                    inlineTokens.push({ type: 'bold', content: text });
                    lastIndex = offset + boldMatch.length;
                    return '';
                });

                content.replace(italicRegex, (italicMatch, text, offset) => {
                    if (offset > lastIndex) {
                        inlineTokens.push({ type: 'text', content: content.slice(lastIndex, offset) });
                    }
                    inlineTokens.push({ type: 'italic', content: text });
                    lastIndex = offset + italicMatch.length;
                    return '';
                });

                content.replace(codeRegex, (codeMatch, text, offset) => {
                    if (offset > lastIndex) {
                        inlineTokens.push({ type: 'text', content: content.slice(lastIndex, offset) });
                    }
                    inlineTokens.push({ type: 'code', content: text });
                    lastIndex = offset + codeMatch.length;
                    return '';
                });


                if (lastIndex < content.length) {
                    inlineTokens.push({ type: 'text', content: content.slice(lastIndex) });
                }

                tokens.push({ type, content: inlineTokens, id: lineId });
                break;
            }
        }

    }

    return tokens;
}