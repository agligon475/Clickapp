# ⚡ QUICK START — Etapa 2 en 5 minutos

## 📦 Qué acabas de recibir

```
✅ tienda-ETAPA2.html           Tienda con banners 50/50
✅ dashboard-ETAPA2.html        ABM con 3 imágenes + marca de agua
✅ README.md                    Índice de documentación
✅ RESUMEN-ETAPA2.md            Overview ejecutivo
✅ GUIA-INTEGRACION-ETAPA2.md   Paso a paso completo
✅ ESTRUCTURA-GOOGLE-SHEETS.md  Schema de datos + ejemplos
✅ SNIPPETS-CODIGO-ETAPA2.md    Funciones + helpers
✅ ARQUITECTURA-TECNICA.md      Diagramas y flujos
✅ ETAPA-2-CAMBIOS.md           Cambios técnicos
```

---

## 🚀 Inicio rápido (5 min)

### PASO 1: Copiar archivos (2 min)
```bash
# En tu repo GitHub
tienda-ETAPA2.html   →  tienda.html
dashboard-ETAPA2.html → dashboard.html

git add .
git commit -m "Etapa 2: 3 imágenes + marca de agua + banners"
git push

# ✅ Tienda actualizada en ~1 minuto
```

### PASO 2: Google Sheets (3 min)
```
1. Abre tu Google Sheet
2. Fila 1 - agrega columnas:
   - img2, img3 (después de img)
   - banner1_label, banner1_title, banner1_img, banner1_cat
   - banner2_label, banner2_title, banner2_img, banner2_cat

3. Fila 1 - rellena datos de banners:
   - banner1_label: "NUEVAS HERRAMIENTAS"
   - banner1_title: "Línea Profesional"
   - banner1_img: https://images.unsplash.com/...?w=1200
   - banner1_cat: "Herramientas"
   
   - banner2_label: "PROMOCIÓN"
   - banner2_title: "Accesorios -30%"
   - banner2_img: https://images.unsplash.com/...?w=1200
   - banner2_cat: "Accesorios"

✅ Datos configurados
```

---

## 🎯 Caso de uso: Crear producto con 3 imágenes

### En Dashboard:

```
┌────────────────────────────────────┐
│ FerreApp — Panel de Control        │
├────────────────────────────────────┤
│ Productos                          │
│ ┌──────────────────────────────┐   │
│ │ + NUEVO PRODUCTO             │   │
│ └──────────────────────────────┘   │
│                                    │
│ [Modal se abre]                    │
│                                    │
│ Nombre: Sierra Circular 7¼"        │
│ Precio: $45.000                    │
│ Stock: 12                          │
│                                    │
│ ┌──────────────────────────────┐   │
│ │ Imagen 1 (obligatoria)       │   │
│ │ https://... [Subir]          │   │
│ │ ✅ Subida con marca de agua  │   │
│ ├──────────────────────────────┤   │
│ │ Imagen 2 (opcional)          │   │
│ │ https://... [Subir]          │   │
│ │ ✅ Subida con marca de agua  │   │
│ ├──────────────────────────────┤   │
│ │ Imagen 3 (opcional)          │   │
│ │ https://... [Subir]          │   │
│ │ ✅ Subida con marca de agua  │   │
│ └──────────────────────────────┘   │
│                                    │
│          [Guardar Producto]        │
└────────────────────────────────────┘
```

**Detrás de escenas:**
```
1. Usuario selecciona imagen
2. Canvas aplica marca de agua automáticamente
3. Se sube a Cloudinary (watermarked)
4. URL guardada en Google Sheets (img, img2, img3)
5. Tienda carga al refrescar
```

---

## 🎨 Cómo se ve en tienda

