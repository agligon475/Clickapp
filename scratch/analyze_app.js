import fs from 'fs';

console.log('=== ANALIZANDO ESTADO FUNCIONAL DEL PROYECTO (CLICKAPP / DALE TE PIDO) ===\n');

function analyzeFile(filename) {
  if (!fs.existsSync(filename)) {
    console.log(`❌ Archivo ${filename} NO existe`);
    return;
  }
  const content = fs.readFileSync(filename, 'utf8');
  console.log(`--- Archivo: ${filename} (${(content.length / 1024).toFixed(1)} KB) ---`);
  
  const keywords = ['productos', 'pedidos', 'repartidores', 'repartidor', 'pickup', 'categorias', 'categoria', 'subrubro', 'banners', 'watermark', 'supabase', 'sheets', 'excel', 'mercadopago', 'whatsapp'];
  
  keywords.forEach(kw => {
    const matches = (content.match(new RegExp(kw, 'gi')) || []).length;
    console.log(`  - '${kw}': ${matches} ocurrencias`);
  });
  console.log('');
}

analyzeFile('dashboard.html');
analyzeFile('tienda.html');
analyzeFile('old-dashboard-test.html');
analyzeFile('alta-usuario.html');
analyzeFile('api/store.js');
analyzeFile('api/auth.js');
analyzeFile('scratch/full_supabase_schema.sql');
