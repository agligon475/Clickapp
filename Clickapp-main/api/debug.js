import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const cwd = process.cwd();
  const host = req.headers.host || '';
  const hostname = host.split(':')[0].toLowerCase();

  // Listar archivos en el directorio raíz
  let rootFiles = [];
  try {
    rootFiles = fs.readdirSync(cwd);
  } catch (e) {
    rootFiles = [`ERROR: ${e.message}`];
  }

  // Verificar archivos clave específicamente
  const filesToCheck = ['landing.html', 'tienda.html', 'index.html', 'dashboard.html'];
  const fileChecks = {};
  for (const f of filesToCheck) {
    const fp = path.join(cwd, f);
    try {
      const stat = fs.statSync(fp);
      fileChecks[f] = { exists: true, sizeBytes: stat.size };
    } catch {
      fileChecks[f] = { exists: false };
    }
  }

  // Leer las primeras líneas de landing.html para confirmar que es la correcta
  let landingPreview = null;
  try {
    const content = fs.readFileSync(path.join(cwd, 'landing.html'), 'utf8');
    landingPreview = content.slice(0, 300);
  } catch (e) {
    landingPreview = `ERROR leyendo landing.html: ${e.message}`;
  }

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    host,
    hostname,
    cwd,
    nodeEnv: process.env.NODE_ENV,
    rootFiles,
    fileChecks,
    landingPreview,
    headers: req.headers,
  });
}
