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
      const initUrl = `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
      const initRes = await fetch(initUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
        }
      });
      const html = await initRes.text();
      const vqdRegex = /vqd=['"]?([^&"']+)['"]?/;
      const match = html.match(vqdRegex);
      if (!match) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Could not fetch search token' }));
      }
      const vqd = match[1];

      const searchUrl = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,`;
      const searchRes = await fetch(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
          'Referer': 'https://duckduckgo.com/'
        }
      });
      const data = await searchRes.json();
      const results = data.results ? data.results.slice(0, 8).map(r => ({
        title: r.title,
        image: r.image,
        thumbnail: r.thumbnail
      })) : [];

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
        filePath = './tienda.html';
        req.url = `/tienda.html?store=${storeId}`;
      }
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
