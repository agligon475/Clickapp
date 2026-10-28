# Plan de Implementación: Seguridad OWASP & Experiencia UI/UX Premium (Clickapp)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar blindaje integral contra vulnerabilidades OWASP (Anti-XSS, Headers de seguridad CSP en Vercel, Honeypot & Debounce en Checkout) y elevar la experiencia UI/UX con buscador global Command Palette (`Ctrl + K`), micro-feedback auditivo/háptico sintetizado y generador de cartelería QR para vidrieras y mostradores.

**Architecture:** 
- Centralizar función de sanitización universal `escapeHTML(str)` en `dashboard.html` y `tienda.html` para purgar interpolaciones en `.innerHTML`.
- Agregar `Content-Security-Policy`, `Strict-Transport-Security` y `X-XSS-Protection` en `vercel.json`.
- Integrar honeypot oculto y cooldown/debounce anti-bot en el formulario de compra de `tienda.html`.
- Desarrollar modal y atajos para Command Palette (`Ctrl + K` / `Cmd + K`) en `dashboard.html` con búsqueda reactiva en pedidos, productos, cadetes y vistas.
- Implementar sintetizador de audio con Web Audio API (`playDashSfx`, `playDashHaptic`, toggle de muteo) y animación elástica en Kanban.
- Integrar acceso directo y previsualizador de Kit Imprimible A4/A5 de códigos QR para vidriera y mostrador desde el Dashboard.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5, CSS3 Glassmorphism, Web Audio API, Navigator Vibrate API, Bootstrap Icons, Vercel Edge Headers.

---

## Tareas de Ejecución

- [ ] **Tarea 1: Headers de Seguridad y CSP en `vercel.json`**
  - Añadir directivas `Content-Security-Policy`, `Strict-Transport-Security` y `X-XSS-Protection` en la regla general `/(.*)`.

- [ ] **Tarea 2: Honeypot & Debounce Anti-Spam en Checkout (`tienda.html`)**
  - Añadir campo honeypot oculto `f-website-hp` en `checkout-form`.
  - Validar honeypot en `enviarWhatsApp()`.
  - Añadir debounce de 4 segundos para prevenir clicks repetidos y saturación.

- [ ] **Tarea 3: Sanitización Universal Anti-XSS (`escapeHTML`)**
  - Definir `escapeHTML(str)` en `tienda.html` y sanitizar `searchTerm`, nombres de productos y notas.
  - Definir `escapeHTML(str)` en `dashboard.html` y sanitizar campos de pedidos (`o.cliente`, `o.direccion`, `o.productos`, `o.pago`, `o.logistica`) en el Kanban y tablas.

- [ ] **Tarea 4: Micro-Feedback Auditivo y Háptico Refinado en `dashboard.html`**
  - Implementar sintetizador Web Audio API (`playDashSfx`) con tonos sutiles de pop/click y caja registradora sin archivos externos.
  - Implementar `playDashHaptic` y conectar ambos a las acciones del Kanban (drop, confirmación).
  - Añadir botón de Mute/Unmute en el topbar y persistencia en `localStorage`.

- [ ] **Tarea 5: Buscador Global con Command Palette (`Ctrl + K`) en `dashboard.html`**
  - Estilos CSS para el backdrop, modal omnibox y resultados.
  - Markup del modal omnibox en `dashboard.html`.
  - Botón de acceso en la barra superior (topbar) con chip `<kbd>Ctrl K</kbd>`.
  - Manejador de atajos de teclado (`Ctrl + K`, `Cmd + K`, `ESC`, `ArrowUp`, `ArrowDown`, `Enter`).
  - Motor de búsqueda reactivo sobre pedidos, productos, cadetes y vistas del panel.

- [ ] **Tarea 6: Integración y Generador de Cartelería QR para Vidrieras y Mostradores**
  - Añadir botón "Carteles & QR Mostrador" en la barra superior y en el sidebar del Dashboard.
  - Implementar modal preview o apertura enriquecida hacia `kit-imprimible.html?store=...`.
  - Asegurar que `kit-imprimible.html` reciba el store actual e imprima en resolución HD A4/A5.

- [ ] **Tarea 7: Sincronización, Documentación & Git Sync**
  - Ejecutar `node scratch/sync_folders.js` para replicar en `public/`.
  - Actualizar `HOJA-DE-RUTA-PROXIMOS-PASOS.md`.
  - Agregar slide datado en `presentacion-evolucion-clickapp.html`.
  - Actualizar `terminos.html` y `privacidad.html` si corresponde.
  - Ejecutar `git add`, `git commit` y `git push`.
