import {getConnection, Repository} from 'typeorm';
import uuid4 from 'uuid';

import OrderEntity from 'src/entity/order';
import Product from 'src/entity/product';
import OrderItemEntity from 'src/entity/order-item';
import User from 'src/entity/user';

export default class OrderController {

  orderRepository: Repository<OrderEntity>;

  constructor() {
    this.orderRepository = getConnection().manager.getRepository(OrderEntity);
  }

  async order(orderId: string) {
    return await this.orderRepository.findOne({id: orderId});
  }

  async allOrders() {
    return await this.orderRepository.find();
  }

  async createOrder(orderItems: any[], userId: string, country: string) {

    const user = new User();
    user.id = userId;
    user.country = country;

    const newOrder = new OrderEntity();
    const orderId = uuid4();
    newOrder.id = orderId;
    newOrder.user = user;

    const orderItemEntities = orderItems && orderItems.map(item => {
        const {
            price,
            id,
            amount,
        } = item;

        const product = new Product();
        product.id = id;

        const itemEntity = new OrderItemEntity();
        itemEntity.price = price;
        itemEntity.amount = amount;
        itemEntity.product = product;
        itemEntity.order = newOrder;

        return itemEntity;
    });

    // get a connection and create a new query runner
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // let's now open a new transaction:
    await queryRunner.startTransaction();

    let savedOrder;

    try {
      // execute some operations on this transaction:
      // newOrder.items = orderItemEntities;
      savedOrder = await queryRunner.manager.save(newOrder);

      const orderItemsPromises = orderItemEntities.map(item => {
        return new Promise<OrderItemEntity>(async (resolve, reject) => {
          const savedItem = await queryRunner.manager.query(`
              DECLARE @T TABLE (
                id     INT,
                amount INT
              );

              INSERT INTO "order_item"("price", "amount", "orderId", "productId") OUTPUT
              INSERTED."id",
              INSERTED."amount"
              INTO @T
              VALUES (@0, @1, @2, @3);
            `, [item.price, item.amount, item.order.id, item.product.id]
          );
            // const savedItem = await orderItemController.createOrderItem(item);
            resolve(savedItem);
        });
      });
        await Promise.all(orderItemsPromises);

        // commit transaction now:
        await queryRunner.commitTransaction();
    } catch (error) {
      // since we have errors lets rollback changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
      return savedOrder;
    }
  }
}
