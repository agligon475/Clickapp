import fs from 'fs';

const html = fs.readFileSync('informe-vulnerabilidades-clickapp.html', 'utf8');

const openDivs = (html.match(/<div(\s|>)/gi) || []).length;
const closeDivs = (html.match(/<\/div>/gi) || []).length;
console.log(`Total <div> abiertas: ${openDivs}, Total </div> cerradas: ${closeDivs}, Diferencia: ${openDivs - closeDivs}`);

// Validar que cada slide de 1 a 15 esté presente como elemento independiente
for (let i = 1; i <= 15; i++) {
  const pattern = new RegExp(`<div class="slide[^"]*" data-index="${i}">`);
  const found = pattern.test(html);
  console.log(`Slide ${i}: ${found ? '✅ PRESENTE' : '❌ FALTANTE'}`);
}

// Analizar la anidación: extraer las posiciones de cada <div class="slide y su correspondiente cierre
const slideRegex = /<div class="slide(?:\s+active)?"\s+data-index="(\d+)">/g;
let match;
const slideIndices = [];
while ((match = slideRegex.exec(html)) !== null) {
  slideIndices.push({ index: parseInt(match[1]), pos: match.index });
}
console.log(`\nTotal elementos .slide detectados: ${slideIndices.length}`);
