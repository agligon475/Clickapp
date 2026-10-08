import { execSync } from 'child_process';
import fs from 'fs';

const pages = [
  { name: 'Landing Page', url: 'http://localhost:5500/landing.html', file: 'scratch/lh_landing.json' },
  { name: 'Tienda Pública', url: 'http://localhost:5500/tienda.html?tienda=larebardie', file: 'scratch/lh_tienda.json' },
  { name: 'Alta Usuario / Onboarding', url: 'http://localhost:5500/alta-usuario.html', file: 'scratch/lh_alta.json' },
  { name: 'Dashboard Admin', url: 'http://localhost:5500/dashboard.html', file: 'scratch/lh_dashboard.json' }
];

console.log('=== INICIANDO AUDITORÍA LIGHTHOUSE EN CLICkAPP ===\n');

const results = [];

for (const p of pages) {
  console.log(`Auditing ${p.name} (${p.url})...`);
  try {
    const cmd = `npx lighthouse "${p.url}" --output=json --output-path="${p.file}" --chrome-flags="--headless --no-sandbox --disable-gpu" --quiet --only-categories=performance,accessibility,best-practices,seo`;
    execSync(cmd, { stdio: 'ignore' });
    
    if (fs.existsSync(p.file)) {
      const data = JSON.parse(fs.readFileSync(p.file, 'utf8'));
      const scores = {
        name: p.name,
        performance: Math.round((data.categories.performance?.score || 0) * 100),
        accessibility: Math.round((data.categories.accessibility?.score || 0) * 100),
        bestPractices: Math.round((data.categories['best-practices']?.score || 0) * 100),
        seo: Math.round((data.categories.seo?.score || 0) * 100),
        fcp: data.audits['first-contentful-paint']?.displayValue,
        lcp: data.audits['largest-contentful-paint']?.displayValue,
        tbt: data.audits['total-blocking-time']?.displayValue,
        cls: data.audits['cumulative-layout-shift']?.displayValue,
        speedIndex: data.audits['speed-index']?.displayValue,
        opportunities: Object.values(data.audits)
          .filter(a => a.details && a.details.type === 'opportunity' && a.score !== null && a.score < 0.9)
          .map(a => ({ title: a.title, savings: a.displayValue || '' }))
      };
      results.push(scores);
      console.log(`✅ ${p.name} -> Perf: ${scores.performance} | A11y: ${scores.accessibility} | BP: ${scores.bestPractices} | SEO: ${scores.seo} | LCP: ${scores.lcp}`);
    }
  } catch (err) {
    console.error(`❌ Error en ${p.name}:`, err.message);
  }
}

fs.writeFileSync('scratch/lighthouse_summary.json', JSON.stringify(results, null, 2));
console.log('\n=== AUDITORÍA FINALIZADA. RESUMEN GUARDADO EN scratch/lighthouse_summary.json ===');
