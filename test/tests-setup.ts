import dotenv from 'dotenv';

import {initDbConnection} from '../db-connection';

dotenv.config();

before(async () => {
  await initDbConnection().connect();
});