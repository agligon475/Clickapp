import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

console.log('Checking tienda.html coupon integration:');
console.log('- STORE_COUPONS present:', html.includes('STORE_COUPONS'));
console.log('- applyCoupon present:', html.includes('function applyCoupon'));
console.log('- removeCoupon present:', html.includes('function removeCoupon'));
console.log('- getCartDiscountAmount present:', html.includes('function getCartDiscountAmount'));
console.log('- coupon-section present:', html.includes('id="coupon-section"'));
console.log('- discount-row present:', html.includes('id="discount-row"'));
console.log('- WhatsApp coupon msg present:', html.includes('CUPÓN:'));
