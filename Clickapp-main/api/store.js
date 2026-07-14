import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://iaylgsthwildjkiiwgfd.supabase.co';
// We don't have the anon key as a server environment variable easily accessible here unless we extract it from tienda.html or hardcode it.
// Let's read it from tienda.html or hardcode it since it's an anon key.
// Wait, I can extract it from the HTML directly if needed, or just hardcode it like in the frontend.

export default async function handler(req, res) {
  const storeId = req.query.store;
  
  if (!storeId) {
    return res.status(400).send('Store ID is required');
  }

  try {
    // Read the static HTML file
    const filePath = path.join(process.cwd(), 'tienda.html');
    let html = fs.readFileSync(filePath, 'utf8');

    // Extract the Supabase key from the HTML itself so we don't have to duplicate secrets
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
          const url = `https://${storeId}.daletepido.com.ar/`; // Default to subdomain routing format

          // Replace the placeholders in the HTML
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
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300'); // Cache for 60s at CDN edge
    res.status(200).send(html);
  } catch (error) {
    console.error('Error generating store HTML:', error);
    // If error, just serve the fallback generic HTML by reading it again
    try {
      const fallbackHtml = fs.readFileSync(path.join(process.cwd(), 'tienda.html'), 'utf8');
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.status(200).send(fallbackHtml);
    } catch (e) {
      res.status(500).send('Internal Server Error');
    }
  }
}
