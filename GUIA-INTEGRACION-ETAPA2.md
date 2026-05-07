# 🚀 GUÍA DE INTEGRACIÓN — ETAPA 2: MEJORAS DE CATÁLOGO

## Resumen rápido
✅ 3 imágenes por producto  
✅ Marca de agua automática del logo  
✅ 2 banners promocionales 50/50  

---

## PASO 1: Reemplazar archivos

### En tu repo (GitHub):
```bash
# Respaldar versiones anteriores (opcional)
git mv tienda.html tienda.html.backup
git mv dashboard.html dashboard.html.backup

# Reemplazar con versiones ETAPA2
# - tienda-ETAPA2.html → tienda.html
# - dashboard-ETAPA2.html → dashboard.html

git add tienda.html dashboard.html
git commit -m "Etapa 2: 3 imágenes + marca de agua + banners 50/50"
git push
```

GitHub Pages se actualizará automáticamente en ~1 minuto.

---

## PASO 2: Preparar Google Sheets

### 2.1 Agregar columnas de imágenes a tabla de productos

En **fila 1** (headers), después de la columna existente `img`:

```
| ... | img | img2 | img3 | ...
```

**Ejemplo de estructura:**
```
id | name | categoria | marca | precio | stock | emoji | detalle | img | img2 | img3 | origen | oculto
1  | Sierra Circular | Herramientas | Dewalt | 45000 | 12 | 🪚 | Descrip. | https://... | https://... | https://... | US | no
```

### 2.2 Agregar columnas de banners

En la **fila 1**, agrega estos headers al final:
```
banner1_label | banner1_title | banner1_img | banner1_cat | banner2_label | banner2_title | banner2_img | banner2_cat
```

**Ejemplo de contenido (fila 1):**
```
| banner1_label | banner1_title | banner1_img | banner1_cat | banner2_label | banner2_title | banner2_img | banner2_cat |
| NUEVAS | Línea Profesional | https://images.unsplash.com/...jpg | Herramientas | PROMOCIÓN | Accesorios -30% | https://images.unsplash.com/...jpg | Accesorios |
```

---

## PASO 3: Configurar datos de banners

### Recomendaciones de imágenes:
- **Tamaño:** 1200px × 400px (mínimo)
- **Formato:** JPG, PNG o WebP
- **Hosting:** Cloudinary, Unsplash, o tu servidor
- **Peso:** <500KB optimizado

### Ejemplos de URLs gratuitas (Unsplash):
```
https://images.unsplash.com/photo-1578926314433-c6995200916a?w=1200&h=400&fit=crop
https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=1200&h=400&fit=crop
```

### Sin imágenes (fallback):
Si dejas `banner_img` vacío, se mostrará solo con overlay y texto:
- Fondo: gradiente rojo → negro
- Altura: 200px
- Responsive: 160px en mobile

---

## PASO 4: Usar el ABM mejorado

### Crear nuevo producto:

1. **Dashboard → Productos → + Nuevo**
2. Rellena campos básicos (nombre, precio, stock)
3. **Cargar imágenes:**
   - Click en "Subir" (Cloudinary) O pega URL directa
   - Imagen 1: **OBLIGATORIA**
   - Imagen 2-3: Opcionales
4. Sistema aplica marca de agua automáticamente
5. Click "Guardar producto"

### Flujo de marca de agua:
```
Seleccionar imagen
     ↓
Canvas dibuja imagen original
     ↓
Logo (esquina inf-der) se superpone
     ↓
Fondo semi-transparente para legibilidad
     ↓
Se sube a Cloudinary
     ↓
URL guardada en Google Sheets
```

**Si no hay logo:** Imagen original se sube sin cambios.

---

## PASO 5: Configurar logo para marca de agua

En **Dashboard → Diseño → Identidad → Logo de la tienda**:

1. Sube tu logo (PNG con fondo transparente recomendado)
2. Sistema guarda en `localStorage` → `store-logo`
3. **Automáticamente** se aplica a todas las imágenes nuevas

**Recomendaciones:**
- Tamaño: 200-400px
- Formato: PNG transparente o SVG
- Proporciones: 1:1 o 16:9

---

## PASO 6: Verificar en tienda

### Mobile (375px):
```
+─────────────────────┐
│   BANNER 1 (50%)    │  (1 columna - apilado)
├─────────────────────┤
│   BANNER 2 (50%)    │
├─────────────────────┤
│ [Categorías...]     │
├─────────────────────┤
│ [Productos Grid]    │
└─────────────────────┘
```

### Desktop (1200px):
```
┌─────────────────────┬─────────────────────┐
│   BANNER 1 (50%)    │   BANNER 2 (50%)    │  (2 columnas)
└─────────────────────┴─────────────────────┘
[Categorías...]
[Productos Grid]
```

