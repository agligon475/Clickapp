import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');

// Find sidebar menu items
const sidebarRegex = /<a[^>]*onclick="switchTab\('([^']+)'\)"[^>]*>(.*?)<\/a>/gi;
let match;
console.log('Sidebar tabs (switchTab calls):');
while ((match = sidebarRegex.exec(html)) !== null) {
  const cleanText = match[2].replace(/<[^>]+>/g, '').trim();
  console.log(`- Tab ID: '${match[1]}', Text: '${cleanText}'`);
}

// Find view sections
const sectionRegex = /id="view-([^"]+)"/gi;
console.log('\nView sections:');
while ((match = sectionRegex.exec(html)) !== null) {
  console.log(`- Section ID: 'view-${match[1]}'`);
}

// Search for switchTab function definition in dashboard.html
const switchTabMatch = html.match(/function switchTab\([^)]*\)\s*\{[\s\S]*?\n\}/);
if (switchTabMatch) {
  console.log('\nswitchTab function snippet:');
  console.log(switchTabMatch[0].slice(0, 500));
}

// Check how settings and products are loaded in dashboard.html
const loadDataMatch = html.match(/function (load\w+|fetch\w+|init\w+)\([^)]*\)\s*\{[\s\S]*?\n\}/g);
if (loadDataMatch) {
  console.log('\nFunctions found for loading data:');
  loadDataMatch.forEach(fn => console.log(fn.slice(0, 100).replace(/\n/g, ' ')));
}
