import {getConnectionManager} from "typeorm";
import * as TypeORM from 'typeorm';
import {Container} from 'typedi';

// used for dependency injection of repositories
TypeORM.useContainer(Container);

const connectionManager = getConnectionManager();

export const initDbConnection = () => {

  return connectionManager.create({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: 'DATABASE_NAME',
    synchronize: true,
    logger: 'advanced-console',
    logging: 'all',
    // dropSchema: true,
    // cache: true,
    entities: [`${__dirname}/entity/*.ts`],
  })
};
