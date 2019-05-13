import express from 'express';
import dotenv from 'dotenv';

import routes from '../src/controllers/routes';
import {initDbConnection} from '../db-connection';

dotenv.config();

const SERVER_DEV_PORT = 4000;
const app = express();

app.use('/', routes);

app.listen(SERVER_DEV_PORT, async () => {
  console.log(`KEA-webshop server listening on port ${SERVER_DEV_PORT}!`);
  console.log('Connecting to MySQL db...');
  await initDbConnection();
  console.log('Connected!');
});
