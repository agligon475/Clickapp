# 🎨 Fundamentos y Guía de Marca — Dale! Te Pido (Brand Foundations)

> **Documento Oficial de Marca, Diseño UI/UX y Sistema Tecnológico**  
> Este documento establece los cimientos visuales, la identidad de marca, el sistema de tokens CSS y las normas de desarrollo para **Dale! Te Pido / Clickapp**.

---

## 📌 1. Identidad de Marca y Propósito

### 1.1 Misión y Visión
- **Propósito:** Ofrecer a comercios, tiendas locales y gastronómicos un catálogo digital profesional y sistema de pedidos directo por WhatsApp **sin comisiones por venta**.
- **Promesa:** Simplicidad, velocidad de carga, independencia operativa y estética de nivel enterprise.
- **Tono de Voz:** Cercano, directo, moderno, profesional y facilitador.

### 1.2 Recursos de Logotipo Oficial
- **Logo Principal (Cloudinary):**  
  `https://res.cloudinary.com/deuog0r34/image/upload/v1778811606/daletepido-logo-white_zpcolq.png`
- **Reglas de Aplicación del Logo:**
  - En cabeceras oscuras o con degradado rojo: Aplicar la imagen directamente sin filtros.
  - En contenedores en modo claro (`--bg-card: #FFFFFF` o `--bg-body: #F1F5F9`): Aplicar `filter: brightness(0);` para lograr un acabado negro de alto contraste.
  - En modo oscuro (`body.dark-mode`): Aplicar `filter: brightness(0) invert(1);`.

---

## 🎨 2. Sistema Tipográfico Oficial

| Aplicación | Fuente | Pesos Utilizados | Regla CSS / Token |
| :--- | :--- | :--- | :--- |
| **Títulos (H1, H2, H3, H4)** | `Josefin Sans` | 600, 700, 800 | `font-family: 'Josefin Sans', sans-serif;` |
| **Cuerpo, Botones e Inputs** | `Poppins` | 400, 500, 600, 700 | `font-family: 'Poppins', sans-serif;` |
| **Código, Tickers y Datetime** | `JetBrains Mono` | 400, 600 | `font-family: 'JetBrains Mono', monospace;` |

---

## 💎 3. Paleta de Colores Oficial y Tokens UI

### 3.1 Colores Principales y Semánticos
- **Rojo Primario Brand:** `#D60000` / `#E53E3E`
  - *Cabeceras de Marca:* `linear-gradient(135deg, #D60000 0%, #7A0000 100%)`
  - *Sombra / Glow:* `box-shadow: 0 4px 14px rgba(214, 0, 0, 0.35);`
- **Verde Estado / Éxito:** `#10B981` / `#16A34A`
  - *Glow de Actividad:* `rgba(16, 185, 129, 0.6)`
- **Naranja Advertencia / Trial:** `#D97706` / `#F59E0B`
- **Violeta Acceso / CMS / Upgrades:** `#7C3AED` / `#8B5CF6`
- **Azul Supabase / Info:** `#3B82F6` / `#0284C7`

### 3.2 Modos Claro y Oscuro (Tokens CSS)

#### ☀️ Modo Claro (Default):
```css
:root {
  --bg-body: #F1F5F9;       /* Slate 100 */
  --bg-card: #FFFFFF;       /* Pure White */
  --bg-card-hover: #F8FAFC;
  --bg-input: #F8FAFC;
  --border-color: #CBD5E1;   /* Slate 300 - Alto contraste */
  --text-main: #0F172A;     /* Slate 900 - Texto legible */
  --text-muted: #334155;    /* Slate 700 */
  --red-primary: #D60000;
  --green-success: #16A34A;
}
```

#### 🌙 Modo Oscuro (Dark Mode):
```css
body.dark-mode {
  --bg-body: #0A0F1D;       /* Deep Navy Dark */
  --bg-card: #151C2C;       /* Card Dark */
  --bg-card-hover: #1D263B;
  --bg-input: #0E1322;
  --border-color: #24304A;   /* Dark Border */
  --text-main: #EDF2F7;
  --text-muted: #CBD5E1;
}
```

