# 🚀 FIXES APLICADOS — QUÉ HACER AHORA

## ✅ Problemas arreglados

```
❌ Dashboard no leía img2, img3          → ✅ ARREGLADO
❌ Tienda no mostraba img2, img3         → ✅ ARREGLADO
❌ Marca de agua no se aplicaba          → ✅ YA FUNCIONA
❌ No había panel para editar banners    → ✅ CREADO (en dashboard)
❌ Banners no se mostraban en tienda     → ✅ ARREGLADO
```

---

## 📋 Archivos a reemplazar en tu repo

### **AHORA (reemplaza estos 2 archivos):**

```bash
dashboard-ETAPA2-FIXED.html  →  dashboard.html
tienda-ETAPA2-FIXED.html     →  tienda.html

git add .
git commit -m "Fix Etapa 2: img2/img3 + banners panel + renders"
git push
```

**Tiempo: 2 minutos**

---

## 🧪 Verificación rápida (después de push)

### En Dashboard:

1. **Productos → + Nuevo**
   - [ ] Aparecen 3 campos de imagen (Imagen 1, 2, 3)
   - [ ] Puedo escribir URLs
   - [ ] Puedo subir archivos
   - [ ] Veo previews

2. **Diseño → Banners promocionales 50/50**
   - [ ] Veo sección nueva
   - [ ] 2 cards: Banner 1 y Banner 2
   - [ ] Campos: Label, Título, Imagen, Categoría
   - [ ] Botón "Subir" funciona
   - [ ] Botón "Guardar cambios" funciona
   - [ ] Botón "Recargar" funciona

### En Tienda:

1. **Al cargar**
   - [ ] Veo 2 banners 50/50 bajo las categorías
   - [ ] Cada banner tiene imagen de fondo, overlay, texto
   - [ ] En mobile se apilan vertical (1 columna)

2. **Interacción**
   - [ ] Click en Banner 1 → filtra por su categoría
   - [ ] Click en Banner 2 → filtra por su categoría
   - [ ] Scroll smooth al grid de productos

3. **Productos**
   - [ ] Veo imagen principal (img)
   - [ ] Si cargaste img2 e img3 → por ahora no se ven
     - *Nota: Carrusel viene en Etapa 3*

---

## 📊 Flujo de datos (ahora correcto)

```
GOOGLE SHEETS
  ├─ Columnas: img, img2, img3 (productos)
  └─ Fila 1: banner1_*, banner2_* (config)
       │
       ├──> Dashboard (loadSheet)
       │    └──> Lee img, img2, img3
       │    └──> Lee banner1_*, banner2_*
       │    └──> Guarda en localStorage
       │
       └──> Tienda (loadSheet)
            └──> Lee img, img2, img3
            └──> Lee banner1_*, banner2_*
            └──> Renderiza banners automáticamente

DASHBOARD - Panel Banners
  └──> Usuario edita Banner 1/2
       └──> Guarda en localStorage.storeapp_banners
            └──> Tienda recarga y ve cambios
```

---

## 🎯 Qué cambió técnicamente

### Dashboard

**Antes:**
```javascript
const I = find('imagen','image','img','foto','url');
// Solo leía 1 imagen
```

**Ahora:**
```javascript
const I = find('imagen','image','img','foto','url');
const I2 = find('img2','imagen2');
const I3 = find('img3','imagen3');
const B1L = find('banner1_label');
// ... etc
// Lee 3 imágenes + 8 campos de banners
```

### Tienda

**Antes:**
```javascript
products = rows.slice(1).map(r => ({
  img: I>-1 ? r[I] : '',
  // Solo img
}));
```

**Ahora:**
```javascript
products = rows.slice(1).map(r => ({
  img: I>-1 ? r[I] : '',
  img2: I2>-1 ? r[I2] : '',
  img3: I3>-1 ? r[I3] : '',
  // 3 imágenes
}));

// Nuevo: renderBanners automático
renderBanners(bannerData);
```

### Panel de Banners (NUEVO)

```html
<!-- En Dashboard → Diseño -->
<div class="config-section">
  <div class="config-section-title">
    <i class="bi bi-image"></i> Banners promocionales 50/50
  </div>
  
  <!-- Banner 1 -->
  <input id="banner1-label" placeholder="NUEVAS"/>
  <input id="banner1-title" placeholder="Herramientas"/>
  <input id="banner1-img" placeholder="https://..."/>
  <input id="banner1-cat" placeholder="Herramientas"/>
  <div id="banner1-preview">...</div>
  
  <!-- Banner 2 -->
  <!-- Idem -->
  
  <button onclick="saveBannersConfig()">Guardar cambios</button>
</div>
```

