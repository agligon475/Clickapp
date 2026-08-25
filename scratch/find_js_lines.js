import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');
const lines = html.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('function openCategoryModal')) {
    console.log(`openCategoryModal at line ${idx + 1}:`, line.trim());
  }
  if (line.includes('function showView(')) {
    console.log(`showView at line ${idx + 1}:`, line.trim());
  }
});
