import fs from 'fs';

let html = fs.readFileSync('tienda.html', 'utf8');

// 1. Initialize STORE_COUPONS when cfg is parsed
const cfgTarget = `const cfg = configData[0];`;
const cfgReplacement = `const cfg = configData[0];\n      window.STORE_COUPONS = (cfg.billing_info && Array.isArray(cfg.billing_info.coupons)) ? cfg.billing_info.coupons : [];`;
if (html.includes(cfgTarget) && !html.includes("window.STORE_COUPONS")) {
  html = html.replace(cfgTarget, cfgReplacement);
  console.log('✔ STORE_COUPONS initialization added to tienda.html');
}

// 2. Add Coupon Section HTML and Subtotal/Discount breakdown in cart summary
const summaryTarget = `<div id="cart-summary">
      <div class="total-row">
        <span class="total-label">Total</span>
        <span class="total-val" id="total-val">$0</span>
      </div>`;

const summaryReplacement = `<!-- Coupon Section -->
    <div id="coupon-section" style="margin-bottom:12px; padding:10px; background:rgba(255,255,255,0.03); border:1px dashed var(--border); border-radius:8px;">
      <div id="coupon-input-box" style="display:flex; gap:6px;">
        <input type="text" id="coupon-code-input" placeholder="¿Tenés un cupón?" style="flex:1; background:var(--body); border:1px solid var(--border); color:var(--text); padding:6px 10px; border-radius:6px; font-size:12px; text-transform:uppercase;" oninput="this.value = this.value.toUpperCase().replace(/\\s+/g, '')" />
        <button type="button" onclick="applyCoupon()" style="padding:6px 14px; background:var(--accent); color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; display:flex; align-items:center; gap:4px;">
          <i class="bi bi-ticket-perforated"></i> Aplicar
        </button>
      </div>
      <div id="coupon-applied-box" style="display:none; align-items:center; justify-content:space-between; font-size:12px; background:rgba(74,222,128,0.1); border:1px solid rgba(74,222,128,0.3); padding:6px 10px; border-radius:6px;">
        <div style="display:flex; align-items:center; gap:6px; color:#4ade80; font-weight:600;">
          <i class="bi bi-tag-fill"></i>
          <span id="coupon-applied-info">Cupón APLICADO</span>
        </div>
        <button type="button" onclick="removeCoupon()" title="Quitar cupón" style="background:none; border:none; color:var(--muted); cursor:pointer; font-size:14px;">
          <i class="bi bi-x-circle-fill"></i>
        </button>
      </div>
    </div>

    <div id="cart-summary">
      <div id="subtotal-row" style="display:flex; justify-content:space-between; font-size:13px; color:var(--muted); margin-bottom:4px;">
        <span>Subtotal</span>
        <span id="subtotal-val">$0</span>
      </div>
      <div id="discount-row" style="display:none; justify-content:space-between; font-size:13px; color:#4ade80; font-weight:600; margin-bottom:6px;">
        <span>Descuento (<span id="discount-code-label"></span>)</span>
        <span id="discount-val">-$0</span>
      </div>
      <div class="total-row">
        <span class="total-label">Total</span>
        <span class="total-val" id="total-val">$0</span>
      </div>`;

if (html.includes(summaryTarget)) {
  html = html.replace(summaryTarget, summaryReplacement);
  console.log('✔ Coupon UI and breakdown added to cart drawer');
}

// 3. Replace cartTotal() and updateCartUI() and add coupon JS helpers
const cartTotalTarget = `function cartTotal() {
  return Object.entries(cart).reduce((s,[id,q])=>{
    const p = findProduct(id);
    if (!p) return s;
    const price = cartDetails[id] ? cartDetails[id].price : p.price;
    return s + (price * q);
  },0);
}`;

