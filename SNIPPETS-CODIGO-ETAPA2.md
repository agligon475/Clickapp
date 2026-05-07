# Snippets de código — Etapa 2

## Funciones clave modificadas/nuevas

### 1. Función renderBanners() — NUEVA

```javascript
function renderBanners(bannerData) {
  const banner1El = document.getElementById('banner-1');
  const banner2El = document.getElementById('banner-2');
  
  if (!banner1El || !banner2El) return;
  
  const renderBanner = (el, data) => {
    if (!data || !data.title) {
      el.style.display = 'none';
      return;
    }
    
    el.style.display = 'flex';
    el.style.cursor = 'pointer';
    const cat = data.cat || 'all';
    
    el.innerHTML = `
      ${data.img ? `<img class="promo-banner-img" src="${data.img}" alt="${data.title}" loading="lazy"/>` : ''}
      <div class="promo-banner-overlay"></div>
      <div class="promo-banner-content">
        ${data.label ? `<div class="promo-banner-label">${data.label}</div>` : ''}
        <div class="promo-banner-title">${data.title}</div>
        <div class="promo-banner-cta">Ver productos <i class="bi bi-arrow-right"></i></div>
      </div>
    `;
    
    el.onclick = () => {
      if (cat !== 'all') {
        const btn = document.querySelector(`[data-cat="${cat}"]`);
        if (btn) filterCat(btn, cat);
      } else {
        filterCat(document.querySelector('[data-cat="all"]'), 'all');
      }
      window.scrollTo({ 
        top: document.getElementById('banners-container').offsetTop + 300, 
        behavior: 'smooth' 
      });
    };
  };
  
  renderBanner(banner1El, bannerData.banner1);
  renderBanner(banner2El, bannerData.banner2);
}
```

**Uso:**
```javascript
const bannerData = {
  banner1: {
    label: 'NUEVAS',
    title: 'Herramientas Profesionales',
    img: 'https://...',
    cat: 'Herramientas'
  },
  banner2: {
    label: 'PROMO',
    title: 'Accesorios -30%',
    img: 'https://...',
    cat: 'Accesorios'
  }
};

renderBanners(bannerData);
```

---

### 2. Modificación loadSheet() — Extrae datos de banners

```javascript
// Líneas agregadas en loadSheet():
const bannerData = {
  banner1: {
    label: hdrs.includes('banner1_label') ? rows[0][hdrs.indexOf('banner1_label')] : 'OFERTA',
    title: hdrs.includes('banner1_title') ? rows[0][hdrs.indexOf('banner1_title')] : 'Nuevas',
    img: hdrs.includes('banner1_img') ? rows[0][hdrs.indexOf('banner1_img')] : '',
    cat: hdrs.includes('banner1_cat') ? rows[0][hdrs.indexOf('banner1_cat')] : ''
  },
  banner2: {
    label: hdrs.includes('banner2_label') ? rows[0][hdrs.indexOf('banner2_label')] : 'PROMOCIÓN',
    title: hdrs.includes('banner2_title') ? rows[0][hdrs.indexOf('banner2_title')] : 'Especiales',
    img: hdrs.includes('banner2_img') ? rows[0][hdrs.indexOf('banner2_img')] : '',
    cat: hdrs.includes('banner2_cat') ? rows[0][hdrs.indexOf('banner2_cat')] : ''
  }
};

renderBanners(bannerData);
```

---

### 3. openModal() — Carga 3 imágenes

```javascript
function openModal(id=null) {
  editingId = id;
  const p = id ? localProducts.find(x=>x.id===id) : null;
  
  // ... campos anteriores ...
  
  // Cargar hasta 3 imágenes
  document.getElementById('m-img').value     = p?.img     || '';
  document.getElementById('m-img2').value    = p?.img2    || '';
  document.getElementById('m-img3').value    = p?.img3    || '';
  document.getElementById('m-img-status').textContent = '';
  document.getElementById('m-img2-status').textContent = '';
  document.getElementById('m-img3-status').textContent = '';
  
  // Image previews
  previewImgUrl(p?.img || '', 0);
  previewImgUrl(p?.img2 || '', 1);
  previewImgUrl(p?.img3 || '', 2);
}
```

---

### 4. saveModal() — Guarda img, img2, img3

