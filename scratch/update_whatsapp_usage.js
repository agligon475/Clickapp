import fs from 'fs';

let html = fs.readFileSync('tienda.html', 'utf8');

const target = `window.open(\`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(msg)}\`, '_blank');`;
const replacement = `if (window.APPLIED_COUPON && window.STORE_COUPONS) {
    const cObj = window.STORE_COUPONS.find(c => c.id === window.APPLIED_COUPON.id);
    if (cObj) {
      cObj.used_count = (parseInt(cObj.used_count) || 0) + 1;
      try {
        fetchSupabase(\`/rest/v1/company_settings?store_id=eq.\${encodeURIComponent(STORE_ID)}\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ billing_info: { coupons: window.STORE_COUPONS } })
        }).catch(() => {});
      } catch(e) {}
    }
  }

  window.open(\`https://wa.me/\${WHATSAPP_NUMBER}?text=\${encodeURIComponent(msg)}\`, '_blank');`;

if (html.includes(target) && !html.includes("cObj.used_count")) {
  html = html.replace(target, replacement);
  fs.writeFileSync('tienda.html', html, 'utf8');
  console.log('✔ enviarWhatsApp coupon usage increment added successfully');
} else {
  console.log('Target already replaced or not found');
}