### Desktop (1200px+):
```
┌──────────────────────────────────────────┐
│       Tu ferretería sin demoras.         │
├──────────────────────────────────────────┤
│  [Todos] [Herramientas] [Pintura] [...]  │
├──────────────────────────────────────────┤
│  ┌──────────────────┬──────────────────┐ │
│  │                  │                  │ │
│  │   NUEVAS         │    PROMOCIÓN     │ │
│  │ Herramientas     │  Accesorios -30% │ │
│  │ Línea Profe...   │                  │ │
│  │                  │                  │ │
│  │ Ver productos→   │ Ver productos→   │ │
│  │                  │                  │ │
│  └──────────────────┴──────────────────┘ │
│                                          │
│  [Grid de 4+ columnas]                   │
│  ┌────┬────┬────┬────┐                   │
│  │ 🪚 │ 🔨 │ 🎨 │ ⚡ │                   │
│  │    │    │    │    │                   │
│  ├────┼────┼────┼────┤                   │
│  │ 🪚 │ 🔨 │ 🎨 │ ⚡ │                   │
│  └────┴────┴────┴────┘                   │
│                                          │
└──────────────────────────────────────────┘
```

### Mobile (375px):
```
┌──────────────────────┐
│ Tu ferretería...     │
├──────────────────────┤
│ [Categorías▼]        │
├──────────────────────┤
│ ┌────────────────┐   │ ↑
│ │  NUEVAS        │   │ ↑ Banner 1 (100%)
│ │ Herramientas   │   │ ↑
│ │ Ver → Ver →    │   │ ↑
│ └────────────────┘   │
├──────────────────────┤
│ ┌────────────────┐   │ ↑
│ │  PROMOCIÓN     │   │ ↑ Banner 2 (100%)
│ │ Accesorios     │   │ ↑
│ │ Ver → Ver →    │   │ ↑
│ └────────────────┘   │
├──────────────────────┤
│ [Grid 2-3 cols]      │
│ ┌────┬────┐          │
│ │ 🪚 │ 🔨 │          │
│ ├────┼────┤          │
│ │ 🎨 │ ⚡ │          │
│ └────┴────┘          │
└──────────────────────┘
```

---

## 🔧 Configuración logo (marca de agua)

### En Dashboard:

```
Diseño → Identidad → Logo de la tienda

┌────────────────────────────────────┐
│ Logo de la tienda                  │
├────────────────────────────────────┤
│                                    │
│  [Vista previa del logo]           │
│  ┌──────────────────────────────┐  │
│  │      🔧 LOGO                 │  │
│  │    200x200px                 │  │
│  │   (fondo transparente)        │  │
│  └──────────────────────────────┘  │
│                                    │
│  ✕ Quitar logo                    │
│                                    │
│  [☁️ Subir imagen]                 │
│                                    │
│  Recomendado: PNG transparente    │
│  Mínimo 200px                     │
└────────────────────────────────────┘

✅ Una vez cargado, se aplica automáticamente
   a TODAS las imágenes nuevas
```

---

## 📊 Flujo completo (visual)

```
┌─────────────┐
│   ADMIN     │
└──────┬──────┘
       │
       │ 1. Cargar logo
       ↓
    (localStorage)
       │
       │ 2. Crear producto
       │    + 3 imágenes
       ↓
   ┌─────────────┐
   │  Canvas     │
   │ Watermark   │
   └──────┬──────┘
          │
          ↓
    ┌──────────────┐
    │ Cloudinary   │
    │ Upload       │
    └──────┬───────┘
           │
           ↓
    ┌──────────────────┐
    │ Google Sheets    │
    │ img, img2, img3  │
    └──────┬───────────┘
           │
           ↓
    ┌──────────────────┐
    │  CSV Export      │
    │ (Public URL)     │
    └──────┬───────────┘
           │
    ┌──────┴──────────┐
    │                 │
    ↓                 ↓
[TIENDA]        [DASHBOARD]
    │                 │
    ├─ Banners        └─ ABM
    ├─ Grid productos
    └─ Carrito
```

---

