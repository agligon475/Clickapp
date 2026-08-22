import fs from 'fs';

console.log('=== INSPECCIONANDO ALTA-USUARIO Y DASHBOARD PRODUCTOS ===\n');

const alta = fs.readFileSync('alta-usuario.html', 'utf8');
const dashboard = fs.readFileSync('dashboard.html', 'utf8');

console.log('--- ALTA USUARIO HTML ---');
console.log('Tiene IDs de formularios:');
const altaIds = [...alta.matchAll(/id="([^"]+)"/g)].map(m => m[1]);
console.log(altaIds.filter(id => id.includes('form') || id.includes('store') || id.includes('login') || id.includes('reg') || id.includes('pass') || id.includes('user')));

console.log('\n--- FUNCTIONS IN DASHBOARD ---');
const dashboardFuncs = [...dashboard.matchAll(/function\s+([a-zA-Z0-9_]+)\s*\(/g)].map(m => m[1]);
console.log(dashboardFuncs.slice(0, 50));