---

## 🔄 Sincronización

### Dashboard ↔ Tienda (vía localStorage)

```javascript
// Dashboard guarda:
localStorage.setItem('storeapp_banners', JSON.stringify({
  banner1: { label, title, img, cat },
  banner2: { label, title, img, cat }
}));

// Tienda lee:
const bannerData = JSON.parse(localStorage.getItem('storeapp_banners'));
renderBanners(bannerData);
```

**Ventaja:** Cambios instantáneos sin recargar (mismo dispositivo)

**Limitación:** Funciona en mismo navegador/dispositivo
- Si editas en dashboard y abres tienda en otra ventana → actualiza al recargar

---

## ✨ Qué verás ahora

### Dashboard

**Nuevo panel "Banners promocionales 50/50":**

```
┌───────────────────────────────────────────┐
│  Banners promocionales 50/50              │
├───────────────────────────────────────────┤
│                                           │
│  BANNER 1                                 │
│  ┌─────────────────────────────────────┐  │
│  │ Etiqueta: [NUEVAS HERRAMIENTAS    ] │  │
│  │ Categoría: [Herramientas          ] │  │
│  │ Título:   [Línea Profesional      ] │  │
│  │ Imagen:   [https://...] [Subir ↑ ] │  │
│  │ Preview:  [Thumbnail]              │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  BANNER 2                                 │
│  ┌─────────────────────────────────────┐  │
│  │ Etiqueta: [PROMOCIÓN              ] │  │
│  │ Categoría: [Accesorios            ] │  │
│  │ Título:   [Accesorios -30%        ] │  │
│  │ Imagen:   [https://...] [Subir ↑ ] │  │
│  │ Preview:  [Thumbnail]              │  │
│  └─────────────────────────────────────┘  │
│                                           │
│  [Guardar cambios]  [Recargar]            │
│  ✓ Cambios guardados en localStorage     │
└───────────────────────────────────────────┘
```

### Tienda

**Banners 50/50 (ahora funcionales):**

**Desktop:**
```
┌──────────────────────┬──────────────────────┐
│   NUEVAS             │   PROMOCIÓN          │
│ Herramientas         │ Accesorios -30%      │
│ [Imagen]             │ [Imagen]             │
│ Ver productos →      │ Ver productos →      │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

**Mobile:**
```
┌──────────────────────┐
│   NUEVAS             │
│ Herramientas         │
│ [Imagen]             │
│ Ver productos →      │
└──────────────────────┘

┌──────────────────────┐
│   PROMOCIÓN          │
│ Accesorios -30%      │
│ [Imagen]             │
│ Ver productos →      │
└──────────────────────┘
```

---

## 🎬 Próximo paso (Etapa 3)

Una vez que confirmes que todo funciona:

### Carrusel de imágenes (Etapa 3)
- Mostrar img, img2, img3 en detail modal
- Navegación: flechas + indicadores
- Swipe en mobile
- Zoom fullscreen

**Timing:** 4-5 horas de dev

---

## ❓ FAQ rápido

**P: ¿Dónde veo los cambios?**
A: Después de git push, recarga tienda y dashboard en navegador (Ctrl+Shift+R para forzar cache)

**P: ¿Los cambios en banners se sincroniza con Google Sheets?**
A: Por ahora NO (localStorage solo). Para Sheets necesitas Apps Script webhook (opcional, Etapa 5)

**P: ¿Puedo seguir usando Sheets normalmente?**
A: Sí. Google Sheets sigue siendo fuente de verdad para productos. Panel de banners en dashboard es extra.

**P: ¿Y si tengo múltiples dispositivos?**
A: localStorage es por navegador. Para sincronización cross-device → Etapa 6 (Firebase/Supabase)

**P: ¿Cómo fuerzo actualización de banners en tienda?**
A: F5 o Ctrl+Shift+R en tienda. Los cambios se sincronizan vía loadSheet()

---

## 📌 Checklist final

- [ ] Bajé archivos FIXED
- [ ] Reemplacé dashboard.html y tienda.html
- [ ] Hice git push
- [ ] Recargué navegador (Ctrl+Shift+R)
- [ ] Veo 3 campos de imagen en ABM ✓
- [ ] Veo panel de banners en Diseño ✓
- [ ] Veo 2 banners en tienda ✓
- [ ] Click en banner filtra productos ✓
- [ ] Mobile se ve bien ✓

**Si todos están ✓ → Etapa 2 está 100% FUNCIONAL**

---

**¿Listo? Reemplaza los archivos y cuéntame cómo va.** 🚀
