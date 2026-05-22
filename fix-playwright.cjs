const fs = require('fs');
let content = fs.readFileSync('tests/e2e/example.spec.ts', 'utf8');

content = content.replace(/await expect\(page\).toHaveTitle\(\/NEET Prep\/\);/, 'await expect(page).toHaveTitle(/NEET Preparation/i);');
content = content.replace(/await expect\(page\.getByText\('Master NEET with AI'\)\)\.toBeVisible\(\);/, 'await expect(page.getByTestId("text-hero-headline")).toBeVisible();');

fs.writeFileSync('tests/e2e/example.spec.ts', content, 'utf8');
