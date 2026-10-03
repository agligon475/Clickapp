// scratch/test_rubro_catalogs.js

const SUBRUBRO_PRODUCTS_MAP = {
  // 1. SÚPER
  'supermercado': [
    { id: 'p1', name: 'Aceite de Girasol 1.5L', price: 2450, stock: 35, cat: 'Almacén y Secos', emoji: '🌻', desc: 'Aceite puro de girasol primera marca. Botella 1.5L' },
    { id: 'p2', name: 'Leche Entera Larga Vida 1L', price: 1380, stock: 48, cat: 'Frescos y Lácteos', emoji: '🥛', desc: 'Leche entera fortificada con calcio y vitaminas. Tetra 1L' },
    { id: 'p3', name: 'Fideos Guiseros Tirabuzón 500g', price: 1200, stock: 60, cat: 'Almacén y Secos', emoji: '🍝', desc: 'Fideos secos de sémola de trigo candeal.' },
    { id: 'p4', name: 'Agua Mineral sin Gas 2L', price: 950, stock: 50, cat: 'Bebidas', emoji: '💧', desc: 'Agua mineral natural de manantial.' },
    { id: 'p5', name: 'Lavandina Concentrada 1L', price: 1100, stock: 40, cat: 'Limpieza', emoji: '🧴', desc: 'Lavandina desinfectante multiuso de alto rendimiento.' },
    { id: 'p6', name: 'Jabón de Tocador Cremoso 3x90g', price: 1850, stock: 25, cat: 'Perfumería e Higiene', emoji: '🧼', desc: 'Pack x3 unidades con crema hidratante.' }
  ],
  'conveniencia': [
    { id: 'p1', name: 'Papas Fritas Clásicas 140g', price: 2300, stock: 30, cat: 'Snacks y Galletitas', emoji: '🥔', desc: 'Papas fritas crocantes sabor original.' },
    { id: 'p2', name: 'Gaseosa Cola 500ml', price: 1500, stock: 45, cat: 'Bebidas Frías', emoji: '🥤', desc: 'Bebida cola bien fría lista para consumir.' },
    { id: 'p3', name: 'Barra de Chocolate con Leche 80g', price: 2100, stock: 25, cat: 'Golosinas y Chocolates', emoji: '🍫', desc: 'Chocolate con leche con trozos de avellanas.' },
    { id: 'p4', name: 'Galletitas Rellenas de Chocolate', price: 1450, stock: 35, cat: 'Snacks y Galletitas', emoji: '🍪', desc: 'Galletitas dulces rellenas con doble crema.' },
    { id: 'p5', name: 'Sándwich de Miga Jamón y Queso', price: 2900, stock: 15, cat: 'Comidas Rápidas / Listo para Llevar', emoji: '🥪', desc: 'Sándwich triple fresco del día en pan de miga.' },
    { id: 'p6', name: 'Bebida Energizante 473ml', price: 2200, stock: 40, cat: 'Bebidas Frías', emoji: '⚡', desc: 'Lata de energizante clásica bien helada.' }
  ],
  'almacen': [
    { id: 'p1', name: 'Arroz Largo Fino 1kg', price: 1950, stock: 40, cat: 'Fideos y Arroz', emoji: '🍚', desc: 'Arroz blanco no se pasa ni se pega. Paquete 1kg.' },
    { id: 'p2', name: 'Fideos Spaghetti 500g', price: 1250, stock: 50, cat: 'Fideos y Arroz', emoji: '🍝', desc: 'Fideos secos al huevo de excelente calidad.' },
    { id: 'p3', name: 'Puré de Tomate 520g', price: 890, stock: 60, cat: 'Aceites y Enlatados', emoji: '🥫', desc: 'Puré de tomate seleccionado sin conservantes.' },
    { id: 'p4', name: 'Queso Cremoso (por 250g)', price: 2400, stock: 20, cat: 'Lácteos y Fiambres', emoji: '🧀', desc: 'Queso cremoso suave ideal para pizzas y tartas.' },
    { id: 'p5', name: 'Pan Lactal Familiar 550g', price: 2100, stock: 18, cat: 'Panadería y Galletitas', emoji: '🍞', desc: 'Pan de mesa suave y esponjoso para tostadas.' },
    { id: 'p6', name: 'Gaseosa Lima Limón 2.25L', price: 2700, stock: 30, cat: 'Bebidas', emoji: '🥤', desc: 'Gaseosa refrescante tamaño familiar.' }
  ],
  'dietetica': [
    { id: 'p1', name: 'Mix Frutos Secos Premium 250g', price: 3600, stock: 20, cat: 'Frutos Secos y Semillas', emoji: '🥜', desc: 'Nueces, almendras, castañas de cajú y pasas de uva.' },
    { id: 'p2', name: 'Harina de Almendras 500g', price: 4800, stock: 15, cat: 'Harinas e Integrales', emoji: '🌾', desc: 'Harina 100% almendras pura, keto y sin gluten.' },
    { id: 'p3', name: 'Granola Artesanal con Miel 500g', price: 3100, stock: 25, cat: 'Legumbres y Cereales', emoji: '🥣', desc: 'Avena crocante, semillas, coco y miel pura de campo.' },
    { id: 'p4', name: 'Galletitas de Arroz y Chocolate Sin TACC', price: 1900, stock: 30, cat: 'Productos Sin TACC / Veganos', emoji: '🍘', desc: 'Snack ligero bañado en chocolate semiamargo.' },
    { id: 'p5', name: 'Semillas de Chía Orgánicas 250g', price: 1600, stock: 25, cat: 'Frutos Secos y Semillas', emoji: '🌱', desc: 'Semillas de chía ricas en Omega 3 y fibra.' },
    { id: 'p6', name: 'Miel Pura de Monte 500g', price: 3200, stock: 18, cat: 'Suplementos', emoji: '🍯', desc: 'Miel cruda de flores silvestres 100% natural.' }
  ],
  'verduleria': [
    { id: 'p1', name: 'Bananas Cavendish (por kg)', price: 1800, stock: 35, cat: 'Frutas de Estación', emoji: '🍌', desc: 'Bananas ecuatorianas dulces en su punto justo de maduración.' },
    { id: 'p2', name: 'Manzanas Rojas Elegidas (por kg)', price: 2100, stock: 30, cat: 'Frutas de Estación', emoji: '🍎', desc: 'Manzanas rojas crocantes y jugosas de Río Negro.' },
    { id: 'p3', name: 'Tomates Perita Seleccionados (por kg)', price: 1700, stock: 40, cat: 'Hortalizas', emoji: '🍅', desc: 'Tomates frescos y carnosos ideales para ensalada y salsa.' },
    { id: 'p4', name: 'Papas Negras Cepilladas (por 2kg)', price: 1600, stock: 50, cat: 'Tubérculos y Raíces', emoji: '🥔', desc: 'Papas ideales para freír o hacer puré cremoso.' },
    { id: 'p5', name: 'Planta de Lechuga Mantecosa', price: 950, stock: 25, cat: 'Verduras de Hoja', emoji: '🥬', desc: 'Lechuga fresca recién cosechada de huerta.' },
    { id: 'p6', name: 'Paltas Hass Maduras (x 2 unidades)', price: 3200, stock: 20, cat: 'Hortalizas', emoji: '🥑', desc: 'Paltas cremosas listas para consumir.' }
  ],

  // 2. FARMACIAS
  'farmacia': [
    { id: 'p1', name: 'Ibuprofeno 400mg x 10 comp.', price: 1850, stock: 40, cat: 'Medicamentos Venta Libre', emoji: '💊', desc: 'Analgésico y antiinflamatorio para dolores leves a moderados.' },
    { id: 'p2', name: 'Paracetamol 500mg x 16 comp.', price: 1650, stock: 45, cat: 'Medicamentos Venta Libre', emoji: '💊', desc: 'Antifebril y analgésico de rápida acción.' },
    { id: 'p3', name: 'Alcohol en Gel Sanitizante 250ml', price: 1400, stock: 50, cat: 'Primeros Auxilios', emoji: '🧴', desc: 'Alcohol etílico al 70% con glicerina humectante.' },
    { id: 'p4', name: 'Curitas Adhesivas x 20 unidades', price: 1100, stock: 35, cat: 'Primeros Auxilios', emoji: '🩹', desc: 'Tiras adhesivas flexibles y respirables.' },
    { id: 'p5', name: 'Protector Solar FPS 50+ 200ml', price: 14500, stock: 15, cat: 'Cuidado de la Piel / Dermocosmética', emoji: '☀️', desc: 'Protector solar amplio espectro UVA/UVB resistente al agua.' },
    { id: 'p6', name: 'Dentífrico Total Blanqueador 90g', price: 2300, stock: 30, cat: 'Cuidado Bucal', emoji: '🪥', desc: 'Crema dental con flúor protección anticaries 24hs.' }
  ],
  'perfumeria': [
    { id: 'p1', name: 'Eau de Parfum Floral 50ml', price: 38000, stock: 8, cat: 'Fragancias Femeninas', emoji: '🌸', desc: 'Fragancia elegante con notas de jazmín y vainilla.' },
    { id: 'p2', name: 'Eau de Toilette Amaderado 100ml', price: 42000, stock: 6, cat: 'Fragancias Masculinas', emoji: '✨', desc: 'Aroma fresco y duradero con acordes de cedro y bergamota.' },
    { id: 'p3', name: 'Sérum Facial Ácido Hialurónico 30ml', price: 16800, stock: 12, cat: 'Cremas y Cuidado Facial', emoji: '💧', desc: 'Hidratación profunda y efecto tensor inmediato.' },
    { id: 'p4', name: 'Máscara Capilar Nutritiva 300g', price: 8900, stock: 20, cat: 'Cuidado Capilar', emoji: '💆', desc: 'Tratamiento intensivo con óleo de argán para cabello seco.' },
    { id: 'p5', name: 'Máscara de Pestañas Waterproof', price: 7500, stock: 18, cat: 'Maquillaje', emoji: '👁️', desc: 'Volumen extremo y larga duración a prueba de agua.' },
    { id: 'p6', name: 'Crema Hidratante Facial con Vitamina C', price: 12500, stock: 15, cat: 'Cremas y Cuidado Facial', emoji: '🍊', desc: 'Aporta luminosidad y unifica el tono de la piel.' }
  ],
  'optica': [
    { id: 'p1', name: 'Anteojos de Sol Polarizados Classic', price: 45000, stock: 10, cat: 'Anteojos de Sol', emoji: '🕶️', desc: 'Protección UV400 total con marco de acetato resistente.' },
    { id: 'p2', name: 'Armazón Flexible Ultraliviano', price: 38000, stock: 8, cat: 'Marcos / Armazones', emoji: '👓', desc: 'Marco unisex ergonómico apto para cristales graduados.' },
    { id: 'p3', name: 'Lentes de Contacto Mensuales (Par)', price: 22000, stock: 15, cat: 'Lentes de Contacto', emoji: '👁️', desc: 'Hidratación superior y alta permeabilidad al oxígeno.' },
    { id: 'p4', name: 'Solución Multipropósito 360ml', price: 9500, stock: 25, cat: 'Soluciones de Limpieza', emoji: '🧴', desc: 'Limpia, desinfecta y conserva lentes de contacto.' },
    { id: 'p5', name: 'Spray Antiempañante + Paño Microfibra', price: 4200, stock: 30, cat: 'Accesorios', emoji: '✨', desc: 'Kit de limpieza premium para todo tipo de cristales.' },
    { id: 'p6', name: 'Estuche Rígido con Cierre Reforzado', price: 5800, stock: 20, cat: 'Accesorios', emoji: '👝', desc: 'Protección total contra caídas y rayaduras.' }
  ],
  'salud-natural': [
    { id: 'p1', name: 'Espirulina en Cápsulas x 60', price: 7800, stock: 20, cat: 'Suplementos Naturales', emoji: '🌿', desc: 'Superalimento rico en proteínas, hierro y antioxidantes.' },
    { id: 'p2', name: 'Té Verde en Hebras Orgánico 100g', price: 3400, stock: 30, cat: 'Infusiones y Tés', emoji: '🍵', desc: 'Blend antioxidante y energizante natural.' },
    { id: 'p3', name: 'Aceite Esencial Puro de Lavanda 10ml', price: 5200, stock: 15, cat: 'Aceites Esenciales', emoji: '🪻', desc: '100% puro y natural para aromaterapia y relajación.' },
    { id: 'p4', name: 'Aceite de Coco Neutro 500ml', price: 8900, stock: 18, cat: 'Productos Orgánicos', emoji: '🥥', desc: 'Ideal para cocina saludable y cuidado de piel/pelo.' },
    { id: 'p5', name: 'Tintura Madre de Propóleo 60ml', price: 4100, stock: 25, cat: 'Suplementos Naturales', emoji: '🍯', desc: 'Refuerzo inmunológico natural antibacteriano.' },
    { id: 'p6', name: 'Jabón Artesanal de Caléndula y Avena', price: 2600, stock: 35, cat: 'Cuidado Corporal Natural', emoji: '🧼', desc: 'Humectación suave sin sulfatos ni parabenos.' }
  ],

  // 3. BEBIDAS
  'distribuidora': [
    { id: 'p1', name: 'Pack Cerveza Rubia 24 x 473ml', price: 36000, stock: 20, cat: 'Cervezas por Pack', emoji: '🍺', desc: 'Caja cerrada de 24 latas de cerveza lager premium.' },
    { id: 'p2', name: 'Pack Gaseosa Cola 6 x 2.25L', price: 16200, stock: 30, cat: 'Gaseosas y Aguas', emoji: '🥤', desc: 'Pack x6 botellas tamaño familiar.' },
    { id: 'p3', name: 'Pack Agua Mineral con Gas 6 x 2L', price: 5400, stock: 40, cat: 'Gaseosas y Aguas', emoji: '💧', desc: 'Pack x6 botellas de agua con gas natural.' },
    { id: 'p4', name: 'Caja Vino Malbec Clásico 6 x 750ml', price: 24000, stock: 15, cat: 'Vinos y Espumantes', emoji: '🍷', desc: 'Caja x6 botellas de vino tinto mendocino.' },
    { id: 'p5', name: 'Fernet Clásico 750ml (Caja x6)', price: 58000, stock: 10, cat: 'Bebidas Blancas / Destilados', emoji: '🍾', desc: 'Caja mayorista cerrada de aperitivo digestivo.' },
    { id: 'p6', name: 'Vasos Plásticos Descartables 500ml (x 100)', price: 6800, stock: 25, cat: 'Varios / Desechables', emoji: '🥛', desc: 'Vasos transparentes resistentes para eventos.' }
  ],
  'licoreria': [
    { id: 'p1', name: 'Gin Artesanal Premium 750ml', price: 17500, stock: 15, cat: 'Destilados', emoji: '🍸', desc: 'Destilado con botánicos patagónicos y enebro silvestre.' },
    { id: 'p2', name: 'Fernet Clásico 750ml', price: 10500, stock: 24, cat: 'Licores y Aperitivos', emoji: '🌿', desc: 'El aperitivo tradicional de hierbas aromáticas.' },
    { id: 'p3', name: 'Whisky Escocés 12 Años 750ml', price: 48000, stock: 8, cat: 'Destilados', emoji: '🥃', desc: 'Single malt con notas de roble, vainilla y frutos secos.' },
    { id: 'p4', name: 'Vodka Importado 700ml', price: 14200, stock: 18, cat: 'Destilados', emoji: '🧊', desc: 'Vodka destilado 5 veces de máxima pureza.' },
    { id: 'p5', name: 'Vermut Rosso Artesanal 750ml', price: 8400, stock: 20, cat: 'Licores y Aperitivos', emoji: '🍷', desc: 'Aperitivo a base de vino macerado con hierbas.' },
    { id: 'p6', name: 'Agua Tónica Botánicos 4 x 200ml', price: 4600, stock: 25, cat: 'Coctelería y Insumos', emoji: '🍋', desc: 'Four pack de agua tónica premium con quinina natural.' }
  ],
  'vinoteca': [
    { id: 'p1', name: 'Vino Malbec Gran Reserva 750ml', price: 16500, stock: 18, cat: 'Vinos Tintos', emoji: '🍷', desc: 'Vino tinto con 12 meses de crianza en barrica de roble.' },
    { id: 'p2', name: 'Vino Cabernet Franc Reserva 750ml', price: 14800, stock: 14, cat: 'Vinos Tintos', emoji: '🍇', desc: 'Elegante, especiado con taninos sedosos y gran final.' },
    { id: 'p3', name: 'Vino Chardonnay Orgánico 750ml', price: 11200, stock: 16, cat: 'Vinos Blancos y Rosados', emoji: '🥂', desc: 'Blanco fresco y untuoso con notas de frutas tropicales.' },
    { id: 'p4', name: 'Espumante Extra Brut Método Tradicional', price: 15900, stock: 20, cat: 'Espumantes y Cava', emoji: '🍾', desc: 'Burbujas finas y persistentes, ideal para brindis.' },
    { id: 'p5', name: 'Blend de Altura Icono 750ml', price: 34000, stock: 6, cat: 'Ediciones Especiales / Premium', emoji: '👑', desc: 'Edición limitada numerada de viñedos centenarios.' },
    { id: 'p6', name: 'Descorchador Eléctrico Recargable', price: 21500, stock: 10, cat: 'Accesorios para Vino', emoji: '🎁', desc: 'Incluye corta cápsulas y cable de carga USB.' }
  ],
  'cerveceria': [
    { id: 'p1', name: 'Recarga Growler 1.9L - IPA Patagónica', price: 6800, stock: 20, cat: 'Cervezas Tiradas / Recargas', emoji: '🍺', desc: 'Cerveza aromática con intenso sabor a lúpulo cítrico.' },
    { id: 'p2', name: 'Recarga Growler 1.9L - Honey Ale', price: 6400, stock: 20, cat: 'Cervezas Tiradas / Recargas', emoji: '🍯', desc: 'Cerveza dorada suave con un toque dulce de miel natural.' },
    { id: 'p3', name: 'Lata Cerveza Stout con Cacao 473ml', price: 2600, stock: 30, cat: 'Latas / Botellas Artesanales', emoji: '🍫', desc: 'Cerveza negra cremosa con notas tostadas de café y cacao.' },
    { id: 'p4', name: 'Degustación Pack x 4 Latas Variadas', price: 9800, stock: 15, cat: 'Packs / Promos', emoji: '🍻', desc: 'Incluye 1 IPA, 1 Honey, 1 Golden y 1 Red Ale.' },
    { id: 'p5', name: 'Picada Cervecera Individual con Papas', price: 8500, stock: 12, cat: 'Picadas y Comida', emoji: '🍟', desc: 'Salchichas ahumadas, queso cheddar, dados de jamón y fritas.' },
    { id: 'p6', name: 'Vaso Cervecero Pinta Grabado 500ml', price: 4200, stock: 25, cat: 'Merchandising / Cristalería', emoji: '🥛', desc: 'Cristal templado con logo impreso para la mejor espuma.' }
  ],

  // 4. KIOSCOS
  'kiosco': [
    { id: 'p1', name: 'Alfajor Triple Chocolate y Dulce de Leche', price: 1200, stock: 50, cat: 'Golosinas y Chocolates', emoji: '🍫', desc: 'Alfajor clásico bañado en chocolate semiamargo.' },
    { id: 'p2', name: 'Gomitas Frutales Tipo Osito 100g', price: 750, stock: 40, cat: 'Golosinas y Chocolates', emoji: '🐻', desc: 'Gomitas masticables azucaradas con jugo de frutas.' },
    { id: 'p3', name: 'Caramelos Masticables Frutales (por 100g)', price: 550, stock: 35, cat: 'Golosinas y Chocolates', emoji: '🍬', desc: 'Surtido frutal de frutilla, naranja, limón y uva.' },
    { id: 'p4', name: 'Papas Fritas Lisas 90g', price: 1600, stock: 30, cat: 'Galletitas y Snacks', emoji: '🥔', desc: 'Papas fritas saladas crujientes.' },
    { id: 'p5', name: 'Gaseosa Cola Lata 354ml', price: 1300, stock: 45, cat: 'Bebidas Frías', emoji: '🥤', desc: 'Lata bien helada.' },
    { id: 'p6', name: 'Chicles Mentolados sin Azúcar', price: 600, stock: 60, cat: 'Cigarrillos y Tabaco', emoji: '🌿', desc: 'Pastillas para aliento fresco.' }
  ],
  'tabaqueria': [
    { id: 'p1', name: 'Tabaco para Armar Blend Virginia 30g', price: 4200, stock: 25, cat: 'Tabacos para Armar', emoji: '🍂', desc: 'Tabaco natural seleccionado sin aditivos químicos.' },
    { id: 'p2', name: 'Papelillos / Sedas de Cáñamo 1 1/4', price: 950, stock: 50, cat: 'Sedas y Filtros', emoji: '📜', desc: 'Papel ultrafino de combustión lenta x 50 hojas.' },
    { id: 'p3', name: 'Filtros de Acetato Slim x 120 unid.', price: 1400, stock: 40, cat: 'Sedas y Filtros', emoji: '⚪', desc: 'Filtros para armado regular.' },
    { id: 'p4', name: 'Armadora Metálica de Cigarrillos', price: 3800, stock: 15, cat: 'Accesorios', emoji: '⚙️', desc: 'Máquina de rolado fácil y uniforme.' },
    { id: 'p5', name: 'Encendedor Recargable Tipo Soplete', price: 3200, stock: 20, cat: 'Accesorios', emoji: '🔥', desc: 'Llama turbo antiviento regulable.' },
    { id: 'p6', name: 'Pipa de Madera Clásica Pulida', price: 12500, stock: 8, cat: 'Pipas y Habanos', emoji: '🪵', desc: 'Pipa artesanal con boquilla desmontable.' }
  ],
  'libreria-kiosco': [
    { id: 'p1', name: 'Cuaderno Universitario Rayado 80 Hojas', price: 3200, stock: 30, cat: 'Artículos Escolares', emoji: '📓', desc: 'Tapa semirrígida espiralada con hojas microperforadas.' },
    { id: 'p2', name: 'Resma Hojas A4 75g (500 hojas)', price: 6900, stock: 25, cat: 'Papelería y Hojas', emoji: '📄', desc: 'Papel multiuso para impresiones y fotocopias.' },
    { id: 'p3', name: 'Set de Resaltadores Pastel x 4', price: 3800, stock: 20, cat: 'Útiles de Oficina', emoji: '🖍️', desc: 'Colores suaves que no traspasan la hoja.' },
    { id: 'p4', name: 'Bolígrafos de Tinta Gel Negra x 3', price: 2100, stock: 35, cat: 'Útiles de Oficina', emoji: '🖊️', desc: 'Trazo fluido de 0.7mm de secado rápido.' },
    { id: 'p5', name: 'Caja de Lápices de Colores x 24', price: 4900, stock: 18, cat: 'Artículos Escolares', emoji: '✏️', desc: 'Lápices de madera suave con mina resistente.' },
    { id: 'p6', name: 'Carpeta Escolar N°3 con 3 Anillos', price: 4100, stock: 15, cat: 'Fotocopias e Impresiones', emoji: '📁', desc: 'Carpeta forrada con diseño moderno.' }
  ],

  // 5. CAFÉ & DELI
  'cafeteria': [
    { id: 'p1', name: 'Café Latte con Arte Latte', price: 3200, stock: 100, cat: 'Bebidas Calientes', emoji: '☕', desc: 'Espresso doble con leche texturizada cremosa.' },
    { id: 'p2', name: 'Cappuccino Especial con Canela', price: 3400, stock: 100, cat: 'Bebidas Calientes', emoji: '☕', desc: 'Espresso, leche vaporizada y abundante espuma con canela.' },
    { id: 'p3', name: 'Iced Caramel Macchiato', price: 3900, stock: 100, cat: 'Bebidas Frías / Iced Coffee', emoji: '🧊', desc: 'Café frío con leche, vainilla y salsa de caramelo casero.' },
    { id: 'p4', name: 'Croissant Relleno de Almendras', price: 2800, stock: 20, cat: 'Pastelería Dulce', emoji: '🥐', desc: 'Masa hojaldrada francesa horneada con crema frangipane.' },
    { id: 'p5', name: 'Tostón de Masa Madre con Palta y Huevo', price: 5200, stock: 15, cat: 'Opciones Saladas / Sándwiches', emoji: '🥑', desc: 'Pan de masa madre tostado con palta pisada y huevo poché.' },
    { id: 'p6', name: 'Café en Grano Colombia 250g', price: 11500, stock: 12, cat: 'Café en Grano / Molido', emoji: '☕', desc: 'Notas a caramelo, frutos rojos y acidez brillante.' }
  ],
  'panaderia': [
    { id: 'p1', name: 'Docena de Medialunas de Manteca', price: 5200, stock: 15, cat: 'Facturas y Medialunas', emoji: '🥐', desc: 'Medialunas esponjosas con almíbar artesanal recién salidas del horno.' },
    { id: 'p2', name: 'Docena de Facturas Surtidas', price: 5800, stock: 12, cat: 'Facturas y Medialunas', emoji: '🧁', desc: 'Variedad con crema pastelera, dulce de leche y membrillo.' },
    { id: 'p3', name: 'Pan de Campo de Masa Madre (por kg)', price: 2600, stock: 20, cat: 'Panes Artesanales', emoji: '🍞', desc: 'Corteza crocante y miga aireada con fermentación lenta.' },
    { id: 'p4', name: 'Bizcochitos de Grasa Salados 250g', price: 1500, stock: 30, cat: 'Especialidades Saladas', emoji: '🥨', desc: 'Crocantes tradicionales ideales para el mate.' },
    { id: 'p5', name: 'Torta Pasta Frola de Membrillo', price: 4900, stock: 8, cat: 'Tortas y Tartas Dulces', emoji: '🥧', desc: 'Masa sablé clásica con abundante dulce de membrillo.' },
    { id: 'p6', name: 'Alfajorcitos de Maicena (por docena)', price: 3800, stock: 14, cat: 'Masas Secas y Finas', emoji: '🍪', desc: 'Rellenos con mucho dulce de leche y coco rallado.' }
  ],
  'reposteria': [
    { id: 'p1', name: 'Torta Rogel Artesanal con Merengue', price: 18500, stock: 6, cat: 'Tortas de Cumpleaños / Eventos', emoji: '🎂', desc: 'Capas finas crocantes con dulce de leche y merengue italiano.' },
    { id: 'p2', name: 'Torta Red Velvet con Cream Cheese', price: 21000, stock: 5, cat: 'Tortas de Cumpleaños / Eventos', emoji: '🍰', desc: 'Bizcocho aterciopelado húmedo relleno de frosting de queso crema.' },
    { id: 'p3', name: 'Lemon Pie Individual en Vaso', price: 3600, stock: 15, cat: 'Postres en Pote / Vasos', emoji: '🍋', desc: 'Base de galletita, crema suave de limón y merengue tostado.' },
    { id: 'p4', name: 'Caja de Macarons Surtidos x 6', price: 7200, stock: 10, cat: 'Chocolatería', emoji: '🧁', desc: 'Sabores: pistacho, chocolate belga, frambuesa y maracuyá.' },
    { id: 'p5', name: 'Muffins con Chips de Chocolate x 4', price: 4400, stock: 12, cat: 'Cupcakes y Muffins', emoji: '🧁', desc: 'Esponjosos rellenos de dulce de leche.' },
    { id: 'p6', name: 'Brownie con Nueces Sin TACC', price: 3200, stock: 10, cat: 'Productos Sin TACC / Saludables', emoji: '🍫', desc: 'Puro chocolate 100% libre de gluten.' }
  ],
  'rotiseria': [
    { id: 'p1', name: 'Pollo al Spiedo con Papas Rústicas', price: 11500, stock: 10, cat: 'Comidas Preparadas / Platos del Día', emoji: '🍗', desc: 'Pollo dorado a las hierbas con porción abundante de papas.' },
    { id: 'p2', name: 'Docena de Empanadas Criollas al Horno', price: 12000, stock: 20, cat: 'Empanadas y Pizzas', emoji: '🥟', desc: 'Carne cortada a cuchillo, suaves o picantes.' },
    { id: 'p3', name: 'Milanesa Napolitana con Papas Fritas', price: 8900, stock: 15, cat: 'Comidas Preparadas / Platos del Día', emoji: '🥩', desc: 'Milanesa de ternera con jamón, queso y salsa con fritas.' },
    { id: 'p4', name: 'Tarta Individual de Jamón, Queso y Huevo', price: 4800, stock: 12, cat: 'Tartas y Minutas', emoji: '🥧', desc: 'Masa hojaldrada con relleno abundante.' },
    { id: 'p5', name: 'Ensalada César con Pollo Grillado', price: 5600, stock: 14, cat: 'Ensaladas Preparadas', emoji: '🥗', desc: 'Lechuga romana, croutons, queso parmesano y aderezo césar.' },
    { id: 'p6', name: 'Flan Casero Mixto con Dulce y Crema', price: 2900, stock: 18, cat: 'Postres y Bebidas', emoji: '🍮', desc: 'Flan tradicional de huevos con caramelo.' }
  ],

  // 6. HELADOS
  'heladeria': [
    { id: 'p1', name: 'Pote de 1 Kilo de Helado (hasta 4 gustos)', price: 9800, stock: 50, cat: 'Kilos y Medios Kilos', emoji: '🍦', desc: 'Elegí hasta 4 sabores artesanales de nuestra carta.' },
    { id: 'p2', name: 'Pote de 1/2 Kilo de Helado (hasta 3 gustos)', price: 5600, stock: 50, cat: 'Kilos y Medios Kilos', emoji: '🍨', desc: 'Elegí hasta 3 sabores artesanales favoritos.' },
    { id: 'p3', name: 'Pote Individual Cuarto Kilo (hasta 2 gustos)', price: 3200, stock: 60, cat: 'Potes Individuales', emoji: '🍧', desc: 'Ideal para disfrutar solo. Incluye 2 cucuruchos.' },
    { id: 'p4', name: 'Paleta Rellena de Dulce de Leche Bañada', price: 2100, stock: 30, cat: 'Paletas', emoji: '🍭', desc: 'Helado de crema bañado en chocolate con corazón de dulce de leche.' },
    { id: 'p5', name: 'Pote 1/2 Kilo Vegano Frutales al Agua', price: 5400, stock: 20, cat: 'Helados Veganos / Sin Azúcar', emoji: '🍓', desc: 'Frutos rojos, limón y maracuyá 100% natural sin lácteos.' },
    { id: 'p6', name: 'Salsa Tibia de Chocolate y Almendras Tostadas', price: 1400, stock: 25, cat: 'Salsas y Coberturas', emoji: '🍫', desc: 'Topping adicional para tus helados.' }
  ],
  'postres': [
    { id: 'p1', name: 'Torta Helada Bombón Escocés', price: 14500, stock: 8, cat: 'Tortas Heladas', emoji: '🎂', desc: 'Base de crema americana, dulce de leche natural y chocolate.' },
    { id: 'p2', name: 'Tiramisú Tradicional con Café Espresso', price: 3800, stock: 15, cat: 'Postres Individuales', emoji: '🍮', desc: 'Vainillas embebidas en café con crema de mascarpone y cacao.' },
    { id: 'p3', name: 'Cheesecake de Frutos Rojos en Pote', price: 3900, stock: 15, cat: 'Postres Individuales', emoji: '🍰', desc: 'Base crocante con suave queso crema y salsa de arándanos.' },
    { id: 'p4', name: 'Caja de Bombones Suizos x 8 unidades', price: 6200, stock: 12, cat: 'Bombones Helados', emoji: '🍫', desc: 'Helado de dulce de leche bañado en chocolate crocante.' },
    { id: 'p5', name: 'Milkshake Clásico de Frutilla con Crema', price: 3400, stock: 20, cat: 'Milkshakes / Batidos', emoji: '🥤', desc: 'Batido espeso con helado artesanal y crema chantilly.' },
    { id: 'p6', name: 'Chocotorta Casera en Fuente Familiar', price: 12800, stock: 6, cat: 'Potes Familiares', emoji: '🍫', desc: 'Galletitas de chocolate con crema de dulce de leche y queso.' }
  ],

  // 7. MASCOTAS
  'veterinaria': [
    { id: 'p1', name: 'Alimento Perro Adulto Razas Medianas 15kg', price: 38500, stock: 10, cat: 'Alimentos para Perros', emoji: '🐕', desc: 'Nutrición completa con proteínas seleccionadas y Omega 3.' },
    { id: 'p2', name: 'Alimento Gato Adulto Castrado 7.5kg', price: 26500, stock: 12, cat: 'Alimentos para Gatos', emoji: '🐈', desc: 'Control de peso y cuidado del tracto urinario felino.' },
    { id: 'p3', name: 'Snacks Dentales para Perro x 7 unidades', price: 3400, stock: 25, cat: 'Snacks y Golosinas Pet', emoji: '🦴', desc: 'Ayuda a reducir el sarro y mantiene el aliento fresco.' },
    { id: 'p4', name: 'Pipeta Antiparasitaria Externa Perro Mediano', price: 6800, stock: 20, cat: 'Higiene y Cuidados', emoji: '🧴', desc: 'Protección contra pulgas y garrapatas por 30 días.' },
    { id: 'p5', name: 'Pelota de Goma Maciza Irrompible', price: 4200, stock: 18, cat: 'Juguetes y Accesorios', emoji: '🎾', desc: 'Material flexible de alta durabilidad para morder y jugar.' },
    { id: 'p6', name: 'Piedras Sanitarias Absorbentes para Gato 4kg', price: 3100, stock: 30, cat: 'Higiene y Cuidados', emoji: '📦', desc: 'Máximo control de olores sin polvo.' }
  ],
  'petshop': [
    { id: 'p1', name: 'Alimento Premium Perro Cachorro 15kg', price: 41000, stock: 8, cat: 'Alimentos para Perros', emoji: '🐕', desc: 'Fórmula enriquecida para crecimiento y desarrollo articular.' },
    { id: 'p2', name: 'Alimento Húmedo Gato Pouch 85g (x 6)', price: 4500, stock: 30, cat: 'Alimentos para Gatos', emoji: '🐈', desc: 'Trocitos de salmón y atún en salsa gourmet.' },
    { id: 'p3', name: 'Rascador Torre para Gatos 3 Niveles', price: 29500, stock: 5, cat: 'Juguetes y Accesorios', emoji: '🏰', desc: 'Postes de sisal natural con cueva y pompón colgante.' },
    { id: 'p4', name: 'Cama Acolchada Redonda Antiestrés 60cm', price: 18900, stock: 10, cat: 'Juguetes y Accesorios', emoji: '🛏️', desc: 'Piel sintética ultrasuave lavable en lavarropas.' },
    { id: 'p5', name: 'Shampoo Neutro Antipulgas para Perros 500ml', price: 5400, stock: 20, cat: 'Higiene y Cuidados', emoji: '🛁', desc: 'Con extracto de aloe vera y citronela natural.' },
    { id: 'p6', name: 'Hueso de Cuero Masticable Gigante', price: 2800, stock: 25, cat: 'Snacks y Golosinas Pet', emoji: '🦴', desc: 'Entretenimiento seguro para mandíbulas fuertes.' }
  ],
  'alimentos-mascotas': [
    { id: 'p1', name: 'Alimento Balanceado Perro Adulto 20kg', price: 32000, stock: 15, cat: 'Alimentos para Perros', emoji: '🐕', desc: 'Bolsa económica con óptima digestibilidad.' },
    { id: 'p2', name: 'Alimento Balanceado Gato Mix 10kg', price: 24000, stock: 12, cat: 'Alimentos para Gatos', emoji: '🐈', desc: 'Sabor pescado y carne con taurina agregada.' },
    { id: 'p3', name: 'Galletitas Horneadas Caninas 500g', price: 2600, stock: 25, cat: 'Snacks y Golosinas Pet', emoji: '🍪', desc: 'Premio crujiente con sabor a carne y queso.' },
    { id: 'p4', name: 'Comedero Doble de Acero Inoxidable', price: 7500, stock: 15, cat: 'Juguetes y Accesorios', emoji: '🥣', desc: 'Base antideslizante fácil de limpiar.' },
    { id: 'p5', name: 'Colonia Desodorizante para Mascotas 250ml', price: 3800, stock: 18, cat: 'Higiene y Cuidados', emoji: '🌸', desc: 'Aroma fresco talco de bebé sin alcohol.' },
    { id: 'p6', name: 'Correa Extensible Retráctil 5 Metros', price: 9200, stock: 10, cat: 'Juguetes y Accesorios', emoji: '🦮', desc: 'Con botón de freno de seguridad para paseos cómodos.' }
  ],

  // 8. TIENDAS
  'regaleria': [
    { id: 'p1', name: 'Vela Aromática de Soja en Vaso de Vidrio', price: 5400, stock: 20, cat: 'Bazar y Decoración', emoji: '🕯️', desc: 'Aroma vainilla y coco con pabilo 100% de madera.' },
    { id: 'p2', name: 'Taza de Cerámica Artesanal con Relieve', price: 4600, stock: 18, cat: 'Accesorios de Uso Personal', emoji: '☕', desc: 'Pintada a mano apta microondas y lavavajillas.' },
    { id: 'p3', name: 'Difusor de Aromas con Varillas de Ratán 250ml', price: 6200, stock: 15, cat: 'Bazar y Decoración', emoji: '🌸', desc: 'Fragancia persistente para ambientar el hogar.' },
    { id: 'p4', name: 'Set Spa Relajante de Baño', price: 12800, stock: 10, cat: 'Sets de Regalo', emoji: '🎁', desc: 'Incluye sales marinas, esponja vegetal, jabón y crema.' },
    { id: 'p5', name: 'Cuaderno Planner A5 Tapa Dura con Elástico', price: 6800, stock: 14, cat: 'Papelería Creativa / Tarjetas', emoji: '📖', desc: 'Organizador perpetuo con stickers y hojas punteadas.' },
    { id: 'p6', name: 'Peluche Oso de Apego Suave 30cm', price: 8900, stock: 12, cat: 'Peluches y Juguetes', emoji: '🧸', desc: 'Hipoalergénico y lavable de primera calidad.' }
  ],
  'limpieza': [
    { id: 'p1', name: 'Detergente Concentrado Biodegradable 750ml', price: 1800, stock: 40, cat: 'Detergentes y Jabones', emoji: '🧴', desc: 'Alto poder desengrasante con extracto de limón.' },
    { id: 'p2', name: 'Lavandina en Gel Concentrada 1L', price: 1450, stock: 50, cat: 'Limpiadores de Superficie', emoji: '✨', desc: 'Máxima desinfección sin salpicaduras.' },
    { id: 'p3', name: 'Suavizante para Ropa Perfume Intenso 3L', price: 5200, stock: 25, cat: 'Cuidado de la Ropa', emoji: '🌸', desc: 'Ropa suave y perfumada por semanas.' },
    { id: 'p4', name: 'Limpiador de Pisos Floral Concentrado 5L', price: 4600, stock: 20, cat: 'Limpiadores de Superficie', emoji: '🧹', desc: 'Bidón económico con fragancia duradera.' },
    { id: 'p5', name: 'Rollo de Cocina Megarrollo 3 x 120 paños', price: 2900, stock: 30, cat: 'Papeles y Rollos de Cocina', emoji: '🧻', desc: 'Máxima absorción y resistencia en húmedo.' },
    { id: 'p6', name: 'Mopa Giratoria con Balde Centrifugador', price: 16800, stock: 8, cat: 'Utensilios de Limpieza', emoji: '🪣', desc: 'Balde con pedal y mopa de microfibra de repuesto.' }
  ],
  'tecnologia': [
    { id: 'p1', name: 'Auriculares Inalámbricos Bluetooth TWS', price: 28500, stock: 25, cat: 'Audio y Auriculares', emoji: '🎧', desc: 'Cancelación de ruido ambiental, estuche de carga rápida y micrófono HD ||| {"variants":[{"name":"Color","options":[{"name":"Negro","priceDelta":0},{"name":"Blanco","priceDelta":0}]}]}' },
    { id: 'p2', name: 'Cargador Rápido USB-C 30W Power Delivery', price: 14200, stock: 30, cat: 'Cables y Cargadores', emoji: '⚡', desc: 'Compatible con iPhone, Samsung y tablets.' },
    { id: 'p3', name: 'Cable USB-C a USB-C Trenzado Reforzado 2m', price: 6500, stock: 40, cat: 'Cables y Cargadores', emoji: '🔌', desc: 'Carga rápida 60W y transferencia de datos ultrarrápida.' },
    { id: 'p4', name: 'Soporte Magnético de Auto para Celular', price: 7800, stock: 20, cat: 'Accesorios para Celulares', emoji: '🚗', desc: 'Rotación 360° con imanes de neodimio ultra fuertes.' },
    { id: 'p5', name: 'Mouse Inalámbrico Silencioso Ergonómico', price: 11900, stock: 18, cat: 'Periféricos de Computación', emoji: '🖱️', desc: 'Conexión Bluetooth y receptor USB 2.4GHz.' },
    { id: 'p6', name: 'Smartwatch Deportivo con Pulsioxímetro', price: 38000, stock: 15, cat: 'Gadgets y Smart', emoji: '⌚', desc: 'Pantalla AMOLED, monitoreo cardíaco y notificaciones de WhatsApp ||| {"variants":[{"name":"Malla","options":[{"name":"Negra","priceDelta":0},{"name":"Azul","priceDelta":0}]}]}' }
  ],
  'indumentaria': [
    { id: 'p1', name: 'Remera de Algodón Peinado Unisex', price: 14500, stock: 30, cat: 'Remeras y Tops', emoji: '👕', desc: 'Algodón 100% premium suave al tacto ||| {"variants":[{"name":"Talle","options":[{"name":"S","priceDelta":0},{"name":"M","priceDelta":0},{"name":"L","priceDelta":0},{"name":"XL","priceDelta":0}]},{"name":"Color","options":[{"name":"Negro","priceDelta":0},{"name":"Blanco","priceDelta":0},{"name":"Gris","priceDelta":0}]}]}' },
    { id: 'p2', name: 'Pantalón Jogger Rústico Oversize', price: 24000, stock: 20, cat: 'Pantalones y Jeans', emoji: '👖', desc: 'Con bolsillos laterales y cintura elástica ajustable ||| {"variants":[{"name":"Talle","options":[{"name":"1 (S/M)","priceDelta":0},{"name":"2 (L/XL)","priceDelta":0}]}]}' },
    { id: 'p3', name: 'Buzo Canguro Hoodie con Capucha', price: 29500, stock: 18, cat: 'Abrigos y Camperas', emoji: '🧥', desc: 'Frisa pesada abrigada con bolsillo frontal.' },
    { id: 'p4', name: 'Campera Puffer Térmica Ultraliviana', price: 52000, stock: 10, cat: 'Abrigos y Camperas', emoji: '🧥', desc: 'Relleno térmico con repelencia al agua y viento.' },
    { id: 'p5', name: 'Zapatillas Urbanas Clásicas', price: 46000, stock: 12, cat: 'Calzado', emoji: '👟', desc: 'Suela de goma antideslizante con plantilla acolchada.' },
    { id: 'p6', name: 'Gorra Trucker con Bordado Frontal', price: 8900, stock: 25, cat: 'Accesorios', emoji: '🧢', desc: 'Cierre ajustable con malla respirable trasera.' }
  ],
  'ferreteria': [
    { id: 'p1', name: 'Cinta Aisladora PVC Profesional 20m', price: 1400, stock: 40, cat: 'Electricidad e Iluminación', emoji: '⚡', desc: 'Cinta aisladora ignífuga de alta adherencia y elasticidad.' },
    { id: 'p2', name: 'Candado de Seguridad Reforzado 40mm', price: 4800, stock: 15, cat: 'Fijaciones y Tornillería', emoji: '🔒', desc: 'Cuerpo de latón macizo con arco de acero templado y 3 llaves.' },
    { id: 'p3', name: 'Martillo Galponero Mango Fibra de Vidrio', price: 7200, stock: 12, cat: 'Herramientas Manuales', emoji: '🔨', desc: 'Cabeza de acero forjado con grip ergonómico antideslizante.' },
    { id: 'p4', name: 'Set de Destornilladores Imantados x 6', price: 9800, stock: 15, cat: 'Herramientas Manuales', emoji: '🪛', desc: 'Puntas planas y phillips en acero cromo vanadio.' },
    { id: 'p5', name: 'Pintura Látex Interior Lavable 4 Litros', price: 18900, stock: 10, cat: 'Pinturas y Accesorios', emoji: '🎨', desc: 'Poder antihongo y excelente poder cubritivo.' },
    { id: 'p6', name: 'Pinza Universal Aislada 8 Pulgadas', price: 6500, stock: 14, cat: 'Herramientas Manuales', emoji: '🔧', desc: 'Filos templados para corte de alambre y cables.' }
  ],
  'gastronomia': [
    { id: 'p1', name: 'Hamburguesa Doble Cheddar y Bacon', price: 8500, stock: 50, cat: 'Hamburguesas', emoji: '🍔', desc: 'Doble medallón 100% carne, queso cheddar fundido y bacon crocante ||| {"variants":[{"name":"Tamaño","options":[{"name":"Simple","priceDelta":0},{"name":"Doble","priceDelta":1500}]}]}' },
    { id: 'p2', name: 'Hamburguesa Criolla Completa', price: 7900, stock: 40, cat: 'Hamburguesas', emoji: '🍔', desc: 'Medallón de carne con lechuga, tomate, huevo frito y mayonesa de la casa.' },
    { id: 'p3', name: 'Papas Fritas con Cheddar y Ciboulette', price: 3800, stock: 60, cat: 'Acompañamientos', emoji: '🍟', desc: 'Papas crocantes bañadas en salsa cheddar caliente ||| {"variants":[{"name":"Porción","options":[{"name":"Medianas","priceDelta":0},{"name":"Grandes","priceDelta":1000}]}]}' },
    { id: 'p4', name: 'Nuggets de Pollo Crocantes x 8', price: 4200, stock: 35, cat: 'Entradas', emoji: '🍗', desc: 'Bocaditos de pollo crujientes con salsa BBQ.' },
    { id: 'p5', name: 'Cerveza Tirada Artesanal 500ml', price: 3200, stock: 40, cat: 'Bebidas', emoji: '🍺', desc: 'Pinta tirada bien fría.' },
    { id: 'p6', name: 'Gaseosa Línea Cola 354ml', price: 1500, stock: 80, cat: 'Bebidas', emoji: '🥤', desc: 'Gaseosa en lata fría.' }
  ],
  'otro': [
    { id: 'p1', name: 'Producto Destacado Estrella', price: 6500, stock: 25, cat: 'Destacados', emoji: '⭐', desc: 'Excelente relación precio/calidad para nuestros clientes.' },
    { id: 'p2', name: 'Combo Promocional Especial', price: 12000, stock: 20, cat: 'Promociones', emoji: '🎁', desc: 'Pack con descuento exclusivo por tiempo limitado.' },
    { id: 'p3', name: 'Artículo Novedad de Temporada', price: 8900, stock: 15, cat: 'Novedades', emoji: '✨', desc: 'Lo último ingresado en nuestro catálogo.' },
    { id: 'p4', name: 'Producto Seleccionado Premium', price: 14500, stock: 10, cat: 'General', emoji: '🏷️', desc: 'Garantía oficial y atención personalizada.' },
    { id: 'p5', name: 'Artículo Esencial de Uso Diario', price: 3400, stock: 30, cat: 'General', emoji: '📦', desc: 'Disponibilidad inmediata para retiro o envío.' },
    { id: 'p6', name: 'Accesorio Complementario', price: 4200, stock: 18, cat: 'Varios', emoji: '🛍️', desc: 'Ideal para sumar a tu carrito de compras.' }
  ]
};

