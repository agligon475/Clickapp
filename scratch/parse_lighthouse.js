import fs from 'fs';

const filePath = process.argv[2] || 'scratch/lighthouse_report.json';
const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));

console.log("=== LIGHTHOUSE ACCESSIBILITY AUDIT FAILURES ===");
const audits = report.audits;
for (const [id, audit] of Object.entries(audits)) {
  if (audit.score !== null && audit.score < 1 && audit.details) {
    // Only check accessibility category
    const isAccessibility = report.categories.accessibility.auditRefs.some(ref => ref.id === id);
    if (isAccessibility) {
      console.log(`\nID: ${id}`);
      console.log(`Title: ${audit.title}`);
      console.log(`Score: ${audit.score}`);
      console.log(`Description: ${audit.description}`);
      if (audit.details.items) {
        console.log("Failing Elements:");
        audit.details.items.slice(0, 5).forEach(item => {
          if (item.node) {
            console.log(`  - Selector: ${item.node.selector}`);
            console.log(`    HTML: ${item.node.snippet}`);
          }
        });
        if (audit.details.items.length > 5) {
          console.log(`  ... and ${audit.details.items.length - 5} more elements.`);
        }
      }
    }
  }
}
