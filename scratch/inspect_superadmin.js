import fs from 'fs';

const html = fs.readFileSync('super-admin-secret-dashboard.html', 'utf8');
const lines = html.split('\n');

console.log('=== EMAIL MATCHES IN SUPER ADMIN DASHBOARD ===');
lines.forEach((line, idx) => {
  const lower = line.toLowerCase();
  if (lower.includes('email') || lower.includes('correo') || lower.includes('resend') || lower.includes('plantilla') || lower.includes('prospecto') || lower.includes('lead')) {
    console.log(`L${idx + 1}: ${line.trim().slice(0, 110)}`);
  }
});
