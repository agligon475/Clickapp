# 📦 StoreApp — ETAPA 2: Mejoras de Catálogo

## 🎯 Qué hay en esta carpeta

### 🔧 Archivos principales (reemplaza en tu repo)
```
tienda-ETAPA2.html          → Tienda con banners 50/50
dashboard-ETAPA2.html       → ABM con 3 imágenes + marca de agua
```

### 📚 Documentación (lee en este orden)

#### 1️⃣ **START HERE** → RESUMEN-ETAPA2.md
- Overview ejecutivo (3 min)
- Qué se implementó
- Timeline de integración
- Troubleshooting rápido

#### 2️⃣ **Implementación** → GUIA-INTEGRACION-ETAPA2.md
- Paso a paso de integración (15-30 min)
- Configuración Google Sheets
- Setup de logo para marca de agua
- Verificación en producción

#### 3️⃣ **Referencia datos** → ESTRUCTURA-GOOGLE-SHEETS.md
- Esquema de tablas
- Headers requeridos
- Ejemplos de datos
- Límites y restricciones
- Troubleshooting

#### 4️⃣ **Código** → SNIPPETS-CODIGO-ETAPA2.md
- Funciones clave
- Ejemplos de uso
- CSS completo
- Testing checklist
- Rollback rápido

#### 5️⃣ **Cambios técnicos** → ETAPA-2-CAMBIOS.md
- Descripción detallada de cambios
- Líneas modificadas
- Integración webhook
- Métricas de rendimiento

---

## ⚡ Quick Start (5 minutos)

### 1. Reemplazar archivos
```bash
# En tu repo GitHub
tienda-ETAPA2.html → tienda.html
dashboard-ETAPA2.html → dashboard.html
git push
```

### 2. Google Sheets
```
Agregar columnas:
- img2, img3 (para productos)
- banner1_label, banner1_title, banner1_img, banner1_cat
- banner2_label, banner2_title, banner2_img, banner2_cat

Datos en fila 1 para banners
```

### 3. Cargar logo (Dashboard → Diseño)
Sistema aplica marca de agua automáticamente

### 4. Crear producto con 3 imágenes
Dashboard → + Nuevo → Cargar hasta 3 imágenes

---

## 🚀 Funcionalidades

### ✅ 2.1 Hasta 3 imágenes por producto
```
Dashboard ABM:
  - 3 campos de URL independientes
  - Botones "Subir" para cada uno
  - Preview en tiempo real
  
Google Sheets:
  - Columnas: img, img2, img3
  - Todas opcionales excepto img (obligatoria)
```

### ✅ 2.2 Marca de agua automática
```
Canvas API:
  - Logo en esquina inferior derecha (15% tamaño)
  - Fondo semi-transparente para legibilidad
  - Opacidad 80%
  - Se aplica al subir imagen

Fallback:
  - Sin logo → imagen original se sube
  - No interrumpe flujo del usuario
```

### ✅ 2.3 Banners promocionales 50/50
```
Layout:
  Desktop: 2 columnas (50-50)
  Mobile: 1 columna (100%)
  
Datos:
  Configurables en Google Sheets
  Label, título, imagen, categoría
  
Interacción:
  Click en banner → filtra por categoría
  Scroll smooth al grid
```

---

## 📊 Estructura visual

### Tienda desktop
```
┌─────────────────────────────────┐
│      [HERO SECTION]             │
├─────────────────────────────────┤
│ [Categorías horizontal]         │
├─────────────────────────────────┤
│ [Banner 1 - 50%] [Banner 2 - 50%]
├─────────────────────────────────┤
│    Productos Grid 4+ columnas   │
│  ┌──────┬──────┬──────┬──────┐  │
│  │  []  │  []  │  []  │  []  │  │
│  └──────┴──────┴──────┴──────┘  │
├─────────────────────────────────┤
│         [FOOTER]                │
└─────────────────────────────────┘
```

### Tienda mobile
```
┌──────────────────┐
│  [HERO SECTION]  │
├──────────────────┤
│ [Categorías]     │
├──────────────────┤
│ [Banner 1]       │
├──────────────────┤
│ [Banner 2]       │
├──────────────────┤
│ Productos Grid   │
│ 2-3 columnas     │
├──────────────────┤
│   [FOOTER]       │
└──────────────────┘
```

---

## 🎯 Cambios por archivo

### tienda-ETAPA2.html
```
+76KB (era 60KB)

Cambios:
✓ renderBanners() - función nueva
✓ loadSheet() - extrae datos banners
✓ HTML - contenedor banners
✓ CSS - estilos .promo-banner*
✓ Responsive - @media queries
```

### dashboard-ETAPA2.html
```
+160KB (era 155KB)

Cambios:
✓ openModal() - cargar img2, img3
✓ saveModal() - guardar img2, img3
✓ handleModalPhotoUpload() - índice 0-2
✓ applyWatermark() - Canvas marca de agua
✓ Modal HTML - 3 campos de imagen
```

---

## 📖 Documentación por caso de uso

### "Quiero cambiar el logo"
→ GUIA-INTEGRACION-ETAPA2.md → PASO 5

### "¿Cómo estructura Google Sheets?"
→ ESTRUCTURA-GOOGLE-SHEETS.md → Tabla completa

### "Código de renderBanners()"
→ SNIPPETS-CODIGO-ETAPA2.md → Sección 1