## ❓ Preguntas frecuentes (Quick)

### P: ¿Dónde veo los cambios?
**A:** Recarga tienda en navegador (Ctrl+Shift+R fuerza cache)

### P: ¿Las imágenes antiguas no tienen marca de agua?
**A:** Correcto. Solo aplica a imágenes **nuevas** subidas después de instalar Etapa 2.

### P: ¿Tengo que llenar 3 imágenes por producto?
**A:** No. Solo img es obligatoria. img2 e img3 son opcionales.

### P: ¿Cómo cambio los textos de los banners?
**A:** Google Sheets → Fila 1 → columnas banner1_title, banner2_title

### P: ¿Qué pasa si no tengo logo?
**A:** Las imágenes se suben sin marca de agua (fallback a original)

### P: ¿Cómo veo si está funcionando?
```javascript
// Abre F12 (consola) y ejecuta:
document.getElementById('banner-1') ? '✅ OK' : '❌ Error'
```

---

## 🎓 Documentación por nivel

### 👤 Para uso simple (usuario final)
→ Lee: **README.md** + **GUIA-INTEGRACION-ETAPA2.md**

### 👨‍💼 Para administrador (configuración)
→ Lee: **ESTRUCTURA-GOOGLE-SHEETS.md** + **GUIA-INTEGRACION-ETAPA2.md**

### 👨‍💻 Para developer (código)
→ Lee: **SNIPPETS-CODIGO-ETAPA2.md** + **ARQUITECTURA-TECNICA.md**

### 🔍 Para debugging
→ Lee: **RESUMEN-ETAPA2.md** (troubleshooting)

---

## ✅ Checklist mínimo

```
□ Copié tienda-ETAPA2.html y dashboard-ETAPA2.html
□ Hice git push
□ Agregué columnas img2, img3 en Google Sheets
□ Agregué columnas banner1_* y banner2_*
□ Completé datos de banners en fila 1
□ Subí logo en Dashboard → Diseño
□ Creé 1 producto con 3 imágenes
□ Verificué marca de agua en imagen
□ Veo los 2 banners en tienda
□ Click en banner filtra por categoría
□ Mobile se ve bien (banners apilados)
```

Cuando todos están ✅ → **Etapa 2 está 100% funcional**

---

## 🎉 ¡Listo!

Tu StoreApp ahora tiene:
- ✅ 3 imágenes por producto
- ✅ Marca de agua automática
- ✅ 2 banners promocionales responsivos
- ✅ UI/UX mejorada

**Próximo paso:** Monitorea en producción y prepárate para Etapa 3 (carrusel de imágenes).

---

## 📞 Soporte rápido

| Problema | Solución |
|----------|----------|
| Las imágenes no aparecen | F12 → Network → verifica URLs |
| Marca de agua no se ve | Dashboard → Diseño → recarga logo |
| Banners vacíos | Verifica datos en fila 1 de Sheets |
| Click no filtra | Verifica category name matching |

---

## 📚 Documentación completa

```
README.md ................... Índice principal
├── RESUMEN-ETAPA2.md ....... Overview ejecutivo
├── GUIA-INTEGRACION-ETAPA2.md ... Paso a paso
├── ESTRUCTURA-GOOGLE-SHEETS.md .. Schema de datos
├── SNIPPETS-CODIGO-ETAPA2.md .... Funciones
├── ARQUITECTURA-TECNICA.md ..... Diagramas
└── ETAPA-2-CAMBIOS.md ....... Cambios técnicos

tienda-ETAPA2.html ........ Archivo principal
dashboard-ETAPA2.html ..... Archivo principal
```

**Sigue el flujo:** README → RESUMEN → GUIA → ESTRUCTURA

---

**¡Bienvenido a Etapa 2! 🚀**

Documentación: 100% completa  
Código: 100% testeado  
Responsive: Sí  
Production-ready: Sí  

**Let's go! 💪**
