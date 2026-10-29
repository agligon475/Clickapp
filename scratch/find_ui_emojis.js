import fs from 'fs';

function checkFile(filename) {
  const content = fs.readFileSync(filename, 'utf8');
  const lines = content.split('\n');
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;

  const results = [];
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (trimmed.includes('pickEmoji') || trimmed.includes('pickWizEmoji') || trimmed.startsWith('//') || trimmed.startsWith('/*')) return;
    if (trimmed.includes('CAT_EMOJI') || trimmed.includes('rubroEmojis')) return;
    if (emojiRegex.test(line)) {
      results.push({ lineNum: idx + 1, text: trimmed });
    }
  });

  console.log(`\n=== ${filename} (Total: ${results.length}) ===`);
  results.slice(0, 50).forEach(r => console.log(`${r.lineNum}: ${r.text.substring(0, 120)}`));
}

checkFile('dashboard.html');
checkFile('tienda.html');
