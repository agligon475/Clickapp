const fs = require('fs');
const path = require('path');

const dashHtml = fs.readFileSync(path.join(__dirname, '..', 'dashboard.html'), 'utf8');

console.log('Testing dashboard.html for Product Wizard elements (Steps 1 to 5)...');

const requiredIds = [
  'modal-overlay',
  'modal-title-text',
  'pw-stepper-wrap',
  'pw-pill-1',
  'pw-pill-2',
  'pw-pill-3',
  'pw-pill-4',
  'pw-pill-5',
  'pw-step-1',
  'pw-step-2',
  'pw-step-3',
  'pw-step-4',
  'pw-step-5',
  'pw-btn-prev',
  'pw-btn-next',
  'm-name',
  'm-cat',
  'm-marca',
  'm-price',
  'm-currency',
  'm-stock',
  'm-emoji',
  'm-origen',
  'm-detalle',
  'm-img',
  'm-img2',
  'm-img3',
  'm-codigo',
  'm-has-variations',
  'm-use-ai-helper',
  'm-weight-unit',
  'm-weight-min',
  'm-pack-qty',
  'pw-live-summary-card'
];

let missing = 0;
for (const id of requiredIds) {
  const hasId = dashHtml.includes(`id="${id}"`) || dashHtml.includes(`id='${id}'`);
  if (!hasId) {
    console.error(`❌ MISSING ID: ${id}`);
    missing++;
  }
}

const requiredFunctions = [
  'selectProductArchetype',
  'goToProductStep',
  'nextProductStep',
  'prevProductStep',
  'renderProductWizardPreview',
  'calcPackUnitPrice',
  'updateWeightLabels',
  'addTechPresetGroup',
  'addVoltagePresetGroup',
  'addSizePresetGroup',
  'addColorPresetGroup',
  'openModal',
  'closeModal',
  'saveModal'
];

for (const fn of requiredFunctions) {
  const hasFn = dashHtml.includes(`function ${fn}`) || dashHtml.includes(`${fn} = function`) || dashHtml.includes(`window.${fn}`);
  if (!hasFn) {
    console.error(`❌ MISSING FUNCTION: ${fn}`);
    missing++;
  }
}

// Verificar que la etiqueta 'Moda' no limite a los comercios de tecnología o electrodomésticos
const hasNeutralArchetype = dashHtml.includes('Con Variantes y Modelos') || dashHtml.includes('Con Opciones y Modelos');
const hasOptionsBadge = dashHtml.includes('Opciones');
if (!hasNeutralArchetype) {
  console.error("❌ Faltó el rótulo neutral de variantes/modelos para electrodomésticos y tecnología");
  missing++;
}
if (!hasOptionsBadge) {
  console.error("❌ Faltó el badge de 'Opciones' para variantes/modelos");
  missing++;
}

if (missing === 0) {
  console.log(`✅ SUCCESS: All ${requiredIds.length} IDs, ${requiredFunctions.length} functions and neutral archetypes verified in dashboard.html!`);
} else {
  console.error(`❌ Test failed with ${missing} missing items.`);
  process.exit(1);
}
