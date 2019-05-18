import { getConnectionManager } from 'typeorm';
import * as TypeORM from 'typeorm';
import { Container } from 'typedi';

// used for dependency injection of repositories
TypeORM.useContainer(Container);

const connectionManager = getConnectionManager();

export const initDbConnection = () => {
  return connectionManager.create({
    type: 'mssql',
    host: process.env.MSSQL_HOST,
    port: Number(process.env.MSSQL_PORT),
    username: process.env.MSSQL_USERNAME,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DB,
    synchronize: true,
    logger: 'advanced-console',
    logging: 'all',
    options: {
      encrypt: true,
    },
    // dropSchema: true,
    // cache: true,
    entities: [`${__dirname}/src/entity/*.ts`],
    subscribers: [`${__dirname}/src/subscribers/*.ts`],
  });
};
