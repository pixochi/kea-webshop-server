import express from 'express';

export const app = express();
const SERVER_DEV_PORT = 4000;

app.listen(SERVER_DEV_PORT, () =>
  console.log(`KEA-webshop server listening on port ${SERVER_DEV_PORT}!`),
);