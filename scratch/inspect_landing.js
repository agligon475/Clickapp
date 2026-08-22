import fs from 'fs';

const html = fs.readFileSync('landing.html', 'utf8');

console.log('=== INSPECTING LANDING.HTML SECTIONS ===');
const sections = [...html.matchAll(/<section[^>]*id="([^"]+)"[^>]*>/g)].map(m => m[1]);
console.log('Sections with ID:', sections);

const h1s = [...html.matchAll(/<h1[^>]*>(.*?)<\/h1>/gs)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('H1s:', h1s);

const h2s = [...html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gs)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('H2s:', h2s);
