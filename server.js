const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const host = '127.0.0.1';
const port = 8000;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4'
};

const server = http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '/website.html' : req.url;
  const safePath = decodeURIComponent(urlPath);
  const requestedFile = path.join(root, safePath.replace(/^\/+/, ''));

  if (!requestedFile.startsWith(root)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Forbidden');
    return;
  }

  fs.readFile(requestedFile, (err, data) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(err.code === 'ENOENT' ? 'Not found' : 'Server error');
      return;
    }

    const ext = path.extname(requestedFile).toLowerCase();
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Visionity site running at http://${host}:${port}/website.html`);
});

server.on('error', error => {
  if (error.code !== 'EADDRINUSE') {
    throw error;
  }

  const request = http.get({ hostname: host, port, path: '/website.html' }, response => {
    response.resume();

    if (response.statusCode !== 200 || !response.headers['content-type']?.startsWith('text/html')) {
      console.error(`Port ${port} is already in use by another service.`);
      process.exitCode = 1;
      return;
    }

    console.log(`Visionity site already running at http://${host}:${port}/website.html`);
  });

  request.on('error', probeError => {
    console.error(`Unable to start Visionity on port ${port}:`, probeError.message);
    process.exitCode = 1;
  });
});
