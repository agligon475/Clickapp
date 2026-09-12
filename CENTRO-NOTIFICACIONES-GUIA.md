# 🔔 Guía de Implementación: Centro de Notificaciones para Aplicaciones SaaS

Esta guía contiene la arquitectura completa, el código modular (HTML, CSS y JavaScript) y las mejores prácticas para implementar un **Centro de Notificaciones Multi-Tenant** profesional, reactivo y con estética premium en cualquier aplicación SaaS o Dashboard.

---

## 📋 Características Principales

1. **Aislamiento Multi-Tenant**: Almacenamiento independiente por cuenta/organización (`tenant_id` o `store_id`).
2. **TopBar Bell con Badge Dinámico**: Campana interactiva con contador de no leídas y animación de oscilación (*wobble* / *pulse*).
3. **Panel Lateral Flotante (Drawer Glassmorphism)**:
   - Filtros rápidos por pestañas (`Todas`, `Transacciones/Pedidos`, `Configuración`, `Sistema`).
   - Botón *"Marcar todas como leídas"* y contador de pendientes.
   - Acciones interactivas de **1 Clic** para navegar a la sección relevante.
   - Estado vacío (*Empty state*) estético.
4. **Notificaciones Flotantes en Vivo (Toasts)**: Avisos emergentes no invasivos con auto-cierre para eventos en tiempo real.
5. **Sintetizador de Audio Nativo (Web Audio API)**: Campanilla de aviso sonora sin necesidad de descargar archivos `.mp3` externos y con interruptor de silenciado (*mute/unmute*).
6. **Motor de Auditoría de Configuración (Health Check)**: Evalúa automáticamente la salud y completitud del perfil del usuario/comercio y genera recordatorios accionables.

---

## 1. 🎨 Estilos CSS (Vanilla CSS)

Agrega estos estilos en tu hoja de estilos principal o dentro de una etiqueta `<style>`:

