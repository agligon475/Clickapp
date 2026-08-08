import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');
const lines = html.split('\n');

let depth = 0;
let mainDepth = -1;

lines.forEach((line, idx) => {
  const lineNum = idx + 1;
  
  // Count div opens and closes
  const opens = (line.match(/<div[\s>]/gi) || []).length + (line.match(/<main[\s>]/gi) || []).length;
  const closes = (line.match(/<\/div>/gi) || []).length + (line.match(/<\/main>/gi) || []).length;
  
  if (line.includes('<main class="main"')) {
    mainDepth = depth;
    console.log(`Line ${lineNum}: <main class="main"> starts at depth ${depth}`);
  }

  if (line.includes('id="view-')) {
    const match = line.match(/id="(view-[^"]+)"/);
    console.log(`Line ${lineNum}: ${match ? match[1] : 'view'} at depth ${depth} (relative to main: ${depth - mainDepth})`);
  }

  depth += (opens - closes);
});
