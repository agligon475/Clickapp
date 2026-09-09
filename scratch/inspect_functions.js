import fs from 'fs';
import path from 'path';

const dashHtml = fs.readFileSync(path.join(process.cwd(), 'dashboard.html'), 'utf8');
const tiendaHtml = fs.readFileSync(path.join(process.cwd(), 'tienda.html'), 'utf8');

function extractFunctions(html, label) {
  console.log(`=== FUNCIONES EN ${label} ===`);
  const fnRegex = /function\s+([a-zA-Z0-9_$]+)\s*\(/g;
  let match;
  const fns = new Set();
  while ((match = fnRegex.exec(html)) !== null) {
    fns.add(match[1]);
  }
  
  const constFnRegex = /(?:const|let|var)\s+([a-zA-Z0-9_$]+)\s*=\s*(?:function|\([^)]*\)\s*=>)/g;
  while ((match = constFnRegex.exec(html)) !== null) {
    fns.add(match[1]);
  }

  console.log(`Total funciones encontradas: ${fns.size}`);
  Array.from(fns).sort().forEach(fn => console.log(`  - ${fn}`));
}

extractFunctions(dashHtml, 'DASHBOARD.HTML');
console.log('\n----------------------------------------\n');
extractFunctions(tiendaHtml, 'TIENDA.HTML');
