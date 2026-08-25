import fs from 'fs';

const html = fs.readFileSync('tienda.html', 'utf8');

const companySettingsIdx = html.indexOf('company_settings');
console.log('company_settings index in tienda.html:', companySettingsIdx);
if (companySettingsIdx !== -1) {
  console.log(html.slice(companySettingsIdx - 100, companySettingsIdx + 500));
}

const loadStoreConfigIdx = html.indexOf('applyConfig');
if (loadStoreConfigIdx !== -1) {
  console.log('\napplyConfig snippet:');
  console.log(html.slice(loadStoreConfigIdx, loadStoreConfigIdx + 800));
}
