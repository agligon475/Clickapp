// api/image-search.js — Vercel Serverless Function
// Realiza búsquedas de imágenes en DuckDuckGo sin requerir clave de API
// y devuelve las URLs de forma segura para evitar problemas de CORS.

export default async function handler(req, res) {
  // Permitir GET o POST
  let query = '';
  if (req.method === 'POST') {
    if (typeof req.body === 'string') {
      try {
        const bodyObj = JSON.parse(req.body);
        query = bodyObj.query;
      } catch (e) {
        query = req.body;
      }
    } else if (req.body && req.body.query) {
      query = req.body.query;
    }
  } else {
    query = req.query.query;
  }
  
  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
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

    if (results.length === 0) {
      return res.status(500).json({ error: 'No se pudieron obtener imágenes de ninguna fuente disponible (DuckDuckGo/Openverse)' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    res.status(200).json({ results });
  } catch (err) {
    res.status(500).json({ error: 'Error searching images', detail: err.message });
  }
}