function resolveDemoCatalog(rubro, subrubro, storeId, storeName) {
  const norm = (str) => String(str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, ' ')
    .trim();

  const normSub = norm(subrubro).replace(/\s+/g, '-');
  const normRub = norm(rubro);
  const fullText = [norm(subrubro), normRub, norm(storeId), norm(storeName)].join(' ');

  // 1. Direct subrubro key match
  if (SUBRUBRO_PRODUCTS_MAP[normSub]) {
    return { key: normSub, prods: SUBRUBRO_PRODUCTS_MAP[normSub] };
  }

  // 2. Exact match in subrubro aliases
  const aliasSubMap = {
    'pet-shop': 'petshop',
    'mascotas': 'veterinaria',
    'alimentos-para-mascotas': 'alimentos-mascotas',
    'comida': 'rotiseria',
    'hamburgueseria': 'gastronomia',
    'burger': 'gastronomia',
    'pizzeria': 'rotiseria',
    'restaurante': 'gastronomia',
    'cafe-deli': 'cafeteria',
    'cafe': 'cafeteria',
    'panaderia-confiteria': 'panaderia',
    'postres-y-helados': 'postres',
    'tiendas-varios': 'regaleria',
    'articulos-de-limpieza': 'limpieza',
    'tecnologia-electronica': 'tecnologia',
    'electronica': 'tecnologia',
    'ropa': 'indumentaria',
    'moda': 'indumentaria',
    'industrial': 'ferreteria',
    'construccion': 'ferreteria',
    'kiosco-almacen': 'kiosco'
  };
  if (aliasSubMap[normSub] && SUBRUBRO_PRODUCTS_MAP[aliasSubMap[normSub]]) {
    return { key: aliasSubMap[normSub], prods: SUBRUBRO_PRODUCTS_MAP[aliasSubMap[normSub]] };
  }

  // 3. Rubro category match
  const rubroMap = {
    'super': 'supermercado',
    'farmacias': 'farmacia',
    'farmacia': 'farmacia',
    'bebidas': 'distribuidora',
    'kioscos': 'kiosco',
    'kiosco': 'kiosco',
    'kiosco_almacen': 'almacen',
    'mascotas': 'veterinaria',
    'cafe': 'cafeteria',
    'helados': 'heladeria',
    'tiendas': 'regaleria',
    'gastronomia': 'gastronomia',
    'tecnologia': 'tecnologia',
    'indumentaria': 'indumentaria',
    'industrial': 'ferreteria',
    'ferreteria': 'ferreteria',
    'insumos': 'libreria-kiosco'
  };
  if (rubroMap[normRub] && SUBRUBRO_PRODUCTS_MAP[rubroMap[normRub]]) {
    return { key: rubroMap[normRub], prods: SUBRUBRO_PRODUCTS_MAP[rubroMap[normRub]] };
  }

  // 4. Keyword fuzzy scan in full text
  if (fullText.includes('farmac') || fullText.includes('medicam') || fullText.includes('salud')) return { key: 'farmacia', prods: SUBRUBRO_PRODUCTS_MAP['farmacia'] };
  if (fullText.includes('perfum') || fullText.includes('cosmet')) return { key: 'perfumeria', prods: SUBRUBRO_PRODUCTS_MAP['perfumeria'] };
  if (fullText.includes('optic')) return { key: 'optica', prods: SUBRUBRO_PRODUCTS_MAP['optica'] };
  if (fullText.includes('dietet') || fullText.includes('natural') || fullText.includes('organic') || fullText.includes('tacc')) return { key: 'dietetica', prods: SUBRUBRO_PRODUCTS_MAP['dietetica'] };
  if (fullText.includes('verdur') || fullText.includes('frut')) return { key: 'verduleria', prods: SUBRUBRO_PRODUCTS_MAP['verduleria'] };
  if (fullText.includes('vinot') || fullText.includes('vino') || fullText.includes('bodega')) return { key: 'vinoteca', prods: SUBRUBRO_PRODUCTS_MAP['vinoteca'] };
  if (fullText.includes('cervez') || fullText.includes('beer') || fullText.includes('birra') || fullText.includes('pinta')) return { key: 'cerveceria', prods: SUBRUBRO_PRODUCTS_MAP['cerveceria'] };
  if (fullText.includes('licor') || fullText.includes('bebida') || fullText.includes('trago') || fullText.includes('fernet')) return { key: 'licoreria', prods: SUBRUBRO_PRODUCTS_MAP['licoreria'] };
  if (fullText.includes('distrib')) return { key: 'distribuidora', prods: SUBRUBRO_PRODUCTS_MAP['distribuidora'] };
  if (fullText.includes('tabac') || fullText.includes('cigar') || fullText.includes('smoke')) return { key: 'tabaqueria', prods: SUBRUBRO_PRODUCTS_MAP['tabaqueria'] };
  if (fullText.includes('librer') || fullText.includes('papel') || fullText.includes('escolar') || fullText.includes('insumo')) return { key: 'libreria-kiosco', prods: SUBRUBRO_PRODUCTS_MAP['libreria-kiosco'] };
  if (fullText.includes('caf') || fullText.includes('coffee') || fullText.includes('latte')) return { key: 'cafeteria', prods: SUBRUBRO_PRODUCTS_MAP['cafeteria'] };
  if (fullText.includes('panad') || fullText.includes('factur') || fullText.includes('medialun') || fullText.includes('pan')) return { key: 'panaderia', prods: SUBRUBRO_PRODUCTS_MAP['panaderia'] };
  if (fullText.includes('repost') || fullText.includes('pasteler') || fullText.includes('torta') || fullText.includes('cake')) return { key: 'reposteria', prods: SUBRUBRO_PRODUCTS_MAP['reposteria'] };
  if (fullText.includes('rotis') || fullText.includes('viand') || fullText.includes('empanad') || fullText.includes('milanes')) return { key: 'rotiseria', prods: SUBRUBRO_PRODUCTS_MAP['rotiseria'] };
  if (fullText.includes('burger') || fullText.includes('hamburg') || fullText.includes('gastro') || fullText.includes('pizz') || fullText.includes('restaur')) return { key: 'gastronomia', prods: SUBRUBRO_PRODUCTS_MAP['gastronomia'] };
  if (fullText.includes('helad') || fullText.includes('icecream')) return { key: 'heladeria', prods: SUBRUBRO_PRODUCTS_MAP['heladeria'] };
  if (fullText.includes('postre') || fullText.includes('dulce') || fullText.includes('chocotorta')) return { key: 'postres', prods: SUBRUBRO_PRODUCTS_MAP['postres'] };
  if (fullText.includes('vet') || fullText.includes('pet') || fullText.includes('perro') || fullText.includes('gato') || fullText.includes('mascot')) return { key: 'veterinaria', prods: SUBRUBRO_PRODUCTS_MAP['veterinaria'] };
  if (fullText.includes('regal') || fullText.includes('bazar') || fullText.includes('deco') || fullText.includes('juguet')) return { key: 'regaleria', prods: SUBRUBRO_PRODUCTS_MAP['regaleria'] };
  if (fullText.includes('limpiez') || fullText.includes('lavand') || fullText.includes('deterg')) return { key: 'limpieza', prods: SUBRUBRO_PRODUCTS_MAP['limpieza'] };
  if (fullText.includes('tecno') || fullText.includes('electr') || fullText.includes('comput') || fullText.includes('celul') || fullText.includes('audio')) return { key: 'tecnologia', prods: SUBRUBRO_PRODUCTS_MAP['tecnologia'] };
  if (fullText.includes('indument') || fullText.includes('ropa') || fullText.includes('mod') || fullText.includes('talle') || fullText.includes('vestir') || fullText.includes('zapat')) return { key: 'indumentaria', prods: SUBRUBRO_PRODUCTS_MAP['indumentaria'] };
  if (fullText.includes('ferret') || fullText.includes('herram') || fullText.includes('indust') || fullText.includes('pintur') || fullText.includes('electric')) return { key: 'ferreteria', prods: SUBRUBRO_PRODUCTS_MAP['ferreteria'] };
  if (fullText.includes('kiosc') || fullText.includes('golosin') || fullText.includes('caramel') || fullText.includes('alfajor')) return { key: 'kiosco', prods: SUBRUBRO_PRODUCTS_MAP['kiosco'] };
  if (fullText.includes('super') || fullText.includes('almacen') || fullText.includes('mercado')) return { key: 'supermercado', prods: SUBRUBRO_PRODUCTS_MAP['supermercado'] };

  return { key: 'otro', prods: SUBRUBRO_PRODUCTS_MAP['otro'] };
}

