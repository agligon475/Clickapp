import fs from 'fs';
const files = ['dashboard.html', 'tienda.html', 'data/products.json'];
files.forEach(f => {
  if (fs.existsSync(f)) {
    const c = fs.readFileSync(f, 'utf8');
    if (c.includes('1548624149')) {
      console.log('Found 1548624149 in', f);
      c.split('\n').forEach((l, i) => {
        if (l.includes('1548624149')) console.log(i + 1, l.trim());
      });
    }
  }
});
