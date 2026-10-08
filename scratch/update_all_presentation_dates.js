import fs from 'fs';

let content = fs.readFileSync('informe-vulnerabilidades-clickapp.html', 'utf8');

console.log('=== BUSCANDO Y ACTUALIZANDO TODAS LAS FECHAS EN LA PRESENTACIÓN ===');

// Replacements
const oldDates = [
  { from: /Actualizado 07\/10\/2026/g, to: 'Actualizado 08/10/2026 — 19:30 hs' },
  { from: /07\/10\/2026/g, to: '08/10/2026' },
  { from: /7 de Octubre de 2026/g, to: '8 de Octubre de 2026' },
  { from: /07 de Octubre de 2026/g, to: '08 de Octubre de 2026' },
  { from: /07 OCT 2026/g, to: '08 OCT 2026' },
  { from: /7 OCT 2026/g, to: '08 OCT 2026' },
  { from: /1 \/ 12/g, to: '1 / 15' },
  { from: /1 \/ 14/g, to: '1 / 15' }
];

let replacedCount = 0;
oldDates.forEach(rule => {
  const matches = content.match(rule.from);
  if (matches) {
    replacedCount += matches.length;
    console.log(`Reemplazando ${matches.length} ocurrencias de ${rule.from}`);
    content = content.replace(rule.from, rule.to);
  }
});

fs.writeFileSync('informe-vulnerabilidades-clickapp.html', content, 'utf8');
console.log(`\n✅ Se actualizaron forzosamente ${replacedCount} campos de fecha y versión en informe-vulnerabilidades-clickapp.html`);
