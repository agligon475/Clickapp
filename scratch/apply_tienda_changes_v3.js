import fs from 'fs';

let html = fs.readFileSync('tienda.html', 'utf8');

// Normalize html for reliable matching or use regex
// 1. Coupon Section HTML in Drawer Footer
const summaryTargetRegex = /<div id="cart-summary">\s*<div class="total-row">/;
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
      <div class="total-row">`;

if (summaryTargetRegex.test(html) && !html.includes('id="coupon-section"')) {
  html = html.replace(summaryTargetRegex, summaryReplacement);
  console.log('✔ Coupon Drawer UI & breakdown inserted');
}

// 2. Add Cart Helpers & Replace cartTotal
const cartTotalRegex = /function cartTotal\(\) \{\s*return Object\.entries\(cart\)\.reduce\(\(s,\[id,q\]\)=>\{[\s\S]*?\},0\);\s*\}/;

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

if (cartTotalRegex.test(html) && !html.includes('function getCartDiscountAmount')) {
  html = html.replace(cartTotalRegex, cartHelpersAndTotal);
  console.log('✔ cartTotal and coupon helpers inserted');
}

// 3. Update updateCartUI
const updateCartUIRegex = /function updateCartUI\(\) \{\s*const qty = cartQty\(\);[\s\S]*?document\.getElementById\('total-val-2'\)\.textContent = t;\s*\}/;

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

if (updateCartUIRegex.test(html) && !html.includes('subtotal-val')) {
  html = html.replace(updateCartUIRegex, updateCartUIReplacement);
  console.log('✔ updateCartUI replaced');
}

fs.writeFileSync('tienda.html', html, 'utf8');
console.log('Tienda v3 applied.');