---

## 📐 4. Arquitectura del SuperDashboard (`super-admin-secret-dashboard.html`)

1. **Header Principal (Sticky):**
   - Logo a la izquierda con `filter` según el tema.
   - **Live Countdown Ticker:** Conteo regresivo de 15s a 00s para recarga de tiendas en vivo.
   - Botones rápidos de acción (Cambiar tema, Prospectos, CMS Correos, Configuración Avanzada, Guardar Cambios, Refrescar y Logout).

2. **Panel Resumen de Conexiones (Infraestructura Responsive):**
   - Ubicado **previo a las 4 cajas de info métricas**.
   - En mobile se adapta en layout vertical stacking y grid responsive (`repeat(auto-fit, minmax(170px, 1fr))`) para evitar desbordes.
   - Luces indicadoras: `Supabase DB`, `Correo Transaccional`, `Cloudinary CDN`, `Motor IA`.

3. **Cuatro Cajas KPI de Cuentas (Metrics Grid):**
   - Tiendas Registradas, Tiendas Activas, Tiendas Suspendidas y Solicitudes de Upgrade.

4. **Acordeón de Comercios:**
   - **Cerrado:** Nombre del comercio, luz de estado a la izquierda; botonera de 9 iconos a la derecha (`margin-left: auto`).
   - **Abierto (Grid de 2 Columnas):**
     - *Columna Izquierda:* Información fiscal, rubro, plan, estado de trial, comprobantes y switch Activa/Suspendida.
     - *Columna Derecha:* 9 botones de acción rápida con iconos y etiquetas completas.

---

## 📧 5. Estándares de Correos Transaccionales (CMS)

### 5.1 Estructura Visual Obligatoria de Correos
Los correos electrónicos transaccionales deben renderizarse en **Modo Claro de Alto Contraste**:
- **Canvas / Fondo:** `#f4f6f8`
- **Contenedor Email:** `#ffffff` con borde `1px solid #e2e8f0` y sombra sutil.
- **Cabecera:** Degradado Rojo Oficial `linear-gradient(135deg, #D60000 0%, #7A0000 100%)` con el logo en blanco.
- **Títulos:** `#0f172a` (Josefin Sans).
- **Cuerpo:** `#334155` (Poppins / System Sans).
- **Botón CTA:** Degradado rojo con sombra y texto en blanco en mayúsculas.

### 5.2 Catálogo de 9 Plantillas Transaccionales
1. `welcome`: Bienvenida / Registro de Tienda (15 Días Trial).
2. `reset_password`: Restablecimiento de Contraseña.
3. `trial_reminder_7`: Recordatorio de Trial (7 días restantes).
4. `trial_reminder_3`: Recordatorio de Trial (3 días restantes).
5. `trial_ended`: Trial Expirado / Conversión a Plan.
6. `account_activated`: Cuenta Confirmada + Base de Conocimientos (/ayuda).
7. `annual_benefit`: Beneficio Plan Anual (2 meses gratis + reseña).
8. `payment_instructions`: Instrucciones para Pago y Transferencia.
9. `billing_reminder`: Recordatorio para Completar Datos Fiscales.

---

## 🔒 6. Credenciales y Autenticación del SuperAdmin

- **Página de Login:** `super-admin-login.html`
- **Usuario Master:** `admin-alicari`
- **Contraseña Master:** `42904062Gpaz`
- **Master Key Legacy:** `super-admin-alicari`
- **Persistencia de Sesión:** `sessionStorage.getItem('super_admin_master_key')`
- **Seguridad:** Aislamiento del dashboard principal en `super-admin-secret-dashboard.html` mediante script de autenticación inmediata en la cabecera `<head>`.

---

## 🚨 7. Regla de Oro de Desarrollo y Sincronización Git

Al completar cualquier modificación funcional o de diseño en el código:

1. **Sincronización de Subcarpetas:**
   ```bash
   node scratch/sync_folders.js
   ```
2. **Sincronización Git:**
   ```bash
   git add .
   git commit -m "feat/fix: descripción del cambio"
   git push
   ```
