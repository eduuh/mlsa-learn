const http = require('http');

const todos = [
  { id: 1, text: 'Todo one' },
  { id: 2, text: 'Todo two' },
  { id: 3, text: 'Todo three' },
];
const server = http.createServer((req, res) => {
  const { method, url } = req;

  let status = 404;
  const response = {
    sucess: false,
    data: null,
  };

  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Powered-by': 'edwinteck',
  });

  if (method == 'GET' && url === '/todos') {
    (status = 200), (response.sucess = true), (response.data = 'Edwin');

    res.end(JSON.stringify({ todos }));
  } else if (method === 'POST' && url === '/todos') {
    const { id, text } = JSON.parse(body);
  }
});

res.end(JSON.stringify(response));
const PORT = 5000;
server.listen(PORT, () => console.log('server is running.'));
