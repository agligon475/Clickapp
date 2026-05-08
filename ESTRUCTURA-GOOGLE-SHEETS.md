# Google Sheets — Estructura de datos Etapa 2

## Fila de headers (obligatoria en fila 1)

```
id | nombre | categoria | marca | precio | stock | emoji | detalle | img | img2 | img3 | origen | oculto | banner1_label | banner1_title | banner1_img | banner1_cat | banner2_label | banner2_title | banner2_img | banner2_cat
```

---

## Tabla de Productos (a partir de fila 2)

| id | nombre | categoria | marca | precio | stock | emoji | detalle | img | img2 | img3 | origen | oculto |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Sierra Circular 7¼" | Herramientas | Dewalt | 45000 | 12 | 🪚 | Disco 184mm, 5500 RPM, motor 1400W, guía paralela | https://images.unsplash.com/photo-1...?w=400&h=400 | https://images.unsplash.com/photo-2...?w=400&h=400 | https://images.unsplash.com/photo-3...?w=400&h=400 | US | no |
| 2 | Taladro Percutor | Herramientas | Bosch | 28500 | 8 | 🔨 | 13mm, 3000 RPM, 2 baterías | https://images.unsplash.com/photo-...?w=400&h=400 | | | DE | no |
| 3 | Pintura Látex Interior | Pintura | Sherwin | 12000 | 50 | 🎨 | Blanco, rendimiento 12m²/L, acabado mate | https://images.unsplash.com/photo-...?w=400&h=400 | https://images.unsplash.com/photo-...?w=400&h=400 | | AR | no |

---

## Fila de Configuración (Banners) — Fila 1, columnas adicionales

| banner1_label | banner1_title | banner1_img | banner1_cat | banner2_label | banner2_title | banner2_img | banner2_cat |
|---|---|---|---|---|---|---|---|
| NUEVAS HERRAMIENTAS | Línea Profesional | https://images.unsplash.com/photo-1578926314433-c6995200916a?w=1200&h=400 | Herramientas | PROMOCIÓN | Accesorios -30% | https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=1200&h=400 | Accesorios |

---

## Notas importantes

### Imagen (img, img2, img3):
- **Formato:** URL HTTPS directa
- **Validación:** Sistema verifica que sea URL válida
- **Fallback:** Si imagen no carga, muestra emoji del producto
- **Recomendación:** 400x400px para thumbnails
- **Marca de agua:** Aplicada automáticamente al subir desde ABM

### Categoría (categoria):
- **Obligatoria:** Sí
- **Valores:** Texto libre (se genera rail dinámicamente)
- **Case-sensitive:** No (FerreApp = ferreapp)
- **Ejemplos:** "Herramientas", "Pintura", "Electricidad", "Hidráulica"

### Stock (stock):
- **Formato:** Número entero
- **Validación:** Sistema rechaza negativos
- **UI:** Si stock=0 → badge rojo "Sin stock"
- **Editable desde:** ABM dashboard

### Imagen banners (banner1_img, banner2_img):
- **Tamaño recomendado:** 1200x400px
- **Formato:** JPG, PNG, WebP (HTTPS)
- **Peso máximo:** 500KB (se recomienda <200KB)
- **Importante:** Incluye padding/márgenes en diseño (texto se superpone)

### Categoría de banner (banner1_cat, banner2_cat):
- **Función:** Al hacer click en banner, filtra por esta categoría
- **Valores válidos:** Deben coincidir con columna "categoria"
- **Ejemplo:** Si escribes "Herramientas" → banner filtrará productos con categoria="Herramientas"
- **Vacío/omitido:** No aplica filtro, muestra todos

### Oculto (oculto):
- **Valores:** "sí" / "no" (case-insensitive)
- **Función:** Marca producto como oculto en tienda (ABM)
- **Nota:** No elimina, solo oculta visualmente

---

## Ejemplo completo de Sheet (3 filas)

