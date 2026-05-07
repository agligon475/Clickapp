# StoreApp — Etapa 2: Mejoras de Catálogo

## Implementación completada

### 2.1 ✅ Hasta 3 imágenes por producto en ABM

**Dashboard (dashboard.html)**
- Campo modal expandido: antes 1 imagen → ahora 3 imágenes
- IDs: `m-img`, `m-img2`, `m-img3`
- Campos en Google Sheets: `img`, `img2`, `img3`
- Guardado automático en localStorage

**Cambios en estructura:**
```javascript
// En openModal() — líneas 2072-2084
document.getElementById('m-img').value = p?.img || '';
document.getElementById('m-img2').value = p?.img2 || '';
document.getElementById('m-img3').value = p?.img3 || '';

// En saveModal() — líneas 2130-2132
const img = document.getElementById('m-img').value.trim();
const img2 = document.getElementById('m-img2').value.trim();
const img3 = document.getElementById('m-img3').value.trim();
```

**UI Modal:**
- 3 campos de entrada (URL o Cloudinary upload)
- 3 botones "Subir" independientes
- 3 previsualizadores en tiempo real
- Validación: imagen 1 obligatoria, 2 y 3 opcionales

---

### 2.2 ✅ Marca de agua automática del logo

**Función: `applyWatermark()` (líneas 3199-3270)**

**Características:**
- Se ejecuta automáticamente al subir imagen en ABM
- Logo posicionado esquina inferior derecha
- Tamaño: 15% del ancho de la imagen
- Fondo semi-transparente para legibilidad
- Opacidad: 80%
- Formato: PNG con compresión 95%

**Flujo:**
1. Usuario selecciona imagen
2. Sistema obtiene logo de `localStorage` (key: `store-logo`)
3. Canvas aplica marca de agua
4. Imagen procesada se sube a Cloudinary
5. URL guardada automáticamente

**Prevención de errores:**
- Si no hay logo → devuelve imagen original sin marca
- Si logo falla a cargar → imagen original intacta
- Sin interrupciones en flujo de usuario

---

### 2.3 ✅ Dos banners promocionales 50/50 en tienda

**Ubicación:** Después de barra de categorías, antes de grid de productos

**Layout:**
```
[Banner 1 - 50%] [Banner 2 - 50%]  (desktop)
[Banner 1]                          (mobile)
[Banner 2]                          
```

**Elementos HTML (tienda.html líneas 711-717):**
```html
<div id="banners-container" style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:32px;">
  <div id="banner-1" class="promo-banner"></div>
  <div id="banner-2" class="promo-banner"></div>
</div>
```

**Estilos (CSS nuevo en tienda.html):**
- Altura: 200px (160px mobile)
- Border radius: 12px
- Transiciones smooth en hover
- Soporte para imagen de fondo + overlay
- Responsive automático

**Estructura de banner (plantilla):**
```html
<img class="promo-banner-img" src="..." alt="..."/>
<div class="promo-banner-overlay"></div>
<div class="promo-banner-content">
  <div class="promo-banner-label">OFERTA ESPECIAL</div>
  <div class="promo-banner-title">Herramientas<br/>50% OFF</div>
  <div class="promo-banner-cta">Ver más <i class="bi bi-arrow-right"></i></div>
</div>
```

**Datos de banners (Google Sheets):**

| Campo | Ubicación | Nota |
|-------|-----------|------|
| `banner1_label` | Row 1, Col X | "OFERTA", "DESTACADO", etc |
| `banner1_title` | Row 1, Col X | Texto principal (max 30 chars) |
| `banner1_img` | Row 1, Col X | URL de imagen (1200x400px recomendado) |
| `banner1_cat` | Row 1, Col X | Categoría a filtrar al hacer click |
| `banner2_label` | Row 1, Col X | Ídem banner 1 |
| `banner2_title` | Row 1, Col X | Ídem banner 1 |
| `banner2_img` | Row 1, Col X | Ídem banner 1 |
| `banner2_cat` | Row 1, Col X | Ídem banner 1 |

---

## Integración con Google Sheets

### Esquema de productos (NEW FIELDS):
```
id | name | cat | marca | price | stock | emoji | img | img2 | img3 | ...
```

### Configuración de tienda (NEW FIELDS):
```
...
banner1_label: "NUEVAS HERRAMIENTAS"
banner1_title: "Línea Profesional"
banner1_img: "https://..."
banner1_cat: "Herramientas"

banner2_label: "PROMOCIÓN"
banner2_title: "Accesorios -30%"
banner2_img: "https://..."
banner2_cat: "Accesorios"
```

---

## Flujo de usuario

### Admin (Dashboard):
1. Abre modal "Nuevo producto"
2. Carga hasta 3 imágenes con "Subir" (Cloudinary)
3. Sistema aplica marca de agua automáticamente
4. Guarda en Google Sheets → campos `img`, `img2`, `img3`

### Cliente (Tienda):
1. Ve dos banners promocionales 50/50
2. Click en banner → filtra por categoría
3. Ve productos con imágenes de calidad profesional
4. (Futura feature) Carrusel de 3 imágenes por producto en detail

---

## Notas técnicas

### Canvas API para marca de agua:
- Soportado en todos los navegadores modernos
- Rendimiento: <200ms en imágenes 1200px
- Compresión automática a 95% JPEG/PNG

### Responsive:
- Grid 2 columnas desktop, 1 mobile
- Banners se adaptan a contenedor
- Altura relativa para no quebrar layout

### Marca de agua con logo vacío:
- Sin logo guardado → imagen original se sube
- Permite flujo sin interrupciones si no hay logo

---

## Próximas features (Etapa 3):

- [ ] Carrusel de imágenes en detail modal de tienda
- [ ] Zoom en imagen hover/touch
- [ ] Edición visual de banners (drag-and-drop)
- [ ] Cropping de imágenes antes de subir
- [ ] WebP para mejor compresión
- [ ] Datos de banners en panel configuración
