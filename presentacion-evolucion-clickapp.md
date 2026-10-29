# Dale! Te Pido (Clickapp) — Evolución Integral de Plataforma & Registro de Hitos Técnicos

**Documento de Fuente Optimizado para Google NotebookLM**  
*Fecha de Corte:* 29 de Octubre de 2026 · Versión de Plataforma: v4.21 · Operatividad Global: 98.5% (Ready for Paid Social Ads)  
*Resumen:* Registro maestro cronológico, arquitectónico y técnico de la evolución de Dale! Te Pido (Clickapp) a lo largo de sus 38 etapas correlativas. Cubre arquitectura cloud serverless en Vercel, persistencia relacional en Supabase (`store_auth`, `store_config`, `store_products`, `store_orders`, `pickup_requests`), seguridad bancaria HMAC-SHA256 + RLS + Bóveda Criptográfica AES-256-GCM, suite integral de comercio multi-rubro (Storefront + Dashboard + SuperAdmin + Tracking Público), logística multimodal Dale!QueVoy, video commerce, onboarding sin fricción e inteligencia financiera.

---

## Diapositiva 1: De un Catálogo por WhatsApp a una Plataforma SaaS Multi-tenant

> **Hito / Estado:** MEMORIA DE DESARROLLO INTEGRAL · ACTUALIZADO 29/10/2026 (v4.21)

Recorrido cronológico y técnico de todo lo construido en Dale! Te Pido / Clickapp a lo largo de 38 etapas correlativas: arquitectura cloud serverless, bóveda criptográfica AES-256-GCM, suite de comercio, Android TWA, logística Dale!QueVoy y automatización omnicanal lista para campañas.

### Métricas Clave de la Plataforma:
- **+825 Commits:** 38 etapas correlativas, resiliencia cloud y sincronización automática.
- **98/100 Seguridad:** Auditoría bancaria SEC-01 a SEC-08 mitigada + Vault AES-256-GCM, HMAC & RLS.
- **98.5% Operatividad:** Embudos de onboarding, checkout, dashboard y tracking listos para campañas Ads.
- **360° Suite:** Tienda, Dashboard, Superadmin, APK, PWA y Campañas.

---

## Diapositiva 2: El Momento Cero: El Catálogo Ágil y sin Comisiones

> **Hito / Estado:** Etapa 0 · Génesis del Proyecto

El proyecto nació para resolver un problema crítico del comercio barrial: crear una tienda digital en 5 minutos sin pagar comisiones abusivas ni requerir servidores complejos.

### Componentes e Innovaciones Implementadas:

#### Google Sheets como Base
La versión 1.0 operaba leyendo datos tabulares exportados en formato CSV directo desde una hoja de cálculo pública de Google Sheets.

#### Cierre por WhatsApp
El cliente armaba su pedido en el navegador y el checkout generaba un mensaje preformateado hacia la cuenta de WhatsApp del comercio.

#### Limitaciones que Exigieron Escalar
Sheets sufría demoras de caché (5 min para cambios), falta de autenticación por comercio, riesgos de permisos y concurrencia limitada.

#### La Decisión Clave
Conservar la sencillez de uso para el comerciante, pero reemplazar los cimientos técnicos por una arquitectura escalable, segura y multi-tenant en la nube sin perder la velocidad instantánea de carga.

---

## Diapositiva 3: Multi-imagen, Banners y Marca de Agua Automática

> **Hito / Estado:** Etapa 2 · Enriquecimiento Visual

Se transformó la vitrina comercial en una experiencia de compra atractiva, protegiendo las fotos de los comercios y guiando la conversión con banners interactivos.

### Componentes e Innovaciones Implementadas:

#### Hasta 3 Imágenes por Producto
Ampliación del modal ABM para cargar `img`, `img2` y `img3` con previews interactivos y carrusel de navegación táctil en la ficha de producto.

#### Watermark con Canvas HTML5
Procesamiento directo en el navegador: al subir una foto, un algoritmo de Canvas superpone el logo oficial del comercio en la esquina inferior con fondo protector de legibilidad.

#### Banners Promocionales 50/50
Módulo de banners configurables (modo single o doble) con vinculación a categorías y scroll suave interactivo directo a los productos promocionados.

#### Personalización de Identidad
Inyección dinámica de variables CSS `:root`: paletas de color con cálculo de luminancia y contraste WCAG 2.1, Google Fonts tipográficas y hero personalizable.

#### Optimización Cloudinary
Transformaciones automáticas de imágenes en la nube con formato WebP progresivo y redimensionamiento inteligente para asegurar velocidad óptima en redes móviles.

---

## Diapositiva 4: La Gran Migración a Supabase & Multi-Tenancy

> **Hito / Estado:** Etapa 3 · Arquitectura Cloud

Desconexión definitiva de las limitaciones de Google Sheets y adopción de PostgreSQL relacional con soporte para cientos de tiendas independientes en tiempo real.

### Componentes e Innovaciones Implementadas:

#### Multi-tenant por store_id
Detección inteligente de la tienda vía subdominio (ej: `mitienda.daletepido.com.ar`), path de URL o parámetro `?store=`. Todas las consultas filtran rígidamente por comercio.

#### Autenticación & RLS
Credenciales cifradas con hash, políticas RLS (Row Level Security) y control de roles que aseguran que ningún comercio pueda visualizar o mutar datos de otro.

#### Resiliencia & Auto-Recovery
Helper `fetchSupabase()` con reintentos exponenciales automáticos, bypass de 401 por credenciales locales obsoletas y fallback automático a modo local offline.

#### Esquema de Entidades Principales
`company_settings` · `products` · `store_credentials` · `store_activity_logs` · `faqs` · `email_templates`

---

## Diapositiva 5: Dashboard Operativo: Métricas, Kanban y Catálogo

> **Hito / Estado:** Etapa 4 · Suite del Comerciante

El comerciante cuenta con una herramienta integral para controlar su stock, despachar pedidos y analizar su negocio desde su computadora o celular.

### Componentes e Innovaciones Implementadas:

#### Tablero Kanban
Gestión de pedidos por columnas: A Confirmar, En Preparación, Despachado y Entregado con persistencia de estado.

#### Motor de Cupones
Creación de cupones con porcentaje, límite de usos y alcance general o restringido a productos específicos.

#### Wizard de Productos
Asistente en 5 pasos con Selector de Arquetipos (Indumentaria, Gastronomía, Ferretería, Opciones/Modelos).

#### Métricas en Vivo
Facturación total, ticket promedio, cantidad de órdenes y gráfico evolutivo de ventas del comercio.

#### Configuración de Diseño Visual
Editor en tiempo real de logo, colores de marca, tipografías, fondo de tienda con control de opacidad, textos de encabezados y canales de redes sociales vinculadas.

#### Seguridad de Acceso al Comercio
Gestor de contraseñas con botón interactivo para alternar visibilidad (ojo mostrar/ocultar) y sincronización protegida de credenciales.

---

## Diapositiva 6: Del Mostrador al Bolsillo: Kit QR y Android APK

> **Hito / Estado:** Etapa 5 · Omnicanalidad & Mobile

Integración entre el espacio físico del comercio y los smartphones de los usuarios a través de material gráfico y una app nativa Android compilada en CI/CD.

### Componentes e Innovaciones Implementadas:

