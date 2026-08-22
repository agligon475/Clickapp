import { getProspectEmail } from '../api/email-templates.js';

console.log('=== TEST PROSPECT EMAIL GENERATOR ===');

const result = getProspectEmail({
  prospectName: 'Panadería La Espiga',
  subject: '🚀 Prueba de Envío a Prospectos',
  badgeText: '🚀 PROPUESTA ESPECIAL',
  greetingText: '¡Hola Panadería La Espiga!',
  bodyText: 'Este es un mensaje de prueba para verificar la generación de correos de prospección.',
  ctaText: 'Ver Mi Demo Gratis',
  ctaUrl: 'https://daletepido.com.ar',
  extraNotes: 'Nota especial de prueba'
});

console.log('Subject:', result.subject);
console.log('HTML Length:', result.html.length);
if (result.html.includes('Panadería La Espiga') && result.html.includes('PROPUESTA ESPECIAL') && result.html.includes('Ver Mi Demo Gratis')) {
  console.log('✅ TEST PASSED: El HTML contiene todos los datos dinámicos.');
} else {
  console.log('❌ TEST FAILED');
}
