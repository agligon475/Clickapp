/**
 * seed_all_demo_stores.js
 * Configura exhaustivamente las 7 cuentas demo oficiales de Dale!TePido:
 * 1. ferre-now (Ferretería Industrial & Herramientas)
 * 2. kioscojulio (Kiosco 24hs)
 * 3. noutacc (Panadería & Pastelería 100% Sin TACC)
 * 4. tecnomont (Tecnología, Gaming & Accesorios)
 * 5. biuti (Indumentaria Femenina +35 / Palermo, CABA)
 * 6. todolisto (Librería, Papelería & Insumos / San Justo, AMBA)
 * 7. lugonessilva (Corralón & Materiales de Construcción / San Vicente, AMBA)
 *
 * Además elimina / desactiva las 13 cuentas obsoletas marcándolas como DELETED y limpiando sus registros.
 */

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Prefer': 'return=representation'
};

// ══════════════════════════════════════════════════════════════
// 1. CUENTAS A ELIMINAR / PURGAR
// ══════════════════════════════════════════════════════════════
const DEPRECATED_STORES = [
  'gastronomia',
  'burgerhouse',
  'test-store-1786047945925',
  'tecnomon',
  'gastronomia-vacia',
  'electronica-vacia',
  'kiosco-vacia',
  'ferreteria-vacia',
  'electronica-demo',
  'gastronomia-demo',
  'kiosco-demo',
  'ferreteria-demo',
  'ferrenow',
  'test_insert_probe',
  'test_insert_renamed'
];

export { DEPRECATED_STORES, SUPABASE_URL, headers };