```javascript
function saveModal() {
  // ... validaciones anteriores ...
  
  const img     = document.getElementById('m-img').value.trim();
  const img2    = document.getElementById('m-img2').value.trim();
  const img3    = document.getElementById('m-img3').value.trim();
  
  if (editingId) {
    const p = localProducts.find(x=>x.id===editingId);
    if (p) Object.assign(p, {
      name, codigo, cat, marca, price, stock, emoji, 
      origen, detalle, img, img2, img3  // ← NUEVO
    });
  } else {
    localProducts.push({
      id: Math.max(0,...localProducts.map(x=>x.id)) + 1,
      name, codigo, cat, marca, price, stock, emoji, 
      origen, detalle, img, img2, img3,  // ← NUEVO
      hidden: false
    });
  }
  
  localStorage.setItem('storeapp_local_products', JSON.stringify(localProducts));
}
```

---

### 5. handleModalPhotoUpload() — Aplica marca de agua

```javascript
async function handleModalPhotoUpload(input, index = 0) {
  const file = input.files[0];
  if (!file) return;
  
  const statusIds = ['m-img-status', 'm-img2-status', 'm-img3-status'];
  const inputIds = ['m-img', 'm-img2', 'm-img3'];
  
  const el = document.getElementById(statusIds[index]);
  el.style.color='var(--silver)'; 
  el.textContent='Subiendo imagen...';
  
  try {
    // ← NUEVO: Aplicar marca de agua antes de subir
    const watermarkedFile = await applyWatermark(file);
    const url = await uploadToCloudinary(watermarkedFile);
    
    document.getElementById(inputIds[index]).value = url;
    el.style.color='var(--green)'; 
    el.textContent='✓ Imagen subida con marca de agua';
    
    previewImgUrl(url, index);
  } catch(e) {
    el.style.color='var(--red)'; 
    el.textContent='✕ ' + e.message;
  }
}
```

---

### 6. applyWatermark() — Marca de agua automática

```javascript
async function applyWatermark(file) {
  return new Promise((resolve, reject) => {
    const logoData = localStorage.getItem('store-logo');
    
    const img = new Image();
    const reader = new FileReader();
    
    reader.onload = (e) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Dibujar imagen original
        ctx.drawImage(img, 0, 0);
        
        // Si hay logo, aplicar marca de agua
        if (logoData) {
          const logo = new Image();
          logo.onload = () => {
            // Posicionar logo en esquina inferior derecha (15% del tamaño)
            const logoSize = Math.min(img.width, img.height) * 0.15;
            const logoWidth = logoSize;
            const logoHeight = (logo.height / logo.width) * logoSize;
            const padding = 20;
            
            // Fondo semi-transparente
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.fillRect(
              canvas.width - logoWidth - padding - 10,
              canvas.height - logoHeight - padding - 10,
              logoWidth + 20,
              logoHeight + 20
            );
            
            // Dibujar logo con opacidad 80%
            ctx.globalAlpha = 0.8;
            ctx.drawImage(
              logo,
              canvas.width - logoWidth - padding,
              canvas.height - logoHeight - padding,
              logoWidth,
              logoHeight
            );
            ctx.globalAlpha = 1.0;
            
            // Convertir a blob y crear archivo
            canvas.toBlob((blob) => {
              const watermarkedFile = new File(
                [blob], 
                file.name, 
                { type: file.type }
              );
              resolve(watermarkedFile);
            }, file.type, 0.95);
          };
          logo.onerror = () => resolve(file);
          logo.src = logoData;
        } else {
          // Sin logo, devolver original
          resolve(file);
        }
      };
      img.onerror = () => reject(new Error('Error cargando imagen'));
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
}
```

---

## CSS para banners

```css
/* PROMOTIONAL BANNERS 50/50 */
.promo-banner{
  position: relative;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--zinc);
  transition: all .2s;
  animation: fadeUp .4s ease both;
  background: var(--iron);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
}

.promo-banner:hover{
  border-color: var(--red);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0,0,0,.3), 0 0 0 1px var(--red);
}

.promo-banner-img{
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promo-banner-overlay{
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(215,38,56,.4) 0%, rgba(0,0,0,.3) 100%);
}

.promo-banner-content{
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px;
  color: #fff;
}

.promo-banner-label{
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  color: rgba(255,255,255,.8);
  text-transform: uppercase;
  letter-spacing: .1em;
  margin-bottom: 8px;
}

.promo-banner-title{
  font-family: var(--font-head);
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 6px;
}

.promo-banner-cta{
  font-size: 12px;
  color: var(--red);
  font-weight: 600;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: center;
}

@media(max-width: 768px){
  #banners-container{
    grid-template-columns: 1fr;
  }
  .promo-banner{
    height: 160px;
  }
  .promo-banner-title{
    font-size: 20px;
  }
}
```

---

## HTML de banners

