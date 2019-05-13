import express from 'express';
import dotenv from 'dotenv';
import routes from '../src/controllers/routes';

import {initDbConnection} from '../db-connection';

dotenv.config();
export const app = express();
const SERVER_DEV_PORT = 4000;
app.use('/', routes);

app.listen(SERVER_DEV_PORT, async () => {
  console.log(`KEA-webshop server listening on port ${SERVER_DEV_PORT}!`),
  await initDbConnection();
});