import fs from 'fs';

let content = fs.readFileSync('dashboard.html', 'utf8');

// 1. Modificar getBurgerHouseSimulatedOrders para agregar store_id: 'bighouse'
const bhOrdersOld = `id: 'PED-BH-201',`;
const bhOrdersNew = `id: 'PED-BH-201',\n          store_id: 'bighouse',`;
content = content.replace(bhOrdersOld, bhOrdersNew);

for (let i = 2; i <= 5; i++) {
  const oldId = `id: 'PED-BH-20${i}',`;
  const newId = `id: 'PED-BH-20${i}',\n          store_id: 'bighouse',`;
  content = content.replace(oldId, newId);
}

// 2. Reemplazar completamente getNoutaccSimulatedOrders con productos reales de Noutacc (Tech & Cases)
const noutaccFullNew = `    function getNoutaccSimulatedOrders() {
      const now = new Date();
      const fmt = (date) => date.toLocaleString('es-AR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });

      const d1 = new Date(now.getTime() - 15 * 60 * 1000);
      const d2 = new Date(now.getTime() - 55 * 60 * 1000);
      const d3 = new Date(now.getTime() - 2.5 * 3600 * 1000);
      const d4 = new Date(now.getTime() - 18 * 3600 * 1000);
      const d5 = new Date(now.getTime() - 28 * 3600 * 1000);

      return [
        {
          id: 'PED-NT-101',
          store_id: 'noutacc',
          fecha: fmt(d1),
          cliente: 'Valeria Soria',
          dni: '34182904',
          telefono: '+54 9 11 5821-4433',
          productos: 'Funda Silicone Case MagSafe iPhone 15 Pro Midnight Black ×1 | Protector Lentes Cámara Zafiro Titanium ×1',
          detalle: JSON.stringify([
            { id: 'nt-01', name: 'Funda Silicone Case MagSafe iPhone 15 Pro Midnight Black', emoji: '📱', price: 34500, qty: 1 },
            { id: 'nt-03', name: 'Protector de Lentes de Cámara Zafiro Titanium iPhone 15 Pro', emoji: '🔍', price: 16500, qty: 1 }
          ]),
          items: [
            { cant: 1, name: 'Funda Silicone Case MagSafe iPhone 15 Pro Midnight Black', price: 34500 },
            { cant: 1, name: 'Protector Lentes Cámara Zafiro Titanium iPhone 15 Pro', price: 16500 }
          ],
          pago: 'Transferencia',
          comprobante: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600',
          logistica: 'Envío a domicilio',
          direccion: 'Av. Santa Fe 3420, 4° B, Palermo',
          total: 51000,
          estado: 'confirmar',
          opt_in_whatsapp: true,
          pin_code: '4812',
          is_night_guard: false
        },
        {
          id: 'PED-NT-102',
          store_id: 'noutacc',
          fecha: fmt(d2),
          cliente: 'Mariano Rossi',
          dni: '28910452',
          telefono: '+54 9 11 4192-3321',
          productos: 'Funda Clear Case Antishock con Bordes Air-Cushion iPhone 15 Pro Max ×1 | Cargador Inalámbrico MagSafe 15W Fast Charge ×1',
          detalle: JSON.stringify([
            { id: 'nt-02', name: 'Funda Clear Case Antishock iPhone 15 Pro Max', emoji: '📱', price: 28900, qty: 1 },
            { id: 'nt-04', name: 'Cargador Inalámbrico MagSafe 15W Fast Charge', emoji: '⚡', price: 42000, qty: 1 }
          ]),
          items: [
            { cant: 1, name: 'Funda Clear Case Antishock iPhone 15 Pro Max', price: 28900 },
            { cant: 1, name: 'Cargador Inalámbrico MagSafe 15W Fast Charge', price: 42000 }
          ],
          pago: 'Mercado Pago',
          logistica: 'Envío a domicilio',
          direccion: 'Av. Corrientes 4550, 2° A, Almagro',
          total: 70900,
          estado: 'en_curso',
          delivery_id: 'DQV-NT-8821',
          pin_code: '7391',
          pickup_id: 'PU-NT-01',
          pickup_cost: 2200,
          opt_in_whatsapp: true,
          is_night_guard: false
        },
        {
          id: 'PED-NT-103',
          store_id: 'noutacc',
          fecha: fmt(d3),
          cliente: 'Carolina Méndez',
          dni: '36145890',
          telefono: '+54 9 11 6544-7890',
          productos: 'Funda de Cuero Vegano MagSafe Brown Saddle iPhone 15 ×1 | Cable Trenzado USB-C a USB-C 60W Reforzado 1.5m ×2',
          detalle: JSON.stringify([
            { id: 'nt-05', name: 'Funda de Cuero Vegano MagSafe Brown Saddle', emoji: '📱', price: 39900, qty: 1 },
            { id: 'nt-06', name: 'Cable Trenzado USB-C a USB-C 60W Reforzado 1.5m', emoji: '🔌', price: 18500, qty: 2 }
          ]),
          items: [
            { cant: 1, name: 'Funda de Cuero Vegano MagSafe Brown Saddle', price: 39900 },
            { cant: 2, name: 'Cable Trenzado USB-C a USB-C 60W Reforzado 1.5m', price: 18500 }
          ],
          pago: 'Efectivo',
          logistica: 'Retiro por la tienda',
          direccion: 'Retiro en local Nout Accesorios Belgrano',
          total: 76900,
          estado: 'listo_retirar',
          opt_in_whatsapp: false,
          is_night_guard: false
        }
      ];
    }`;

