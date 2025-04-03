export function parse(tokens) {
    const tree = [];
    let currentElement = null;
    let toc = []

    for (const token of tokens) {
        switch (token.type) {
            case 'header1':
            case 'header2':
            case 'header3':
            case 'blockquote':
            case 'paragraph':
                if (token.id) {
                    toc.push({ content: token.content, id: token.id })
                }

                currentElement = { type: token.type, children: token.content, id: token.id };
                tree.push(currentElement);
                break;
            default:
                break;
        }
    }

    return { tree: tree, toc: toc};
}