import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

function loadEnv() {
  const envPath = path.join(rootDir, '.env');
  const env = {};
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        env[trimmed.slice(0, eqIdx).trim()] = trimmed.slice(eqIdx + 1).trim();
      }
    }
  }
  return env;
}

const env = loadEnv();
const sbUrl = env.SUPABASE_URL;
const sbKey = env.SUPABASE_KEY;

async function checkSchema() {
  console.log('--- INSPECCIÓN DE SCHEMAS DE TABLAS SUPABASE ---');

  // Consulta 1 fila con select=* para company_settings
  try {
    const res = await fetch(`${sbUrl}/rest/v1/company_settings?select=*&limit=1`, {
      headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` }
    });
    const data = await res.json();
    console.log('\n[company_settings] status:', res.status);
    if (Array.isArray(data) && data[0]) {
      console.log('Columnas en company_settings:', Object.keys(data[0]));
    } else {
      console.log('Data:', data);
    }
  } catch (e) {
    console.error('Error company_settings:', e.message);
  }

  // Consulta 1 fila con select=* para products
  try {
    const res = await fetch(`${sbUrl}/rest/v1/products?select=*&limit=1`, {
      headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` }
    });
    const data = await res.json();
    console.log('\n[products] status:', res.status);
    if (Array.isArray(data) && data[0]) {
      console.log('Columnas en products:', Object.keys(data[0]));
    } else {
      console.log('Data:', data);
    }
  } catch (e) {
    console.error('Error products:', e.message);
  }

  // Consulta 1 fila con select=* para orders
  try {
    const res = await fetch(`${sbUrl}/rest/v1/orders?select=*&limit=1`, {
      headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` }
    });
    const data = await res.json();
    console.log('\n[orders] status:', res.status);
    if (Array.isArray(data) && data[0]) {
      console.log('Columnas en orders:', Object.keys(data[0]));
    } else {
      console.log('Data orders:', data);
    }
  } catch (e) {
    console.error('Error orders:', e.message);
  }

  // Verificar qué tablas expone OpenAPI en Supabase
  try {
    const res = await fetch(`${sbUrl}/rest/v1/?apikey=${sbKey}`, {
      headers: { apikey: sbKey, Authorization: `Bearer ${sbKey}` }
    });
    if (res.ok) {
      const spec = await res.json();
      console.log('\n[OpenAPI Spec - Tablas/Rutas expuestas]:');
      if (spec.paths) {
        console.log(Object.keys(spec.paths));
      }
    }
  } catch (e) {
    console.error('Error OpenAPI:', e.message);
  }
}

checkSchema();
