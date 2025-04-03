type jsonld = {
    "@context": string;
    "@type": string;
    "headline": string;
    "name": string;
    "description": string;
    "url": string;
    "sameAs": string;
    "image": string;
    "genre": string;
};

//serialize json ld to json
export function serializeSite() {
    return `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "headline": "My Website",
        "name": "My Website",
        "description": "My website description",
        "url": "https://example.com",
        "sameAs": "https://www.facebook.com/example",
        "image": "https://example.com/image.jpg",
        "genre": "Web Development"
    } as jsonld, null, 2)}</script>`;
}

export function serializeBlogPost() {
    return `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "My Blog Post",
        "name": "My Blog Post",
        "description": "My blog post description",
        "url": "https://example.com/blog-post",
        "sameAs": "https://www.facebook.com/example",
        "image": "https://example.com/image.jpg",
        "genre": "Web Development"
    } as jsonld, null, 2)}</script>`;
}