```css
/* ═══════════════════════════════════════════════════════════════
   CENTRO DE NOTIFICACIONES — ESTILOS
   ═══════════════════════════════════════════════════════════════ */

:root {
  --notif-primary: #D72638;
  --notif-bg-drawer: #141416;
  --notif-bg-card: #1E1E22;
  --notif-border: #2E2E33;
  --notif-text: #F0F0EC;
  --notif-text-muted: #D4D4DC;
  --notif-success: #2ECC71;
  --notif-warning: #F39C12;
  --notif-info: #3498DB;
}

/* Campana en Topbar */
.topbar-notif-btn {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--notif-bg-card);
  border: 1px solid var(--notif-border);
  color: var(--notif-text-muted);
  cursor: pointer;
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  position: relative;
}

.topbar-notif-btn:hover {
  border-color: var(--notif-primary);
  color: var(--notif-primary);
  transform: translateY(-1px);
}

.notif-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: var(--notif-primary);
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  min-width: 17px;
  height: 17px;
  border-radius: 99px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  box-shadow: 0 0 8px rgba(215, 38, 56, 0.6);
  border: 1.5px solid var(--notif-bg-drawer);
  animation: notifBadgePulse 2s infinite ease-in-out;
}

@keyframes notifBadgePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
}

.notif-bell-wobble {
  animation: notifBellWobble 0.6s ease-in-out;
}

@keyframes notifBellWobble {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-15deg); }
  40% { transform: rotate(15deg); }
  60% { transform: rotate(-10deg); }
  80% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
}

/* Overlay Difuminado */
.notif-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 99990;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.25s ease, visibility 0.25s ease;
}

.notif-drawer-overlay.active {
  opacity: 1;
  visibility: visible;
}

/* Panel Drawer Lateral */
.notif-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(440px, 94vw);
  background: var(--notif-bg-drawer);
  border-left: 1px solid var(--notif-border);
  z-index: 99995;
  display: flex;
  flex-direction: column;
  box-shadow: -12px 0 40px rgba(0, 0, 0, 0.6);
  transform: translateX(105%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.notif-drawer.active {
  transform: translateX(0);
}

/* Encabezado del Drawer */
.notif-drawer-header {
  padding: 18px 20px 14px;
  border-bottom: 1px solid var(--notif-border);
  background: var(--notif-bg-drawer);
  flex-shrink: 0;
}

.notif-drawer-title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.notif-drawer-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: var(--notif-text);
  letter-spacing: 0.02em;
}

.notif-unread-pill {
  background: rgba(215, 38, 56, 0.18);
  color: #ff4d4d;
  border: 1px solid rgba(215, 38, 56, 0.35);
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
}

.notif-drawer-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.notif-icon-btn {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--notif-bg-card);
  border: 1px solid var(--notif-border);
  color: var(--notif-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  transition: all 0.15s ease;
}

.notif-icon-btn:hover {
  border-color: var(--notif-primary);
  color: var(--notif-text);
  background: rgba(215, 38, 56, 0.15);
}

.notif-text-link-btn {
  background: none;
  border: none;
  color: var(--notif-text-muted);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 6px;
  border-radius: 6px;
  transition: all 0.15s ease;
}

.notif-text-link-btn:hover {
  color: var(--notif-primary);
  background: rgba(215, 38, 56, 0.08);
}

/* Filtros en Pills */
.notif-filter-row {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 2px;
  scrollbar-width: none;
}
.notif-filter-row::-webkit-scrollbar { display: none; }

.notif-filter-btn {
  padding: 5px 10px;
  border-radius: 8px;
  background: var(--notif-bg-card);
  border: 1px solid var(--notif-border);
  color: var(--notif-text-muted);
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;
}

.notif-filter-btn:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: var(--notif-text);
}

.notif-filter-btn.active {
  background: var(--notif-primary);
  border-color: var(--notif-primary);
  color: #ffffff;
  box-shadow: 0 2px 8px rgba(215, 38, 56, 0.35);
}

.notif-filter-count {
  font-size: 10px;
  opacity: 0.85;
  background: rgba(0, 0, 0, 0.25);
  padding: 1px 5px;
  border-radius: 10px;
}

/* Contenedor de Lista */
.notif-drawer-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Tarjeta de Notificación */
.notif-card {
  background: var(--notif-bg-card);
  border: 1px solid var(--notif-border);
  border-radius: 12px;
  padding: 13px 14px;
  position: relative;
  transition: all 0.2s ease;
  display: flex;
  gap: 12px;
}

.notif-card.unread {
  background: linear-gradient(135deg, rgba(215, 38, 56, 0.08) 0%, var(--notif-bg-card) 100%);
  border-color: rgba(215, 38, 56, 0.35);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
}

.notif-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.notif-card-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.notif-card-icon.order {
  background: rgba(46, 204, 113, 0.15);
  border: 1px solid rgba(46, 204, 113, 0.3);
  color: var(--notif-success);
}

.notif-card-icon.setup {
  background: rgba(243, 156, 18, 0.15);
  border: 1px solid rgba(243, 156, 18, 0.3);
  color: var(--notif-warning);
}

.notif-card-icon.system {
  background: rgba(52, 152, 219, 0.15);
  border: 1px solid rgba(52, 152, 219, 0.3);
  color: var(--notif-info);
}

.notif-card-icon.ai {
  background: rgba(215, 38, 56, 0.15);
  border: 1px solid rgba(215, 38, 56, 0.3);
  color: var(--notif-primary);
}

.notif-card-content {
  flex: 1;
  min-width: 0;
}

.notif-card-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 3px;
}

.notif-card-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--notif-text);
  line-height: 1.3;
}

.notif-card-time {
  font-size: 10.5px;
  color: var(--notif-text-muted);
  white-space: nowrap;
  opacity: 0.8;
}

.notif-card-desc {
  font-size: 12px;
  color: var(--notif-text-muted);
  line-height: 1.45;
  margin-bottom: 8px;
  word-break: break-word;
}

.notif-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 6px;
}

.notif-action-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--notif-border);
  color: var(--notif-text);
  font-size: 11.5px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  transition: all 0.15s ease;
}

.notif-action-btn:hover {
  background: var(--notif-primary);
  border-color: var(--notif-primary);
  color: #ffffff;
}

.notif-card-dismiss-btn {
  background: none;
  border: none;
  color: var(--notif-text-muted);
  font-size: 12px;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  opacity: 0.6;
  transition: all 0.15s ease;
}

.notif-card-dismiss-btn:hover {
  opacity: 1;
  color: var(--notif-primary);
}

/* Estado Vacío (Empty State) */
.notif-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 60px 20px;
  color: var(--notif-text-muted);
}

.notif-empty-icon {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--notif-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--notif-text-muted);
  margin-bottom: 14px;
}

/* Toasts Emergentes en Vivo */
.notif-toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
  max-width: min(380px, 90vw);
}

.notif-toast {
  pointer-events: auto;
  background: #18181b;
  border: 1px solid rgba(215, 38, 56, 0.4);
  border-left: 4px solid var(--notif-primary);
  border-radius: 12px;
  padding: 12px 14px;
  color: #ffffff;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: notifToastSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

@keyframes notifToastSlideIn {
  from { transform: translateX(100%) scale(0.9); opacity: 0; }
  to { transform: translateX(0) scale(1); opacity: 1; }
}

.notif-toast.hiding {
  transform: translateX(100%) scale(0.9);
  opacity: 0;
}
```

