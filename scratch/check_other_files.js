import fs from 'fs';

const files = ['tienda.html', 'pedidos.html', 'seguimiento.html', 'checkout.html'];

for (const file of files) {
  if (fs.existsSync(file)) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((l, i) => {
      if (l.includes("storeapp_orders") && !l.includes("storeapp_orders_") && !l.includes("storeapp_orders`")) {
        console.log(`${file}:${i+1}: ${l.trim()}`);
      }
    });
  }
}
