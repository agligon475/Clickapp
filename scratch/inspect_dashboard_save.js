import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');

// Search for company_settings in script tags in dashboard.html
const csMatches = [...html.matchAll(/company_settings[^\n]+/gi)];
console.log('company_settings occurrences:');
csMatches.slice(0, 15).forEach(m => console.log('-', m[0].trim()));
