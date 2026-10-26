// catalogs_data.js - Catálogo exhaustivo de productos y categorías para las 7 tiendas demo de ClickApp
module.exports = {
  'ferre-now': {
    categories: [
      { name: 'Herramientas Eléctricas', slug: 'electricas', icon: '⚡' },
      { name: 'Herramientas Manuales', slug: 'manuales', icon: '🔧' },
      { name: 'Fijaciones y Adhesivos', slug: 'fijaciones', icon: '🔩' },
      { name: 'Pinturas y Accesorios', slug: 'pinturas', icon: '🎨' },
      { name: 'Seguridad y Protección', slug: 'seguridad', icon: '🦺' }
    ],
    products: [
      {
        name: 'Taladro Percutor Inalámbrico 20V DeWalt DCD7781',
        description: 'Motor Brushless sin carbones, mandril metálico de 13mm, 2 baterías de litio 2.0Ah, cargador rápido y maletín de transporte.',
        price: 245000,
        category: 'Herramientas Eléctricas',
        brand: 'DeWalt',
        stock: 12,
        sku: 'FER-DCD7781',
        image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Amoladora Angular 4 1/2" Bosch GWS 850W',
        description: 'Potente motor de 850W, diseño ergonómico y compacto, guarda de protección de ajuste rápido y empuñadura auxiliar anti-vibración.',
        price: 112000,
        category: 'Herramientas Eléctricas',
        brand: 'Bosch',
        stock: 18,
        sku: 'FER-GWS850',
        image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Sierra Circular 7 1/4" Makita 1800W 5007N',
        description: 'Guía de corte para bisel de hasta 56 grados, base de aluminio resistente, traba de eje para cambio veloz de disco.',
        price: 289000,
        category: 'Herramientas Eléctricas',
        brand: 'Makita',
        stock: 8,
        sku: 'FER-5007N',
        image: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Rotomartillo Electroneumático SDS Plus Stanley 800W',
        description: '3 modos de uso: taladrado, percusión y cincelado. Energía de impacto 2.4 Joules. Incluye 3 mechas y cincel plano.',
        price: 198000,
        category: 'Herramientas Eléctricas',
        brand: 'Stanley',
        stock: 10,
        sku: 'FER-SHR263',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Set Bocallaves y Llaves Crique Bahco x 94 piezas',
        description: 'Acero cromo vanadio forjado de alta resistencia. Encastres de 1/2" y 1/4", tubos hexagonales, articulaciones universales y maletín irrompible.',
        price: 215000,
        category: 'Herramientas Manuales',
        brand: 'Bahco',
        stock: 14,
        sku: 'FER-S940',
        image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Pinza Universal Bahco 8" Aislada 1000V',
        description: 'Filos templados por inducción para cortar alambre de cuerda de piano. Aislación certificada IEC 60900 para electricistas.',
        price: 36500,
        category: 'Herramientas Manuales',
        brand: 'Bahco',
        stock: 35,
        sku: 'FER-2678V',
        image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Nivel Láser Autonivelante de Líneas Cruzadas DeWalt',
        description: 'Alcance 15m (hasta 50m con detector). Línea horizontal y vertical brillante, soporte magnético pivotante integrado.',
        price: 184000,
        category: 'Herramientas Manuales',
        brand: 'DeWalt',
        stock: 9,
        sku: 'FER-DW088K',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Cinta Métrica Stanley FatMax 8m / 26ft',
        description: 'Hoja de 32mm de ancho con recubrimiento Mylar que resiste 10 veces más a la abrasión. Resiste caídas de hasta 3 metros.',
        price: 28900,
        category: 'Herramientas Manuales',
        brand: 'Stanley',
        stock: 40,
        sku: 'FER-FMHT338',
        image: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Adhesivo Sellador Híbrido Fischer MS Polímero 290ml',
        description: 'Pega y sella todo tipo de materiales incluso bajo el agua. Resistente a rayos UV, intemperie y vibraciones continuas.',
        price: 14800,
        category: 'Fijaciones y Adhesivos',
        brand: 'Fischer',
        stock: 60,
        sku: 'FER-MSPOLY',
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Anclaje Químico FIS V 300T Fischer con Cánulas',
        description: 'Resina viniléster libre de estireno homologada para fijaciones estructurales en hormigón fisurado y mampostería maciza.',
        price: 32000,
        category: 'Fijaciones y Adhesivos',
        brand: 'Fischer',
        stock: 25,
        sku: 'FER-FISV300',
        image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Tarugos SX Fischer 8mm con Tope x 100u + Tornillos Fix',
        description: 'Expansión cuádruple de nylon virgen de máxima tracción. Ideal para ladrillo macizo, hueco o bloques de cemento.',
        price: 11900,
        category: 'Fijaciones y Adhesivos',
        brand: 'Fischer',
        stock: 80,
        sku: 'FER-SX8100',
        image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Látex Interior Lavable Alba Albalatex Mate 20 Litros',
        description: 'Excelente poder cubritivo y lavabilidad. Anti-hongo de máxima duración, acabado mate aterciopelado de secado rápido.',
        price: 98500,
        category: 'Pinturas y Accesorios',
        brand: 'Alba',
        stock: 22,
        sku: 'FER-ALBA20',
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Membrana Líquida Fibrada Megaflex 20kg Blanca',
        description: 'Impermeabilizante acrílico elastomérico reforzado con fibras incorporadas para techos, terrazas transitables y muros.',
        price: 84000,
        category: 'Pinturas y Accesorios',
        brand: 'Megaflex',
        stock: 19,
        sku: 'FER-MEM20',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Pistola Para Pintar Eléctrica Lusqtoff 600W HTEP-1001',
        description: 'Sistema HVLP de bajo rebote de pintura. Boquilla de cobre intercambiable para lacas, barnices y pinturas látex diluidas.',
        price: 59000,
        category: 'Pinturas y Accesorios',
        brand: 'Lusqtoff',
        stock: 15,
        sku: 'FER-HTEP1001',
        image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Botines de Seguridad Ombú Krypton con Puntera de Acero',
        description: 'Cuero flor hidrofugado de alta calidad, suela poliuretano bidensidad antideslizante y plantilla confort anatómica. Talles 38 a 46.',
        price: 68000,
        category: 'Seguridad y Protección',
        brand: 'Ombú',
        stock: 30,
        sku: 'FER-OMBKRYP',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Arnés de Seguridad Integral 4 Puntos Steelpro con Cabo',
        description: 'Certificado IRAM, bandas de poliéster de 45mm, hebillas de cierre rápido y dorsal con argolla D anticaída forjada.',
        price: 52000,
        category: 'Seguridad y Protección',
        brand: 'Steelpro',
        stock: 16,
        sku: 'FER-STEEL4P',
        image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Protector Auditivo Libus L-340 Tipo Copa Diadema',
        description: 'Atenuación SNR 28dB, almohadillas suaves con relleno de gel viscoelástico, ajuste milimétrico de altura.',
        price: 18500,
        category: 'Seguridad y Protección',
        brand: 'Libus',
        stock: 45,
        sku: 'FER-LIBL340',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Gafas de Seguridad 3M Virtua Transparente Anti-Empañante',
        description: 'Lentes de policarbonato con filtro UV 99.9%. Recubrimiento DX resistente a rayaduras y condensación extrema.',
        price: 8900,
        category: 'Seguridad y Protección',
        brand: '3M',
        stock: 75,
        sku: 'FER-3MVIRT',
        image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?w=700&auto=format&fit=crop&q=80'
      }
    ]
  },

  'kioscojulio': {
    categories: [
      { name: 'Bebidas y Energizantes', slug: 'bebidas', icon: '🥤' },
      { name: 'Golosinas y Chocolates', slug: 'golosinas', icon: '🍫' },
      { name: 'Galletitas y Snacks', slug: 'snacks', icon: '🍪' },
      { name: 'Almacén Rápido', slug: 'almacen', icon: '🥪' },
      { name: 'Tabaco y Accesorios', slug: 'tabaco', icon: '🔥' }
    ],
    products: [
      {
        name: 'Fernet Branca Clásico 750ml',
        description: 'El clásico fernet argentino de hierbas maceradas, ideal para combinar con Coca-Cola bien fría y mucho hielo.',
        price: 12500,
        category: 'Bebidas y Energizantes',
        brand: 'Branca',
        stock: 40,
        sku: 'KIO-BRANCA750',
        image: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Coca-Cola Original Sabor 1.5 Litros',
        description: 'Botella de 1.5L retornable/descartable según disponibilidad, bien fría de cámara a 2°C lista para disfrutar.',
        price: 3200,
        category: 'Bebidas y Energizantes',
        brand: 'Coca-Cola',
        stock: 60,
        sku: 'KIO-COCA15',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Bebida Energizante Monster Energy Ultra White 473ml',
        description: 'Energía sin azúcar, ligera y refrescante, con la dosis exacta de taurina, cafeína y vitaminas del complejo B.',
        price: 2800,
        category: 'Bebidas y Energizantes',
        brand: 'Monster Energy',
        stock: 48,
        sku: 'KIO-MONSTERUW',
        image: 'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Cerveza Corona Extra 710ml Botellón',
        description: 'Cerveza tipo lager dorada, fresca y ligera. No te olvides de pedir tu rodaja de lima fresca de regalo.',
        price: 4900,
        category: 'Bebidas y Energizantes',
        brand: 'Corona',
        stock: 36,
        sku: 'KIO-CORONA710',
        image: 'https://images.unsplash.com/photo-1608270111165-22442e97143c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Alfajor Rasta Negro con Dulce de Leche y Chocolate Amargo',
        description: 'El alfajor sensación del momento: galleta crocante tipo cookie americana, relleno monumental de dulce de leche repostero y baño 70% cacao.',
        price: 2200,
        category: 'Golosinas y Chocolates',
        brand: 'Rasta',
        stock: 50,
        sku: 'KIO-RASTANEG',
        image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Alfajor Havanna Mar del Plata 70% Cacao con Cristales de Sal',
        description: 'Edición conmemorativa 150 años. Relleno de dulce de leche artesanal, corazón cremoso y cobertura de chocolate semiamargo con sal marina.',
        price: 3600,
        category: 'Golosinas y Chocolates',
        brand: 'Havanna',
        stock: 30,
        sku: 'KIO-HAVMDQ',
        image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Chocolate Milka Oreo 100g Suizo',
        description: 'Tableta de chocolate con leche alpino Milka relleno de crema de vainilla con trozos crujientes de galletita Oreo.',
        price: 3100,
        category: 'Golosinas y Chocolates',
        brand: 'Milka',
        stock: 45,
        sku: 'KIO-MILKAOREO',
        image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Gomitas Mogul Moras Dulces 150g',
        description: 'Caramelos masticables de gelatina sabor mora y frambuesa con crocante textura exterior azucarada.',
        price: 1800,
        category: 'Golosinas y Chocolates',
        brand: 'Arcor Mogul',
        stock: 40,
        sku: 'KIO-MOGULMOR',
        image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Papas Fritas Lays Clásicas 134g Bolsa Grande',
        description: 'Papas seleccionadas cortadas finamente y fritas a la perfección con la dosis justa de sal marina.',
        price: 3400,
        category: 'Galletitas y Snacks',
        brand: 'Lays',
        stock: 35,
        sku: 'KIO-LAYS134',
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Galletitas Chocolinas Bagley 250g Originales',
        description: 'Las galletitas de chocolate más amadas de Argentina. La base indispensable para la chocotorta perfecta.',
        price: 2400,
        category: 'Galletitas y Snacks',
        brand: 'Bagley',
        stock: 45,
        sku: 'KIO-CHOCOL250',
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Doritos Mega Queso Nacho 140g',
        description: 'Tortillas de maíz tostadas con el intenso y crujiente sabor a queso cheddar característico.',
        price: 3700,
        category: 'Galletitas y Snacks',
        brand: 'Doritos',
        stock: 28,
        sku: 'KIO-DORIT140',
        image: 'https://images.unsplash.com/photo-1528751014936-863e6e7a319c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Galletitas Oreo Original 118g Tubo',
        description: 'Galletitas de cacao rellenas con la clásica crema blanca. Twist, Lick, Dunk!',
        price: 1950,
        category: 'Galletitas y Snacks',
        brand: 'Oreo',
        stock: 55,
        sku: 'KIO-OREO118',
        image: 'https://images.unsplash.com/photo-1568051243851-f9b136146e97?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Sándwich de Miga Triple Jamón Cocido y Queso Tybo (x 2 u)',
        description: 'Elaboración fresca del día con pan de miga artesanal humedecido, jamón cocido seleccionado y queso tybo suave.',
        price: 3900,
        category: 'Almacén Rápido',
        brand: 'Elaboración Propia',
        stock: 20,
        sku: 'KIO-MIGAJQ',
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Empanada Criolla de Carne Suave al Horno',
        description: 'Carne picada a cuchillo con cebolla de verdeo, pimentón dulce y huevo duro. Masa hojaldrada crujiente.',
        price: 2100,
        category: 'Almacén Rápido',
        brand: 'Elaboración Propia',
        stock: 30,
        sku: 'KIO-EMPCARNE',
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Yogur La Serenísima Clásico con Cereales 175g',
        description: 'Yogur batido sabor vainilla con cúpula de copos de maíz azucarados crocantes.',
        price: 2300,
        category: 'Almacén Rápido',
        brand: 'La Serenísima',
        stock: 25,
        sku: 'KIO-YOGLS',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Encendedor Clipper Clásico Recargable Diseños Variados',
        description: 'Válvula de recarga de gas isobutano, sistema de pedernal extraíble ideal para armar.',
        price: 2200,
        category: 'Tabaco y Accesorios',
        brand: 'Clipper',
        stock: 50,
        sku: 'KIO-CLIPPER',
        image: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Papelillos OCB Premium King Size Slim x 32 hojas + Filtros',
        description: 'Papel ultra fino de combustión lenta hecho de fibras de lino con goma arábiga natural.',
        price: 2600,
        category: 'Tabaco y Accesorios',
        brand: 'OCB',
        stock: 45,
        sku: 'KIO-OCBKS',
        image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Chicles Beldent Infinit Menta Glacial Sin Azúcar',
        description: 'Pack de chicles en tiras con sabor a menta extra fresco de larga duración.',
        price: 1500,
        category: 'Golosinas y Chocolates',
        brand: 'Beldent',
        stock: 60,
        sku: 'KIO-BELDENT',
        image: 'https://images.unsplash.com/photo-1575224300306-1b8da36134ec?w=700&auto=format&fit=crop&q=80'
      }
    ]
  },

  'noutacc': {
    categories: [
      { name: 'Fundas & Cases iPhone', slug: 'cases-iphone', icon: '📱' },
      { name: 'Cargadores & Hubs MFi', slug: 'cargadores', icon: '⚡' },
      { name: 'Audio TWS & Headphones', slug: 'audio', icon: '🎧' },
      { name: 'Ecosistema MagSafe', slug: 'magsafe', icon: '🧲' },
      { name: 'Protección de Pantalla', slug: 'pantallas', icon: '🛡️' }
    ],
    products: [
      {
        name: 'Funda Silicone Case MagSafe iPhone 15 Pro Midnight Black',
        description: 'Silicona suave al tacto con forro interior de microfibra de felpa. Anillo magnético N52 integrado de sujeción perfecta.',
        price: 34500,
        category: 'Fundas & Cases iPhone',
        brand: 'Nout Original',
        stock: 25,
        sku: 'NOU-CASE15P-BK',
        image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Funda Clear Case Antishock con Bordes Air-Cushion iPhone 15 Pro Max',
        description: 'Policarbonato anti-amarilleo con tecnología UV-Resist y esquinas con bolsas de aire que absorben impactos de hasta 2 metros.',
        price: 28900,
        category: 'Fundas & Cases iPhone',
        brand: 'Nout Original',
        stock: 30,
        sku: 'NOU-CLEAR15PM',
        image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Funda de Cuero Vegano MagSafe Brown Saddle iPhone 14/15',
        description: 'Elegante cuero vegano texturado de alta gama con botones metálicos mecanizados independientes y tacto ultra suave.',
        price: 39900,
        category: 'Fundas & Cases iPhone',
        brand: 'Nout Atelier',
        stock: 18,
        sku: 'NOU-LEATH15-BR',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Cargador Rápido GaN 65W Triple Puerto (2x USB-C + USB-A)',
        description: 'Tecnología Nitruro de Galio que ofrece máxima potencia en un tamaño ultra compacto. Carga simultáneamente MacBook Pro, iPad e iPhone.',
        price: 64900,
        category: 'Cargadores & Hubs MFi',
        brand: 'Anker PowerPort',
        stock: 20,
        sku: 'NOU-GAN65W',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Cable USB-C a USB-C 100W PD Mallado en Nylon Reforzado 2m',
        description: 'Chip E-Marker para control de temperatura inteligente. Soporta carga ultra rápida de notebooks y transferencia de 480 Mbps.',
        price: 18500,
        category: 'Cargadores & Hubs MFi',
        brand: 'Baseus Tungsten',
        stock: 40,
        sku: 'NOU-C2C100W',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Cable USB-C a Lightning Certificado MFi Apple Braided 1.5m',
        description: 'Conector original C94 homologado por Apple con certificación Made For iPhone. No da error de compatibilidad.',
        price: 21900,
        category: 'Cargadores & Hubs MFi',
        brand: 'Ugreen MFi',
        stock: 35,
        sku: 'NOU-MFI-LGT',
        image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Auriculares In-Ear Sony WF-1000XM5 Hi-Res Noise Cancelling',
        description: 'Cancelación activa de ruido líder del mercado, micrófonos de conducción ósea, códec LDAC de alta fidelidad y batería de 24hs.',
        price: 385000,
        category: 'Audio TWS & Headphones',
        brand: 'Sony',
        stock: 6,
        sku: 'NOU-SONYXM5',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Auriculares Over-Ear Bose QuietComfort SC Wireless',
        description: 'Comodidad inigualable para todo el día, almohadillas afelpadas de cuero sintético y modo consciente/silencio absoluto.',
        price: 440000,
        category: 'Audio TWS & Headphones',
        brand: 'Bose',
        stock: 5,
        sku: 'NOU-BOSE-QCSC',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Batería Portátil Power Bank MagSafe 10.000mAh 20W PD',
        description: 'Se acopla magnéticamente a tu teléfono sin cables. Incluye soporte kickstand de aluminio desplegable para ver videos.',
        price: 52000,
        category: 'Ecosistema MagSafe',
        brand: 'Anker MagGo',
        stock: 22,
        sku: 'NOU-MAGBANK10K',
        image: 'https://images.unsplash.com/photo-1609592424379-455b7beea890?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Soporte de Auto MagSafe para Rejilla de Ventilación con Carga Rápida 15W',
        description: 'Imanes de neodimio de potencia industrial que soportan baches y frenadas bruscas sin desconectar tu equipo.',
        price: 36900,
        category: 'Ecosistema MagSafe',
        brand: 'Baseus Metal Car',
        stock: 28,
        sku: 'NOU-MAGCAR15W',
        image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Billetera Magnética Cardholder MagSafe de Cuero con Find My',
        description: 'Capacidad para 3 tarjetas protegidas contra RFID. Rastreo por la red Encontrar de Apple si la dejás olvidada.',
        price: 31500,
        category: 'Ecosistema MagSafe',
        brand: 'ESR Geo',
        stock: 30,
        sku: 'NOU-MAGWALLET',
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Vidrio Templado Spigen Glas.tR EZ Fit con Bandeja de Instalación Automática',
        description: 'Dureza 9H real con marco aplicador patentado: colocación en 10 segundos 100% alineada y sin ninguna burbuja.',
        price: 24900,
        category: 'Protección de Pantalla',
        brand: 'Spigen',
        stock: 50,
        sku: 'NOU-SPIGEAZFIT',
        image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Film Protector de Hidrogel Mate Antirreflejo y Anti-Huellas',
        description: 'Corte computarizado a medida para cualquier modelo de celular. Tacto sedoso gamer que no marca huellas dactilares.',
        price: 14500,
        category: 'Protección de Pantalla',
        brand: 'HydroGel Pro',
        stock: 80,
        sku: 'NOU-HYDROMATTE',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Protector de Lentes de Cámara de Cristal Zafiro Individuales (Set x 3)',
        description: 'Aros de titanio aeroespacial con cristal zafiro que no altera la calidad ni los destellos en fotografías nocturnas.',
        price: 18900,
        category: 'Protección de Pantalla',
        brand: 'Nout Shield',
        stock: 40,
        sku: 'NOU-CAMLENS3',
        image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Estación de Carga 3 en 1 Plegable Inalámbrica Qi2 15W',
        description: 'Carga simultánea de iPhone, Apple Watch y AirPods en un único soporte minimalista de aluminio anodizado.',
        price: 79900,
        category: 'Ecosistema MagSafe',
        brand: 'Nout Atelier',
        stock: 14,
        sku: 'NOU-STAND3IN1',
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Correa Silicona Deportiva Ocean Band para Apple Watch Ultra / 45mm',
        description: 'Elastómero de alto rendimiento moldeado en una estructura tubular con hebilla de titanio ajustable.',
        price: 22500,
        category: 'Fundas & Cases iPhone',
        brand: 'Nout Straps',
        stock: 35,
        sku: 'NOU-STRAPOCEAN',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Hub USB-C 7 en 1 HDMI 4K 60Hz + SD + PD 100W',
        description: 'Carcasa de aluminio disipador. Permite conectar pantalla externa, pendrives, mouse y memoria a tu tablet o notebook.',
        price: 49500,
        category: 'Cargadores & Hubs MFi',
        brand: 'Ugreen',
        stock: 20,
        sku: 'NOU-HUB7IN1',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Limpiador de Pantallas y Teclados Kit 5 en 1 Multifunción',
        description: 'Spray ecológico sin alcohol con paño de microfibra lavable integrado, cepillo de cerdas suaves y punta extractora de cera para auriculares.',
        price: 11900,
        category: 'Protección de Pantalla',
        brand: 'Nout Care',
        stock: 60,
        sku: 'NOU-CLEANKIT',
        image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=700&auto=format&fit=crop&q=80'
      }
    ]
  },

  'tecnomont': {
    categories: [
      { name: 'Placas de Video GPUs', slug: 'gpus', icon: '🎮' },
      { name: 'Procesadores y Placas Madre', slug: 'cpu-mother', icon: '🧠' },
      { name: 'Periféricos Competitivos', slug: 'perifericos', icon: '⌨️' },
      { name: 'Memorias RAM y SSDs NVMe', slug: 'almacenamiento', icon: '💾' },
      { name: 'Monitores y Fuentes Gold', slug: 'monitores-fuentes', icon: '🖥️' }
    ],
    products: [
      {
        name: 'Placa de Video Nvidia GeForce RTX 4070 Super 12GB GDDR6X Asus TUF Gaming',
        description: 'Diseño de triple ventilador Axial-tech, rodamientos de bolas dobles, certificación militar y disipador masivo de aluminio.',
        price: 995000,
        category: 'Placas de Video GPUs',
        brand: 'Asus TUF',
        stock: 7,
        sku: 'TEC-RTX4070S',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Placa de Video AMD Radeon RX 7800 XT 16GB Sapphire Pulse',
        description: '16GB de VRAM para jugar en 1440p y 4K sin restricciones de textura, arquitectura RDNA 3 y tecnología AMD FSR 3 con Frame Generation.',
        price: 780000,
        category: 'Placas de Video GPUs',
        brand: 'Sapphire',
        stock: 5,
        sku: 'TEC-RX7800XT',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Procesador AMD Ryzen 7 7800X3D 8 Cores 16 Threads con 3D V-Cache',
        description: 'El rey indiscutido del rendimiento en gaming competitivo. Socket AM5, hasta 5.0 GHz boost y 96MB de L3 cache masiva.',
        price: 610000,
        category: 'Procesadores y Placas Madre',
        brand: 'AMD',
        stock: 9,
        sku: 'TEC-R7-7800X3D',
        image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Motherboard Gigabyte B650 AORUS Elite AX AM5 DDR5 WiFi 6E',
        description: 'Fases de poder 14+2+1 VRM, soporte para SSD PCIe 5.0 M.2 con disipadores térmicos integrados y conectividad 2.5 GbE LAN.',
        price: 310000,
        category: 'Procesadores y Placas Madre',
        brand: 'Gigabyte Aorus',
        stock: 8,
        sku: 'TEC-B650AORUS',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Procesador Intel Core i7 14700K 20 Cores 28 Threads hasta 5.6 GHz',
        description: 'Rendimiento híbrido extremo para creación de contenido, streaming profesional en OBS y renderizado 3D multitarea sin caídas.',
        price: 575000,
        category: 'Procesadores y Placas Madre',
        brand: 'Intel',
        stock: 6,
        sku: 'TEC-I7-14700K',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Teclado Mecánico Custom Wooting 60HE+ Hall Effect Magnético Rapid Trigger',
        description: 'Switches magnéticos Lekker con punto de actuación configurable de 0.1mm a 4.0mm y función de disparo instantáneo Rapid Trigger.',
        price: 320000,
        category: 'Periféricos Competitivos',
        brand: 'Wooting',
        stock: 4,
        sku: 'TEC-WOOT60HE',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Mouse Gamer Ultralight Logitech G Pro X Superlight 2 Lightspeed 60g',
        description: 'Sensor Hero 2 de 32.000 DPI, switches ópticos-mecánicos híbridos Lightforce y polling rate de hasta 4000Hz por firmware.',
        price: 195000,
        category: 'Periféricos Competitivos',
        brand: 'Logitech G',
        stock: 14,
        sku: 'TEC-GPROX2',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Auriculares Inalámbricos Esports HyperX Cloud III Wireless 120hs Batería',
        description: 'Drivers angulados de 53mm calibrados para audición de pasos tácticos en CS2 y Valorant, estructura de aluminio y almohadillas memory foam.',
        price: 185000,
        category: 'Periféricos Competitivos',
        brand: 'HyperX',
        stock: 12,
        sku: 'TEC-CLOUD3WL',
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Memoria RAM DDR5 Corsair Vengeance RGB 32GB (2x16GB) 6000MHz CL30 EXPO/XMP',
        description: 'Latencias bajas optimizadas para Ryzen serie 7000/9000, disipador de aluminio negro con tira LED RGB difusa configurable por iCUE.',
        price: 189000,
        category: 'Memorias RAM y SSDs NVMe',
        brand: 'Corsair',
        stock: 15,
        sku: 'TEC-RAMD5-32',
        image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Disco Sólido SSD M.2 NVMe 2TB Kingston KC3000 PCIe 4.0 7000MB/s',
        description: 'Velocidad de lectura de 7000 MB/s y escritura de 7000 MB/s con controlador Phison E18 y disipador plano de grafeno.',
        price: 220000,
        category: 'Memorias RAM y SSDs NVMe',
        brand: 'Kingston',
        stock: 16,
        sku: 'TEC-KC3000-2TB',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Monitor Gamer 27" LG UltraGear 27GP850-B Nano IPS 180Hz 1ms QHD 1440p',
        description: 'Panel Nano IPS con cobertura 98% DCI-P3, compatible con Nvidia G-Sync y AMD FreeSync Premium Pro, soporte ergonómico pivotable.',
        price: 520000,
        category: 'Monitores y Fuentes Gold',
        brand: 'LG UltraGear',
        stock: 6,
        sku: 'TEC-LG27GP850',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Fuente de Poder Modular Corsair RM850e 850W 80 Plus Gold ATX 3.0 PCIe 5.0',
        description: 'Conector nativo 12VHPWR para placas serie RTX 4000, condensadores japoneses 105°C y modo de ventilador Zero RPM silencioso.',
        price: 210000,
        category: 'Monitores y Fuentes Gold',
        brand: 'Corsair',
        stock: 11,
        sku: 'TEC-RM850E',
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Water Cooler Líquido DeepCool LT720 360mm Radiador Triple',
        description: 'Bomba multidimensional con efecto espejo infinito RGB, microcanales de agua optimizados y tres ventiladores FK120 de alta presión estática.',
        price: 175000,
        category: 'Procesadores y Placas Madre',
        brand: 'DeepCool',
        stock: 8,
        sku: 'TEC-LT720-360',
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Gabinete Gamer Lian Li O11 Dynamic EVO Vidrio Templado Dual Chamber',
        description: 'Espacio masivo para 3 radiadores de 360mm simultáneos, configuración invertible de panel y gestión oculta de cables.',
        price: 245000,
        category: 'Monitores y Fuentes Gold',
        brand: 'Lian Li',
        stock: 7,
        sku: 'TEC-LIANLIO11',
        image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Mousepad Gamer Control Artisan Hayate Otsu FX Soft XL Wine Red',
        description: 'Importado de Japón: tejido especial con base de espuma Poron de densidad media que se adhiere como ventosa al escritorio.',
        price: 115000,
        category: 'Periféricos Competitivos',
        brand: 'Artisan Japan',
        stock: 6,
        sku: 'TEC-ARTISAN-XL',
        image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Micrófono USB Condensador Shure MV7X Podcasts & Streaming',
        description: 'Cápsula dinámica cardioide con aislamiento de voz profesional para rechazar el ruido ambiente y clics del teclado.',
        price: 295000,
        category: 'Periféricos Competitivos',
        brand: 'Shure',
        stock: 5,
        sku: 'TEC-SHUREMV7X',
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Pasta Térmica Arctic MX-6 Compuesto de Alto Rendimiento 4g',
        description: 'Fórmula basada en micropartículas de carbono no conductoras. Reduce hasta 4°C las temperaturas operativas de tu CPU o GPU.',
        price: 16500,
        category: 'Procesadores y Placas Madre',
        brand: 'Arctic',
        stock: 35,
        sku: 'TEC-ARCTICMX6',
        image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Brazo Hidráulico Articulado para Monitor North Bayou F80 17"-30"',
        description: 'Pistón a gas de movimiento suave, rotación 360°, soporte VESA 75x75 y 100x100 con organizador interno de cables.',
        price: 48000,
        category: 'Monitores y Fuentes Gold',
        brand: 'North Bayou',
        stock: 18,
        sku: 'TEC-NBF80',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=700&auto=format&fit=crop&q=80'
      }
    ]
  },

  'biuti': {
    categories: [
      { name: 'Blazers & Tapados Sastreros', slug: 'blazers', icon: '🧥' },
      { name: 'Camisas & Blusas de Seda', slug: 'camisas-blusas', icon: '👚' },
      { name: 'Pantalones & Palazzos Wide Leg', slug: 'pantalones', icon: '👖' },
      { name: 'Vestidos Midi & Casual Chic', slug: 'vestidos', icon: '👗' },
      { name: 'Sweaters de Cashmere & Abrigo', slug: 'tejidos', icon: '🧶' }
    ],
    products: [
      {
        name: 'Blazer Sastrero Oversize Lino Italiano Arena "Verona"',
        description: 'Confección sastrera impecable con lino europeo prelavado. Corte estructurado con hombreras suaves, forro de satén respirable y botones de carey natural.',
        price: 145000,
        category: 'Blazers & Tapados Sastreros',
        brand: 'Biuti Atelier',
        stock: 10,
        sku: 'BIU-BLZ-VERONA',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Tapado 7/8 Paño de Lana Merino con Cinturón "Milán"',
        description: 'Abrigo envolvente en 100% paño de lana merino pura con solapa smoking amplia y lazo desmontable para ceñir a gusto la silueta.',
        price: 240000,
        category: 'Blazers & Tapados Sastreros',
        brand: 'Biuti Atelier',
        stock: 6,
        sku: 'BIU-TAP-MILAN',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Blazer Smoking Creppe Sastrero Negro Azabache "Roma"',
        description: 'Un infaltable de fondo de armario para mujeres profesionales. Solapas en raso brillante sutil y calce al cuerpo refinado.',
        price: 135000,
        category: 'Blazers & Tapados Sastreros',
        brand: 'Biuti Atelier',
        stock: 12,
        sku: 'BIU-BLZ-ROMA',
        image: 'https://images.unsplash.com/photo-1548624149-f9b31d7be5df?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Camisa Clásica Poplín de Algodón Pima Blanco Puro "Capri"',
        description: 'Algodón pima peruano peinado de fibra larga con puños dobles y cuello camisero firme. Máxima suavidad y frescura al vestir.',
        price: 68000,
        category: 'Camisas & Blusas de Seda',
        brand: 'Biuti Collection',
        stock: 20,
        sku: 'BIU-CAM-CAPRI',
        image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Blusa de Satén de Seda con Cuello Halter Drapeado "Venecia"',
        description: 'Caída líquida elegante en tono visón champagne. Ideal para eventos ejecutivos, cenas o combinada con sastreros.',
        price: 74000,
        category: 'Camisas & Blusas de Seda',
        brand: 'Biuti Collection',
        stock: 15,
        sku: 'BIU-BLU-VENECIA',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Camisa Manga Globo Gasa Suiza Bordada Tono Marfil "Florencia"',
        description: 'Delicados calados florales en tono crudo sobre base ligera, botones forrados a tono y puños elastizados.',
        price: 79000,
        category: 'Camisas & Blusas de Seda',
        brand: 'Biuti Collection',
        stock: 14,
        sku: 'BIU-CAM-FLOR',
        image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Pantalón Sastrero Wide Leg Tiro Alto en Gabardina Liviana "Palermo"',
        description: 'Caída impecable con pinzas dobles delanteras, cintura limpia con botón interno y bolsillos laterales escondidos. Alarga la silueta con elegancia.',
        price: 89000,
        category: 'Pantalones & Palazzos Wide Leg',
        brand: 'Biuti Atelier',
        stock: 18,
        sku: 'BIU-PAN-PALERMO',
        image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Pantalón Palazzo Fluido Creppe Pesado Terracota "Siena"',
        description: 'Tiro medio-alto con caída con peso propio que no marca. Cintura elástica posterior para brindar confort durante toda la jornada laboral.',
        price: 82000,
        category: 'Pantalones & Palazzos Wide Leg',
        brand: 'Biuti Atelier',
        stock: 16,
        sku: 'BIU-PAL-SIENA',
        image: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Pantalón Cigarette Bi-Stretch de Corte Slim "Torino"',
        description: 'Largo tobillero con tajos laterales sutiles, tejido con 4% de elastano para máxima libertad de movimiento manteniendo la línea sastrera.',
        price: 76000,
        category: 'Pantalones & Palazzos Wide Leg',
        brand: 'Biuti Collection',
        stock: 22,
        sku: 'BIU-PAN-TORINO',
        image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Vestido Midi Cruzado Wrap Dress en Seda Lavada "Monaco"',
        description: 'Diseño cruzado envolvente que favorece todas las figuras con lazo regulable en cintura, escote en V refinado y falda con vuelo sutil.',
        price: 118000,
        category: 'Vestidos Midi & Casual Chic',
        brand: 'Biuti Signature',
        stock: 12,
        sku: 'BIU-VES-MONACO',
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Vestido Camisero Midi Poplín con Cinturón Corbatero "Amalfi"',
        description: 'Falda evasé con bolsillos reales, botones ocultos en cartera frontal y cinturón confeccionado en la misma tela para definir la cintura.',
        price: 99000,
        category: 'Vestidos Midi & Casual Chic',
        brand: 'Biuti Signature',
        stock: 14,
        sku: 'BIU-VES-AMALFI',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Vestido Tejido Midi en Rib Punto Inglés Crudo "Como"',
        description: 'Tejido tubular al cuerpo sin costuras molestas, cuello polera suave y mangas largas terminadas en puño ajustado. Confort y calidez total.',
        price: 105000,
        category: 'Vestidos Midi & Casual Chic',
        brand: 'Biuti Knits',
        stock: 11,
        sku: 'BIU-VES-COMO',
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Sweater Escote V en Hilado Tipo Cashmere Ultra Soft "Bari"',
        description: 'Tacto extra sedoso, corte relajado que no ajusta en la cadera y terminaciones finas en canalé en puños y bajo.',
        price: 78000,
        category: 'Sweaters de Cashmere & Abrigo',
        brand: 'Biuti Knits',
        stock: 16,
        sku: 'BIU-SWE-BARI',
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Cardigan Largo Tejido en Punto Arroz con Bolsillos Plaque "Pisa"',
        description: 'Ideal para usar abierto como tapado liviano en media estación, tejido con hilado blend hipoalergénico que no pica.',
        price: 88000,
        category: 'Sweaters de Cashmere & Abrigo',
        brand: 'Biuti Knits',
        stock: 13,
        sku: 'BIU-CAR-PISA',
        image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Polera Clásica Hilado Bremer Fino Negro Noche "Bologna"',
        description: 'El básico por excelencia de otoño-invierno: cuello doblado firme, calce anatómico y gran elasticidad que no deforma.',
        price: 62000,
        category: 'Sweaters de Cashmere & Abrigo',
        brand: 'Biuti Knits',
        stock: 25,
        sku: 'BIU-POL-BOLOG',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Pashmina Chalina 100% Lana Fina con Flecos Torzados "Cortina"',
        description: 'Medidas generosas 200cm x 75cm para envolver con distinción, tonalidad visón suave que combina con cualquier blazer.',
        price: 36000,
        category: 'Sweaters de Cashmere & Abrigo',
        brand: 'Biuti Accessories',
        stock: 30,
        sku: 'BIU-PASH-CORT',
        image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Cinturón Sastrero de Cuero Genuino con Hebilla Dorada Mate "Lucca"',
        description: 'Cuero vacuno legítimo de curtido vegetal con bordes redondeados y lustrados a mano en nuestro taller de Buenos Aires.',
        price: 32000,
        category: 'Blazers & Tapados Sastreros',
        brand: 'Biuti Cuero',
        stock: 24,
        sku: 'BIU-CIN-LUCCA',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Cartera Tote Bag Cuero Vacuno Graneado con Neceser Desmontable "Portofino"',
        description: 'Capacidad para notebook de hasta 14", manijas de hombro reforzadas con costura guarnicionera y herrajes de bronce pulido.',
        price: 165000,
        category: 'Blazers & Tapados Sastreros',
        brand: 'Biuti Cuero',
        stock: 8,
        sku: 'BIU-TOT-PORTOF',
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&auto=format&fit=crop&q=80'
      }
    ]
  },

  'todolisto': {
    categories: [
      { name: 'Cuadernos, Agendas & Planners', slug: 'cuadernos', icon: '📔' },
      { name: 'Escritura Fina & Marcadores', slug: 'escritura', icon: '✒️' },
      { name: 'Resmas & Papelería Escolar', slug: 'papeleria', icon: '📄' },
      { name: 'Artística, Lettering & Manualidades', slug: 'artistica', icon: '🎨' },
      { name: 'Insumos de Oficina & Archivo', slug: 'oficina', icon: '📎' }
    ],
    products: [
      {
        name: 'Resma de Papel A4 Autor 75g 500 Hojas Blanco Óptimo',
        description: 'Papel alcalino multiuso de fibra de caña de azúcar biodegradable. No se atasca en impresoras láser ni chorro de tinta.',
        price: 6800,
        category: 'Resmas & Papelería Escolar',
        brand: 'Autor Ledesma',
        stock: 120,
        sku: 'TOD-RESMA-A4',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Cuaderno Universitario Mooving A4 80 Hojas Rayado Tapa Dura',
        description: 'Espiral doble de alambre reforzado, hojas de 80 gramos microperforadas con carátula contenedora plástica.',
        price: 5400,
        category: 'Cuadernos, Agendas & Planners',
        brand: 'Mooving',
        stock: 70,
        sku: 'TOD-CUAD-MOOV',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Planner Ejecutivo Semanal Perpetuo Cuero Ecológico A5',
        description: 'Diseño sin fecha fija para arrancar en cualquier mes. Incluye bolsillo interno, elástico de cierre y cinta señaladora.',
        price: 18900,
        category: 'Cuadernos, Agendas & Planners',
        brand: 'TodoListo Studio',
        stock: 35,
        sku: 'TOD-PLAN-PERP',
        image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Set Marcadores Uni Posca Punta Cónica Media PC-5M (Caja x 8 colores)',
        description: 'Tinta a base de agua al agua permanente en superficies porosas y borrable en vidrio. Colores vibrantes de alto poder cubritivo.',
        price: 49500,
        category: 'Artística, Lettering & Manualidades',
        brand: 'Uni Posca',
        stock: 20,
        sku: 'TOD-POSCA-5M8',
        image: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Marcadores Resaltadores Stabilo Boss Original Pastel (Estuche x 6)',
        description: 'Tecnología antisecado que resiste 4 horas destapado sin secarse. Tonos pastel descansados para la vista al estudiar.',
        price: 14200,
        category: 'Escritura Fina & Marcadores',
        brand: 'Stabilo Boss',
        stock: 50,
        sku: 'TOD-STAB-PAST6',
        image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Bolígrafo Parker Jotter Clásico Acero Inoxidable con Clip Flecha',
        description: 'Ícono del diseño internacional con mecanismo retráctil de clic inconfundible y cartucho de tinta Quinkflow fluida.',
        price: 29800,
        category: 'Escritura Fina & Marcadores',
        brand: 'Parker',
        stock: 25,
        sku: 'TOD-PARK-JOTT',
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Lapiceras Rollerball Uniball Signo Gel 0.7mm Negra (Pack x 3 u)',
        description: 'Tinta de gel indeleble impermeable que protege contra fraudes documentales. Deslizamiento ultra suave sin saltos.',
        price: 8900,
        category: 'Escritura Fina & Marcadores',
        brand: 'Uniball',
        stock: 60,
        sku: 'TOD-UNISIG-3',
        image: 'https://images.unsplash.com/photo-1585336261026-77884fa6e45d?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Lápices de Colores Polychromos Faber-Castell (Lata x 24 colores)',
        description: 'Pigmentos de la más alta calidad con resistencia insuperable a la luz. Mina gruesa de 3.8mm resistente a la rotura.',
        price: 85000,
        category: 'Artística, Lettering & Manualidades',
        brand: 'Faber-Castell',
        stock: 12,
        sku: 'TOD-POLY-24',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Acuarelas Profesionales Winsor & Newton Cotman Compact Set x 14 1/2 Pastillas',
        description: 'Set portátil con paleta desmontable integrada, pincel de viaje y colores de excelente transparencia y poder tintóreo.',
        price: 62000,
        category: 'Artística, Lettering & Manualidades',
        brand: 'Winsor & Newton',
        stock: 15,
        sku: 'TOD-COTMAN-14',
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Cuaderno de Bocetos Sketchbook Canson XL Mix Media A4 300g Espiral',
        description: 'Papel de grano medio ideal para técnicas húmedas y secas: acuarela, acrílico, marcadores al alcohol y grafito.',
        price: 24500,
        category: 'Artística, Lettering & Manualidades',
        brand: 'Canson',
        stock: 30,
        sku: 'TOD-CANSON-XL',
        image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Abrochadora Metálica de Oficina MIT 50 Pinza 24/6',
        description: 'Estructura íntegramente metálica con capacidad para abrochar hasta 30 hojas de una sola pasada. Garantía de por vida.',
        price: 16800,
        category: 'Insumos de Oficina & Archivo',
        brand: 'MIT',
        stock: 45,
        sku: 'TOD-ABROC-MIT',
        image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Perforadora de 2 Agujeros Pesada Dasa para 40 Hojas con Guía',
        description: 'Cuchillas de acero templado autoafilables con depósito recolector de confeti plástico y regla centrada.',
        price: 21500,
        category: 'Insumos de Oficina & Archivo',
        brand: 'Dasa',
        stock: 28,
        sku: 'TOD-PERF-DASA',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Carpetas Tipo Bibliorato Lomo Ancho A4 Cartón Forrado PVC (Pack x 5)',
        description: 'Mecanismo palanca niquelado de máxima precisión, cantoneras metálicas de protección y tarjetero en el lomo.',
        price: 23500,
        category: 'Insumos de Oficina & Archivo',
        brand: 'The Pel',
        stock: 40,
        sku: 'TOD-BIBLIO-5',
        image: 'https://images.unsplash.com/photo-1568667256549-094345857637?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Notas Autoadhesivas Post-it 76x76mm Clásicas Amarillo Canario (Torre x 6 blocks)',
        description: 'El adhesivo original de 3M que pega y despega sin dejar residuos ni romper hojas ni documentos de trabajo.',
        price: 13900,
        category: 'Insumos de Oficina & Archivo',
        brand: '3M Post-it',
        stock: 65,
        sku: 'TOD-POSTIT-6',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Tijera Escolar y de Oficina Maped Sensoft 16cm Mangos Suaves',
        description: 'Hojas de acero inoxidable con punta redondeada de seguridad y aros anatómicos flexibles que amortiguan la presión de los dedos.',
        price: 4900,
        category: 'Resmas & Papelería Escolar',
        brand: 'Maped',
        stock: 80,
        sku: 'TOD-TIJ-MAPED',
        image: 'https://images.unsplash.com/photo-1503792501406-2c40da09e1e2?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Adhesivo en Barra Pritt 43g Original Sin Solventes Lavable',
        description: 'Fórmula a base de 97% de ingredientes naturales a base de almidón de papa. Seguro para los chicos y de pegado firme y limpio.',
        price: 4200,
        category: 'Resmas & Papelería Escolar',
        brand: 'Pritt Henkel',
        stock: 90,
        sku: 'TOD-PRITT-43',
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Plastificadora Térmica A4 Dasa con Rodillos de Calentamiento Rápido',
        description: 'Plastifica credenciales, menús y documentos en pouch térmico de 80 a 150 micrones con sistema antibloqueo manual.',
        price: 58000,
        category: 'Insumos de Oficina & Archivo',
        brand: 'Dasa Office',
        stock: 10,
        sku: 'TOD-PLAST-A4',
        image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Calculadora de Mesa Casio GX-12B 12 Dígitos Pantalla Extra Grande',
        description: 'Alimentación solar y a pila con función de porcentaje regular, margen de ganancia y teclas plásticas de pulsación rápida.',
        price: 26500,
        category: 'Insumos de Oficina & Archivo',
        brand: 'Casio',
        stock: 30,
        sku: 'TOD-CASIO-GX12',
        image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=700&auto=format&fit=crop&q=80'
      }
    ]
  },

  'lugonessilva': {
    categories: [
      { name: 'Cementos, Cales & Morteros', slug: 'cementos', icon: '🏗️' },
      { name: 'Hierros Estructurales & Mallas', slug: 'hierros', icon: '⛓️' },
      { name: 'Ladrillos & Bloques Cerámicos', slug: 'ladrillos', icon: '🧱' },
      { name: 'Áridos & Suelos por Metro', slug: 'aridos', icon: '🚛' },
      { name: 'Impermeabilizantes & Aislaciones', slug: 'impermeabilizacion', icon: '💧' }
    ],
    products: [
      {
        name: 'Cemento Portland Loma Negra CPC 40 en Bolsa x 50kg',
        description: 'El cemento de mayor confiabilidad en el país para estructuras sismorresistentes, hormigón armado, losas, vigas y pavimentos de alta exigencia.',
        price: 9800,
        category: 'Cementos, Cales & Morteros',
        brand: 'Loma Negra',
        stock: 350,
        sku: 'LUG-CEM-LN50',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Cal Hidráulica Milagro Hidratada en Bolsa x 30kg',
        description: 'Excelente plasticidad y retención de agua para revoques gruesos, finos y asentamiento de mampostería tradicional.',
        price: 4900,
        category: 'Cementos, Cales & Morteros',
        brand: 'El Milagro',
        stock: 280,
        sku: 'LUG-CAL-MIL30',
        image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Plasticor Mortero para Asiento de Mampostería Loma Negra x 40kg',
        description: 'Ligante hidráulico listo para mezclar únicamente con arena y agua. Menor retracción y alta trabajabilidad.',
        price: 7600,
        category: 'Cementos, Cales & Morteros',
        brand: 'Loma Negra',
        stock: 220,
        sku: 'LUG-PLAST-40',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Barra de Hierro Conformado ADN 420 12mm x 12 metros Acindar',
        description: 'Acero de dureza natural con nervaduras de gran adherencia mecánica al hormigón. Certificación IRAM-IAS U 500-528.',
        price: 15400,
        category: 'Hierros Estructurales & Mallas',
        brand: 'Acindar',
        stock: 400,
        sku: 'LUG-HIE-12MM',
        image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Barra de Hierro Conformado ADN 420 8mm x 12 metros Acindar',
        description: 'Ideal para estribos, encadenados y losas alivianadas. Máxima ductilidad para doblado en obra.',
        price: 7100,
        category: 'Hierros Estructurales & Mallas',
        brand: 'Acindar',
        stock: 550,
        sku: 'LUG-HIE-8MM',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Malla Electrosoldada Cima 15x15 4.2mm (Panel 2.00m x 3.00m)',
        description: 'Acero trefilado de alta resistencia soldado en cada cruce por electrosoldadura. Para contrapisos y plateas de fundación.',
        price: 21900,
        category: 'Hierros Estructurales & Mallas',
        brand: 'Acindar',
        stock: 140,
        sku: 'LUG-MAL-1515',
        image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Alambre de Fardo Negro Recocido Nº 16 x Rollo 10kg',
        description: 'Tratado térmicamente en hornos continuos para un atado rápido de armaduras sin fatiga de rotura.',
        price: 28500,
        category: 'Hierros Estructurales & Mallas',
        brand: 'Acindar',
        stock: 90,
        sku: 'LUG-ALAM-16',
        image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Ladrillo Hueco Cerámico 12x18x33 8 Tubos Pallet x 144 u',
        description: 'Arcilla cocida de primera calidad para muros divisorios interiores y cerramientos térmicos eficientes.',
        price: 94000,
        category: 'Ladrillos & Bloques Cerámicos',
        brand: 'Cerámica Fanelli',
        stock: 60,
        sku: 'LUG-LAD-1218',
        image: 'https://images.unsplash.com/photo-1584463699042-45a764d84c6c?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Ladrillo Hueco Cerámico Portante 18x19x33 Pallet x 108 u',
        description: 'Capacidad portante para soportar losas directas sin necesidad de columnas tradicionales intermedias.',
        price: 118000,
        category: 'Ladrillos & Bloques Cerámicos',
        brand: 'Cerámica Fanelli',
        stock: 45,
        sku: 'LUG-LAD-PORT',
        image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f6?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Bloque de Hormigón Gris Tradicional 20x20x40 Vibrocomprimido',
        description: 'Curado a vapor con aristas rectas y granulometría homogénea para muros vistos perimetrales o de contención.',
        price: 1450,
        category: 'Ladrillos & Bloques Cerámicos',
        brand: 'Bloquera del Sur',
        stock: 500,
        sku: 'LUG-BLQ-2020',
        image: 'https://images.unsplash.com/photo-1584463699042-45a764d84c6c?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Arena Fina de Río Lavada por Bolsón Big Bag 1m3',
        description: 'Libre de arcillas e impurezas orgánicas, ideal para revoques finos y mezclas de mortero de terminación lisa.',
        price: 36000,
        category: 'Áridos & Suelos por Metro',
        brand: 'Cantera Propia',
        stock: 80,
        sku: 'LUG-ARE-FINA1M',
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Piedra Partida Granítica 6-20mm por Bolsón Big Bag 1m3',
        description: 'Árido de trituración primaria y secundaria con granulometría graduada para elaboración de hormigón armado estructural.',
        price: 48000,
        category: 'Áridos & Suelos por Metro',
        brand: 'Canteras Tandil',
        stock: 70,
        sku: 'LUG-PIE-6201M',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Cascote Picado y Limpio por Camión Volquete 5m3',
        description: 'Para contrapisos bajo losa y rellenos niveladores sin basura ni restos de yeso perjudiciales para la cal.',
        price: 110000,
        category: 'Áridos & Suelos por Metro',
        brand: 'Lugones Silva Directo',
        stock: 30,
        sku: 'LUG-CAS-5M3',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Tierra Negra Abonada y Zarandeada por Bolsón 1m3',
        description: 'Rica en materia orgánica y nutrientes, perfecta para relleno de jardines, nivelación de patios y césped.',
        price: 34000,
        category: 'Áridos & Suelos por Metro',
        brand: 'Cantera San Vicente',
        stock: 50,
        sku: 'LUG-TIE-NEG1M',
        image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Membrana Asfáltica Megaflex No Crack 40kg con Aluminio Flexible 4mm',
        description: 'Asfalto plástico con polímeros y alma central de polietileno de alta densidad. Protección total contra filtraciones en techos planos e inclinados.',
        price: 54000,
        category: 'Impermeabilizantes & Aislaciones',
        brand: 'Megaflex',
        stock: 85,
        sku: 'LUG-MEM-40NC',
        image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=700&auto=format&fit=crop&q=80',
        featured: true
      },
      {
        name: 'Pintura Asfáltica Base Solvente Ormiflex 18 Litros',
        description: 'Imprimación líquida de secado ultrarrápido para preparar superficies porosas antes de colocar membranas asfálticas.',
        price: 38500,
        category: 'Impermeabilizantes & Aislaciones',
        brand: 'Ormiflex',
        stock: 65,
        sku: 'LUG-ORM-18L',
        image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Hidrófugo Químico Líquido Sika 1 x Balde 20kg',
        description: 'Aditivo inorgánico obturador de poros para morteros impermeables en revoques de fachadas, sótanos y tanques de agua.',
        price: 29000,
        category: 'Impermeabilizantes & Aislaciones',
        brand: 'Sika',
        stock: 75,
        sku: 'LUG-SIKA1-20',
        image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=700&auto=format&fit=crop&q=80'
      },
      {
        name: 'Lana de Vidrio Isover con Aluminio 50mm Rollo (1.20m x 12.00m)',
        description: 'Aislante termoacústico incombustible con barrera de vapor de aluminio para techos de chapa y cielorrasos suspendidos.',
        price: 49500,
        category: 'Impermeabilizantes & Aislaciones',
        brand: 'Isover Saint-Gobain',
        stock: 40,
        sku: 'LUG-ISOVER-ALU',
        image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=700&auto=format&fit=crop&q=80'
      }
    ]
  }
};