```
id  | nombre              | categoria    | marca     | precio | stock | emoji | img_url             | img2_url | img3_url | origen | oculto | banner1_label      | banner1_title        | banner1_img                              | banner1_cat  | banner2_label | banner2_title  | banner2_img                              | banner2_cat
----|---------------------|--------------|-----------|--------|-------|-------|---------------------|----------|----------|--------|--------|-------------------|----------------------|-----------------------------------------|--------------|---------------|----------------|------------------------------------------|---------------
    | NUEVAS HERRAMIENTAS | Línea Profe. |           | 0      | 0     |       | https://unsplash... |          |          |        |        | NUEVAS HERRAMIENTAS | Línea Profesional     | https://images.unsplash.com/...?w=1200  | Herramientas | PROMOCIÓN     | Accesorios -30%| https://images.unsplash.com/...?w=1200  | Accesorios
1   | Sierra Circular     | Herramientas | Dewalt    | 45000  | 12    | 🪚    | https://cloudinary..| https://c | https://c | US     | no     |                   |                      |                                         |              |               |                |                                         |
2   | Taladro Percutor    | Herramientas | Bosch     | 28500  | 8     | 🔨    | https://cloudinary..| (vacío)  | (vacío)  | DE     | no     |                   |                      |                                         |              |               |                |                                         |
3   | Pintura Látex       | Pintura      | Sherwin   | 12000  | 50    | 🎨    | https://cloudinary..| https://c | (vacío)  | AR     | no     |                   |                      |                                         |              |               |                |                                         |
```

---

## Configuración CSV export

En Google Sheets, asegúrate de:

1. **Menú → Archivo → Compartir**
   - Acceso: "Cualquiera con el enlace"
   - Rol: "Visor"

2. **Menú → Archivo → Publicar en la web**
   - Elegir pestaña (o "Productos")
   - Formato: "CSV" (NO Google Sheets)
   - Copiar URL

3. **Resultado:** URL similar a:
   ```
   https://docs.google.com/spreadsheets/d/ABC123.../export?format=csv&gid=0
   ```

4. **En tienda.html/dashboard.html:**
   ```javascript
   const SHEET_URL = 'https://docs.google.com/spreadsheets/d/ABC123.../export?format=csv';
   ```

---

## Aliases de columnas (flexibilidad)

El sistema reconoce estos nombres alternativos:

| Columna | Alias válidos |
|---------|---------------|
| id | id, codigo, sku |
| nombre | nombre, name, producto, articulo, item |
| categoria | categoria, category, rubro, tipo, seccion |
| marca | marca, brand, fabricante, maker |
| precio | precio, price, valor, costo, importe, tarifa |
| stock | stock, cantidad, existencia, disponible, inventario |
| emoji | emoji, icono, icon, symbol |
| detalle | detalle, description, desc, especificaciones, features |
| img | img, imagen, image, foto, url, photo |

---

## Límites y restricciones

| Elemento | Límite | Notas |
|----------|--------|-------|
| Productos | Sin límite | Recomendado <500 para rendimiento |
| Caracteres por nombre | 100 | UI trunca visualmente |
| Caracteres por detalle | 500 | Textarea, puede quebrar en mobile |
| Imágenes por producto | 3 | img, img2, img3 |
| Tamaño archivo Sheet | 10MB | Incluye historial |
| URLs de imagen | HTTPS | Requerido |
| Categorías distintas | Sin límite | Se generan dinámicamente |

---

## Checklist de validación

- [ ] Fila 1 contiene headers válidos
- [ ] Columna "nombre" / "name" existe y tiene datos
- [ ] Columna "precio" / "price" existe y son números
- [ ] Columna "stock" existe (puede estar vacía)
- [ ] URLs de imágenes comienzan con `https://`
- [ ] Datos de banners en fila 1, columnas correctas
- [ ] Categoría de banner coincide con valores en tabla
- [ ] Sheet compartida públicamente (CSV export)
- [ ] URL de CSV copiada a `SHEET_URL` en tienda/dashboard

---

## Troubleshooting

### ❌ "No se cargan productos"
- Verifica URL de Sheet en SHEET_URL
- Abre URL directa → debe descargarse CSV
- Revisa headers en fila 1

### ❌ "Productos cargan pero sin imágenes"
- Revisa URLs: deben ser HTTPS
- Comprueba que no tengan espacios
- Intenta URL en navegador (debe mostrar imagen)

### ❌ "Banners no aparecen"
- Headers: `banner1_label`, `banner1_title`, `banner1_img`, `banner1_cat`
- Datos en fila 1 (NO fila 2)
- `banner1_cat` coincide con valor en columna "categoria"

### ❌ "Marca de agua no funciona"
- Sube logo en Dashboard → Diseño → Logo
- Carga nueva imagen desde ABM
- Verifica en F12 → Console que no hay errores

---

## Exportación y respaldo

Descargar datos regularmente:

```
Sheet completa → Archivo → Descargar → Excel (.xlsx)
o
CSV directo → Archivo → Publicar en web → Copiar URL
```

Recomendación: Respaldo semanal automatizado con Google Takeout.
