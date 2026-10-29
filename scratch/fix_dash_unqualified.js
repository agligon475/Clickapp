import fs from 'fs';

let content = fs.readFileSync('dashboard.html', 'utf8');

// Reemplazos de aislamiento de almacenamiento local en dashboard.html
const replacements = [
  // Lecturas de storeapp_cfg
  { from: `localStorage.getItem('storeapp_cfg')`, to: `localStorage.getItem('storeapp_cfg_' + STORE_ID)` },
  { from: `localStorage.getItem("storeapp_cfg")`, to: `localStorage.getItem('storeapp_cfg_' + STORE_ID)` },

  // Escrituras de storeapp_cfg
  { from: `localStorage.setItem('storeapp_cfg', JSON.stringify(cfg));`, to: `localStorage.setItem('storeapp_cfg_' + STORE_ID, JSON.stringify(cfg));` },
  { from: `localStorage.setItem('storeapp_cfg', JSON.stringify(cfgObj));`, to: `localStorage.setItem('storeapp_cfg_' + STORE_ID, JSON.stringify(cfgObj));` },
  { from: `localStorage.setItem('storeapp_cfg', JSON.stringify(sc));`, to: `localStorage.setItem('storeapp_cfg_' + STORE_ID, JSON.stringify(sc));` },

  // storeapp_hero_img
  { from: `localStorage.getItem('storeapp_hero_img')`, to: `localStorage.getItem('storeapp_hero_img_' + STORE_ID)` },
  { from: `localStorage.setItem('storeapp_hero_img', url);`, to: `localStorage.setItem('storeapp_hero_img_' + STORE_ID, url);` },

  // storeapp_banners
  { from: `localStorage.getItem('storeapp_banners')`, to: `localStorage.getItem('storeapp_banners_' + STORE_ID)` },
  { from: `localStorage.setItem('storeapp_banners', JSON.stringify(bannerData));`, to: `localStorage.setItem('storeapp_banners_' + STORE_ID, JSON.stringify(bannerData));` },

  // storeapp_logo
  { from: `localStorage.getItem('storeapp_logo')`, to: `localStorage.getItem('storeapp_logo_' + STORE_ID)` },
  { from: `localStorage.setItem('storeapp_logo', logoUrl);`, to: `localStorage.setItem('storeapp_logo_' + STORE_ID, logoUrl);` },

  // storeapp_pages
  { from: `localStorage.getItem('storeapp_pages')`, to: `localStorage.getItem('storeapp_pages_' + STORE_ID)` },
  { from: `localStorage.setItem('storeapp_pages', JSON.stringify(pagesData));`, to: `localStorage.setItem('storeapp_pages_' + STORE_ID, JSON.stringify(pagesData));` }
];

let totalCount = 0;
for (const r of replacements) {
  let count = 0;
  while (content.includes(r.from)) {
    content = content.replace(r.from, r.to);
    count++;
  }
  if (count > 0) {
    console.log(`Reemplazado ${count}x: "${r.from}" -> "${r.to}"`);
    totalCount += count;
  }
}

fs.writeFileSync('dashboard.html', content, 'utf8');
console.log(`\nTotal de reemplazos aplicados en dashboard.html: ${totalCount}`);
