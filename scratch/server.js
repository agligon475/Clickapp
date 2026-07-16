import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = 5500;
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml'
};

function parseRequestBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => { resolve(body); });
  });
}

const server = http.createServer(async (req, res) => {
  let urlPath = req.url.split('?')[0];
  const host = req.headers.host || '';
  const hostname = host.split(':')[0].toLowerCase();

  // Redirect main domains to landing.html
  const mainDomainsToRedirect = [
    'daletepido.com.ar',
    'www.daletepido.com.ar',
    'clickapp.com',
    'www.clickapp.com'
  ];
  if (urlPath === '/' && mainDomainsToRedirect.includes(hostname)) {
    try {
      const filePath = path.join(process.cwd(), 'landing.html');
      const html = fs.readFileSync(filePath, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } catch (e) {
      res.writeHead(302, { Location: '/landing.html' });
      return res.end();
    }
  }

  // Detect subdomain for local routing rewrite
  const isSubdomain = (h) => {
    const domains = ['daletepido.com.ar', 'clickapp.com', 'localhost'];
    for (const d of domains) {
      if (h.endsWith(`.${d}`)) {
        const sub = h.substring(0, h.length - d.length - 1);
        const clean = sub.replace(/^www\./, '');
        if (clean) return clean;
      }
    }
    return null;
  };

  const subdomain = isSubdomain(hostname);
  if (urlPath === '/' && subdomain) {
    req.url = `/api/store?store=${subdomain}`;
    urlPath = '/api/store';
  }

  let filePath = '.' + urlPath;
  if (filePath === './' || filePath === './index') filePath = './index.html';

  // ═══════════════════════════════════════════ API PROXY ENDPOINTS
  if (urlPath === '/api/image-search') {
    let query = '';
    if (req.method === 'POST') {
      const rawBody = await parseRequestBody(req);
      try {
        const bodyObj = JSON.parse(rawBody);
        query = bodyObj.query;
      } catch (e) {
        query = rawBody;
      }
    } else {
      query = new URLSearchParams(req.url.split('?')[1] || '').get('query') || '';
    }
    
    if (!query) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Query parameter is required' }));
    }

    try {
      let results = [];
      
      // 1. Intentar buscar en DuckDuckGo
      try {
        const initUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        const initRes = await fetch(initUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
          }
        });
        if (initRes.ok) {
          const html = await initRes.text();
          const vqdRegex = /vqd=['"]?([^&"']+)['"]?/;
          const match = html.match(vqdRegex);
          if (match) {
            const vqd = match[1];
            const searchUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,`;
            const searchRes = await fetch(searchUrl, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'Referer': 'https://duckduckgo.com/'
              }
            });
            
            if (searchRes.ok) {
              const data = await searchRes.json();
              results = data.results ? data.results.slice(0, 8).map(r => ({
                title: r.title,
                image: r.image,
                thumbnail: r.thumbnail
              })) : [];
            }
          }
        }
      } catch (ddgErr) {
        console.warn('DuckDuckGo search failed, falling back to Openverse:', ddgErr.message);
      }

      // 2. Fallback a Openverse si DuckDuckGo falló o no devolvió resultados
      if (results.length === 0) {
        try {
          const openverseUrl = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(query)}&page_size=8`;
          const openverseRes = await fetch(openverseUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
          });
          if (openverseRes.ok) {
            const oData = await openverseRes.json();
            results = oData.results ? oData.results.map(r => ({
              title: r.title || 'Imagen',
              image: r.url,
              thumbnail: r.thumbnail || r.url
            })) : [];
          }
        } catch (openverseErr) {
          console.error('Openverse fallback also failed:', openverseErr.message);
        }
      }

      // 3. Fallback a Wikimedia Commons si DuckDuckGo y Openverse fallaron
      if (results.length === 0) {
        try {
          const wikimediaUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrsearch=filetype:bitmap%20${encodeURIComponent(query)}&gsrlimit=8&prop=imageinfo&iiprop=url&format=json&origin=*`;
          const wikimediaRes = await fetch(wikimediaUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
            }
          });
          if (wikimediaRes.ok) {
            const wData = await wikimediaRes.json();
            if (wData.query && wData.query.pages) {
              const pages = Object.values(wData.query.pages);
              results = pages.map(p => {
                const info = p.imageinfo ? p.imageinfo[0] : null;
                if (info && info.url) {
                  return {
                    title: p.title.replace('File:', ''),
                    image: info.url,
                    thumbnail: info.url
                  };
                }
                return null;
              }).filter(Boolean);
            }
          }
        } catch (wikiErr) {
          console.error('Wikimedia fallback also failed:', wikiErr.message);
        }
      }

      // Si aún no hay resultados, devolvemos un arreglo vacío (200 OK) para evitar errores HTTP 500 en consola
      if (results.length === 0) {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        return res.end(JSON.stringify({ results: [] }));
      }

      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      });
      return res.end(JSON.stringify({ results }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Error searching images', detail: err.message }));
    }
  }

  if (urlPath === '/api/helper') {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
    const claudeKey = req.headers['x-claude-key'];
    if (!claudeKey) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'API Key inválida o faltante' }));
    }
    const rawBody = await parseRequestBody(req);
    try {
      const upstream = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': claudeKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: rawBody,
      });
      const data = await upstream.json();
      res.writeHead(upstream.status, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Error contacting Anthropic API', detail: err.message }));
    }
  }

  if (urlPath === '/api/gemini') {
    if (req.method !== 'POST') {
      res.writeHead(405, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Method not allowed' }));
    }
    const geminiKey = req.headers['x-gemini-key'];
    if (!geminiKey) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'API Key de Gemini faltante' }));
    }
    const rawBody = await parseRequestBody(req);
    try {
      const bodyObj = JSON.parse(rawBody);
      const model = bodyObj.model || 'gemini-2.5-flash';
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

      const upstream = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          contents: bodyObj.contents,
          generationConfig: bodyObj.generationConfig
        }),
      });
      const data = await upstream.json();
      res.writeHead(upstream.status, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(data));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ error: 'Error contacting Gemini API', detail: err.message }));
    }
  }

  // Support clean URLs, static routes, and dynamic store rewrites
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else {
      const storeId = urlPath.substring(1); // remove leading slash
      // Only rewrite if it's a potential store slug (no dots, not empty)
      if (storeId && !storeId.includes('/')) {
        // Rewrite to api/store local handler for testing instead of serving HTML directly
        req.url = `/api/store?store=${storeId}`;
        urlPath = '/api/store';
        // Let it fall through to the API handlers below
      }
    }
  }

  if (urlPath === '/api/store') {
    const storeId = new URLSearchParams(req.url.split('?')[1] || '').get('store') || '';
    if (!storeId) {
      res.writeHead(400);
      return res.end('Store ID required');
    }
    try {
      let html = fs.readFileSync(path.join(process.cwd(), 'tienda.html'), 'utf8');
      const keyMatch = html.match(/const SUPABASE_KEY\s*=\s*['"]([^'"]+)['"]/);
      const SUPABASE_KEY = keyMatch ? keyMatch[1] : '';
      
      if (SUPABASE_KEY) {
        const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
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
            html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
            const ogTags = `\n<meta property="og:title" content="${title}" />\n<meta property="og:description" content="${desc}" />\n<meta property="og:image" content="${logo}" />\n<meta property="og:url" content="${url}" />\n<meta property="og:type" content="website" />\n<link rel="icon" type="image/png" href="${logo}" />\n`;
            html = html.replace(/<\/title>/, `</title>${ogTags}`);
          }
        }
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      return res.end(html);
    } catch (e) {
      console.error(e);
      res.writeHead(500);
      return res.end('Internal Server Error');
    }
  }

  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}\n`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const startServer = (port) => {
  server.listen(port, () => {
    console.log(`Server running locally at http://localhost:${port}/`);
    console.log('Press Ctrl+C to stop.');
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${port} is already in use. Trying port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
    }
  });
};

startServer(PORT);