### "No funciona la marca de agua"
→ RESUMEN-ETAPA2.md → Troubleshooting

### "¿Qué columnas debo agregar?"
→ GUIA-INTEGRACION-ETAPA2.md → PASO 2

### "Testing checklist"
→ SNIPPETS-CODIGO-ETAPA2.md → Testing checklist

---

## ✨ Checklist de implementación

```
PASO 1: Reemplazar archivos
  [ ] tienda-ETAPA2.html → tienda.html
  [ ] dashboard-ETAPA2.html → dashboard.html
  [ ] git push

PASO 2: Google Sheets
  [ ] Agregar columnas img2, img3
  [ ] Agregar columnas banner1_*, banner2_*
  [ ] Datos de banners en fila 1

PASO 3: Logo
  [ ] Dashboard → Diseño → Cargar logo
  [ ] Logo formato PNG transparente
  [ ] Tamaño 200-400px

PASO 4: Testing
  [ ] Crear producto con 3 imágenes
  [ ] Verificar marca de agua
  [ ] Ver banners en tienda
  [ ] Click en banner → filtra
  [ ] Mobile responsive

PASO 5: Ajustes
  [ ] Cambiar textos de banners
  [ ] Cambiar categorías de filtro
  [ ] URLs de imágenes correctas
```

---

## 🔗 Flujos de usuario

### Admin crea producto
```
Dashboard → Productos → + Nuevo
  ↓
Rellena nombre, precio, stock
  ↓
Carga imagen 1: Dashboard → Cloudinary → Marca de agua → URL
  ↓
Carga imagen 2: idem
  ↓
Carga imagen 3: idem
  ↓
Guarda → Google Sheets (img, img2, img3)
```

### Cliente ve tienda
```
Tienda carga
  ↓
loadSheet() obtiene datos
  ↓
renderBanners() dibuja 2 banners
  ↓
Cliente ve: [Banner 1 | Banner 2]
  ↓
Click en banner → filterCat() → scroll
  ↓
Grid muestra solo esa categoría
```

---

## 🛠️ Depuración rápida

### ¿Está Etapa 2 instalada?
```javascript
// En consola
document.getElementById('banner-1') ? '✅' : '❌'
```

### ¿Banners cargan datos?
```javascript
// En consola de tienda
fetch(SHEET_URL).then(r => r.text()).then(csv => {
  console.log(csv.split('\n')[0]) // Headers
})
```

### ¿Marca de agua funciona?
```javascript
// En consola de dashboard
typeof applyWatermark === 'function' ? '✅' : '❌'
```

### ¿Imagen en preview?
```javascript
// En consola
document.getElementById('m-img-preview')?.src
```

---

## 📞 Soporte y FAQ

### P: ¿Cómo agregar más de 3 imágenes?
A: Estructura soporta 3. Para más, modifica:
- openModal() líneas 2072-2084
- saveModal() líneas 2130-2139
- previewImgUrl() para índices 3+

### P: ¿Marca de agua en imágenes subidas antes?
A: No. Solo aplica al subir nuevas imágenes. Las antiguas requieren re-subir.

### P: ¿Cambiar posición de marca de agua?
A: applyWatermark() líneas 3220-3245. Modifica:
- `logoSize * 0.15` → cambiar porcentaje
- `canvas.width - logoWidth - padding` → cambiar posición

### P: ¿Ocultar banners?
A: Deja `banner1_title` vacío en Google Sheets.

### P: ¿Qué pasa si categoría no existe?
A: Banner se muestra pero click no filtra. Verifica que `banner_cat` exista en productos.

---

## 🎓 Conceptos técnicos

### Canvas API (Marca de agua)
- Dibuja imagen en canvas
- Superpone logo
- Exporta a blob
- Upload a Cloudinary

### localStorage (persistencia)
- Store logo: `store-logo`
- Store productos: `storeapp_local_products`
- ABM flag: `storeapp_abm_active`

### Google Sheets CSV
- Headers en fila 1
- Datos a partir de fila 2
- Export automático public
- Refrescarse en tienda al cargar

### Responsive Grid
- `grid-template-columns: 1fr 1fr` (desktop)
- `@media (max-width: 768px)` → `1fr` (mobile)

---

## 📈 Roadmap Etapa 3

- [ ] Carrusel de 3 imágenes en detail modal
- [ ] Zoom en hover (200%)
- [ ] Edición visual de banners (dashboard)
- [ ] API REST para banners dinámicos
- [ ] WebP para mejor compresión
- [ ] Cropping de imágenes pre-upload

---

## 🎉 Resumen

**Etapa 2 está 100% funcional:**
- ✅ 3 imágenes por producto
- ✅ Marca de agua automática
- ✅ Banners 50/50 responsivos
- ✅ Documentación completa
- ✅ Testing checklist

**Próximo paso:** Intégra en tu repo y testea en producción.

**¿Dudas?** Consulta los documentos en orden:
1. RESUMEN-ETAPA2.md
2. GUIA-INTEGRACION-ETAPA2.md
3. ESTRUCTURA-GOOGLE-SHEETS.md
4. SNIPPETS-CODIGO-ETAPA2.md

---

**Última actualización:** 2026-05-07  
**Versión:** Etapa 2 Final  
**Status:** ✅ Production Ready
