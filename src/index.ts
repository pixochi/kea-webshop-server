import express from 'express';
import dotenv from 'dotenv';

import routes from '../src/controllers/routes';
import bodyParser from 'body-parser';
import {initDbConnection} from '../db-connection';

dotenv.config();

const SERVER_DEV_PORT = 4001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.listen(SERVER_DEV_PORT, async () => {
  console.log(`KEA-webshop server listening on port ${SERVER_DEV_PORT}!`);
  console.log('Connecting to MSSQL db...');
  await initDbConnection().connect();
  console.log('Connected!');
});