#### Kit Imprimible A4 & Tarjetas
Módulo `kit-imprimible.html` que genera cartelería de alta calidad para mostrador con código QR vectorial, logo centrado Dale! Te Pido y grilla de 10 tarjetas comerciales listas para recortar.

#### PWA Offline & Instalable
Service Worker `sw.js`, Web Manifest completo con iconos 192/512 maskables y capturas de pantalla para instalación directa desde Chrome / Safari sin pasar por tienda.

#### Android TWA en GitHub Actions
Pipeline de CI/CD automatizado en GitHub Actions con Gradle 8.5 y Java 17 que compila, firma y genera el instalable `app-release.apk` de forma 100% headless.

#### Hito de Distribución
Los comerciantes pueden imprimir su código QR en su local físico o descargar e instalar directamente la APK en sus dispositivos móviles para administrar sus ventas sin depender de laptops.

---

## Diapositiva 7: Hardening Integral: Score 94/100 en Seguridad

> **Hito / Estado:** Etapa 6 · Seguridad & Auditoría

Ejecución de auditoría exhaustiva sobre vectores de ataque en frontend y backend, mitigando vulnerabilidades críticas mediante tokens criptográficos y RLS.

### Componentes e Innovaciones Implementadas:

#### Tokens HMAC-SHA256
Reemplazo total de OTPs predecibles y enlaces inseguros por tokens criptográficos firmados con HMAC-SHA256 con ventana de validez estricta de 15 minutos.

#### Aislamiento RLS en Supabase
Políticas de Row Level Security a nivel base de datos que bloquean la lectura o modificación de datos entre tiendas aunque se alteren parámetros en cliente.

#### Eliminación de Secretos Expuestos
Erradicación de claves maestras en el código frontend. Uso de clave pública anónima restringida y validación en API Serverless con variables de entorno protegidas.

#### Presentación Ejecutiva de Hardening
Disponible en el repositorio y accesible desde el Superdashboard: `informe-vulnerabilidades-clickapp.html`.

---

## Diapositiva 8: Superdashboard, Cuentas DEMO y Nutrición Automatizada

> **Hito / Estado:** Etapa 7 · Super Admin & Nutrición

Módulo secreto de administración global para supervisar la salud de la red, auditar eventos en vivo y nutrir a los nuevos prospectos con correos programados.

### Componentes e Innovaciones Implementadas:

#### Super Admin Dashboard
Panel maestro (`super-admin-secret-dashboard.html`) con monitoreo en vivo de todas las tiendas, auditoría de eventos de altas y accesos, y diagnóstico de APIs (DB, Gemini, Claude, Cloudinary).

#### Gestión de Cuentas DEMO
Identificador visual con badge ámbar, filtros dedicados y exclusión de métricas de facturación para cuentas de prueba, evitando distorsionar los datos de negocios reales.

#### CMS de Correos & Notificaciones
Editor visual de plantillas y cronograma de seguimiento automatizado (Día 2 redes sociales, Día 3 kit imprimible, Día 4 logística) con alertas de altas por Telegram, ntfy y email.

#### Motion Graphics & Video Promos
Generación de videos cinéticos de 15s y 30s con HyperFrames y el asset oficial de marca para pauta publicitaria en TikTok e Instagram Reels.

#### Enviador de Prospectos
Herramienta `super-admin-prospectos.html` para contactar negocios fríos y enviar invitaciones personalizadas con previsualización del catálogo.

---

## Diapositiva 9: Modo Sereno / Vigilador y SEO Dinámico en WhatsApp

> **Hito / Estado:** Etapa 8 · Modo Sereno & SEO Social

Funcionalidades de retención comercial y marketing viral: gestión de pedidos fuera de horario y tarjetas de producto con preview visual de alta conversión.

### Componentes e Innovaciones Implementadas:

#### Modo Sereno: Pedidos 24/7 sin Perder Ventas
Permite a los clientes armar pedidos cuando el comercio está cerrado. En lugar de bloquear la compra, despliega el **Modal del Sereno** informando la reapertura y deja la orden en espera con el distintivo `🌙 Sereno`.

#### Compartir con Previews Inteligentes (SEO)
Al hacer click en compartir producto para WhatsApp o redes sociales, el sistema construye una vista previa atractiva con jerarquía estricta de imagen: Foto destacada del producto > Logo del comercio > Favicon.

---

## Diapositiva 10: Hero Banner Interactivo, Estudio 50/50, Mockup Proporcional & Opt-in WhatsApp

> **Hito / Estado:** Etapa 9 · Release 19 de Octubre 2026

Despliegue de innovaciones visuales de alto impacto: simulador interactivo de compra en vivo con comanda de WhatsApp, previsualizador a media pantalla con escalado dinámico de laptop y consentimiento ético.

### Componentes e Innovaciones Implementadas:

#### Hero Banner: Live Mockup Interactivo
Chasis de Smartphone en el Hero con cursor virtual en tiempo real que simula la compra: agrega el producto al carrito (+ badge animado) y envía la orden a WhatsApp revelando la tarjeta flotante de comanda con 0% comisiones.

#### Vista Previa 50/50 & Monitor PC Proporcional
Diseño de catálogo dividido en 2 columnas simétricas a media pantalla. Chasis de Laptop con escalado proporcional dinámico (`transform: scale()` a 880px) para ver la tienda real de escritorio sin recorte de elementos, y modo Smartphone a 360px con notch y link en vivo.

#### Selector de Estética & Banners Multicapa
El comerciante puede reelegir la personalidad de marca (Clásico, Vibrante, Relajado, Minimalista) desde el dashboard con paletas de 1 clic. Personalización independiente de colores para H1, H2 y Descripción, con medidas oficiales Desktop y Mobile.

#### Opt-in de WhatsApp & Compliance Continuo
Casilla de verificación opcional en el checkout ("Aceptar recibir novedades vía WhatsApp") para construir First-Party Data con consentimiento explícito, sincronizado de manera permanente y fechada con Términos y Privacidad.

---

## Diapositiva 11: APK Exclusiva, Zero Scroll en Samsung A23 & Vercel Analytics

> **Hito / Estado:** Etapa 10 · Release 20 de Octubre 2026

Optimización integral de la experiencia móvil y gestora: eliminación de scroll lateral en Samsung Galaxy A23, ocultación automática de descarga de APK en la app instalada, dark mode en popups y analítica en vivo.

### Componentes e Innovaciones Implementadas:

