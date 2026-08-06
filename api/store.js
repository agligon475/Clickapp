import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';

export default async function handler(req, res) {
  const host = req.headers.host || '';
  const hostname = host.split(':')[0].toLowerCase();
  const rawPath = (req.url || '/').split('?')[0].toLowerCase().replace(/\/$/, '') || '/';
  
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
    '/landing.html': 'landing.html'
  };

  // 1. Serve static page if requested directly without store query
  if (routeMap[rawPath] && !req.query.store) {
    try {
      const targetFile = routeMap[rawPath];
      const filePath = path.join(process.cwd(), targetFile);
      if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, 'utf8');
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        return res.status(200).send(html);
      }
    } catch (e) {
      console.error('Error serving static route:', e);
    }
  }

  // 2. Serve landing.html directly for main domains root '/'
  const mainDomainsToRedirect = [
    'daletepido.com.ar',
    'www.daletepido.com.ar',
    'clickapp.com',
    'www.clickapp.com'
  ];
  
  if (mainDomainsToRedirect.includes(hostname) && !req.query.store && (rawPath === '/' || rawPath === '')) {
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

  // 2. Determine store ID
  let storeId = req.query.store;
  
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

  // 3. Render the store HTML with injected OG tags
  try {
    const filePath = path.join(process.cwd(), 'tienda.html');
    let html = fs.readFileSync(filePath, 'utf8');

    // Extract the Supabase key from the HTML itself
    const keyMatch = html.match(/const SUPABASE_KEY\s*=\s*['"]([^'"]+)['"]/);
    const SUPABASE_KEY = keyMatch ? keyMatch[1] : '';

    if (SUPABASE_KEY) {
      // Fetch store data
      const configRes = await fetch(`${SUPABASE_URL}/rest/v1/company_settings?store_id=eq.${encodeURIComponent(storeId)}`, {
        headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
      });
      
      if (configRes.ok) {
        const data = await configRes.json();
        if (data && data.length > 0) {
          const cfg = data[0];
          
          const title = cfg.business_name ? `${cfg.business_name} — Tu tienda online` : 'Dale! Te Pido';
          const desc = cfg.desc || 'Elegí tus productos, armá tu pedido y coordiná por WhatsApp.';
          const logo = cfg.logo || 'https://res.cloudinary.com/deuog0r34/image/upload/v1778811606/daletepido-logo-white_zpcolq.png';
          const url = `https://${storeId}.daletepido.com.ar/`;

          // Replace title
          html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
          
          // Inject OG tags right after <title>
          const ogTags = `
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${logo}" />
<meta property="og:url" content="${url}" />
<meta property="og:type" content="website" />
<link rel="icon" type="image/png" href="${logo}" />
`;
          html = html.replace(/<\/title>/, `</title>\n${ogTags}`);
        }
      }
    }

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
