function renderNode(node) {
    switch (node.type) {
        case 'header1':
            return `<h1 id='${node.id}'>${renderChildren(node.children)}</h1>`;
        case 'header2':
            return `<h2 id='${node.id}'>${renderChildren(node.children)}</h2>`;
        case 'header3':
            return `<h3 id='${node.id}'>${renderChildren(node.children)}</h3>`;
        case 'paragraph':
            return `<p>${renderChildren(node.children)}</p>`;
        case 'list':
            return `<ul>${renderChildren(node.children)}</ul>`;
        case 'listItem':
            return `<li>${renderChildren(node.children)}</li>`;
        case 'blockquote':
            return `<blockquote>${renderChildren(node.children)}</blockquote>`;
        case 'text':
            return node.content;
        case 'link':
            return `<a href="${node.url}">${node.content}</a>`;
        case 'bold':
            return `<strong>${node.content}</strong>`;
        case 'italic':
            return `<em>${node.content}</em>`;
        case 'image':
            return `<span class='images'><img src="${node.src}" alt="${node.alt}"><p>${node.details}</p></span>`;
        case 'emoticon':
            return `<img class='smiley' src="smileys/${node.emoticon}" alt="${node.emoticon}">`;
        case 'code':
            return `<code>${node.content}</code>`;
        case 'tooltip':
            return `<GlossaryTooltip term='${node.content}'/>`
        default:
            return '';
    }
}

export function renderChildren(syntaxTree) {
    return syntaxTree.map(renderNode).join('');
}
