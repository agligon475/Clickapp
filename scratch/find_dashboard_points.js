import fs from 'fs';

const html = fs.readFileSync('dashboard.html', 'utf8');

// Find where sidebar items are placed
const categoriesItemIdx = html.indexOf("showView('categories',this)");
console.log('Categories sidebar item index:', categoriesItemIdx);
if (categoriesItemIdx !== -1) {
  console.log(html.slice(categoriesItemIdx - 200, categoriesItemIdx + 200));
}

// Find where view-categories section is placed
const viewCategoriesIdx = html.indexOf('id="view-categories"');
console.log('\nview-categories index:', viewCategoriesIdx);
if (viewCategoriesIdx !== -1) {
  console.log(html.slice(viewCategoriesIdx - 100, viewCategoriesIdx + 400));
}
