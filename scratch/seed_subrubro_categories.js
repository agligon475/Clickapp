// scratch/seed_subrubro_categories.js
// Seeder de 5 categorías por defecto para tiendas según su subrubro

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

const headers = {
  'Content-Type': 'application/json',
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`
};

const SUBRUBRO_CATEGORIES_MAP = {
  // 1. SÚPER
  'supermercado': ["Almacén y Secos", "Frescos y Lácteos", "Bebidas", "Limpieza", "Perfumería e Higiene"],
  'conveniencia': ["Snacks y Galletitas", "Bebidas Frías", "Golosinas y Chocolates", "Cigarrillos y Encendedores", "Comidas Rápidas / Listo para Llevar"],
  'almacen': ["Fideos y Arroz", "Aceites y Enlatados", "Lácteos y Fiambres", "Panadería y Galletitas", "Bebidas"],
  'dietetica': ["Frutos Secos y Semillas", "Harinas e Integrales", "Legumbres y Cereales", "Suplementos", "Productos Sin TACC / Veganos"],
  'verduleria': ["Frutas de Estación", "Verduras de Hoja", "Tubérculos y Raíces", "Hortalizas", "Productos Envasados / Frutos Secos"],

  // 2. FARMACIAS
  'farmacia': ["Medicamentos Venta Libre", "Primeros Auxilios", "Cuidado Bucal", "Suplementos y Vitaminas", "Cuidado de la Piel / Dermocosmética"],
  'perfumeria': ["Fragancias Femeninas", "Fragancias Masculinas", "Maquillaje", "Cuidado Capilar", "Cremas y Cuidado Facial"],
  'optica': ["Anteojos de Sol", "Marcos / Armazones", "Lentes de Contacto", "Soluciones de Limpieza", "Accesorios"],
  'salud-natural': ["Suplementos Naturales", "Infusiones y Tés", "Aceites Esenciales", "Productos Orgánicos", "Cuidado Corporal Natural"],

  // 3. BEBIDAS
  'distribuidora': ["Cervezas por Pack", "Gaseosas y Aguas", "Vinos y Espumantes", "Bebidas Blancas / Destilados", "Varios / Desechables"],
  'licoreria': ["Destilados", "Licores y Aperitivos", "Vinos de Selección", "Coctelería y Insumos", "Cervezas Importadas / Especiales"],
  'vinoteca': ["Vinos Tintos", "Vinos Blancos y Rosados", "Espumantes y Cava", "Ediciones Especiales / Premium", "Accesorios para Vino"],
  'cerveceria': ["Cervezas Tiradas / Recargas", "Latas / Botellas Artesanales", "Packs / Promos", "Picadas y Comida", "Merchandising / Cristalería"],

  // 4. KIOSCOS
  'kiosco': ["Golosinas y Chocolates", "Galletitas y Snacks", "Bebidas Frías", "Cigarrillos y Tabaco", "Artículos Escolares / Librería"],
  'tabaqueria': ["Cigarrillos", "Tabacos para Armar", "Pipas y Habanos", "Sedas y Filtros", "Accesorios"],
  'libreria-kiosco': ["Artículos Escolares", "Papelería y Hojas", "Útiles de Oficina", "Revistas y Cómics", "Fotocopias e Impresiones"],

  // 5. CAFÉ & DELI
  'cafeteria': ["Café en Grano / Molido", "Bebidas Calientes", "Bebidas Frías / Iced Coffee", "Pastelería Dulce", "Opciones Saladas / Sándwiches"],
  'panaderia': ["Panes Artesanales", "Facturas y Medialunas", "Especialidades Saladas", "Masas Secas y Finas", "Tortas y Tartas Dulces"],
  'reposteria': ["Tortas de Cumpleaños / Eventos", "Postres en Pote / Vasos", "Cupcakes y Muffins", "Chocolatería", "Productos Sin TACC / Saludables"],
  'rotiseria': ["Comidas Preparadas / Platos del Día", "Empanadas y Pizzas", "Tartas y Minutas", "Ensaladas Preparadas", "Postres y Bebidas"],

  // 6. HELADOS
  'heladeria': ["Kilos y Medios Kilos", "Potes Individuales", "Paletas", "Helados Veganos / Sin Azúcar", "Salsas y Coberturas"],
  'postres': ["Tortas Heladas", "Postres Individuales", "Potes Familiares", "Bombones Helados", "Milkshakes / Batidos"],

  // 7. TIENDAS
  'regaleria': ["Bazar y Decoración", "Peluches y Juguetes", "Papelería Creativa / Tarjetas", "Accesorios de Uso Personal", "Sets de Regalo"],
  'limpieza': ["Detergentes y Jabones", "Limpiadores de Superficie", "Papeles y Rollos de Cocina", "Utensilios de Limpieza", "Cuidado de la Ropa"],
  'tecnologia': ["Accesorios para Celulares", "Audio y Auriculares", "Cables y Cargadores", "Periféricos de Computación", "Gadgets y Smart"],
  'indumentaria': ["Remeras y Tops", "Pantalones y Jeans", "Abrigos y Camperas", "Calzado", "Accesorios"],
  'ferreteria': ["Herramientas Manuales", "Herramientas Eléctricas", "Fijaciones y Tornillería", "Pinturas y Accesorios", "Electricidad e Iluminación"],
  'otro': ["General", "Promociones", "Novedades", "Destacados", "Varios"]
};

function getCategoryEmoji(name) {
  const n = name.toLowerCase();
  if (n.includes('bebida') || n.includes('gaseosa') || n.includes('agua')) return '🥤';
  if (n.includes('cerveza') || n.includes('vino') || n.includes('destilad')) return '🍺';
  if (n.includes('lacteo') || n.includes('fresco')) return '🥛';
  if (n.includes('limpieza') || n.includes('jab')) return '🧹';
  if (n.includes('perfum') || n.includes('cosmet') || n.includes('piel')) return '🌸';
  if (n.includes('snack') || n.includes('gallet') || n.includes('golosina') || n.includes('choc')) return '🍬';
  if (n.includes('cigarr') || n.includes('tabac')) return '🚬';
  if (n.includes('comida') || n.includes('plato') || n.includes('empanada') || n.includes('pizza')) return '🍕';
  if (n.includes('fruta') || n.includes('verdur')) return '🥦';
  if (n.includes('medicam') || n.includes('auxil') || n.includes('salud')) return '💊';
  if (n.includes('caf')) return '☕';
  if (n.includes('pan') || n.includes('factura') || n.includes('torta') || n.includes('pastel')) return '🥐';
  if (n.includes('helad') || n.includes('kilo')) return '🍦';
  if (n.includes('herramienta') || n.includes('fijacion') || n.includes('pintura')) return '🔧';
  if (n.includes('tecnolog') || n.includes('audio') || n.includes('cable') || n.includes('celular')) return '💻';
  if (n.includes('remera') || n.includes('pantalon') || n.includes('ropa') || n.includes('calzado')) return '👗';
  return '🏷️';
}

async function seedStoreCategories(storeId, subrubroKey, rubroKey) {
  console.log(`Procesando categorías por defecto para la tienda "${storeId}" (Subrubro: ${subrubroKey || 'N/A'}, Rubro: ${rubroKey || 'N/A'})...`);
  
  let catList = SUBRUBRO_CATEGORIES_MAP[subrubroKey];
  if (!catList || catList.length === 0) {
    catList = SUBRUBRO_CATEGORIES_MAP['otro'];
  }

  const payloadCats = catList.map((name, idx) => ({
    store_id: storeId,
    name: name,
    emoji: getCategoryEmoji(name),
    display_order: (idx + 1) * 10,
    active: true,
    rubro: rubroKey || ''
  }));

  const res = await fetch(`${SUPABASE_URL}/rest/v1/categories`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payloadCats)
  });

  if (res.ok) {
    console.log(`✓ Insertadas 5 categorías por defecto exitosamente para "${storeId}":`, catList);
  } else {
    console.error(`✕ Error al insertar categorías para "${storeId}":`, res.status, await res.text());
  }
}

// Ejecutar para tiendas existentes
async function main() {
  await seedStoreCategories('elquesabepoco', 'kiosco', 'Kioscos');
  await seedStoreCategories('cocostore', 'almacen', 'Super');
  await seedStoreCategories('ferre-now', 'ferreteria', 'Tiendas');
  await seedStoreCategories('ferreteria-demo', 'ferreteria', 'Tiendas');
  await seedStoreCategories('noutacc', 'dietetica', 'Super');
}

main();
