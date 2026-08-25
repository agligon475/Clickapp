import fs from 'fs';

let html = fs.readFileSync('dashboard.html', 'utf8');

// 1. Add Sidebar item
const sbTarget = `<div class="sb-item" onclick="showView('categories',this)"><i class="bi bi-tags"></i> <span>Categorías</span></div>`;
const sbReplacement = `<div class="sb-item" onclick="showView('categories',this)"><i class="bi bi-tags"></i> <span>Categorías</span></div>
        <div class="sb-item" onclick="showView('coupons',this)"><i class="bi bi-ticket-perforated"></i> <span>Cupones</span></div>`;

if (html.includes(sbTarget) && !html.includes("showView('coupons',this)")) {
  html = html.replace(sbTarget, sbReplacement);
  console.log('✔ Sidebar coupon item inserted');
} else {
  console.log('Sidebar item already present or target not found');
}

// 2. Add View Section
const viewTarget = `<!-- ══ CATEGORIES ══ -->`;
const viewCode = `<!-- ══ COUPONS ══ -->
    <div class="view" id="view-coupons">
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-bottom:16px;">
        <div class="card" style="padding:14px; display:flex; align-items:center; gap:12px;">
          <div style="width:40px; height:40px; border-radius:8px; background:rgba(215,38,56,0.15); color:var(--red); display:flex; align-items:center; justify-content:center; font-size:20px;">
            <i class="bi bi-ticket-perforated"></i>
          </div>
          <div>
            <div style="font-size:11px; color:var(--silver); font-weight:600; text-transform:uppercase;">Total Cupones</div>
            <div id="metric-coupons-total" style="font-size:20px; font-weight:700; color:var(--white);">0</div>
          </div>
        </div>
        <div class="card" style="padding:14px; display:flex; align-items:center; gap:12px;">
          <div style="width:40px; height:40px; border-radius:8px; background:rgba(74,222,128,0.15); color:#4ade80; display:flex; align-items:center; justify-content:center; font-size:20px;">
            <i class="bi bi-check-circle"></i>
          </div>
          <div>
            <div style="font-size:11px; color:var(--silver); font-weight:600; text-transform:uppercase;">Cupones Activos</div>
            <div id="metric-coupons-active" style="font-size:20px; font-weight:700; color:#4ade80;">0</div>
          </div>
        </div>
        <div class="card" style="padding:14px; display:flex; align-items:center; gap:12px;">
          <div style="width:40px; height:40px; border-radius:8px; background:rgba(96,165,250,0.15); color:#60a5fa; display:flex; align-items:center; justify-content:center; font-size:20px;">
            <i class="bi bi-arrow-repeat"></i>
          </div>
          <div>
            <div style="font-size:11px; color:var(--silver); font-weight:600; text-transform:uppercase;">Usos Totales</div>
            <div id="metric-coupons-used" style="font-size:20px; font-weight:700; color:#60a5fa;">0</div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-bottom:16px;">
        <div class="card-title" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <span><i class="bi bi-ticket-perforated" style="color:var(--red);"></i> Gestión de Cupones de Descuento</span>
          <div style="display:flex; align-items:center; gap:8px;">
            <button class="sb-btn" onclick="renderCouponsTable(this)" style="background:transparent; border:1px solid var(--zinc); color:var(--white); padding:7px 14px; font-size:12px; display:flex; align-items:center; gap:6px; cursor:pointer; border-radius:6px;">
              <i class="bi bi-arrow-clockwise"></i> Actualizar
            </button>
            <button class="abm-btn-new" onclick="openCouponModal()" style="padding:7px 14px; font-size:12px;">
              <i class="bi bi-plus-lg"></i> Nuevo Cupón
            </button>
          </div>
        </div>
        <div style="overflow-x:auto;">
          <table class="data-table" id="coupons-tbl">
            <thead>
              <tr>
                <th>CÓDIGO</th>
                <th>DESCUENTO</th>
                <th>ALCANCE</th>
                <th>VIGENCIA</th>
                <th>USOS</th>
                <th>ESTADO</th>
                <th style="text-align:right;">ACCIONES</th>
              </tr>
            </thead>
            <tbody id="coupons-tbody">
              <tr>
                <td colspan="7" style="text-align:center; padding:30px; color:var(--silver);">Cargando cupones...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>\n\n    `;