// Buscar dónde empieza getNoutaccSimulatedOrders y termina antes de window.loadDemoOrdersNoutacc
const startNoutacc = content.indexOf('function getNoutaccSimulatedOrders() {');
const endNoutacc = content.indexOf('window.loadDemoOrdersNoutacc = function(silent = false) {');

if (startNoutacc !== -1 && endNoutacc !== -1) {
  content = content.slice(0, startNoutacc) + noutaccFullNew + '\n\n    ' + content.slice(endNoutacc);
  console.log('✓ getNoutaccSimulatedOrders reemplazado con productos tecnológicos de Noutacc');
}

// 3. Agregar los generadores para Lugones Silva, FerreNow, KioscoJulio, TecnoMont, Biuti y TodoListo
const extraStoreOrders = `
    /* ═══════════════════════════════════════════ GENERADORES OFICIALES MULTI-TENANT POR RUBRO */

    function getLugonesSilvaSimulatedOrders() {
      const now = new Date();
      const fmt = (date) => date.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      return [
        {
          id: 'PED-LS-301',
          store_id: 'lugonessilva',
          fecha: fmt(new Date(now.getTime() - 25 * 60 * 1000)),
          cliente: 'Arq. Marcelo Benítez (Obra Canning)',
          dni: '24.912.833',
          telefono: '+54 9 11 4402-9911',
          productos: 'Cal Hidráulica Milagro x 30kg ×20 | Plasticor Mortero Loma Negra x 40kg ×15 | Barra Hierro Acindar 12mm x 12m ×10',
          pago: 'Transferencia',
          logistica: 'Flete Camión Pluma en Obra',
          direccion: 'Barrio Privado La Providencia Lote 142, Canning',
          total: 366000,
          estado: 'confirmar',
          opt_in_whatsapp: true,
          pin_code: '4190'
        },
        {
          id: 'PED-LS-302',
          store_id: 'lugonessilva',
          fecha: fmt(new Date(now.getTime() - 110 * 60 * 1000)),
          cliente: 'Construcciones San Vicente SRL',
          dni: '30-71829344-8',
          telefono: '+54 9 11 6310-8822',
          productos: 'Arena Fina de Río Lavada BigBag 1m3 ×3 | Cemento Portland Loma Negra CPC 40 ×30',
          pago: 'Transferencia',
          logistica: 'Flete Camión Volquete',
          direccion: 'Ruta 58 Km 12.5, San Vicente',
          total: 402000,
          estado: 'en_curso',
          opt_in_whatsapp: true,
          pin_code: '8821'
        }
      ];
    }

    function getFerreNowSimulatedOrders() {
      const now = new Date();
      const fmt = (date) => date.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      return [
        {
          id: 'PED-FN-401',
          store_id: 'ferre-now',
          fecha: fmt(new Date(now.getTime() - 35 * 60 * 1000)),
          cliente: 'Taller Metalúrgico Fontana',
          dni: '27.419.002',
          telefono: '+54 9 11 5012-7744',
          productos: 'Taladro Percutor Inalámbrico 20V DeWalt DCD7781 ×1 | Amoladora Angular Bosch 850W ×1',
          pago: 'Mercado Pago',
          logistica: 'Envío prioritario',
          direccion: 'Parque Industrial Burzaco Lote 12',
          total: 357000,
          estado: 'confirmar',
          opt_in_whatsapp: true,
          pin_code: '6312'
        }
      ];
    }

    function getKioscoJulioSimulatedOrders() {
      const now = new Date();
      const fmt = (date) => date.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      return [
        {
          id: 'PED-KJ-501',
          store_id: 'kioscojulio',
          fecha: fmt(new Date(now.getTime() - 10 * 60 * 1000)),
          cliente: 'Gonzalo Peñaloza',
          dni: '42.110.899',
          telefono: '+54 9 11 7891-2345',
          productos: 'Fernet Branca Clásico 750ml ×1 | Coca-Cola Original 1.5L ×2 | Hielo en Rolito 4kg ×1',
          pago: 'Efectivo',
          logistica: 'Delivery express 30 min',
          direccion: 'Av. Corrientes 2840, 3° C',
          total: 21900,
          estado: 'en_curso',
          opt_in_whatsapp: true,
          pin_code: '1920'
        }
      ];
    }

    function getTecnoMontSimulatedOrders() {
      const now = new Date();
      const fmt = (date) => date.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      return [
        {
          id: 'PED-TM-601',
          store_id: 'tecnomont',
          fecha: fmt(new Date(now.getTime() - 40 * 60 * 1000)),
          cliente: 'Lucas De Paoli',
          dni: '39.812.901',
          telefono: '+54 9 11 3190-8800',
          productos: 'Placa de Video AMD Radeon RX 7800 XT 16GB Sapphire Pulse ×1 | Procesador AMD Ryzen 7 7800X3D ×1',
          pago: 'Transferencia',
          logistica: 'Envío Asegurado Andreani',
          direccion: 'Thames 1420, Palermo',
          total: 1390000,
          estado: 'confirmar',
          opt_in_whatsapp: true,
          pin_code: '7721'
        }
      ];
    }

    function getBiutiSimulatedOrders() {
      const now = new Date();
      const fmt = (date) => date.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      return [
        {
          id: 'PED-BT-701',
          store_id: 'biuti',
          fecha: fmt(new Date(now.getTime() - 50 * 60 * 1000)),
          cliente: 'Camila Villalba',
          dni: '36.541.200',
          telefono: '+54 9 11 6788-9900',
          productos: 'Blazer Sastrero Oversize Lino Italiano Arena "Verona" (Talle M) ×1',
          pago: 'Mercado Pago',
          logistica: 'Envío a Domicilio',
          direccion: 'Alvear 1850, 6° A, Recoleta',
          total: 145000,
          estado: 'en_curso',
          opt_in_whatsapp: true,
          pin_code: '3310'
        }
      ];
    }

    function getTodoListoSimulatedOrders() {
      const now = new Date();
      const fmt = (date) => date.toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      return [
        {
          id: 'PED-TL-801',
          store_id: 'todolisto',
          fecha: fmt(new Date(now.getTime() - 20 * 60 * 1000)),
          cliente: 'Estudio Jurídico Morales & Asoc.',
          dni: '30-68912344-3',
          telefono: '+54 9 11 4321-7788',
          productos: 'Cuaderno Universitario Mooving A4 80H Rayado ×5 | Set Marcadores Uni Posca PC-5M (Caja x8) ×1',
          pago: 'Transferencia',
          logistica: 'Envío Cadetería CABA',
          direccion: 'Lavalle 1240, 4° Of. 402',
          total: 76500,
          estado: 'confirmar',
          opt_in_whatsapp: true,
          pin_code: '5590'
        }
      ];
    }
`;

// Insertar las funciones antes de window.loadDemoOrdersBurgerHouse
const insertTarget = 'window.loadDemoOrdersBurgerHouse = function(silent = false) {';
if (content.includes(insertTarget)) {
  content = content.replace(insertTarget, extraStoreOrders + '\n    ' + insertTarget);
  console.log('✓ Generadores de pedidos oficiales multi-tenant insertados');
}

fs.writeFileSync('dashboard.html', content, 'utf8');
console.log('✓ dashboard.html actualizado con blindaje total de pedidos multi-tenant');
