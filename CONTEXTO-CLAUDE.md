# Contexto del Proyecto: StoreApp (FerreApp) - Etapa 2

Este documento resume la arquitectura, funcionalidades y estado actual del proyecto StoreApp para ser utilizado como contexto en herramientas de IA.

## 1. Propósito y Alcance
StoreApp es una solución de comercio electrónico ligera diseñada para pequeños negocios. Permite a los dueños de negocios gestionar un catálogo de productos, personalizar la apariencia de su tienda y recibir pedidos directamente a través de WhatsApp. El proyecto se encuentra actualmente al final de la **Etapa 2**.

## 2. Arquitectura Técnica
*   **Frontend:** Aplicación web de una sola página (SPA) construida con HTML5, CSS3 (Vanilla + Bootstrap Icons) y JavaScript puro (Vanilla JS). No utiliza frameworks como React o Vue.
*   **Base de Datos / Backend:**
    *   **Supabase:** Motor principal para almacenamiento de productos y configuraciones.
    *   **Google Sheets:** Soporte legado/alternativo mediante publicación CSV.
*   **Almacenamiento de Imágenes:** **Cloudinary** (upload y optimización).
*   **Persistencia Local:** `localStorage` para carrito, logo, configuraciones de diseño y pedidos locales.

## 3. Funcionalidades Clave (Etapa 2)
*   **Gestión Multi-imagen:** Soporte para hasta 3 imágenes por producto (`img`, `img2`, `img3`).
*   **Marca de Agua Automática:** Uso de **Canvas API** para aplicar el logo de la tienda como marca de agua en la esquina inferior derecha antes de subir imágenes a Cloudinary.
*   **Banners Promocionales:** Sistema de banners 50/50 responsivos que permiten filtrar el catálogo por categoría.
*   **Inteligencia Artificial:** Integración opcional con la API de **Claude (Anthropic)** para autocompletar detalles técnicos de productos mediante códigos EAN/SKU.
*   **Pedidos WhatsApp:** Generación de mensajes preformateados con el detalle del pedido para el vendedor.

## 4. Estructura de Archivos
*   `tienda.html`: Interfaz del cliente (catálogo, carrito, carrusel).
*   `dashboard.html`: Panel de administración (ABM, diseño, banners, Kanban).
*   `index.html`: Landing page de entrada.
*   `ARQUITECTURA-TECNICA.md`: Documentación de flujos y lógica de Canvas.
*   `ESTRUCTURA-GOOGLE-SHEETS.md`: Definición de columnas y headers.

## 5. Flujos de Datos Críticos
1.  **Configuración de Marca:** Admin sube logo -> `localStorage`.
2.  **Carga de Producto:** Admin sube foto -> `applyWatermark()` -> Cloudinary -> Registro en DB.
3.  **Visualización:** Tienda consume Supabase/CSV -> Renderizado con `lazy loading`.
4.  **Venta:** Cliente confirma carrito -> Redirección a WhatsApp con string formateado.

## 6. Estado Actual
La Etapa 2 está 100% funcional y desplegada. El enfoque actual es la estabilidad de la sincronización entre Supabase y el estado local, y la preparación para la Etapa 3 (carrusel de imágenes en el detalle del producto).
