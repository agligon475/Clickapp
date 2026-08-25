import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');
const lines = html.split('\n');

lines.forEach((line, idx) => {
  if (line.includes("showView('categories',this)")) {
    console.log(`Sidebar categories item at line ${idx + 1}:`, line.trim());
  }
  if (line.includes('id="view-categories"')) {
    console.log(`View categories at line ${idx + 1}:`, line.trim());
  }
  if (line.includes('id="modal-category"')) {
    console.log(`Modal category at line ${idx + 1}:`, line.trim());
  }
});
