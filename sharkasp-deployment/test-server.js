const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <html>
      <head><title>PakWattan Test</title></head>
      <body>
        <h1>✅ Node.js is working!</h1>
        <p>Your SharkASP.net server is running Node.js correctly.</p>
        <p>Time: ${new Date().toISOString()}</p>
        <p>Environment: ${process.env.NODE_ENV || 'development'}</p>
      </body>
    </html>
  `);
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Test server running on port ${port}`);
});