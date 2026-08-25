import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

const cfgMatch = html.match(/if \(configData && configData\.length > 0\) \{[\s\S]*?const cfg = configData\[0\];/);
if (cfgMatch) {
  console.log('cfg initialization found:', cfgMatch[0]);
}

const summaryMatch = html.match(/<div id="cart-summary">[\s\S]*?<\/button>\s*<\/div>/);
if (summaryMatch) {
  console.log('\nSummary HTML found:', summaryMatch[0]);
}

const cartTotalMatch = html.match(/function cartTotal\(\) \{[\s\S]*?\}/);
if (cartTotalMatch) {
  console.log('\ncartTotal found:', cartTotalMatch[0]);
}