---

## 2. 🧱 Estructura HTML

### A. Botón en la Barra Superior (TopBar / Header)
Coloca este botón dentro de tu menú de navegación superior:

```html
<!-- Botón Campana con Badge -->
<button class="topbar-notif-btn" id="notif-bell-btn" onclick="toggleNotificationCenter()" title="Centro de Notificaciones">
  <i class="bi bi-bell-fill" id="notif-bell-icon"></i>
  <span class="notif-badge" id="notif-badge" style="display:none;">0</span>
</button>
```

### B. Drawer Flotante y Contenedor de Toasts
Inserta este bloque al final del `<body>` de tu HTML:

```html
<!-- ════ CENTRO DE NOTIFICACIONES DRAWER ════ -->
<div id="notif-drawer-overlay" class="notif-drawer-overlay" onclick="toggleNotificationCenter(false)"></div>
<aside id="notif-drawer" class="notif-drawer" aria-label="Centro de Notificaciones">
  <!-- Encabezado -->
  <div class="notif-drawer-header">
    <div class="notif-drawer-title-row">
      <div class="notif-drawer-title">
        <i class="bi bi-bell-fill" style="color:var(--notif-primary, #D72638);"></i>
        <span>Notificaciones</span>
        <span id="notif-unread-count-pill" class="notif-unread-pill" style="display:none;">0</span>
      </div>
      <div class="notif-drawer-actions">
        <button id="notif-sound-btn" class="notif-icon-btn" onclick="toggleNotifSound()" title="Silenciar / Activar sonido">
          <i class="bi bi-volume-up-fill" id="notif-sound-icon"></i>
        </button>
        <button class="notif-icon-btn" onclick="toggleNotificationCenter(false)" title="Cerrar">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
    
    <!-- Resumen y Acción General -->
    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px; margin-bottom:12px;">
      <span style="font-size:11.5px; color:var(--notif-text-muted, #D4D4DC);" id="notif-status-summary">Alertas y avisos de tu cuenta</span>
      <button class="notif-text-link-btn" onclick="markAllNotificationsAsRead()">
        <i class="bi bi-check2-all"></i> Marcar todas leídas
      </button>
    </div>

    <!-- Pestañas de Filtro -->
    <div class="notif-filter-row">
      <button class="notif-filter-btn active" data-filter="all" onclick="setNotifFilter('all', this)">
        Todas <span class="notif-filter-count" id="notif-count-all">0</span>
      </button>
      <button class="notif-filter-btn" data-filter="order" onclick="setNotifFilter('order', this)">
        Pedidos 🛍️ <span class="notif-filter-count" id="notif-count-order">0</span>
      </button>
      <button class="notif-filter-btn" data-filter="setup" onclick="setNotifFilter('setup', this)">
        Configuración ⚙️ <span class="notif-filter-count" id="notif-count-setup">0</span>
      </button>
      <button class="notif-filter-btn" data-filter="system" onclick="setNotifFilter('system', this)">
        Sistema 📢 <span class="notif-filter-count" id="notif-count-system">0</span>
      </button>
    </div>
  </div>

  <!-- Cuerpo de Lista -->
  <div class="notif-drawer-body" id="notif-list-container">
    <!-- Renderizado dinámico vía JavaScript -->
  </div>
</aside>

<!-- Contenedor Flotante para Toasts en Tiempo Real -->
<div id="notif-toast-container" class="notif-toast-container"></div>
```

