// api/qr.js — Vercel Serverless Function
// Genera de forma dinámica un código QR PNG para la tienda en cuestión

import QRCode from 'qrcode';

export default async function handler(req, res) {
  const { url, store } = req.query;

  let targetUrl = url;
  if (!targetUrl && store) {
    // Si viene solo el store, armar la URL del catálogo de esa tienda
    targetUrl = `https://${store}.daletepido.com.ar`;
  }

  if (!targetUrl) {
    return res.status(400).json({ error: 'Falta especificar el parámetro url o store' });
  }

  try {
    // Generar el QR como buffer de imagen PNG
    const qrBuffer = await QRCode.toBuffer(targetUrl, {
      type: 'png',
      width: 512,
      margin: 2,
      color: {
        dark: '#000000',  // Negro
        light: '#ffffff'  // Blanco
      }
    });

    // Enviar la imagen con cabeceras de caché prolongada para optimizar rendimiento
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    return res.status(200).send(qrBuffer);
  } catch (err) {
    return res.status(500).json({ error: 'Error al generar código QR', detail: err.message });
  }
}
