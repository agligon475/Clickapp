import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');
const lines = html.split('\n');

let stack = [];

lines.forEach((line, index) => {
  const lineNum = index + 1;
  
  if (line.includes('id="view-')) {
    const match = line.match(/id="(view-[^"]+)"/);
    if (match) {
      console.log(`Line ${lineNum}: FOUND ${match[1]}`);
    }
  }
});
