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

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  let filePath = '.' + urlPath;
  if (filePath === './' || filePath === './index') filePath = './index.html';

  // Support clean URLs, static routes, and dynamic store rewrites
  if (!path.extname(filePath)) {
    if (fs.existsSync(filePath + '.html')) {
      filePath += '.html';
    } else {
      const storeId = urlPath.substring(1); // remove leading slash
      // Only rewrite if it's a potential store slug (no dots, not empty)
      if (storeId && !storeId.includes('/')) {
        filePath = './tienda.html';
        // We override req.url so that downstream page scripts parsing query params see the store
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