---

## 3. ⚙️ Motor JavaScript (`NotificationCenter`)

Inserta este módulo en tu archivo de scripts:

```javascript
/* ═══════════════════════════════════════════════════════════════
   CENTRO DE NOTIFICACIONES MULTI-TENANT (NotificationCenter)
   ═══════════════════════════════════════════════════════════════ */

const NotificationCenter = {
  filter: 'all',
  soundEnabled: localStorage.getItem('app_notif_sound') !== '0',
  audioCtx: null,

  // Clave aislada por tenant/cuenta
  getStorageKey() {
    const tenantId = (window.CURRENT_TENANT_ID || localStorage.getItem('app_tenant_id') || 'default').toLowerCase();
    return `app_notifications_${tenantId}`;
  },

  getAll() {
    try {
      const raw = localStorage.getItem(this.getStorageKey());
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn('Error leyendo notificaciones:', e);
      return [];
    }
  },

  saveAll(notifs) {
    try {
      localStorage.setItem(this.getStorageKey(), JSON.stringify(notifs));
      this.render();
    } catch (e) {
      console.warn('Error guardando notificaciones:', e);
    }
  },

  // 1. Sintetizador de audio nativo (Web Audio API)
  playChime() {
    if (!this.soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.audioCtx) this.audioCtx = new AudioCtx();
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const now = this.audioCtx.currentTime;

      // Nota 1 (D5 - 587.33Hz)
      const osc1 = this.audioCtx.createOscillator();
      const gain1 = this.audioCtx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.12, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(this.audioCtx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      // Nota 2 (A5 - 880.00Hz)
      const osc2 = this.audioCtx.createOscillator();
      const gain2 = this.audioCtx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880.00, now + 0.12);
      gain2.gain.setValueAtTime(0.15, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc2.connect(gain2);
      gain2.connect(this.audioCtx.destination);
      osc2.start(now + 0.12);
      osc2.stop(now + 0.6);
    } catch (e) {
      console.debug('Aviso sonoro no disponible o bloqueado por el navegador:', e);
    }
  },

  // 2. Notificación flotante Toast
  showToast(notif) {
    const container = document.getElementById('notif-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'notif-toast';
    toast.setAttribute('role', 'alert');

    const iconMap = {
      order: { icon: 'bi-bag-check-fill', color: '#2ECC71' },
      setup: { icon: 'bi-gear-wide-connected', color: '#F39C12' },
      ai: { icon: 'bi-robot', color: '#D72638' },
      system: { icon: 'bi-megaphone-fill', color: '#3498DB' }
    };
    const { icon, color } = iconMap[notif.category] || iconMap.system;

    toast.innerHTML = `
      <div style="font-size: 20px; color: ${color}; display: flex; align-items: center;">
        <i class="bi ${icon}"></i>
      </div>
      <div style="flex: 1; min-width: 0;">
        <div style="font-size: 13px; font-weight: 700; color: #fff; margin-bottom: 2px;">${notif.title}</div>
        <div style="font-size: 11.5px; color: #A1A1AA; line-height: 1.35;">${notif.desc}</div>
      </div>
      <button style="background: none; border: none; color: #71717A; cursor: pointer; padding: 2px;" onclick="event.stopPropagation(); this.closest('.notif-toast').remove();">
        <i class="bi bi-x"></i>
      </button>
    `;

    toast.onclick = () => {
      this.markAsRead(notif.id);
      if (typeof notif.actionFn === 'function') {
        notif.actionFn();
      } else if (notif.actionView && typeof window.goToView === 'function') {
        window.goToView(notif.actionView);
      } else {
        toggleNotificationCenter(true);
      }
      toast.classList.add('hiding');
      setTimeout(() => toast.remove(), 250);
    };

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.isConnected) {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 250);
      }
    }, 5500);
  },

  // 3. Añadir notificación (Idempotente si tiene uniqueId)
  add(item, notify = false) {
    const notifs = this.getAll();

    if (item.uniqueId) {
      const existingIdx = notifs.findIndex(n => n.uniqueId === item.uniqueId);
      if (existingIdx !== -1) {
        notifs[existingIdx] = { ...notifs[existingIdx], ...item, id: notifs[existingIdx].id, read: notifs[existingIdx].read };
        this.saveAll(notifs);
        return;
      }
    }

    const newNotif = {
      id: 'ntf_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      uniqueId: item.uniqueId || null,
      category: item.category || 'system', // 'order' | 'setup' | 'system' | 'ai'
      title: item.title || 'Notificación',
      desc: item.desc || '',
      timestamp: item.timestamp || new Date().toISOString(),
      read: false,
      actionLabel: item.actionLabel || '',
      actionView: item.actionView || '',
      priority: item.priority || 'normal'
    };

    notifs.unshift(newNotif);
    if (notifs.length > 60) notifs.length = 60; // Límite por tenant

    this.saveAll(notifs);

    if (notify) {
      this.playChime();
      this.showToast(newNotif);
      const bell = document.getElementById('notif-bell-btn');
      if (bell) {
        bell.classList.remove('notif-bell-wobble');
        void bell.offsetWidth; // Force reflow
        bell.classList.add('notif-bell-wobble');
      }
    }
  },

  removeByUniqueId(uniqueId) {
    const notifs = this.getAll().filter(n => n.uniqueId !== uniqueId);
    this.saveAll(notifs);
  },

  dismiss(id) {
    const notifs = this.getAll().filter(n => n.id !== id);
    this.saveAll(notifs);
  },

  markAsRead(id) {
    const notifs = this.getAll().map(n => n.id === id ? { ...n, read: true } : n);
    this.saveAll(notifs);
  },

  markAllAsRead() {
    const notifs = this.getAll().map(n => ({ ...n, read: true }));
    this.saveAll(notifs);
  },

  // 4. Motor de Diagnóstico de Configuración / Onboarding
  checkSetupHealth(accountData = {}) {
    // Ejemplo A: Verificar si completó método de cobro
    if (!accountData.has_payment_methods) {
      this.add({
        uniqueId: 'setup_missing_payment',
        category: 'setup',
        title: 'Configurá tus medios de cobro',
        desc: 'Para empezar a recibir pagos de tus clientes, ingresá tus datos de transferencia o cuenta bancaria.',
        actionLabel: 'Configurar Pagos',
        actionView: 'billing'
      });
    } else {
      this.removeByUniqueId('setup_missing_payment');
    }

    // Ejemplo B: Verificar si subió el logo
    if (!accountData.logo_url) {
      this.add({
        uniqueId: 'setup_missing_logo',
        category: 'setup',
        title: 'Subí el logo de tu negocio',
        desc: 'Personalizá la identidad visual de tu marca para generar mayor confianza.',
        actionLabel: 'Subir Logo',
        actionView: 'branding'
      });
    } else {
      this.removeByUniqueId('setup_missing_logo');
    }
  },

  // 5. Sincronización de eventos / Pedidos
  syncTransactions(items = []) {
    if (!Array.isArray(items) || !items.length) return;

    const tenantId = (window.CURRENT_TENANT_ID || 'default').toLowerCase();
    const keySeen = `app_known_item_ids_${tenantId}`;
    let knownIds = [];
    try {
      knownIds = JSON.parse(localStorage.getItem(keySeen) || '[]');
    } catch (e) { knownIds = []; }

    const isFirstRun = knownIds.length === 0;

    items.forEach(item => {
      const idStr = String(item.id || '');
      if (!idStr) return;

      if (!knownIds.includes(idStr)) {
        knownIds.push(idStr);
        if (!isFirstRun) {
          this.add({
            uniqueId: `tx_${idStr}`,
            category: 'order',
            title: `¡Nuevo Pedido #${idStr}!`,
            desc: `${item.customer_name || 'Cliente'} generó una compra por $${item.total || 0}.`,
            actionLabel: 'Ver Detalle',
            actionView: 'orders',
            timestamp: new Date().toISOString(),
            priority: 'high'
          }, true); // true activa sonido y Toast
        }
      }
    });

    if (knownIds.length > 300) knownIds = knownIds.slice(-300);
    localStorage.setItem(keySeen, JSON.stringify(knownIds));
  },

  formatRelativeTime(isoStr) {
    try {
      const date = new Date(isoStr);
      if (isNaN(date.getTime())) return 'Reciente';
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Ahora mismo';
      if (diffMins < 60) return `Hace ${diffMins} min`;
      if (diffHours < 24) return `Hace ${diffHours} h`;
      if (diffDays === 1) return 'Ayer';
      if (diffDays < 7) return `Hace ${diffDays} días`;
      return date.toLocaleDateString('es-AR', { day: '2-digit', month: 'short' });
    } catch (e) {
      return 'Reciente';
    }
  },

  // 6. Renderizado de interfaz
  render() {
    const notifs = this.getAll();
    const unreadCount = notifs.filter(n => !n.read).length;

    // TopBar Badge
    const badge = document.getElementById('notif-badge');
    if (badge) {
      if (unreadCount > 0) {
        badge.textContent = unreadCount > 99 ? '99+' : unreadCount;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    }

    // Unread Pill
    const unreadPill = document.getElementById('notif-unread-count-pill');
    if (unreadPill) {
      if (unreadCount > 0) {
        unreadPill.textContent = `${unreadCount} pendiente${unreadCount !== 1 ? 's' : ''}`;
        unreadPill.style.display = 'inline-block';
      } else {
        unreadPill.style.display = 'none';
      }
    }

    // Contadores de filtro
    const countAll = document.getElementById('notif-count-all');
    const countOrder = document.getElementById('notif-count-order');
    const countSetup = document.getElementById('notif-count-setup');
    const countSystem = document.getElementById('notif-count-system');

    if (countAll) countAll.textContent = notifs.length;
    if (countOrder) countOrder.textContent = notifs.filter(n => n.category === 'order').length;
    if (countSetup) countSetup.textContent = notifs.filter(n => n.category === 'setup').length;
    if (countSystem) countSystem.textContent = notifs.filter(n => n.category === 'system' || n.category === 'ai').length;

    // Sound toggle icon
    const soundIcon = document.getElementById('notif-sound-icon');
    if (soundIcon) {
      soundIcon.className = this.soundEnabled ? 'bi bi-volume-up-fill' : 'bi bi-volume-mute-fill';
      soundIcon.style.color = this.soundEnabled ? 'var(--notif-text-muted)' : 'var(--notif-primary)';
    }

    // Lista
    const container = document.getElementById('notif-list-container');
    if (!container) return;

    let filtered = notifs;
    if (this.filter === 'order') filtered = notifs.filter(n => n.category === 'order');
    else if (this.filter === 'setup') filtered = notifs.filter(n => n.category === 'setup');
    else if (this.filter === 'system') filtered = notifs.filter(n => n.category === 'system' || n.category === 'ai');

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="notif-empty-state">
          <div class="notif-empty-icon">
            <i class="bi bi-bell-slash"></i>
          </div>
          <div style="font-size: 15px; font-weight: 700; color: var(--notif-text); margin-bottom: 4px;">
            ${this.filter === 'all' ? '¡Todo al día!' : 'Sin notificaciones'}
          </div>
          <p style="font-size: 12.5px; color: var(--notif-text-muted); margin: 0; line-height: 1.4;">
            No tenés alertas pendientes en esta sección.
          </p>
        </div>
      `;
      return;
    }

    const iconMap = {
      order: 'bi-bag-check-fill',
      setup: 'bi-gear-wide-connected',
      ai: 'bi-robot',
      system: 'bi-megaphone-fill'
    };

    container.innerHTML = filtered.map(n => `
      <div class="notif-card ${!n.read ? 'unread' : ''}">
        <div class="notif-card-icon ${n.category || 'system'}">
          <i class="bi ${iconMap[n.category] || iconMap.system}"></i>
        </div>
        <div class="notif-card-content">
          <div class="notif-card-header">
            <span class="notif-card-title">${n.title}</span>
            <span class="notif-card-time">${this.formatRelativeTime(n.timestamp)}</span>
          </div>
          <div class="notif-card-desc">${n.desc}</div>
          <div class="notif-card-footer">
            <div>
              ${n.actionLabel ? `
                <button class="notif-action-btn" onclick="NotificationCenter.handleAction('${n.id}', '${n.actionView || ''}')">
                  ${n.actionLabel} <i class="bi bi-arrow-right-short" style="font-size:14px;"></i>
                </button>
              ` : ''}
            </div>
            <div style="display:flex; align-items:center; gap:4px;">
              ${!n.read ? `
                <button class="notif-card-dismiss-btn" title="Marcar como leída" onclick="NotificationCenter.markAsRead('${n.id}')">
                  <i class="bi bi-check2"></i>
                </button>
              ` : ''}
              <button class="notif-card-dismiss-btn" title="Eliminar" onclick="NotificationCenter.dismiss('${n.id}')">
                <i class="bi bi-trash3"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  },

  handleAction(notifId, actionView) {
    this.markAsRead(notifId);
    toggleNotificationCenter(false);
    if (actionView && typeof window.goToView === 'function') {
      window.goToView(actionView);
    }
  }
};