// Test cases
const testCases = [
  { rubro: 'Super', subrubro: 'dietetica' },
  { rubro: 'Farmacias', subrubro: 'perfumeria' },
  { rubro: 'Bebidas', subrubro: 'vinoteca' },
  { rubro: 'Mascotas', subrubro: 'petshop' },
  { rubro: 'Cafe', subrubro: 'panaderia' },
  { rubro: 'Helados', subrubro: 'heladeria' },
  { rubro: 'Tiendas', subrubro: 'indumentaria' },
  { rubro: 'Tiendas', subrubro: 'ferreteria' },
  { rubro: 'Gastronomía', subrubro: '' },
  { rubro: 'kiosco_almacen', subrubro: '' },
  { rubro: '', subrubro: '', storeId: 'hamburgueseria-pepe' },
  { rubro: '', subrubro: '', storeId: 'pet-shop-amigos' },
  { rubro: '', subrubro: '', storeId: 'libreria-san-martin' },
];

testCases.forEach(tc => {
  const res = resolveDemoCatalog(tc.rubro, tc.subrubro, tc.storeId, '');
  console.log(`Input: [${tc.rubro || '-'}] / [${tc.subrubro || '-'}] / [${tc.storeId || '-'}] => Resolved: ${res.key} (${res.prods.length} prods, e.g. "${res.prods[0].name}")`);
});
