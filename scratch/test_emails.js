import { getWelcomeEmail, getAccountActivatedEmail, getPlanPaymentInstructionsEmail } from '../api/email-templates.js';

console.log('=================== WELCOME EMAIL (STARTER / PRO) ===================');
const e1 = getWelcomeEmail({ storeName: 'Ferretería Juan', storeId: 'ferrejuan', planLevel: 'starter' });
console.log('Includes $35000 setup cost notice?:', e1.html.includes('$35.000 ARS'));

console.log('\n=================== WELCOME EMAIL (ENTERPRISE) ===================');
const e2 = getWelcomeEmail({ storeName: 'Gran Empresa S.A.', storeId: 'granempresa', planLevel: 'enterprise' });
console.log('Includes 100% Bonificado notice?:', e2.html.includes('100% Bonificado'));

console.log('\n=================== ACTIVATED EMAIL (PRO) ===================');
const e3 = getAccountActivatedEmail({ storeName: 'Kiosco Pepe', storeId: 'kioscopepe', planLevel: 'pro' });
console.log('Includes $35000 setup cost notice?:', e3.html.includes('$35.000 ARS'));

console.log('\n=================== PAYMENT INSTRUCTIONS (ENTERPRISE) ===================');
const e4 = getPlanPaymentInstructionsEmail({ storeName: 'Empresa Pro', storeId: 'empresapro', planKey: 'enterprise_anual' });
console.log('Includes 100% Bonificado notice?:', e4.html.includes('100% Bonificado'));
