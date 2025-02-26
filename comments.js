// create a server
const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const url = require('url');

const server = http.createServer((req, res) => {
  const { method, url: reqUrl } = req;

  if (method === 'GET') {
    if (reqUrl === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      fs.createReadStream('index.html').pipe(res);
    } else if (reqUrl === '/comments') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      fs.createReadStream('comments.json').pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    }
  } else if (method === 'POST') {
    if (reqUrl === '/comments') {
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const { comment } = qs.parse(body);
        fs.readFile('comments.json', (err, data) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Server error' }));
            return;
          }

          const comments = JSON.parse(data);
          comments.push(comment);

          fs.writeFile('comments.json', JSON.stringify(comments), (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Server error' }));
              return;
            }

            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Comment added' }));
          });
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('404 Not Found');
    }
  } else {
    res.writeHead(405, { 'Content-Type': 'text/html' });
    res.end('405 Method Not Allowed');
  }
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});