#### APK Gestor & Ocultación Standalone
Descarga de APK reservada al panel privado con detección nativa estándar (display-mode: standalone, referrer android-app:// y persistencia). Si el usuario ya está dentro de la app instalada, se suprimen automáticamente todos los botones de descarga (topbar, sidebar, sheet y modal) con cero parpadeo.

#### Zero Scroll en Samsung Galaxy A23
Solución definitiva al scroll horizontal en pantallas 384–412px: bloqueo de viewport (maximum-scale=1.0, user-scalable=no, viewport-fit=cover), contención estricta overflow-x: hidden en html/body/main, topbar ultracompacta con dot minimalista y grillas masonry colapsadas a 1 columna en móviles.

#### Dark Mode en Popups & Onboarding
Eliminación de estilos rígidos (#FFFFFF) en modales flotantes y setup guiado. Integración completa con variables CSS del sistema (--steel, --iron, --zinc, --white) garantizando contraste legible de títulos y logo invertido al ingresar en modo oscuro.

#### Paridad APK & Aviso de Escritorio
Garantía de que todo lo operable en ordenador sea accesible desde la APK móvil. Para tareas físicas especializadas (como la impresión A4 en alta resolución del Kit QR Imprimible), se anuncia un cuadro informativo recomendando la versión web.

#### Vercel Web Analytics & Insights
Inyección del tracking oficial de Vercel Analytics y Speed Insights en landing, tienda, alta de usuario y dashboard. Medición en tiempo real de visitantes únicos, vistas de producto, velocidad de carga y embudos de conversión sin cookies invasivas.

---

## Diapositiva 12: Scroll Storytelling en /desarrollo: GSAP, Capas SVG y Video Scrub

> **Hito / Estado:** Etapa 12 · Experiencia Inmersiva

Arquitectura visual interactiva en Next.js App Router: 3 capas superpuestas, video playback lateral coordinado, siluetas vectoriales de trazos limpios y líneas de viaje continuo en Rojo Institucional #F60000.

### Componentes e Innovaciones Implementadas:

#### Arquitectura Visual en 3 Capas
**1. Capa Fija de Fondo:** 5 videos WebM full size con fondo blanco, escalados (scale-110) para fundir sin bordes y sin etiquetas superpuestas.

              **2. Capa SVG Intermedia:** 5 siluetas vectoriales SVG exactas del usuario (silueta-01 a silueta-05) y líneas conectoras dinámicas #F60000.

              **3. Capa Delantera:** 5 secciones editoriales con tipografía Poppins en el margen opuesto.

#### GSAP ScrollTrigger (Scrub 0.6)
Transición coreográfica fluida y fijación en pantalla (Pinning):

              • Fijación del canvas en viewport (`pin: true, scrub: 0.8`) sin saltos.

              • Disposición desktop refinada: Jaime y textos alternados (izq/der) sin superposiciones ni tapados por navbar.

              • Línea conductora roja viajando continuamente con efecto glow de personaje en personaje al compás del scroll.

              • Fusión perfecta de videos sobre fondo blanco puro mediante `mix-blend-mode: multiply`.

#### Componentización Next.js & HTML
Implementación modular y mantenible:

              • Componente de cliente: `components/DesarrolloScrollStory.jsx` con directiva `"use client"`.

              • Página independiente en `desarrollo.html` y `app/desarrollo/page.jsx` con metadatos SEO y OpenGraph.

              • Tokens oficiales de marca: Rojo #F60000, Negro #010101 y Blanco #FFFFFF.

---

## Diapositiva 13: Ecosistema Multi-Rubro & Despacho Multimodal Dale!QueVoy

> **Hito / Estado:** Etapa 13 · Release 23 de Octubre 2026

Apertura universal para 10 rubros comerciales y conexión logística bajo demanda con la red de cadetes de Dale!QueVoy a través de Supabase Realtime con validación por PIN de 4 dígitos.

### Componentes e Innovaciones Implementadas:

#### Catálogo Multi-Rubro Universal
Transformación más allá de la gastronomía:

              • Soporte para 10 tipologías comerciales: Farmacias, Ferreterías, Indumentaria/Retail, Pet Shops, Almacenes, E-commerce, Librerías, Electrónica y Gastronomía.

              • Atributos dinámicos en `options` (JSONB): talles, colores, presentaciones, dosificaciones y especificaciones técnicas.

              • Nuevo atributo nativo `weight_kg` (default 0.5 kg) por producto con cálculo acumulativo automático de carga por comanda.

#### Despacho Multimodal Bajo Demanda
Mapeo inteligente de carga y flota en `public.deliveries`:

              • Clasificación automática: `PHARMACY`, `PETSHOP`, `RETAIL`, `FOOD`, `LARGE_CARGO` (>15 kg o ferretería) y `SMALL_BOX`.

              • Sugerencia visual de vehículo óptimo: 🛵 Moto / Bici para livianos, 🚗 Auto para intermedios y 🚐 Camioneta / Utilitario para gran porte.

              • Integración bidireccional en dashboard con modal de pre-despacho y métricas instantáneas.

#### PIN 4 Dígitos & Supabase Realtime
Seguridad total en entrega y seguimiento en vivo:

              • Generación automática de PIN numérico de 4 dígitos generado en el checkout para validación obligatoria con el repartidor en destino.

              • Modal y banner de confirmación en `tienda.html` e inclusión del PIN en la comanda de WhatsApp.

              • Listener reactivo en `dashboard.html` con Supabase Realtime (`SEARCHING` ➔ `ASSIGNED` ➔ `PICKED_UP` ➔ `DELIVERED`) y contacto directo con el cadete.

---

## Diapositiva 14: Estado de la Plataforma: Un SaaS Robusto y Listo para Crecer

> **Hito / Estado:** Balance & Futuro

Resumen comparativo del salto cuantitativo y cualitativo logrado entre el momento cero y el estado actual de Dale! Te Pido / Clickapp.

---

## Diapositiva 15: Restauración Visual & Consistencia UI en Dashboard de Cuentas

> **Hito / Estado:** Etapa 15 · Release 24 de Octubre 2026

Optimización integral del Panel de Control de los comercios (dashboard.html): recuperación de tipografía vectorial Bootstrap Icons, scrollbars invisibles/elegantes, banners translúcidos y paridad estricta entre Modo Oscuro y Modo Claro.

### Componentes e Innovaciones Implementadas:

#### Bootstrap Icons en Head
Se restauró el CDN de **Bootstrap Icons 1.11.3** en el `<head>` de `dashboard.html`, eliminando por completo los botones vacíos y cuadros fantasma (`▯`) en las acciones de ABM, botones rápidos del sidebar y conmutador de tema.

#### Scrollbars & Gráficos
Implementación de scrollbars modernos de 6px semitransparentes en Kanban y tablas de pedidos, eliminando las barras grises nativas de Windows, e incorporación de estilos para leyendas y badges en gráficos de donas de medios de pago.

#### Banners & Sync de Temas
Rediseño del banner de prueba de 15 días a tarjeta translúcida de cristal oscuro con acento rojo institucional, supresión del banner de verificación en modo demo y sincronización instantánea de clases `light-mode` / `dark-mode` en `html` y `body`.

---

## Diapositiva 16: Simulador de Pedidos y Cadetería Propia: Experiencia Completa Noutacc Sin TACC

> **Hito / Estado:** Etapa 16 · Release 25 de Octubre 2026

Generación e inyección automatizada de 5 pedidos de prueba completos y 4 repartidores propios activos para Noutacc, cubriendo todo el ciclo operativo (Kanban completo), asignación de cadetes, logística Dale!QueVoy y pines de seguridad.

### Componentes e Innovaciones Implementadas:

#### 5 Estados en Kanban
Los pedidos `PED-NT-101` a `PED-NT-105` distribuyen de forma realista el flujo en todas las columnas: *A confirmar*, *En curso*, *Listo para retirar*, *Despachado* (Modo Sereno) y *Cobrado*.

#### Catálogo Fiel & Diversidad de Pago
Productos auténticos de Noutacc (Pan Lactal, Medialunas, Hamburguesas, Red Velvet, Alfajores y Empanadas) con montos exactos ($14.200 a $23.600) y medios diversificados (Transferencia, Mercado Pago y Efectivo).

#### 4 Repartidores Propios & Dale!QueVoy
4 cadetes simulados (Moto Exprés, Cadete Propio, Eco Bici y Turno Noche) con zonas, WhatsApps y horarios, listos para asignación local o despacho por Dale!QueVoy con PIN de 4 dígitos.

---

## Diapositiva 17: Motor de Comandas Térmicas (58/80mm) con Auto-Print & Demo BigHouse

> **Hito / Estado:** Etapa 17 · Release 25 de Octubre 2026

Despliegue integral para casas de comida con delivery (Dale!QueVoy o particular) y takeaway. Impresión automática en cocina al pasar a estados marcados con el check *🖨️ Imprimible* (ej: "En cocina"), comanda física lista para el despachador, logotipo oficial de alta fidelidad y simulación gastronómica completa bajo la marca **BigHouse — The Smash Master**.

### Componentes e Innovaciones Implementadas:

#### Comandas con Auto-Print
Formato ticket estándar 58mm y 80mm ESC/POS con `@media print`. Al mover un pedido a **"En cocina"** o cualquier estado con `printable: true`, se dispara la orden de impresión al instante sin clicks manuales.

#### Demo BigHouse con Logotipo
Identidad visual de lujo con emblema circular oficial, catálogo de 18 productos smash artesanales, 6 categorías, combos y cervezas. Manifiesto apasionado del dueño, horarios nocturnos y preguntas frecuentes.

#### 5 Pedidos & Logística Dual
5 pedidos simulados (`PED-BH-201` al `205`) que recorren Dale!QueVoy con PIN de 4 dígitos, cadetes propios zonales (Lucas y Mateo) y Retiro en Mostrador Takeaway sin intermediarios.

---

## Diapositiva 18: Optimización UX/UI Storefront: Visibilidad de Marca y Sistema de Botones de Compra

> **Hito / Estado:** Etapa 18 · Release 25 de Octubre 2026

Auditoría y resolución de contraste visual para la experiencia de usuario: logotipo y nombre del comercio siempre nítidos en la barra superior integrada, rediseño del sistema de botones de compra con mutación fluida "+ Agregar" / control de cantidades y botones de personalización gastronómica.

### Componentes e Innovaciones Implementadas:

#### Marca y Topbar Nítidos
Corrección del contraste en cabecera: el nombre de la tienda y su emblema oficial se integran con fondo translúcido y desenfoque adaptativo `--nav-bg`, eliminando textos invisibles y asegurando lectura impecable tanto en temas oscuros como claros.

#### Botones "+ Agregar" y "Personalizar"
Reemplazo de controles pasivos por botones claros de llamada a la acción: botón rojo con gradiente para productos con opciones (hamburguesas) y botón interactivo `+ Agregar` que muta instantáneamente al contador de unidades al primer clic.

#### Categorías y Modales Optimizados
Los selectores de categorías ahora destacan la categoría activa con color de acento de marca y eliminan estados de hover blanco-sobre-blanco. Los botones de modificadores en el modal de detalle cuentan con botones claros y alto contraste.

---

## Diapositiva 19: Ecosistema Multi-Rubro Oficial: 8 Comercios Hiper-Completos y Purga de Cuentas Legadas

> **Hito / Estado:** Etapa 19 · Release 26 de Octubre 2026

Renovación integral del ecosistema demo de ClickApp: purga definitiva y neutralización de 13 cuentas obsoletas, completitud exhaustiva de 4 marcas existentes y creación de 3 nuevas cuentas demo representativas de la economía real (Indumentaria Palermo, Insumos San Justo y Corralón San Vicente) con logotipos oficiales, historias de autor, FAQs hiper-reales y catálogos enriquecidos.

### Componentes e Innovaciones Implementadas:

#### Purga de 13 Cuentas Desactivadas
Eliminación integral de productos, categorías y pedidos huérfanos, y neutralización en base de datos para cuentas obsoletas (`gastronomia`, `burgerhouse`, `ferrenow`, cuentas vacías y demos sin identidad). Visitar sus URLs devuelve ahora un estado limpio y no encontrado.

#### 4 Cuentas Existentes Completadas al 100%
Reconstrucción bajo el estándar BigHouse para **FerreNow** (Ferretería Industrial Munro), **Kiosco Julio 24hs** (Belgrano), **Nout Accesorios** (Recoleta) y **TecnoMont** (Gaming Caballito). Cada una con logotipo oficial generado, paleta cromática, bio de fundadores y 18 productos con fotos HD y precios ARS reales.

#### 3 Nuevos Rubros Estratégicos
Incorporación de **Biuti** (Indumentaria Femenina +35yo, Palermo CABA), **TodoListo** (Librería Comercial, San Justo AMBA) y **Lugones Silva** (Distribuidor Mayorista de Materiales de Construcción, San Vicente AMBA) con catálogo exhaustivo de 18 productos y logística adaptada.

---

## Diapositiva 20: Vitrina Interactiva en la Home: 8 Tiendas Demo en Vivo con Filtro de Rubros

> **Hito / Estado:** Etapa 20 · Release 26 de Octubre 2026

Integración en la página principal (`landing.html`) de una sección premium para experimentar las 8 tiendas demo oficiales. Filtros en tiempo real por rubro gastronómico, ferretero, tecnológico, textil y librería con animaciones fluidas, logos hiper-reales y enlaces directos al catálogo de compra.

### Componentes e Innovaciones Implementadas:

#### Filtro de Rubro Instantáneo
Píldoras interactivas (Gastronomía, Ferretería & Corralón, Kiosco, Tecnología, Moda y Librería) que filtran dinámicamente el catálogo sin recarga de página mediante micro-animaciones `fadeInUp`.

#### Tarjetas de Alta Conversión
Diseño de tarjetas de comercio con logo oficial, geolocalización bonaerense/porteña, insignia de rubro en tono cromático exacto, tags de beneficios y botón **Ver Tienda Demo** con enlace a `/tienda.html?store=...`.

#### Experiencia Mobile & QR Ready
Los potenciales clientes de DaleTePido pueden explorar desde cualquier smartphone cómo ven sus clientes el catálogo veloz, el carrito con opciones de variantes y el despacho directo a WhatsApp sin comisiones.

---

## Diapositiva 21: Micro Videos de 5 Segundos: Video Commerce de Alta Conversión para Planes Enterprise & Testers

> **Hito / Estado:** Etapa 21 · Release 26 de Octubre 2026

Incorporación de clips audiovisuales de 5 segundos estilo Reels/TikTok integrados directamente en el catálogo. Restricción por membresía como palanca de monetización, validación estricta de duración en el Dashboard y reproducción fluida en loop tanto en las tarjetas del catálogo como en el Drawer multimedia de compra.

### Componentes e Innovaciones Implementadas:

#### Límite Estricto de 5 Segundos
Validación en cliente con `video.duration &le; 5.5s` al subir o vincular clips MP4/WebM. En la tienda, un listener en `timeupdate` garantiza el reinicio instantáneo al segundo 5.0, protegiendo el consumo de datos móviles y la velocidad.

#### Segmentación Enterprise & Testers
Palanca de monetización (upsell): los comercios en Starter o Pro visualizan el campo con candado interactivo y botón de upgrade. Las cuentas Enterprise y la flota de 8 tiendas oficiales cuentan con acceso irrestricto.

#### Experiencia Grid & Drawer
Insignia roja **5s Video** en el catálogo con previsualización en hover (desktop) y reproductor en cabecera del modal de detalle con control de audio, integrado armoniosamente con el carrusel de fotos.

---

## Diapositiva 22: Auditoría Integral de Plataforma: Conectividad DB, Funcionalidad Backend & Accesibilidad WCAG

> **Hito / Estado:** Etapa 22 · Release 26 de Octubre 2026

Evaluación exhaustiva de la robustez de DaleTePido en sus tres dimensiones esenciales: verificación de latencias y tablas en Supabase, pruebas funcionales unitarias de serverless functions (`api/*.js`) y blindaje de accesibilidad UI (WCAG 2.1 AA) con etiquetas semánticas, lectores de pantalla y contraste.

### Componentes e Innovaciones Implementadas:

#### Conectividad DB (Supabase)
Validación HTTP 200 en todas las tablas activas (`company_settings`, `products`, `categories`, `orders`, `faqs`) con latencias medias de 220-280ms y almacenamiento en Storage Buckets verificado.

#### Seguridad & Aislamiento Multi-Tenant Estricto (Anti-BOLA/IDOR)
Blindaje integral anti-vulnerabilidades BOLA/IDOR: eliminación de auto-login o bypass por parámetro de URL (`?store=`). Ahora se exige validación estricta de sesión (JWT firmado / clave del comercio) interceptando con portal de login de seguridad si se intenta acceder a una tienda no autorizada. Aislamiento total de pedidos con verificación `store_id === STORE_ID`, productos en ABM (`storeapp_local_products_${STORE_ID}`) y configuraciones sin fugas entre cuentas.

#### Accesibilidad UI & Alto Contraste (WCAG 2.1 AA)
Jerarquía semántica `h1` incorporada en Dashboard y Super Admin. Controles de formulario con `for` / `id` y `aria-label` completos. Blindaje exhaustivo de contraste en Modo Claro: badges de plan (#sb-plan-badge) con fondos y bordes definidos, banners de alerta con ratios $\ge 4.5:1$, tarjetas de accesos rápidos nítidas y eliminación de degradados oscuros que oscurecían textos.

---

## Diapositiva 23: Precios con Descuento (% OFF), Precios Anteriores Tachados y Open Graph Dinámico

> **Hito / Estado:** Etapa 23 · Release 27 de Octubre 2026

Despliegue transversal para todas las tiendas (actuales y futuras) de una suite de promociones en ABM, visualización de ofertas en catálogo e interoperabilidad social al compartir productos por WhatsApp.

### Componentes e Innovaciones Implementadas:

#### Motor Bidireccional de Precios en ABM
Incorporación en el modal de producto de tres controles sincronizados: `Precio Actual` (venta por defecto), `Precio Anterior` (referencia tachada) y `Descuento % OFF`. Si el comerciante ingresa un 20% de oferta, se calcula automáticamente el precio de venta final y la insignia promocional interactiva.

#### Experiencia Visual de Tienda & Despeje UX
Tanto en las tarjetas de producto como en el drawer de detalles, se exhibe el valor anterior tachado (`<s>$ 300.000</s>`) junto a la insignia de descuento (`-20% OFF`) y el valor actual destacado. Se reubicó además el chip de stock en la esquina inferior izquierda con sombra y contraste para no colisionar jamás con el botón de compartir.

#### Open Graph & Compartir Enriquecido
Optimización del micro-servicio SSR (`api/store.js`) y del cliente frontend: al compartir un producto en WhatsApp o redes sociales, se inyectan metadatos `og:image` en alta resolución (1200x630), título limpio, precio con oferta formateada (`🔥 $240.000 Antes: $300.000`) y descripción limpia sin código técnico.

---

## Diapositiva 24: Selector de Vista Dual en ABM: Lista Clásica y Cuadrícula con Fotos

> **Hito / Estado:** Etapa 24 · Release 27 de Octubre 2026

Incorporación de un control de permutación de interfaz que permite al comerciante alternar de forma instantánea entre la vista tabular tradicional y una galería visual con imágenes reales de alta resolución.

### Componentes e Innovaciones Implementadas:

#### Control Segmentado e Interactivo
Ubicado en la barra superior de filtros del ABM, el gestor dispone de dos botones integrados: `Formato actual` (tabla compacta) y `Con foto` (cuadrícula visual). La selección se persiste automáticamente en `localStorage` para recordar la preferencia del usuario entre sesiones.

#### Galería Visual con Fotos de Producto
La vista con fotos despliega tarjetas responsivas con portada panorámica (aspect-ratio 4:3), badge de visibilidad (Visible/Oculto), chip de stock, categoría, marca, precio de oferta tachado con badge de descuento y precio de venta en verde destacado.

#### Gestión Rápida y Edición Ágil
Tanto al hacer clic en la fotografía como en el título de la tarjeta se abre inmediatamente el modal de edición del producto. Además, cada tarjeta integra los accesos directos para clonar, alternar visibilidad y eliminar con confirmación de seguridad.

---

## Diapositiva 25: Blindaje en Modal de Productos, Normalización CDN y Service Worker PWA v18

> **Hito / Estado:** Etapa 25 · Release 27 de Octubre 2026

Resolución integral de fallos en apertura de modal, prevención proactiva de errores 404 multimedia y resiliencia en el Service Worker para evitar bloqueos FetchEvent/net::ERR_FAILED ante peticiones externas.

### Componentes e Innovaciones Implementadas:

#### Protección Anti-Null en Modal de Producto
Corrección del error `TypeError: Cannot set properties of null` al abrir el formulario de creación o edición. Se incorporó el elemento faltante `m-img3-status` y se blindó el acceso a todos los elementos del DOM con verificaciones defensivas.

#### Normalizador Global de URLs Unsplash
Función `normalizeImgUrl` en dashboard y storefront: detecta identificadores planos (ej. `photo-1548624149...`) y los transforma automáticamente en URLs absolutas CDN seguras con optimización WebP, evitando errores 404 locales.

#### Service Worker PWA v18 Sin Errores Fetch
Actualización de `sw.js` a v18: se eliminó `Response.error()` que disparaba advertencias de FetchEvent en Chrome y se desacoplaron llamadas de terceros y APIs dinámicas para que el navegador las resuelva de forma nativa sin generar `ERR_FAILED`.

---

## Diapositiva 26: Zona de Carga Protagonista (Dropzones) y Detección Inteligente Gemini / Google AI

> **Hito / Estado:** Etapa 26 · Release 27 de Octubre 2026

Evolución de la experiencia multimedia en el modal de productos: interfaz Drag & Drop de nivel SaaS premium, preservación de URLs directas en cajón colapsable y salvaguarda activa ante enlaces temporales de IA generativa.

### Componentes e Innovaciones Implementadas:

#### Dropzone Principal Protagonista
Diseño protagonista en Paso 4: área de soltado intuitiva con micro-animación al arrastrar (dragover), soporte para archivos directos, aplicación automática de marca de agua y slots secundarios estilizados para fotos 2 y 3.

#### Alerta Inteligente de URLs Temporales Gemini
Detección en tiempo real de URLs de Google AI / Gemini (`googleusercontent.com`, `generativelanguage`, tokens con expiración) con un banner ámbar preventivo que guía al comerciante a subir el archivo de manera permanente.

#### Cajón Colapsable para Enlaces Web Directos
Flexibilidad total: quienes gestionan productos con URLs de catálogos mayoristas o CDNs propios disponen de un toggle discreto que despliega los campos manuales sin recargar ni entorpecer la experiencia del comerciante.

#### Corrección de Checkout & Opt-In de WhatsApp
Resolución de `ReferenceError: optInWapp is not defined` al enviar el pedido por WhatsApp. Se sincronizó la lectura segura del checkbox `#f-optin-wapp`, asegurando el despacho inmediato a WhatsApp y su registro en base de datos.

---

## Diapositiva 27: Persistencia Obligatoria en Supabase & Flujo Secuencial hacia WhatsApp

> **Hito / Estado:** Etapa 27 · Release 27 de Octubre 2026

Resolución del bug de congelamiento en móviles: la orden se persiste obligatoriamente en `public.orders` con estado de carga antes de cualquier redirección externa, blindando el registro en tiempo real.

### Componentes e Innovaciones Implementadas:

#### Estado de Carga (isSubmitting) & Anti-Double-Click
Al confirmar el checkout, el botón de compra se bloquea inmediatamente (`disabled = true`) y despliega un spinner con texto *"Procesando pedido..."*, imposibilitando órdenes duplicadas mientras se procesa la solicitud.

#### Persistencia Await en `public.orders`
Se erradicó la redirección prematura: `fetchSupabase` realiza el `INSERT` asincrónico y espera la confirmación (`HTTP 201`). Esto previene que el navegador móvil congele la ejecución de JavaScript al abrir WhatsApp.

#### Aborto Seguro ante Errores de Red o Base de Datos
Si la inserción en Supabase falla por cualquier causa, el bloque `catch` restaura el botón al estado activo y muestra un toast descriptivo. **Bajo ningún concepto se redirige a WhatsApp si la orden no quedó guardada en el backend.**

#### Limpieza Atómica & Redirección Formateada
Únicamente tras la respuesta exitosa del servidor se vacía el carrito en memoria/localStorage y se abre WhatsApp con el identificador oficial `#TP-XXXX`, incorporando fallback automático a `location.href` ante bloqueadores de popups móviles.

---

## Diapositiva 28: Blindaje SEO en Google, Redirección 301 de Subdominios Huérfanos & Snippets Limpios

> **Hito / Estado:** Etapa 28 · Release 27 de Octubre 2026

Corrección integral de indexación en Google: mitigación del rastreo indebido de subdominios de ejemplo (`mi-negocio.daletepido.com.ar`), redirecciones canónicas 301, metatags descriptivos de fallback y protección anti-snippets con `data-nosnippet`.

### Componentes e Innovaciones Implementadas:

#### Redirección 301 Permanente & NoIndex Automático
En `api/store.js`, cualquier solicitud a subdominios de mockup (como `mi-negocio` o `tu-tienda`) o subdominios no registrados en Supabase ahora responde con **redirección permanente 301 hacia `https://daletepido.com.ar/`** y cabecera `X-Robots-Tag: noindex, nofollow, noarchive`, transfiriendo autoridad a la home y purgando URLs huérfanas de Google.

#### Metatags Fallback & Título de Marca Oficial
Se reemplazó el título estático obsoleto por el oficial *"Dale! Te Pido — Catálogo Online para WhatsApp"* y se integró una etiqueta `meta description` por defecto para evitar que los rastreadores concatenen textos aleatorios del DOM.

#### Directiva data-nosnippet Anti-Cargando Productos
Se blindaron los elementos de carga y badges estructurales (badges de tienda, pills de envío y labels de carga) con el atributo estándar `data-nosnippet`, asegurando que Google jamás vuelva a mostrar textos temporales o skeletons en sus snippets de búsqueda.

#### Higiene de Enlaces en el Comprobador de Nombres
En `landing.html`, el comprobador en tiempo real fue aislado con `data-nosnippet` y referencias canónicas seguras, evitando que los spiders de búsqueda interpreten los ejemplos visuales de registro como páginas activas independientes.

---

## Diapositiva 29: Aislamiento Estricto RLS en Supabase (public.orders & public.pickups)

> **Hito / Estado:** Etapa 29 · Release 28 de Octubre 2026

Blindaje definitivo contra Broken Object Level Authorization (BOLA / IDOR): inserción anónima segura sin exposición de lecturas (Zero-Read Insert) y control de acceso estricto para comercios autenticados.

### Componentes e Innovaciones Implementadas:

#### Inserción Anónima Segura (Zero-Read Insert)
Los clientes en el storefront (`tienda.html`) cuentan con permiso exclusivo de `INSERT` con validación de `store_id` y estados iniciales permitidos. Se revocaron por completo los permisos de `SELECT`, `UPDATE` y `DELETE` para el rol anónimo.

#### Bloqueo Total de Fugas BOLA / IDOR con anon_key
Cualquier consulta con la clave anónima hacia `/rest/v1/orders` o `/rest/v1/pickups` (incluso manipulando `?store_id=...` o `?id=...`) es bloqueada al 100% por PostgreSQL con **0 filas devueltas**, protegiendo datos personales de clientes.

#### Función Determinística get_auth_store_id()
Se implementó la función `SECURITY DEFINER` en PostgreSQL que resuelve de manera infalsificable la identidad del comercio desde los claims JWT (`store_id`, `app_metadata` o email verificado), asegurando aislamiento multi-tenant estricto.

#### Protección Integral de Cadetería (public.pickups)
La tabla de cadetes y puntos de entrega propios queda 100% oculta para usuarios anónimos. Solo el comercio titular autenticado puede visualizar, dar de alta y asignar sus repartidores y ubicaciones de retiro.

---

## Diapositiva 30: Badges Dinámicos de Conteo en Navegación Lateral (Sidebar UX)

> **Hito / Estado:** Etapa 30 · Release 28 de Octubre 2026

Indicadores numéricos en tiempo real en la barra lateral para verificar volúmenes de pedidos, productos, categorías, cupones y cadetes sin necesidad de ingresar a cada sección, con ocultamiento automático cuando el conteo es cero.

### Componentes e Innovaciones Implementadas:

#### Verificación Inmediata sin Fricción
El comerciante puede ver de un vistazo en la barra lateral cuántos **Pedidos** tiene registrados, el volumen de **Productos (ABM)** en catálogo, el total de **Categorías** y los **Cupones** de descuento activos.

#### Ocultamiento Inteligente en Cero (Zero Noise)
Si el comercio no posee elementos cargados en esa sección (o el conteo es 0), el badge se oculta automáticamente (`display: none`). La barra permanece limpia, profesional y libre de ruido visual.

#### Diseño Circular & Píldora de Alta Precisión
Geometría adaptativa: círculo de 20px para números de 1 dígito y píldora expandible con espaciado óptimo para 2 o más dígitos. Incluye borde sutil de contraste, cifras tabulares monoespaciadas y armonía cromática al seleccionar o pasar el cursor (hover / active).

#### Reactividad y Soporte Modo Oscuro
Actualización instantánea al crear, editar o eliminar registros sin recargar la página. Ajuste automático de paleta (`--zinc` / `--fog`) al alternar entre modo claro y modo oscuro (High Contrast Obsidian).

---

## Diapositiva 31: Estandarización de Iconografía Vectorial (Bootstrap Icons en UI)

> **Hito / Estado:** Etapa 31 · Release 28 de Octubre 2026

Reemplazo integral de emojis nativos dependientes del sistema operativo por iconografía SVG profesional (Bootstrap Icons) en accesos directos, tarjetas de métricas, wizard de setup, modales logísticos y notificaciones toast.

### Componentes e Innovaciones Implementadas:

#### Accesos Directos del Inicio (Grid 5x2)
Los 10 atajos operativos (Analítica, Pedidos, PickUp, Productos, ABM, Categorías, Diseño, Configuración, Avanzado y Ver Tienda) disponen ahora de íconos vectoriales SVG armonizados con fondo de contraste y micro-animación en hover.

#### Tarjetas de Métricas & Asistente Setup
Los indicadores clave (Pedidos, Facturado, Ticket Promedio, Productos Activos) y las 8 tarjetas del asistente de configuración guiada exhiben glifos monocromáticos limpios alineados a la identidad visual de la plataforma.

#### Modal Dale!QueVoy & Trazabilidad Multimodal
Tanto en el dashboard como en la tienda web, los medidores de peso, categorías de bulto, flota multimodal (bicis/motos) y casillas de PIN de seguridad reemplazan los emojis por íconos nítidos independientes del renderizado de cada móvil o navegador.

#### Notificaciones Toast Inteligentes
Los métodos globales `showToastDash()` y `showToast()` reconocen el tipo de mensaje y reemplazan automáticamente prefijos de emojis por badges SVG vectoriales (éxito, advertencia, error e información), garantizando consistencia estética.

---

## Diapositiva 32: Drag & Drop Táctil y con Mouse en el Tablero Kanban (UX Operativa)

> **Hito / Estado:** Etapa 32 · Release 28 de Octubre 2026

Modernización del flujo operativo de pedidos: transición de estados por arrastre directo entre columnas con soporte dual (ratón en escritorio y gestos táctiles en tablets/móviles), detección de dropzones y feedback háptico.

### Componentes e Innovaciones Implementadas:

#### Arrastre Dual (Desktop Mouse & Tablet Touch)
Los pedidos pueden moverse tanto con el ratón mediante la API nativa HTML5 Drag & Drop como con el dedo en pantallas táctiles (iPads, tablets de mostrador y smartphones) mediante un clon flotante cinemático (`.kanban-card-touch-clone`) sin bloquear los botones internos ni selectores.

#### Columnas Destino Activas & Zonas Vacías
Al sobrevolar una columna, se activa un borde punteado con fondo de contraste (`.kanban-cards.drag-over`). Incluso en columnas que no tengan pedidos vigentes, se preserva un área receptora visible (*"Soltá pedidos acá"*) para arrastre inmediato.

#### Feedback Háptico & Auto-scroll Lateral
En dispositivos móviles y tablets compatibles, la vibración háptica confirma el inicio del arrastre (25ms) y el éxito al soltar el pedido en el nuevo estado ([20, 40, 25]ms). Además, al arrastrar cerca de los extremos, el tablero realiza auto-scroll horizontal suave.

#### Sincronización y Disparador de Comandas
Cada cambio de columna persiste inmediatamente en Supabase / Google Sheets, notifica con un toast estilizado y, si el estado de destino tiene activo el check de **Imprimible** (ej: *En preparación*), dispara automáticamente la comanda térmica de 58/80mm.

---

## Diapositiva 33: Desacoplamiento de Verificación de Email y Blindaje de Alertas SuperAdmin

> **Hito / Estado:** Etapa 33 · Release 28 de Octubre 2026

Aislamiento estricto entre el reenvío de confirmación de correo para comercios y la alerta de nuevas tiendas a SuperAdmin (daletepido@gmail.com), plantilla transaccional dedicada, eliminación de fallbacks hardcodeados y feedback moderno con toasts no bloqueantes.

### Componentes e Innovaciones Implementadas:

#### Desacoplamiento de Alertas SuperAdmin
En `api/welcome-email.js`, el disparador `notifyAdminNewAccount` quedó estrictamente restringido a registros genuinos (`type === 'new_registration' || type === 'welcome'`). El reenvío de verificación jamás enviará alertas engañosas de "¡Nueva Cuenta Registrada!" a `daletepido@gmail.com` ni generará falsas alarmas sobre tiendas ya existentes.

#### Plantilla Transaccional getVerificationEmail
En `api/email-templates.js`, se diseñó la plantilla oficial `getVerificationEmail` con el asunto *"Confirmá tu correo electrónico - Dale! Te Pido"*, enlace directo de verificación de un solo clic (`?verify=true`), tipografía limpia y diseño responsivo adaptado a clientes de correo modernos.

#### Limpieza de Fallbacks & Detección Dinámica
En `dashboard.html`, se eliminaron los fallbacks residuales que forzaban la tienda 'coquito' ante la ausencia de variables globales. Se introdujeron las funciones `getDashboardStoreId()` y `getDashboardAdminEmail()` que resuelven limpiamente desde URL, sesión y Supabase.

#### Notificaciones Toast UX No Bloqueantes
Se erradicó el uso del diálogo invasivo `alert()` nativo del navegador, sustituyéndolo por un componente toast (`showToastVerification`) flotante, con desenfoque de fondo (backdrop blur), auto-cierre en 5 segundos y micro-animación en tiempo real.

---

## Diapositiva 34: Control de Catálogo Limpio & Erradicación de Categorías Fantasma en Altas

> **Hito / Estado:** Etapa 34 · Release 28 de Octubre 2026

Resolución integral de precargas automáticas inconsultas de categorías en el registro de tiendas: catálogos 100% en blanco por defecto, casilla de verificación opt-in explícita, y saneamiento total del catálogo de pruebas LicaLic.

### Componentes e Innovaciones Implementadas:

#### Saneamiento Inmediato de LicaLic en Supabase
Se purgaron de la base de datos las 5 categorías de ferretería inyectadas automáticamente por el antiguo script de registro. La cuenta `store_id: licalic` quedó en estado **100% limpio y en blanco** (0 productos, 0 categorías), lista para pruebas manuales paso a paso sin interferencias.

#### Casilla Opt-in Explícita en Onboarding (alta-usuario.html)
Se desactivó la ejecución forzada de `seedCategoriesForNewStore`. Ahora se exhibe un control claro: *"Precargar 5 categorías sugeridas para este rubro"*, **desmarcado por defecto**. Solo si el comerciante lo elige activamente se inyectarán sugerencias iniciales.

#### Supresión de Inserciones Silenciosas en Landing
En `landing.html` se eliminó la inserción automática en segundo plano de categorías dummy (*Productos Destacados, Promociones, Novedades, Catálogo General*). Toda nueva cuenta registrada inicia de forma impecable sin registros no deseados.

#### Generación Asistida Bajo Demanda en Dashboard
Cuando una tienda tiene 0 categorías, el panel de control despliega un estado vacío intuitivo con accesos a *"Crear Categoría"* manual y *"Generar Categorías Iniciales"* con 1 solo clic, preservando la libertad total del usuario sin imponer datos predefinidos.

---

## Diapositiva 35: Blindaje de Seguridad OWASP & Experiencia de Usuario Premium

> **Hito / Estado:** Etapa 35 · Release 28 de Octubre 2026

Despliegue integral de sanitización universal Anti-XSS, cabeceras HTTP de seguridad estricta en Edge (CSP, HSTS, X-XSS-Protection), honeypot anti-bot en checkout, buscador global Command Palette (Ctrl+K), micro-feedback sonoro sintetizado y suite de cartelería QR para vidrieras y mostradores.

### Componentes e Innovaciones Implementadas:

#### Sanitización Universal Anti-XSS (escapeHTML)
Implementación de la utilidad centralizada `escapeHTML(str)` en `dashboard.html` y `tienda.html`. Se neutralizó la posibilidad de inyecciones Stored XSS en nombres de clientes, direcciones, notas de pedido y campos de catálogo al renderizar tarjetas Kanban y tablas.

#### Headers Edge CSP, HSTS & Honeypot Anti-Bot
Configuración en `vercel.json` de cabeceras de máxima protección: *Content-Security-Policy*, *Strict-Transport-Security* (HSTS preload) y *X-XSS-Protection*. En el checkout de la tienda se incorporó un honeypot oculto y debounce de 4s para repeler flooding de bots.

#### Buscador Omnibox Command Palette (Ctrl + K)
Paleta de comandos flotante accesible vía atajo de teclado `Ctrl + K` o botón en la barra superior. Búsqueda instantánea multi-criterio sobre pedidos (#ID, clientes), productos, cadetes de reparto y acceso directo a todas las vistas operativas del panel.

#### Audio Sintetizado, Hápticos & Kit QR Mostrador
Micro-interacciones con Web Audio API sintetizada (clicks sutiles y timbre de caja registradora al mover pedidos en Kanban) con botón de muteo y feedback háptico. Acceso directo al generador de cartelería y códigos QR en resolución HD A4/A5 para vidrieras y mostradores.

---

## Diapositiva 36: Tiempo Real Supabase WebSockets, Tracking Público & Optimización WebP

> **Hito / Estado:** Etapa 36 · Release 28 de Octubre 2026

Despliegue de sincronización bidireccional en vivo para el Dashboard del comercio, pantalla pública de seguimiento en tiempo real para el comprador final y optimización de medios con compresión CDN al vuelo.

### Componentes e Innovaciones Implementadas:

#### Sincronización Bidireccional en Vivo (supabase.channel)
Conexión WebSocket activa en `dashboard.html` con filtrado por tienda. Cuando un repartidor de Dale!QueVoy valida el PIN de 4 dígitos o se actualiza un pedido en Supabase, la tarjeta se mueve sola de columna en el Kanban con micro-animación elástica y feedback auditivo, sin requerir recargar la pantalla (F5).

#### Tracking Público para Compradores (tracking.html)
Pantalla pública ultra-rápida y adaptada a móviles con stepper interactivo de 4 etapas (Recibido ➔ En Preparación ➔ En Camino ➔ Entregado). Exhibe el código PIN seguro de entrega, detalle de productos y botón de WhatsApp, reduciendo drásticamente las consultas de "¿Dónde viene mi pedido?".

#### Compresión Dinámica WebP & Core Web Vitals
Optimización al vuelo de imágenes en `tienda.html` mediante parámetros dinámicos de CDN (`auto=format&fit=crop&q=80`, Cloudinary `f_webp,q_auto` y Supabase render), combinados con dimensiones fijas, `loading="lazy"` y `decoding="async"` para acelerar la carga en redes móviles 4G/3G.

#### Botón "Copiar Tracking" & Link en WhatsApp
Integración de botón de un clic para copiar el enlace de seguimiento desde las tarjetas del Kanban y la tabla de pedidos del Dashboard. Además, el checkout de la tienda genera e incluye automáticamente la URL directa de tracking en el mensaje enviado por WhatsApp.

---

## Diapositiva 37: Alineación Comercial: Pausa Estratégica de Dale!QueVoy, Tickets de Pedido Interno & SEO WhatsApp

> **Hito / Estado:** Etapa 37 · Release 28 de Octubre 2026

Ajuste de abordaje comercial centrado en la simpleza: resguardo de visibilidad de Dale!QueVoy mientras evoluciona su red, evolución del ticket a "Pedido Interno" para preparación y reposición de proveedores, OpenGraph para WhatsApp y Core Web Vitals.

### Componentes e Innovaciones Implementadas:

#### Pausa Estratégica de Dale!QueVoy
Ocultamiento proactivo de botones y referencias a la red logística en la landing page y el Dashboard. Evita generar dudas en comerciantes potenciales mientras la infraestructura de cadetes continúa su maduración técnica tras bambalinas.

#### Tickets de "Pedido Interno" (Uso Mostrador / Proveedores)
Reorientación de la comanda térmica tradicional: ahora llamada **"Pedido Interno"**, útil no sólo para cocina o empaque, sino como recordatorio físico tipo post-it para reponer mercadería agotada ante distribuidores y proveedores.

#### SEO Técnico, OpenGraph & Rich Previews en WhatsApp
Implementación de meta tags OpenGraph completos (`og:title`, `og:description`, `og:image`, `og:url`) y Twitter Card para que los links compartidos por WhatsApp o redes muestren previews atractivos y profesionales.

#### Core Web Vitals & Optimización de Medios
Atributos `loading="lazy"`, `decoding="async"` y dimensiones explícitas en todos los logos de tiendas demo, jAIme y navbar de la landing page, eliminando Cumulative Layout Shift (CLS) y reduciendo el consumo de datos móviles.

---

## Diapositiva 38: Readiness Pre-Campaña: Embudo Directo de Alta, Vault Cloud AES-256-GCM & Blindaje de Tiendas Demo

> **Hito / Estado:** Etapa 38 · Release 29 de Octubre 2026

Optimización integral anti-fricción para campañas de adquisición en redes sociales: apertura directa del wizard de creación, sincronización multi-dispositivo cifrada de pedidos/cadetes/tracking y bloqueo de edición no autorizada en los 7 catálogos de muestra.

### Componentes e Innovaciones Implementadas:

#### Embudo de Alta sin Fricción (CTAs a Registro)
Todos los botones **"Crear Catálogo Gratis"** en `landing.html` y la vista inicial de `alta-usuario.html` abren de inmediato el Paso 1 del creador de comercio y emiten un token JWT HMAC-SHA256 real al finalizar.

#### Vault Cloud AES-256-GCM (Pedidos, Kanban & Tracking)
Sincronización multi-dispositivo cifrada en `/api/auth` y `/api/security` para recepción de pedidos en el Kanban, persistencia de cambios de estado, gestión de repartidores y seguimiento en vivo cada 8s en `tracking.html`.

#### Sesión Criptográfica en Asistente IA Gemini
Inyección automática del header `x-store-session` en todas las peticiones a `/api/gemini` desde `dashboard.html`, habilitando la asistencia por IA desde el minuto cero para comercios nuevos.

#### Blindaje de las 7 Tiendas Demo & Redirección 301
Protección con hash criptográfico `salt:sha256` en `store_auth` para las 7 tiendas demo públicas (`bighouse`, `noutacc`, `ferre-now`, etc.) y redirección 301 en `/api/store` ante cuentas dadas de baja.

---

