const potrace = require('potrace');
const fs = require('fs');
const path = require('path');

const uploadDir = 'C:/Users/agust/.gemini/antigravity-ide/brain/47b137ea-d8ba-4cf0-998e-6ccd2c0c4ab0/.user_uploaded';

const mapping = [
  { scene: 1, file: 'media_1792799352255.png' },
  { scene: 2, file: 'media_1792799352156.png' },
  { scene: 3, file: 'media_1792799352273.png' },
  { scene: 4, file: 'media_1792799352182.png' },
  { scene: 5, file: 'media_1792799352174.png' },
];

['public/img/silhouettes', 'img/silhouettes'].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function run() {
  const vectors = {};
  for (const item of mapping) {
    const inputPath = path.join(uploadDir, item.file);
    await new Promise((resolve, reject) => {
      potrace.trace(inputPath, { threshold: 195, optTolerance: 0.2 }, (err, svg) => {
        if (err) return reject(err);
        
        // Save standalone SVG
        const svgFileName = 'silueta-0' + item.scene + '.svg';
        fs.writeFileSync(path.join('public/img/silhouettes', svgFileName), svg);
        fs.writeFileSync(path.join('img/silhouettes', svgFileName), svg);
        
        // Also copy the original PNG for safety
        const pngFileName = 'silueta-0' + item.scene + '.png';
        fs.copyFileSync(inputPath, path.join('public/img/silhouettes', pngFileName));
        fs.copyFileSync(inputPath, path.join('img/silhouettes', pngFileName));
        
        // Extract path d attribute
        const dMatch = svg.match(/<path d="([^"]+)"/);
        if (dMatch) {
          vectors['scene' + item.scene] = dMatch[1];
        }
        
        console.log('Saved ' + svgFileName + ' length: ' + svg.length);
        resolve();
      });
    });
  }

  fs.writeFileSync('scratch/vector_paths.json', JSON.stringify(vectors, null, 2));
  console.log('Successfully generated scratch/vector_paths.json');
}

run().catch(console.error);