```html
<!-- BANNERS PROMOCIONALES 50/50 -->
<div id="banners-container" 
  style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:32px;">
  <!-- Banner 1 - populated by JS -->
  <div id="banner-1" class="promo-banner"></div>
  <!-- Banner 2 - populated by JS -->
  <div id="banner-2" class="promo-banner"></div>
</div>
```

---

## Helpers para desarrollo

### Generar datos de prueba para Google Sheets:

```javascript
// En consola del navegador
const testBannerData = {
  banner1: {
    label: 'NUEVAS',
    title: 'Herramientas Profesionales',
    img: 'https://images.unsplash.com/photo-1578926314433-c6995200916a?w=1200&h=400&fit=crop',
    cat: 'Herramientas'
  },
  banner2: {
    label: 'DESCUENTO',
    title: 'Pintura -40%',
    img: 'https://images.unsplash.com/photo-1545712528-43ef45eb00d0?w=1200&h=400&fit=crop',
    cat: 'Pintura'
  }
};

console.log(JSON.stringify(testBannerData, null, 2));
```

### Verificar que las imágenes carguen correctamente:

```javascript
// En consola
['img', 'img2', 'img3'].forEach(i => {
  const url = document.getElementById('m-' + i).value;
  if (url) {
    fetch(url, { method: 'HEAD' })
      .then(r => console.log(`✓ ${i}: ${r.status}`))
      .catch(e => console.error(`✕ ${i}: ${e.message}`));
  }
});
```

### Verificar datos de banners en tienda:

```javascript
// En consola de tienda.html
fetch(SHEET_URL)
  .then(r => r.text())
  .then(csv => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',');
    const b1_idx = headers.indexOf('banner1_title');
    if (b1_idx > -1) {
      console.log('Banner 1 title:', lines[0].split(',')[b1_idx]);
    }
  });
```

---

## Testing checklist

```javascript
// Prueba 1: ¿Existen elementos banner?
console.assert(
  document.getElementById('banner-1') && document.getElementById('banner-2'),
  'Banners no encontrados'
);

// Prueba 2: ¿Función renderBanners existe?
console.assert(
  typeof renderBanners === 'function',
  'renderBanners no existe'
);

// Prueba 3: ¿Campos de imagen existen?
['m-img', 'm-img2', 'm-img3'].forEach(id => {
  console.assert(
    document.getElementById(id),
    `Campo ${id} no existe`
  );
});

// Prueba 4: ¿applyWatermark funciona?
console.assert(
  typeof applyWatermark === 'function',
  'applyWatermark no existe'
);

// Resultado
console.log('✓ Todas las pruebas pasadas');
```

---

## Ejemplos de URLs de Unsplash (para banners)

```
Herramientas:
https://images.unsplash.com/photo-1578926314433-c6995200916a?w=1200&h=400&fit=crop

Pintura:
https://images.unsplash.com/photo-1545712528-43ef45eb00d0?w=1200&h=400&fit=crop

Accesorios:
https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=1200&h=400&fit=crop

Electricidad:
https://images.unsplash.com/photo-1581092322261-8ace08b8a106?w=1200&h=400&fit=crop
```

---

## Migración desde Etapa 1

Si tienes productos con `img` (1 sola imagen):

```javascript
// Script para migrar en dashboard
const products = JSON.parse(localStorage.getItem('storeapp_local_products'));
const migrated = products.map(p => ({
  ...p,
  img2: '', // Nueva: vacía
  img3: ''  // Nueva: vacía
}));
localStorage.setItem('storeapp_local_products', JSON.stringify(migrated));
console.log('✓ Migración completada');
```

---

## Performance tips

**Optimizar imágenes:**
```bash
# Con ImageMagick
convert imagen.jpg -resize 400x400 -quality 85 imagen-opt.jpg

# Con TinyPNG API
curl --user api:tu_api_key -F file=@imagen.jpg https://api.tinify.com/output
```

**URLs con parámetros optimizados:**
```
# Unsplash
https://images.unsplash.com/photo-ID?w=400&h=400&fit=crop&q=80

# Cloudinary
https://res.cloudinary.com/username/image/upload/w_400,h_400,c_fill,q_auto/image.jpg
```

---

## Rollback rápido (si hay errores)

```javascript
// En consola
if (typeof renderBanners === 'function') {
  renderBanners({ 
    banner1: { title: '', img: '', cat: '' },
    banner2: { title: '', img: '', cat: '' }
  });
  console.log('Banners ocultados');
}
```

O simplemente elimina el contenedor HTML:
```javascript
document.getElementById('banners-container')?.remove();
console.log('Contenedor banners eliminado');
```
