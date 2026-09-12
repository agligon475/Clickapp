import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');

// List all <section> elements
const sections = [...html.matchAll(/<section[\s\S]*?<\/section>/gi)];
console.log('Total sections:', sections.length);
sections.forEach((sec, idx) => {
  const idMatch = sec[0].match(/id=["']([^"']+)["']/i);
  const classMatch = sec[0].match(/class=["']([^"']+)["']/i);
  console.log(`Section ${idx+1}: ID=${idMatch ? idMatch[1] : 'none'}, Class=${classMatch ? classMatch[1] : 'none'}, Length=${sec[0].length}`);
});
