# Detalle Técnico del Proyecto: StoreApp (FerreApp) - Etapa 2

Este documento proporciona un desglose exhaustivo de los cambios técnicos y funcionales realizados por el agente Jules durante la Etapa 2 del proyecto StoreApp.

## 1. Migración y Arquitectura de Datos
*   **Transición a Supabase:** Se migró el sistema de almacenamiento de datos de una arquitectura basada exclusivamente en Google Sheets (CSV) a una integración robusta con **Supabase (PostgreSQL)**.
    *   Uso de `fetch` con headers de autenticación (`apikey` y `Authorization: Bearer`).
    *   Manejo de IDs tipo UUID para productos y pedidos.
    *   Sincronización bidireccional: Los cambios en el Dashboard se impactan en Supabase mediante métodos `PATCH` y `POST`.
*   **Compatibilidad Legacy:** Se mantuvo el soporte para Google Sheets como fallback y para carga masiva inicial, procesando los datos mediante un parser CSV personalizado que ahora incluye las columnas `img2` e `img3`.

## 2. Mejoras en la Experiencia de Usuario (Tienda)
*   **Sistema de Imágenes Avanzado:**
    *   **Carrusel Dinámico:** Se implementó un carrusel en el `pdrawer` (detalle del producto) que permite navegar entre las 3 imágenes disponibles (`img`, `img2`, `img3`) con miniaturas interactivas (`carousel-thumb`).
    *   **Efecto Hover en Grid:** En la vista principal, las tarjetas de producto ahora muestran una segunda imagen (`hover-img`) al pasar el puntero, mejorando la previsualización rápida.
    *   **Optimización On-the-Fly:** Implementación de la función `optimizeImg(url)` que intercepta URLs de Cloudinary para inyectar parámetros de transformación automática (`f_webp,q_auto`), reduciendo drásticamente el peso de carga.
*   **Banners Promocionales:**
    *   Inyección dinámica de banners 50/50 mediante `renderBanners()`.
    *   Integración con el sistema de filtrado: El clic en un banner dispara `filterCat()` y realiza un `scroll smooth` hacia el grid de productos.

## 3. Funcionalidades Administrativas (Dashboard)
*   **ABM Multi-imagen con Procesamiento Local:**
    *   El modal de edición fue rediseñado para gestionar 3 archivos/URLs simultáneamente.
    *   **Watermarking Engine:** Integración de la función `applyWatermark(file)` que utiliza la **Canvas API** para procesar imágenes en el cliente antes del upload. Escala el logo al 15% del tamaño de la imagen y aplica un fondo semi-transparente para asegurar la legibilidad de la marca.
*   **Catálogo Inteligente (AI-Powered):**
    *   **Búsqueda EAN/SKU:** Nueva funcionalidad `buscarCodigo()` que consulta a la API de **Claude (Anthropic)** para identificar productos automáticamente a partir de su código de barras.
    *   **Generación de Descripciones:** Botón "Generar con IA" para crear especificaciones técnicas coherentes basadas en el nombre y categoría del producto.
*   **Gestión de Pedidos (Kanban):**
    *   Mejora del tablero Kanban con estados personalizables almacenados en `localStorage`.
    *   Lógica de **"Auto-Lost"**: Los pedidos sin actividad por más de 15 días cambian automáticamente al estado "Perdido".
    *   Automatización de mensajes: Funciones `enviarMensajeRetiro` y `enviarMensajeEnCamino` que generan plantillas preformateadas para WhatsApp.

## 4. Detalles de Implementación (Código)
*   **Funciones Clave Añadidas:**
    *   `applyWatermark(file)`: Manipulación de `ImageData` y `toBlob`.
    *   `optimizeImg(url)`: String manipulation para parámetros Cloudinary.
    *   `renderBanners(bannerData)`: Generación de DOM dinámico con templates.
    *   `registrarPedido(pedido)`: Persistencia local y envío vía Webhook.
*   **Nuevas Variables de Estado:**
    *   `localStorage.storeapp_banners`: Persistencia de la configuración visual de promociones.
    *   `localStorage.storeapp_logo`: Almacenamiento en Base64 del logo para procesamiento offline en Canvas.

## 5. Estado de Sincronización
El sistema ahora valida la integridad de los datos entre el servidor y el cliente. Si se detectan inconsistencias en el formato de los IDs (UUID vs numéricos), el Dashboard prioriza los datos de Supabase para evitar colisiones de datos locales desactualizados.