const cartHelpersAndTotal = `window.APPLIED_COUPON = null;

function getCartSubtotal() {
  return Object.entries(cart).reduce((s,[id,q])=>{
    const p = findProduct(id);
    if (!p) return s;
    const price = cartDetails[id] ? cartDetails[id].price : p.price;
    return s + (price * q);
  },0);
}

function getCartDiscountAmount() {
  if (!window.APPLIED_COUPON) return 0;
  const coupon = window.APPLIED_COUPON;
  const pct = parseFloat(coupon.discount_percentage) || 0;
  if (pct <= 0) return 0;

  if (coupon.scope === 'total') {
    const subtotal = getCartSubtotal();
    return Math.round((subtotal * pct) / 100);
  } else if (coupon.scope === 'products') {
    const eligibleIds = (coupon.product_ids || []).map(String);
    const eligibleSubtotal = Object.entries(cart).reduce((sum, [id, q]) => {
      const p = findProduct(id);
      if (!p) return sum;
      const baseId = String(id).split('_')[0];
      if (eligibleIds.includes(baseId) || eligibleIds.includes(String(p.id))) {
        const price = cartDetails[id] ? cartDetails[id].price : p.price;
        return sum + (price * q);
      }
      return sum;
    }, 0);
    return Math.round((eligibleSubtotal * pct) / 100);
  }
  return 0;
}

function applyCoupon(codeToApply = null) {
  const input = document.getElementById('coupon-code-input');
  const code = (codeToApply || (input ? input.value : '')).trim().toUpperCase();

  if (!code) {
    showToast('⚠ Ingresá el código de tu cupón');
    return;
  }

  if (!window.STORE_COUPONS || !Array.isArray(window.STORE_COUPONS) || window.STORE_COUPONS.length === 0) {
    showToast('❌ El cupón ingresado no es válido');
    return;
  }

  const found = window.STORE_COUPONS.find(c => c.code && c.code.toUpperCase() === code);

  if (!found) {
    showToast('❌ Cupón no encontrado');
    return;
  }

  if (found.status === 'paused') {
    showToast('❌ El cupón se encuentra inactivo');
    return;
  }

  const now = new Date();
  if (found.valid_from && new Date(found.valid_from) > now) {
    showToast('❌ El cupón aún no está vigente');
    return;
  }

  if (found.valid_until && new Date(found.valid_until) < now) {
    showToast('❌ El cupón ha expirado');
    return;
  }

  if (found.usage_limit && (parseInt(found.used_count) || 0) >= parseInt(found.usage_limit)) {
    showToast('❌ El cupón ha alcanzado el límite máximo de usos');
    return;
  }

  // Check product scope eligibility
  if (found.scope === 'products') {
    const eligibleIds = (found.product_ids || []).map(String);
    const hasEligibleProduct = Object.keys(cart).some(pid => {
      const baseId = String(pid).split('_')[0];
      const p = findProduct(pid);
      return eligibleIds.includes(baseId) || (p && eligibleIds.includes(String(p.id)));
    });

    if (!hasEligibleProduct) {
      showToast('❌ Ningún producto de tu carrito califica para este cupón');
      return;
    }
  }

  window.APPLIED_COUPON = found;
  showToast(\`🎉 ¡Cupón \${found.code} (-\${found.discount_percentage}%) aplicado!\`);
  updateCartUI();
}

function removeCoupon() {
  window.APPLIED_COUPON = null;
  const input = document.getElementById('coupon-code-input');
  if (input) input.value = '';
  showToast('Cupón removido');
  updateCartUI();
}

function cartTotal() {
  const subtotal = getCartSubtotal();
  const discount = getCartDiscountAmount();
  return Math.max(0, subtotal - discount);
}`;

if (html.includes(cartTotalTarget)) {
  html = html.replace(cartTotalTarget, cartHelpersAndTotal);
  console.log('✔ cartTotal and coupon helper JS added');
}

// 4. Update updateCartUI()
const updateCartUITarget = `function updateCartUI() {
  const qty = cartQty();
  document.getElementById('cart-n').textContent = qty;
  const totalsByCurrency = {};
  Object.entries(cart).forEach(([id, q]) => {
    const p = findProduct(id);
    if (!p) return;
    const price = cartDetails[id] ? cartDetails[id].price : p.price;
    const curr = p.currency || p.divisa || 'ARS';
    totalsByCurrency[curr] = (totalsByCurrency[curr] || 0) + (price * q);
  });
  const t = Object.entries(totalsByCurrency)
    .map(([curr, amt]) => \`\${getCurrencySymbol(curr)}\${amt.toLocaleString('es-AR')}\`)
    .join(' + ') || '$0';
  document.getElementById('total-val').textContent = t;
  document.getElementById('total-val-2').textContent = t;
}`;

