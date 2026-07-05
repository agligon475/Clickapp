// api/gemini.js — Vercel Serverless Function
// Actúa como proxy entre el dashboard y la API de Gemini (Google AI)
// evitando el bloqueo CORS del navegador en producción

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // La API Key viene del header x-gemini-key enviado desde el dashboard
  const geminiKey = req.headers['x-gemini-key'];
  if (!geminiKey) {
    return res.status(401).json({ error: 'API Key de Gemini faltante o inválida' });
  }

  const model = req.body.model || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        contents: req.body.contents,
        generationConfig: req.body.generationConfig
      }),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al contactar la API de Gemini', detail: err.message });
  }
}