if (html.includes(viewTarget) && !html.includes('id="view-coupons"')) {
  html = html.replace(viewTarget, viewCode + viewTarget);
  console.log('✔ View section view-coupons inserted');
} else {
  console.log('View section already present or target not found');
}

// 3. Add Modal
const modalTarget = `<!-- MODAL: CATEGORY -->`;
const modalCode = `<!-- MODAL: COUPON -->
  <div class="modal-overlay" id="modal-coupon" style="display:none;" onclick="if(event.target===this)closeCouponModal()">
    <div class="modal" style="width:min(540px,95vw);">
      <div class="modal-head">
        <span class="modal-title" id="coupon-modal-title"><i class="bi bi-ticket-perforated" style="color:var(--red);"></i> Nuevo Cupón</span>
        <button class="modal-close" onclick="closeCouponModal()" aria-label="Cerrar modal"><i class="bi bi-x"></i></button>
      </div>
      <div class="modal-body">
        <input type="hidden" id="cpn-id" />
        <div class="modal-grid">
          <div class="ctrl-group">
            <label class="ctrl-label">Código del cupón *</label>
            <input class="ctrl-input" id="cpn-code" placeholder="Ej: VERANO20" style="text-transform:uppercase;" oninput="this.value = this.value.toUpperCase().replace(/\\s+/g, '')" />
          </div>
          <div class="ctrl-group">
            <label class="ctrl-label">Porcentaje de Descuento (1% - 100%) *</label>
            <div style="display:flex; align-items:center; gap:4px;">
              <input type="number" min="1" max="100" class="ctrl-input" id="cpn-discount" placeholder="20" />
              <span style="font-size:14px; font-weight:700; color:var(--silver);">%</span>
            </div>
          </div>
          
          <div class="ctrl-group" style="grid-column:1/-1;">
            <label class="ctrl-label">Alcance del Descuento *</label>
            <select class="ctrl-input" id="cpn-scope" onchange="toggleCouponScope(this.value)">
              <option value="total">Descuento sobre el total de la compra (Deducción porcentual al carrito)</option>
              <option value="products">Descuento por producto específico (Aplicar a ítems elegidos del catálogo)</option>
            </select>
          </div>

          <!-- Multi-select Checklist for Products Scope -->
          <div class="ctrl-group" id="cpn-products-container" style="grid-column:1/-1; display:none; background:var(--steel); border:1px solid var(--zinc); padding:12px; border-radius:8px;">
            <label class="ctrl-label" style="display:flex; justify-content:space-between; align-items:center;">
              <span>Seleccionar productos del catálogo *</span>
              <span style="font-size:11px; color:var(--silver);" id="cpn-prod-count-label">0 seleccionados</span>
            </label>
            <input class="ctrl-input" id="cpn-prod-search" placeholder="🔍 Buscar producto..." oninput="filterCouponProductList(this.value)" style="margin-bottom:8px; font-size:12px;" />
            <div id="cpn-products-list" style="max-height:160px; overflow-y:auto; display:flex; flex-direction:column; gap:6px; padding-right:4px;">
              <!-- Products checklist loaded dynamically -->
            </div>
          </div>

          <div class="ctrl-group">
            <label class="ctrl-label">Fecha y Hora de Inicio</label>
            <input type="datetime-local" class="ctrl-input" id="cpn-valid-from" />
          </div>
          <div class="ctrl-group">
            <label class="ctrl-label">Fecha y Hora de Expiración</label>
            <input type="datetime-local" class="ctrl-input" id="cpn-valid-until" />
          </div>

          <div class="ctrl-group" style="grid-column:1/-1;">
            <label class="ctrl-label">Límite de usos totales (Opcional)</label>
            <input type="number" min="1" class="ctrl-input" id="cpn-usage-limit" placeholder="Ej: 50 (dejar vacío para ilimitado)" />
            <div class="form-hint">Indica cuántas veces en total se puede utilizar este cupón en la tienda.</div>
          </div>
        </div>
      </div>
      <div class="modal-foot">
        <button type="button" class="btn" style="background:transparent; border:1px solid var(--zinc); color:var(--silver);" onclick="closeCouponModal()">Cancelar</button>
        <button type="button" class="sb-btn" onclick="saveCoupon()"><i class="bi bi-check2-circle"></i> Guardar Cupón</button>
      </div>
    </div>
  </div>\n\n  `;