const updateCartUIReplacement = `function updateCartUI() {
  const qty = cartQty();
  const cartN = document.getElementById('cart-n');
  if (cartN) cartN.textContent = qty;

  const subtotal = getCartSubtotal();
  const discount = getCartDiscountAmount();
  const finalTotal = Math.max(0, subtotal - discount);

  const subtotalEl = document.getElementById('subtotal-val');
  if (subtotalEl) subtotalEl.textContent = \`$\${subtotal.toLocaleString('es-AR')}\`;

  const discountRow = document.getElementById('discount-row');
  const discountCodeLabel = document.getElementById('discount-code-label');
  const discountVal = document.getElementById('discount-val');
  
  const inputBox = document.getElementById('coupon-input-box');
  const appliedBox = document.getElementById('coupon-applied-box');
  const appliedInfo = document.getElementById('coupon-applied-info');

  if (window.APPLIED_COUPON && discount > 0) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountCodeLabel) discountCodeLabel.textContent = window.APPLIED_COUPON.code;
    if (discountVal) discountVal.textContent = \`-$\${discount.toLocaleString('es-AR')}\`;

    if (inputBox) inputBox.style.display = 'none';
    if (appliedBox) appliedBox.style.display = 'flex';
    if (appliedInfo) appliedInfo.textContent = \`Cupón \${window.APPLIED_COUPON.code} (-\${window.APPLIED_COUPON.discount_percentage}%)\`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
    if (inputBox) inputBox.style.display = 'flex';
    if (appliedBox) appliedBox.style.display = 'none';
    if (window.APPLIED_COUPON && discount === 0) {
      window.APPLIED_COUPON = null;
    }
  }

  const formattedTotal = \`$\${finalTotal.toLocaleString('es-AR')}\`;
  const t1 = document.getElementById('total-val');
  const t2 = document.getElementById('total-val-2');
  if (t1) t1.textContent = formattedTotal;
  if (t2) t2.textContent = formattedTotal;
}`;

if (html.includes(updateCartUITarget)) {
  html = html.replace(updateCartUITarget, updateCartUIReplacement);
  console.log('✔ updateCartUI replaced with coupon breakdown support');
}

// 5. Update enviarWhatsApp() to include applied coupon line and increment usage count
const whatsappTarget = `let mensaje = \`*NUEVO PEDIDO EN LA TIENDA*\n\n\`;`;
const whatsappReplacement = `let mensaje = \`*NUEVO PEDIDO EN LA TIENDA*\n\n\`;
  if (window.APPLIED_COUPON) {
    const discountAmt = getCartDiscountAmount();
    mensaje += \`🎁 *CUPÓN DE DESCUENTO:* \${window.APPLIED_COUPON.code} (-\${window.APPLIED_COUPON.discount_percentage}%) → Ahorro: -$\${discountAmt.toLocaleString('es-AR')}\n\n\`;
    
    // Incrementar contador de usos en Supabase
    try {
      const couponId = window.APPLIED_COUPON.id;
      const cObj = (window.STORE_COUPONS || []).find(c => c.id === couponId);
      if (cObj) {
        cObj.used_count = (parseInt(cObj.used_count) || 0) + 1;
        fetchSupabase(\`/rest/v1/company_settings?store_id=eq.\${encodeURIComponent(STORE_ID)}\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ billing_info: { coupons: window.STORE_COUPONS } })
        }).catch(() => {});
      }
    } catch(e) {}
  }`;

if (html.includes(whatsappTarget) && !html.includes("CUPÓN DE DESCUENTO")) {
  html = html.replace(whatsappTarget, whatsappReplacement);
  console.log('✔ WhatsApp order message updated with coupon info');
}

fs.writeFileSync('tienda.html', html, 'utf8');
console.log('Tienda changes applied successfully.');
