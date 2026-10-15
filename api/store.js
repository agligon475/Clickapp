import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
const DEFAULT_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlheWxnc3Rod2lsZGpraWl3Z2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgyOTQwODksImV4cCI6MjA5Mzg3MDA4OX0.4aysjORaQ_158r9CFgLSkcqmwpHFXsxZ9T18jEMF6z4';

function escapeAttr(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function toAbsoluteUrl(imgUrl) {
  if (!imgUrl) return 'https://www.daletepido.com.ar/dashboard-icon.png';
  if (imgUrl.startsWith('http://') || imgUrl.startsWith('https://')) return imgUrl;
  if (imgUrl.startsWith('//')) return `https:${imgUrl}`;
  if (imgUrl.startsWith('/')) return `https://www.daletepido.com.ar${imgUrl}`;
  return `https://www.daletepido.com.ar/${imgUrl}`;
}

export default async function handler(req, res) {
  const host = req.headers.host || '';
  const hostname = host.split(':')[0].toLowerCase();
  const parsedUrl = new URL(req.url || '/', `http://${host || 'localhost'}`);
  const rawPath = parsedUrl.pathname.toLowerCase().replace(/\/$/, '') || '/';
  
  const query = {
    ...Object.fromEntries(parsedUrl.searchParams.entries()),
    ...(req.query || {})
  };
  
  // Static HTML pages map
  const routeMap = {
    '/ayuda': 'ayuda.html',
    '/ayuda.html': 'ayuda.html',
    '/dejar-resena': 'dejar-resena.html',
    '/dejar-resena.html': 'dejar-resena.html',
    '/alta-usuario': 'alta-usuario.html',
    '/alta-usuario.html': 'alta-usuario.html',
    '/dashboard': 'dashboard.html',
    '/dashboard.html': 'dashboard.html',
    '/super-admin-secret-dashboard': 'super-admin-secret-dashboard.html',
    '/super-admin-secret-dashboard.html': 'super-admin-secret-dashboard.html',
    '/enviar-comprobante': 'enviar-comprobante.html',
    '/enviar-comprobante.html': 'enviar-comprobante.html',
    '/kit-imprimible': 'kit-imprimible.html',
    '/kit-imprimible.html': 'kit-imprimible.html',
    '/landing': 'landing.html',
    '/landing.html': 'landing.html',
    '/terminos': 'terminos.html',
    '/terminos.html': 'terminos.html',
    '/terminos-y-condiciones': 'terminos.html',
    '/privacidad': 'privacidad.html',
    '/privacidad.html': 'privacidad.html',
    '/politicas-de-privacidad': 'privacidad.html',
    '/informe-vulnerabilidades': 'informe-vulnerabilidades-clickapp.html',
    '/informe-vulnerabilidades.html': 'informe-vulnerabilidades-clickapp.html',
    '/informe-vulnerabilidades-clickapp': 'informe-vulnerabilidades-clickapp.html',
    '/informe-vulnerabilidades-clickapp.html': 'informe-vulnerabilidades-clickapp.html',
    '/security-report': 'informe-vulnerabilidades-clickapp.html',
    '/desarrollo': 'desarrollo.html',
    '/desarrollo.html': 'desarrollo.html',
    '/evolucion': 'desarrollo.html',
    '/evolucion.html': 'desarrollo.html',
    '/historia': 'desarrollo.html',
    '/historia.html': 'desarrollo.html',
    '/robots.txt': { file: 'robots.txt', type: 'text/plain; charset=utf-8' },
    '/sitemap.xml': { file: 'sitemap.xml', type: 'application/xml; charset=utf-8' },
    '/llms.txt': { file: 'llms.txt', type: 'text/plain; charset=utf-8' }
  };

  // 1. Serve static page if requested directly (e.g. /dashboard, /ayuda, /alta-usuario, /robots.txt)
  if (routeMap[rawPath]) {
    try {
      const entry = routeMap[rawPath];
      const targetFile = typeof entry === 'string' ? entry : entry.file;
      const contentType = typeof entry === 'string' ? 'text/html; charset=utf-8' : entry.type;
      const filePath = path.join(process.cwd(), targetFile);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        res.setHeader('Content-Type', contentType);
        return res.status(200).send(content);
      }
    } catch (e) {
      console.error('Error serving static route:', e);
    }
  }

  // Serve bgd-samples static images
  if (rawPath.startsWith('/bgd-samples/')) {
    try {
      const fileName = path.basename(rawPath);
      const filePath = path.join(process.cwd(), 'bgd-samples', fileName);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath);
        res.setHeader('Content-Type', 'image/jpeg');
        return res.status(200).send(content);
      }
    } catch (e) {
      console.error('Error serving bgd-samples image:', e);
    }
  }

  // 2. Determine store ID
  let storeId = query.store || req.query?.store;

  // Serve landing.html directly for main domains root '/' without store query param
  const mainDomainsToRedirect = [
    'daletepido.com.ar',
    'www.daletepido.com.ar',
    'clickapp.com',
    'www.clickapp.com'
  ];
  
  if (mainDomainsToRedirect.includes(hostname) && !storeId && (rawPath === '/' || rawPath === '')) {
    try {
      const filePath = path.join(process.cwd(), 'landing.html');
      const html = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch (e) {
      res.writeHead(302, { Location: '/landing' });
      return res.end();
    }
  }
  
  if (!storeId) {
    // Try to extract from subdomain
    const domains = ['daletepido.com.ar', 'clickapp.com', 'localhost'];
    for (const domain of domains) {
      if (hostname.endsWith(`.${domain}`)) {
        const subdomain = hostname.substring(0, hostname.length - domain.length - 1);
        const cleanSubdomain = subdomain.replace(/^www\./, '');
        if (cleanSubdomain) {
          storeId = cleanSubdomain;
          break;
        }
      }
    }
  }

  // Extract from rawPath if not a root or static route
  if (!storeId && rawPath !== '/' && rawPath !== '') {
    const cleanPath = rawPath.replace(/^\//, '');
    if (cleanPath && !cleanPath.includes('.') && !cleanPath.includes('/')) {
      storeId = cleanPath;
    }
  }

  // If still no store ID (e.g. accessing raw localhost, or unrecognized domain), fallback to serving landing.html directly
  if (!storeId) {
    try {
      const filePath = path.join(process.cwd(), 'landing.html');
      const html = fs.readFileSync(filePath, 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.status(200).send(html);
    } catch (e) {
      return res.status(500).send('Internal Server Error');
    }
  }

  // 3. Render the store HTML with injected OG tags and initial STORE_ID
  try {
    const filePath = path.join(process.cwd(), 'tienda.html');
    let html = fs.readFileSync(filePath, 'utf8');

    // Extract the Supabase key from the HTML itself or fallback to DEFAULT_SUPABASE_KEY
    const keyMatch = html.match(/(?:const|let)\s+(?:DEFAULT_)?SUPABASE_KEY\s*=\s*['"]([^'"]+)['"]/);
    const SUPABASE_KEY = (keyMatch && keyMatch[1]) ? keyMatch[1] : (process.env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_KEY);

    if (SUPABASE_KEY) {
      // Fetch store data with retries and apikey parameter
      let configRes = null;
      const targetUrl = `${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(storeId)}&apikey=${encodeURIComponent(SUPABASE_KEY)}`;
      
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          configRes = await fetch(targetUrl, {
            headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
          });
          if (configRes.ok) break;
          if (attempt < 3) await new Promise(r => setTimeout(r, 300 * attempt));
        } catch (e) {
          if (attempt < 3) await new Promise(r => setTimeout(r, 300 * attempt));
        }
      }

      if (configRes && configRes.ok) {
        const data = await configRes.json().catch(() => []);
        if (data && data.length > 0) {
          const cfg = data[0];
          const storeName = cfg.business_name || 'Dale! Te Pido';
          
          let title = `${storeName} — Catálogo Online`;
          let desc = cfg.tagline || cfg.desc || 'Elegí tus productos, armá tu pedido y coordiná por WhatsApp.';
          
          // Image priority:
          // 1. Featured product image
          // 2. Company logo
          // 3. DaleTePido favicon / dashboard icon
          let selectedImg = cfg.logo_url || cfg.logo || '';
          let url = `https://${storeId}.daletepido.com.ar/`;

          const productId = query.p || query.producto || query.product || query.id;
          if (productId) {
            try {
              let p = null;
              // 1. Query by store_id and id
              const prodUrl = `${SUPABASE_URL}/rest/v1/products?store_id=eq.${encodeURIComponent(storeId)}&id=eq.${encodeURIComponent(productId)}&apikey=${encodeURIComponent(SUPABASE_KEY)}`;
              const prodRes = await fetch(prodUrl, {
                headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
              });
              if (prodRes.ok) {
                const prods = await prodRes.json().catch(() => []);
                if (prods && prods.length > 0) p = prods[0];
              }

              // Fallback: If not found, try query by id alone
              if (!p) {
                const fallbackProdUrl = `${SUPABASE_URL}/rest/v1/products?id=eq.${encodeURIComponent(productId)}&apikey=${encodeURIComponent(SUPABASE_KEY)}`;
                const fallbackRes = await fetch(fallbackProdUrl, {
                  headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
                });
                if (fallbackRes.ok) {
                  const prods = await fallbackRes.json().catch(() => []);
                  if (prods && prods.length > 0) p = prods[0];
                }
              }

              if (p) {
                const prodName = (p.nombre || p.name || '').trim();
                const symbol = (p.divisa || p.currency) === 'USD' ? 'US$' : '$';
                const priceVal = parseFloat(p.precio != null ? p.precio : p.price);
                const priceFormatted = !isNaN(priceVal) && priceVal > 0 ? `${symbol}${priceVal.toLocaleString('es-AR')}` : '';
                const prodDesc = (p.detalles || p.detalle || p.desc || p.descripcion || '').trim();

                // "Lo ideal sería que tome el nombre del articulo seguido del nombre de la tienda"
                if (prodName) {
                  title = `${prodName} — ${storeName}`;
                }

                // "en la descripcion que aparezca la descripcion del producto, y si es posible, el precio"
                if (prodDesc && priceFormatted) {
                  desc = `${priceFormatted} • ${prodDesc}`;
                } else if (prodDesc) {
                  desc = prodDesc;
                } else if (priceFormatted) {
                  desc = `Precio: ${priceFormatted} • Pedilo directo por WhatsApp en ${storeName}.`;
                }

                // "El orden de importancia para uso de imagen deberia ser Imagen destacada del producto, o logo de la empresa, o como ultimo recurso, el favicon de DaleTePido"
                const prodImg = p.img || p.img2 || p.img3 || '';
                if (prodImg) {
                  selectedImg = prodImg;
                }

                url = `https://${storeId}.daletepido.com.ar/?p=${encodeURIComponent(p.id)}`;
              }
            } catch(e) {
              console.warn('Error fetching product for OG tags:', e.message);
            }
          }

          const finalImage = toAbsoluteUrl(selectedImg);

          // Build complete meta tags for WhatsApp, Facebook, Twitter and search engines
          const ogTags = `
<title>${escapeAttr(title)}</title>
<meta name="description" content="${escapeAttr(desc)}" />
<meta property="og:title" content="${escapeAttr(title)}" />
<meta property="og:description" content="${escapeAttr(desc)}" />
<meta property="og:image" content="${escapeAttr(finalImage)}" />
<meta property="og:image:secure_url" content="${escapeAttr(finalImage)}" />
<meta property="og:image:alt" content="${escapeAttr(title)}" />
<meta property="og:url" content="${escapeAttr(url)}" />
<meta property="og:type" content="${productId ? 'product' : 'website'}" />
<meta property="og:site_name" content="${escapeAttr(storeName)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escapeAttr(title)}" />
<meta name="twitter:description" content="${escapeAttr(desc)}" />
<meta name="twitter:image" content="${escapeAttr(finalImage)}" />
<link rel="canonical" href="${escapeAttr(url)}" />
<link rel="icon" type="image/png" href="${escapeAttr(finalImage)}" />
`;
          // Replace default title with complete metadata tags
          html = html.replace(/<title>.*?<\/title>/, ogTags);
        }
      }
    }

    // Inject initial store ID script into HTML head
    const initialScript = `<script>window.__INITIAL_STORE_ID__ = ${JSON.stringify(storeId)};</script>`;
    html = html.replace('<head>', `<head>\n${initialScript}`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.status(200).send(html);
  } catch (error) {
    console.error('Error generating store HTML:', error);
    try {
      const fallbackHtml = fs.readFileSync(path.join(process.cwd(), 'tienda.html'), 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(200).send(fallbackHtml);
    } catch (e) {
      res.status(500).send('Internal Server Error');
    }
  }
}