if (html.includes(modalTarget) && !html.includes('id="modal-coupon"')) {
  html = html.replace(modalTarget, modalCode + modalTarget);
  console.log('✔ Modal modal-coupon inserted');
} else {
  console.log('Modal already present or target not found');
}

// 4. Update showView function to render coupons table on tab click
const showViewTarget = `if (name === 'qr' || name === 'kit') {`;
const showViewReplacement = `if (name === 'coupons') { renderCouponsTable(); }\n      if (name === 'qr' || name === 'kit') {`;
if (html.includes(showViewTarget) && !html.includes("if (name === 'coupons') { renderCouponsTable(); }")) {
  html = html.replace(showViewTarget, showViewReplacement);
  console.log('✔ showView updated for coupons tab');
}

// 5. Add JS logic for Coupons
const jsCode = `
    // ═════════════════════════════════════════════════════════════════════════
    // 🎟️ MÓDULO DE GESTIÓN DE CUPONES DE DESCUENTO
    // ═════════════════════════════════════════════════════════════════════════
    function getStoreCoupons() {
      if (typeof companySettings !== 'undefined' && companySettings && companySettings.billing_info) {
        if (!Array.isArray(companySettings.billing_info.coupons)) {
          companySettings.billing_info.coupons = [];
        }
        return companySettings.billing_info.coupons;
      }
      return [];
    }

    function renderCouponsTable(btn = null) {
      if (btn) {
        btn.disabled = true;
        const icon = btn.querySelector('i');
        if (icon) icon.classList.add('bi-spin');
      }

      const coupons = getStoreCoupons();
      const tbody = document.getElementById('coupons-tbody');
      
      // Update Metrics
      const totalCount = coupons.length;
      const now = new Date();
      let activeCount = 0;
      let totalUsed = 0;

      coupons.forEach(c => {
        totalUsed += (parseInt(c.used_count) || 0);
        const isActive = c.status === 'active';
        const notExpired = !c.valid_until || new Date(c.valid_until) >= now;
        const notBefore = !c.valid_from || new Date(c.valid_from) <= now;
        const hasLimit = c.usage_limit ? (parseInt(c.used_count) || 0) < parseInt(c.usage_limit) : true;
        if (isActive && notExpired && notBefore && hasLimit) {
          activeCount++;
        }
      });

      const metricTotal = document.getElementById('metric-coupons-total');
      const metricActive = document.getElementById('metric-coupons-active');
      const metricUsed = document.getElementById('metric-coupons-used');

      if (metricTotal) metricTotal.textContent = totalCount;
      if (metricActive) metricActive.textContent = activeCount;
      if (metricUsed) metricUsed.textContent = totalUsed;

      if (!tbody) return;

      if (coupons.length === 0) {
        tbody.innerHTML = \`
          <tr>
            <td colspan="7" style="text-align:center; padding:40px; color:var(--silver);">
              <i class="bi bi-ticket-perforated" style="font-size:32px; display:block; margin-bottom:8px; opacity:0.3;"></i>
              No hay cupones creados aún. ¡Hacé clic en <strong>"Nuevo Cupón"</strong> para crear el primero!
            </td>
          </tr>
        \`;
        if (btn) setTimeout(() => { btn.disabled = false; const icon = btn.querySelector('i'); if (icon) icon.classList.remove('bi-spin'); }, 300);
        return;
      }

      tbody.innerHTML = coupons.map(c => {
        const isPaused = c.status === 'paused';
        const isExpired = c.valid_until && new Date(c.valid_until) < now;
        const notStarted = c.valid_from && new Date(c.valid_from) > now;
        const isLimitReached = c.usage_limit && (parseInt(c.used_count) || 0) >= parseInt(c.usage_limit);

        let badgeHtml = '<span style="background:rgba(74,222,128,0.15); color:#4ade80; border:1px solid rgba(74,222,128,0.3); padding:3px 8px; border-radius:12px; font-size:11px; font-weight:600;">Activo</span>';
        if (isPaused) {
          badgeHtml = '<span style="background:rgba(122,122,130,0.15); color:var(--silver); border:1px solid rgba(122,122,130,0.3); padding:3px 8px; border-radius:12px; font-size:11px; font-weight:600;">Pausado</span>';
        } else if (isExpired) {
          badgeHtml = '<span style="background:rgba(215,38,56,0.15); color:var(--red); border:1px solid rgba(215,38,56,0.3); padding:3px 8px; border-radius:12px; font-size:11px; font-weight:600;">Expirado</span>';
        } else if (notStarted) {
          badgeHtml = '<span style="background:rgba(234,179,8,0.15); color:#eab308; border:1px solid rgba(234,179,8,0.3); padding:3px 8px; border-radius:12px; font-size:11px; font-weight:600;">Programado</span>';
        } else if (isLimitReached) {
          badgeHtml = '<span style="background:rgba(239,68,68,0.15); color:#ef4444; border:1px solid rgba(239,68,68,0.3); padding:3px 8px; border-radius:12px; font-size:11px; font-weight:600;">Agotado</span>';
        }

        const scopeText = c.scope === 'products' 
          ? \`<span style="color:#60a5fa;"><i class="bi bi-box-seam"></i> \${(c.product_ids || []).length} prod. específicos</span>\`
          : \`<span style="color:#a78bfa;"><i class="bi bi-cart-check"></i> Total de compra</span>\`;

        const fromStr = c.valid_from ? new Date(c.valid_from).toLocaleString('es-AR', { dateStyle:'short', timeStyle:'short' }) : 'Indefinido';
        const untilStr = c.valid_until ? new Date(c.valid_until).toLocaleString('es-AR', { dateStyle:'short', timeStyle:'short' }) : 'Sin expiración';
        const datesText = \`\${fromStr} → \${untilStr}\`;

        const usedStr = \`\${c.used_count || 0} / \${c.usage_limit || '∞'}\`;

        const safeId = JSON.stringify(c.id);

        return \`
          <tr>
            <td>
              <span style="font-weight:700; font-family:monospace; font-size:13px; color:var(--white); background:var(--iron); padding:4px 8px; border-radius:4px; border:1px solid var(--zinc); letter-spacing:0.05em;">
                \${c.code}
              </span>
            </td>
            <td style="font-weight:700; color:#4ade80; font-size:14px;">-\${c.discount_percentage}%</td>
            <td style="font-size:12px;">\${scopeText}</td>
            <td style="font-size:11px; color:var(--silver);">\${datesText}</td>
            <td style="font-size:12px; font-weight:600; color:var(--white);">\${usedStr}</td>
            <td>\${badgeHtml}</td>
            <td style="text-align:right;">
              <div style="display:flex; justify-content:flex-end; gap:6px;">
                <button type="button" onclick='toggleCouponStatus(\${safeId})' title="\${isPaused ? 'Activar cupón' : 'Pausar cupón'}" style="background:var(--iron); border:1px solid var(--zinc); color:\${isPaused ? '#4ade80' : '#eab308'}; padding:4px 8px; border-radius:4px; cursor:pointer; font-size:12px;">
                  <i class="bi \${isPaused ? 'bi-play-fill' : 'bi-pause-fill'}"></i>
                </button>
                <button type="button" onclick='openCouponModal(\${safeId})' title="Editar cupón" style="background:var(--iron); border:1px solid var(--zinc); color:var(--white); padding:4px 8px; border-radius:4px; cursor:pointer; font-size:12px;">
                  <i class="bi bi-pencil"></i>
                </button>
                <button type="button" onclick='deleteCoupon(\${safeId})' title="Eliminar cupón" style="background:rgba(215,38,56,0.15); border:1px solid rgba(215,38,56,0.3); color:var(--red); padding:4px 8px; border-radius:4px; cursor:pointer; font-size:12px;">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        \`;
      }).join('');

      if (btn) setTimeout(() => { btn.disabled = false; const icon = btn.querySelector('i'); if (icon) icon.classList.remove('bi-spin'); }, 300);
    }

    function toggleCouponScope(val) {
      const container = document.getElementById('cpn-products-container');
      if (container) {
        container.style.display = val === 'products' ? 'block' : 'none';
      }
    }

    function renderCouponProductChecklist(selectedIds = []) {
      const listEl = document.getElementById('cpn-products-list');
      if (!listEl) return;

      const prods = (typeof allProducts !== 'undefined' && Array.isArray(allProducts)) ? allProducts : [];
      
      if (prods.length === 0) {
        listEl.innerHTML = '<div style="color:var(--silver); font-size:12px; padding:8px;">No hay productos cargados en el catálogo.</div>';
        return;
      }

      listEl.innerHTML = prods.map(p => {
        const isChecked = selectedIds.includes(String(p.id)) || selectedIds.includes(p.id);
        const name = p.nombre || p.name || 'Producto sin nombre';
        const price = p.precio || p.price ? \`$\${parseFloat(p.precio || p.price).toLocaleString('es-AR')}\` : '';
        const emoji = p.emoji || '📦';
        return \`
          <label class="cpn-prod-item" style="display:flex; align-items:center; gap:8px; font-size:12px; color:var(--white); cursor:pointer; padding:4px 6px; border-radius:4px; background:rgba(255,255,255,0.02);">
            <input type="checkbox" class="cpn-prod-checkbox" value="\${p.id}" \${isChecked ? 'checked' : ''} onchange="updateSelectedProductCount()" />
            <span>\${emoji} \${name} <span style="color:var(--silver);">(\${price})</span></span>
          </label>
        \`;
      }).join('');

      updateSelectedProductCount();
    }

    function updateSelectedProductCount() {
      const checkboxes = document.querySelectorAll('.cpn-prod-checkbox:checked');
      const label = document.getElementById('cpn-prod-count-label');
      if (label) {
        label.textContent = \`\${checkboxes.length} seleccionado\${checkboxes.length !== 1 ? 's' : ''}\`;
      }
    }

    function filterCouponProductList(query) {
      const q = (query || '').toLowerCase().trim();
      const items = document.querySelectorAll('.cpn-prod-item');
      items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(q) ? 'flex' : 'none';
      });
    }

    function openCouponModal(id = null) {
      const modal = document.getElementById('modal-coupon');
      if (!modal) return;

      const titleEl = document.getElementById('coupon-modal-title');
      const cpnId = document.getElementById('cpn-id');
      const cpnCode = document.getElementById('cpn-code');
      const cpnDiscount = document.getElementById('cpn-discount');
      const cpnScope = document.getElementById('cpn-scope');
      const cpnFrom = document.getElementById('cpn-valid-from');
      const cpnUntil = document.getElementById('cpn-valid-until');
      const cpnLimit = document.getElementById('cpn-usage-limit');
      const cpnSearch = document.getElementById('cpn-prod-search');

      if (cpnSearch) cpnSearch.value = '';

      const coupons = getStoreCoupons();
      const existing = id ? coupons.find(c => String(c.id) === String(id)) : null;

      if (existing) {
        if (titleEl) titleEl.innerHTML = '<i class="bi bi-pencil-square" style="color:var(--red);"></i> Editar Cupón';
        if (cpnId) cpnId.value = existing.id;
        if (cpnCode) cpnCode.value = existing.code || '';
        if (cpnDiscount) cpnDiscount.value = existing.discount_percentage || '';
        if (cpnScope) cpnScope.value = existing.scope || 'total';
        if (cpnFrom) cpnFrom.value = existing.valid_from ? existing.valid_from.slice(0, 16) : '';
        if (cpnUntil) cpnUntil.value = existing.valid_until ? existing.valid_until.slice(0, 16) : '';
        if (cpnLimit) cpnLimit.value = existing.usage_limit || '';
        toggleCouponScope(existing.scope || 'total');
        renderCouponProductChecklist((existing.product_ids || []).map(String));
      } else {
        if (titleEl) titleEl.innerHTML = '<i class="bi bi-ticket-perforated" style="color:var(--red);"></i> Nuevo Cupón de Descuento';
        if (cpnId) cpnId.value = '';
        if (cpnCode) cpnCode.value = '';
        if (cpnDiscount) cpnDiscount.value = '';
        if (cpnScope) cpnScope.value = 'total';
        if (cpnFrom) cpnFrom.value = '';
        if (cpnUntil) cpnUntil.value = '';
        if (cpnLimit) cpnLimit.value = '';
        toggleCouponScope('total');
        renderCouponProductChecklist([]);
      }

      modal.style.display = 'flex';
    }

    function closeCouponModal() {
      const modal = document.getElementById('modal-coupon');
      if (modal) modal.style.display = 'none';
    }

    async function saveCoupon() {
      const id = document.getElementById('cpn-id').value.trim();
      const code = document.getElementById('cpn-code').value.trim().toUpperCase();
      const discount = parseFloat(document.getElementById('cpn-discount').value);
      const scope = document.getElementById('cpn-scope').value;
      const validFrom = document.getElementById('cpn-valid-from').value;
      const validUntil = document.getElementById('cpn-valid-until').value;
      const usageLimit = parseInt(document.getElementById('cpn-usage-limit').value) || null;

      if (!code) {
        showToast('⚠ Ingresá un código para el cupón');
        return;
      }
      if (isNaN(discount) || discount <= 0 || discount > 100) {
        showToast('⚠ El porcentaje de descuento debe ser entre 1% y 100%');
        return;
      }

      let selectedProductIds = [];
      if (scope === 'products') {
        const checkboxes = document.querySelectorAll('.cpn-prod-checkbox:checked');
        selectedProductIds = Array.from(checkboxes).map(cb => cb.value);
        if (selectedProductIds.length === 0) {
          showToast('⚠ Seleccioná al menos 1 producto del catálogo para este cupón');
          return;
        }
      }

      const coupons = getStoreCoupons();

      // Check duplicate code
      const dup = coupons.find(c => c.code === code && String(c.id) !== String(id));
      if (dup) {
        showToast('⚠ Ya existe un cupón con el código ' + code);
        return;
      }

      if (id) {
        // Edit existing
        const index = coupons.findIndex(c => String(c.id) === String(id));
        if (index !== -1) {
          coupons[index] = {
            ...coupons[index],
            code,
            discount_percentage: discount,
            scope,
            product_ids: selectedProductIds,
            valid_from: validFrom || null,
            valid_until: validUntil || null,
            usage_limit: usageLimit,
            updated_at: new Date().toISOString()
          };
        }
      } else {
        // New coupon
        const newCoupon = {
          id: 'cpn_' + Date.now(),
          code,
          discount_percentage: discount,
          scope,
          product_ids: selectedProductIds,
          valid_from: validFrom || null,
          valid_until: validUntil || null,
          usage_limit: usageLimit,
          used_count: 0,
          status: 'active',
          created_at: new Date().toISOString()
        };
        coupons.push(newCoupon);
      }

      // Save to Supabase
      try {
        const storeId = (typeof STORE_ID !== 'undefined' && STORE_ID) ? STORE_ID : (new URLSearchParams(window.location.search).get('store') || '');
        const updatedBInfo = {
          ...(companySettings.billing_info || {}),
          coupons: coupons
        };

        const res = await fetch(\`\${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.\${encodeURIComponent(storeId)}\`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': \`Bearer \${SUPABASE_KEY}\`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ billing_info: updatedBInfo })
        });

        if (res.ok) {
          companySettings.billing_info = updatedBInfo;
          showToast('✅ Cupón guardado exitosamente');
          closeCouponModal();
          renderCouponsTable();
        } else {
          showToast('❌ Error al guardar cupón en servidor');
        }
      } catch (err) {
        console.error('Error saving coupon:', err);
        showToast('❌ Error de conexión al guardar cupón');
      }
    }

    async function toggleCouponStatus(id) {
      const coupons = getStoreCoupons();
      const c = coupons.find(item => String(item.id) === String(id));
      if (!c) return;

      c.status = c.status === 'active' ? 'paused' : 'active';
      
      try {
        const storeId = (typeof STORE_ID !== 'undefined' && STORE_ID) ? STORE_ID : (new URLSearchParams(window.location.search).get('store') || '');
        const updatedBInfo = {
          ...(companySettings.billing_info || {}),
          coupons: coupons
        };

        const res = await fetch(\`\${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.\${encodeURIComponent(storeId)}\`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': \`Bearer \${SUPABASE_KEY}\`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ billing_info: updatedBInfo })
        });

        if (res.ok) {
          companySettings.billing_info = updatedBInfo;
          showToast(\`✅ Cupón \${c.code} \${c.status === 'active' ? 'activado' : 'pausado'}\`);
          renderCouponsTable();
        }
      } catch (e) {
        showToast('❌ Error al actualizar estado del cupón');
      }
    }

    async function deleteCoupon(id) {
      const coupons = getStoreCoupons();
      const c = coupons.find(item => String(item.id) === String(id));
      if (!c) return;

      if (!confirm(\`¿Estás seguro de eliminar el cupón "\${c.code}"?\`)) return;

      const filtered = coupons.filter(item => String(item.id) !== String(id));

      try {
        const storeId = (typeof STORE_ID !== 'undefined' && STORE_ID) ? STORE_ID : (new URLSearchParams(window.location.search).get('store') || '');
        const updatedBInfo = {
          ...(companySettings.billing_info || {}),
          coupons: filtered
        };

        const res = await fetch(\`\${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.\${encodeURIComponent(storeId)}\`, {
          method: 'PATCH',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': \`Bearer \${SUPABASE_KEY}\`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ billing_info: updatedBInfo })
        });

        if (res.ok) {
          companySettings.billing_info = updatedBInfo;
          showToast('✅ Cupón eliminado');
          renderCouponsTable();
        }
      } catch (e) {
        showToast('❌ Error al eliminar cupón');
      }
    }
`;

const jsInsertionTarget = `function openCategoryModal(id = null) {`;
if (html.includes(jsInsertionTarget) && !html.includes("function getStoreCoupons()")) {
  html = html.replace(jsInsertionTarget, jsCode + '\n\n    ' + jsInsertionTarget);
  console.log('✔ Coupon JS functions inserted');
} else {
  console.log('JS functions already present or target not found');
}

fs.writeFileSync('dashboard.html', html, 'utf8');
console.log('Dashboard changes applied successfully.');
