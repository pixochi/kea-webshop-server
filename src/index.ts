import express from 'express';

const app = express();
const SERVER_DEV_PORT = 4000;

app.get('/', (req, res) => {
  return res.send('Received a GET HTTP method');
});

app.post('/', (req, res) => {
  return res.send('Received a POST HTTP method');
});

app.put('/', (req, res) => {
  return res.send('Received a PUT HTTP method');
});

app.delete('/', (req, res) => {
  return res.send('Received a DELETE HTTP method');
});

app.listen(SERVER_DEV_PORT, () =>
  console.log(`KEA-webshop server listening on port ${SERVER_DEV_PORT}!`),
);