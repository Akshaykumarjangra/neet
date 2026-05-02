const fs = require('fs');
const path = require('path');

const articlesDir = path.join(process.cwd(), 'client', 'public', 'articles');
const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.html') && f !== 'index.html');

console.log(`Processing ${files.length} articles...`);

files.forEach(file => {
    const filePath = path.join(articlesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('application/ld+json')) {
        console.log(`Skipping ${file} - already has schema`);
        return;
    }

    const titleMatch = content.match(/<title>(.*?)<\/title>/);
    const descMatch = content.match(/<meta name="description" content="(.*?)"/);
    
    const title = titleMatch ? titleMatch[1] : 'NEET Preparation Article';
    const description = descMatch ? descMatch[1] : 'Learn how to master this topic for NEET 2026 with ZeroPage.';
    const url = `https://neet.zeropage.in/articles/${file}`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": title,
        "description": description,
        "url": url,
        "datePublished": "2026-05-01",
        "dateModified": new Date().toISOString().split('T')[0],
        "author": {
            "@type": "Organization",
            "name": "ZeroPage AI",
            "url": "https://neet.zeropage.in"
        },
        "publisher": {
            "@type": "Organization",
            "name": "ZeroPage",
            "logo": {
                "@type": "ImageObject",
                "url": "https://neet.zeropage.in/favicon.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        }
    };

    const scriptTag = `\n    <script type="application/ld+json">\n    ${JSON.stringify(schema, null, 4)}\n    </script>\n`;
    
    content = content.replace('</head>', `${scriptTag}</head>`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
});

console.log('Done!');
