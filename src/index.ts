import express from 'express';
import dotenv from 'dotenv';

import routes from './routes';
import bodyParser from 'body-parser';
import {initDbConnection} from '../db-connection';
import mongoose from 'mongoose';

dotenv.config();

const SERVER_DEV_PORT = 4000;
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

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now....");
    process.exit();
  });