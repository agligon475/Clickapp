# Contexto del Proyecto: StoreApp (FerreApp) - Etapa 2

Este documento resume la arquitectura, funcionalidades y cambios específicos realizados por Jules en el proyecto StoreApp.

## 1. Propósito y Alcance
StoreApp es una solución de comercio electrónico ligera diseñada para pequeños negocios. Permite gestionar un catálogo de productos, personalizar la apariencia de la tienda y recibir pedidos por WhatsApp. Actualmente se encuentra al final de la **Etapa 2**.

## 2. Arquitectura Técnica
*   **Frontend:** HTML5, CSS3 y JavaScript puro (Vanilla JS). Sin frameworks.
*   **Base de Datos:** **Supabase** (principal) y **Google Sheets** (CSV legacy).
*   **Imágenes:** **Cloudinary** (almacenamiento) y **Canvas API** (procesamiento local).
*   **Persistencia:** `localStorage` para carrito, logo, banners y estado del ABM.

## 3. Cambios Específicos Realizados (Etapa 2)

### 3.1 Soporte Multi-imagen
*   **Dashboard:** Se expandió el modal de producto para soportar 3 URLs/uploads (`m-img`, `m-img2`, `m-img3`).
*   **Tienda:** Se actualizó `loadSheet()` para mapear y persistir las nuevas columnas de imagen.
*   **Fix:** Se corrigió el mapeo de columnas en el parser CSV para asegurar que `img2` e `img3` se lean correctamente tanto en el dashboard como en la tienda.

### 3.2 Marca de Agua Automática
*   Implementación de la función `applyWatermark(file)` en `dashboard.html`.
*   **Lógica:** Al subir una imagen, se dibuja en un Canvas, se superpone el logo (esquina inferior derecha, 15% de tamaño, 80% opacidad) y se exporta como Blob para subir a Cloudinary.
*   **Fallback:** Si no hay logo configurado, se sube la imagen original sin procesar.

### 3.3 Banners Promocionales 50/50
*   **Tienda:** Inserción de `#banners-container` con layout grid (2 cols desktop / 1 col mobile).
*   **Lógica:** Función `renderBanners(data)` que crea banners interactivos que filtran el catálogo por categoría mediante `filterCat()`.
*   **Estilos:** Añadidos efectos de hover (elevación y zoom) y overlays de gradiente.

### 3.4 Panel de Gestión de Banners
*   Se creó una nueva sección en la configuración del Dashboard para editar los banners sin tocar Google Sheets.
*   Incluye campos para etiquetas, títulos, imágenes (con upload a Cloudinary) y categorías de destino.
*   **Sincronización:** Los datos se guardan en `localStorage.storeapp_banners` para que la tienda los consuma inmediatamente.

## 4. Estructura de Archivos
*   `tienda.html`: Implementa `renderBanners()` y el carrusel de previsualización (hover).
*   `dashboard.html`: Contiene `applyWatermark()`, el modal ABM expandido y el nuevo panel de configuración de banners.
*   `ARQUITECTURA-TECNICA.md`: Documenta la lógica detallada de estos cambios.

## 5. Estado del Sistema
Los arreglos de la Etapa 2 aseguran que:
1. Las 3 imágenes se guardan y leen correctamente.
2. El logo se aplica como marca de agua en cada subida.
3. Los banners son dinámicos y editables desde el panel administrativo.
