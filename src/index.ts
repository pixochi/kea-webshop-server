import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import routes from './routes';
import {initDbConnection} from '../db-connection';

dotenv.config();

const SERVER_DEV_PORT = 4000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.listen(SERVER_DEV_PORT, async () => {
  console.log(`KEA-webshop server listening on port ${SERVER_DEV_PORT}!`);
  console.log('Connecting to MSSQL db...');
  const connection = await initDbConnection().connect();

  // PRODUCT TRIGGER
  await connection.query(`
    IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[decreaseProductAmountOnOrder]'))
    DROP TRIGGER decreaseProductAmountOnOrder;
  `);
  await connection.query(`
    CREATE TRIGGER decreaseProductAmountOnOrder
    ON dbo.order_item
    FOR INSERT
    AS
    DECLARE @OrderItemAmount INT,
      @ProductId INT;

    SELECT @ProductId = ins.productId FROM INSERTED ins;
    SELECT @OrderItemAmount = ins.amount FROM INSERTED ins;

    SELECT 'country' AS country FROM dbo.order_item
      LEFT JOIN dbo.[order]
      ON dbo.order_item.orderId = dbo.[order].id;

    BEGIN
      UPDATE dbo."product_registry"
      SET "amount" = "amount" - @OrderItemAmount
      WHERE "country" = country AND "productId" = @ProductId
    END`
  );

  // USER TRIGGER
  await connection.query(`
    IF EXISTS (SELECT * FROM sys.triggers WHERE object_id = OBJECT_ID(N'[dbo].[updateOldPassword]'))
    DROP TRIGGER updateOldPassword;
  `);

  await connection.query(`
    CREATE TRIGGER updateOldPassword
    ON dbo.[user]
    FOR UPDATE
    AS
    DECLARE @UserId INT,
        @CurrentPassword VARCHAR(128);

      SELECT @UserId = ins.id FROM INSERTED ins;

      SELECT @CurrentPassword = d.[password]
      FROM DELETED as d
      WHERE id = @UserId;

    BEGIN
      UPDATE dbo.[user]
      SET previousPassword = @CurrentPassword
      WHERE id = @UserId
    END
  `);

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