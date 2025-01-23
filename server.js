//local server for accountableBot
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('./componentTest.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    }
  });
});

server.listen(80, () => {
  console.log('Server listening on port 8080');
});