const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/agust/.gemini/antigravity-ide/brain/47b137ea-d8ba-4cf0-998e-6ccd2c0c4ab0/.user_uploaded';
const files = fs.readdirSync(uploadDir).filter(f => f.endsWith('.png'));

// Ensure target directories exist
['img/silhouettes', 'public/img/silhouettes'].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

async function processAll() {
  const results = [];
  for (const f of files) {
    const fullPath = path.join(uploadDir, f);
    await new Promise((resolve, reject) => {
      potrace.trace(fullPath, { threshold: 190, optTolerance: 0.2 }, (err, svg) => {
        if (err) return reject(err);
        
        // Extract all numbers from the path
        const dMatch = svg.match(/<path d="([^"]+)"/);
        const d = dMatch ? dMatch[1] : '';
        const coords = d.match(/[-+]?[0-9]*\.?[0-9]+/g) || [];
        let xs = [], ys = [];
        for (let i = 0; i < coords.length; i += 2) {
          const x = parseFloat(coords[i]);
          const y = parseFloat(coords[i+1]);
          if (!isNaN(x)) xs.push(x);
          if (!isNaN(y)) ys.push(y);
        }
        const minX = Math.min(...xs), maxX = Math.max(...xs);
        const minY = Math.min(...ys), maxY = Math.max(...ys);
        const centerX = (minX + maxX) / 2;
        const centerY = (minY + maxY) / 2;
        
        results.push({
          file: f,
          minX, maxX, minY, maxY,
          centerX, centerY,
          width: maxX - minX,
          height: maxY - minY,
          svgLength: svg.length,
          svg
        });
        resolve();
      });
    });
  }

  // Print results
  results.forEach(r => {
    console.log(JSON.stringify({
      file: r.file,
      centerX: Math.round(r.centerX),
      side: r.centerX > 133 ? 'RIGHT' : 'LEFT',
      width: Math.round(r.width),
      height: Math.round(r.height)
    }));
  });

  return results;
}

processAll().catch(console.error);
