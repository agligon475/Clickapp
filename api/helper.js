// api/helper.js — Vercel Serverless Function
// Actúa como proxy entre el dashboard y la API de Anthropic
// evitando el bloqueo CORS del navegador en producción

export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // La API Key viene del header x-claude-key enviado desde el dashboard
  const claudeKey = req.headers['x-claude-key'];
  if (!claudeKey || !claudeKey.startsWith('sk-ant-')) {
    return res.status(401).json({ error: 'API Key inválida o faltante' });
  }

  try {
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': claudeKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Error al contactar la API de Anthropic', detail: err.message });
  }
}