// Funciones Globales para Control UI
function toggleNotificationCenter(forceState = null) {
  const drawer = document.getElementById('notif-drawer');
  const overlay = document.getElementById('notif-drawer-overlay');
  if (!drawer || !overlay) return;

  const isActive = drawer.classList.contains('active');
  const nextState = forceState !== null ? forceState : !isActive;

  if (nextState) {
    drawer.classList.add('active');
    overlay.classList.add('active');
    NotificationCenter.render();
  } else {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
  }
}

function toggleNotifSound() {
  NotificationCenter.soundEnabled = !NotificationCenter.soundEnabled;
  localStorage.setItem('app_notif_sound', NotificationCenter.soundEnabled ? '1' : '0');
  NotificationCenter.render();
  if (NotificationCenter.soundEnabled) {
    NotificationCenter.playChime();
  }
}

function markAllNotificationsAsRead() {
  NotificationCenter.markAllAsRead();
}

function setNotifFilter(filterName, btn) {
  NotificationCenter.filter = filterName;
  document.querySelectorAll('.notif-filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  NotificationCenter.render();
}

// Inicialización automática
document.addEventListener('DOMContentLoaded', () => {
  NotificationCenter.render();
});
```

---

## 4. 🚀 Cómo inicializarlo en tu SaaS

1. **Al iniciar sesión o cargar la app**:
   ```javascript
   window.CURRENT_TENANT_ID = user.organization_id; // Identificador de la cuenta/tienda
   NotificationCenter.render();
   ```

2. **Al cargar la configuración de la cuenta**:
   ```javascript
   NotificationCenter.checkSetupHealth({
     has_payment_methods: user.cbu_configured,
     logo_url: user.avatar_or_logo
   });
   ```

3. **Al recibir pedidos o eventos en tiempo real (Polling, WebSockets o SSE)**:
   ```javascript
   NotificationCenter.syncTransactions(pedidosRecientes);
   ```

4. **Para emitir una alerta manual en cualquier momento**:
   ```javascript
   NotificationCenter.add({
     category: 'system',
     title: '¡Nueva función disponible!',
     desc: 'Ahora podés exportar reportes en formato Excel y PDF.',
     actionLabel: 'Ver Novedades',
     actionView: 'reports'
   }, true); // true activa sonido y Toast
   ```