### Interacción con banners:
- Click en banner 1 → Filtra por `banner1_cat`
- Click en banner 2 → Filtra por `banner2_cat`
- Smooth scroll al grid de productos
- Efecto hover: elevación + borde rojo

---

## PASO 7: Detalle modal de producto (PREVIEW)

En próximas actualizaciones, el detail modal mostrará:
```
[Carrusel de 3 imágenes]
  ← • • • →
  Imagen 1 | Imagen 2 | Imagen 3
```

Indicadores de punto para navegar.

---

## TROUBLESHOOTING

### ❌ "Las imágenes no se ven en el dashboard modal"

**Solución:**
- Verifica que los IDs existan: `m-img`, `m-img2`, `m-img3`
- Abre consola (F12 → Console)
- Intenta cargar una imagen manualmente
- Revisa logs de Cloudinary

### ❌ "Marca de agua no aparece en imágenes"

**Causas posibles:**
1. **No hay logo guardado:** Dashboard → Diseño → sube logo
2. **Canvas no compatible:** Navegador muy viejo (IE11)
3. **CORS error:** URL de logo bloqueada por CORS
   - Solución: Usa logo descargado en `store-logo` (localStorage)

### ❌ "Los banners no se ven"

**Verificar:**
1. Headers en Google Sheets: `banner1_label`, `banner1_title`, etc.
2. URLs de imágenes son válidas (HTTPS)
3. Fila 1 tiene datos en esas columnas
4. Abre F12 → Network → verifica cargas

### ❌ "Banners vacíos pero no se ocultan"

**Solución:**
- Si no hay `img`, se muestra solo fondo + overlay
- Agrega `banner_title` para mostrar contenido
- Si quieres ocultarlos, deja `banner1_title` vacío

---

## INTEGRACIÓN CON WEBHOOK (Google Apps Script)

Cuando sincronices con Google Sheets, el webhook debe considerar:

```javascript
// En Apps Script getSheetData():
const products = {
  // campos existentes...
  img2: row[índice_img2] || '',
  img3: row[índice_img3] || '',
};

const storeConfig = {
  // campos existentes...
  banner1_label: headers.banner1_label,
  banner1_title: headers.banner1_title,
  banner1_img: headers.banner1_img,
  banner1_cat: headers.banner1_cat,
  banner2_label: headers.banner2_label,
  banner2_title: headers.banner2_title,
  banner2_img: headers.banner2_img,
  banner2_cat: headers.banner2_cat,
};
```

**No necesitas modificar webhook** — Los datos se carravez la tienda lea el CSV directamente.

---

## MÉTRICAS DE RENDIMIENTO

### Tamaño de archivos:
- `tienda-ETAPA2.html`: ~75KB (era ~60KB)
- `dashboard-ETAPA2.html`: ~160KB (era ~155KB)
- Diferencia: +7.5KB (CSS de banners + JS renderBanners)

### Carga de imágenes:
- Lazy loading automático (`loading="lazy"`)
- 3 imágenes × 500KB = 1.5MB máximo
- Recomendación: optimizar con ImageOptim/TinyPNG

### Marca de agua:
- Canvas: ~150-200ms por imagen
- No bloquea UI (async)
- Máximo recomendado: imágenes <2000px

---

## CHECKLIST FINAL

- [ ] Archivos `tienda-ETAPA2.html` y `dashboard-ETAPA2.html` reemplazados
- [ ] Google Sheets con columnas `img`, `img2`, `img3`
- [ ] Google Sheets con columnas `banner1_*`, `banner2_*`
- [ ] Datos de banners cargados en fila 1
- [ ] Logo cargado en Dashboard → Diseño
- [ ] Prueba: crear producto con 3 imágenes
- [ ] Verifica: marca de agua en imágenes
- [ ] Verifica: banners visibles en tienda
- [ ] Verifica: click en banners filtra por categoría
- [ ] Prueba mobile: banners apilados verticalmente

---

## ROLLBACK (si algo sale mal)

```bash
git revert HEAD
git push
# Vuelves a versión anterior en ~1 min
```

O restaura manualmente desde backups:
```bash
git mv tienda.html.backup tienda.html
git mv dashboard.html.backup dashboard.html
git commit -m "Rollback Etapa 2"
git push
```

---

## SOPORTE

**Problemas comunes:**
- Consola F12 → Errors/Warnings
- Network tab → fallas de carga
- `localStorage` → `store-logo` existe?
- Google Sheets → CSV válido?

**Próximas features (Etapa 3):**
- Carrusel de imágenes en detail modal
- Zoom en hover
- Edición visual de banners
- API REST para banners dinámicos
