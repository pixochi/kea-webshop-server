import {getConnection, Repository} from 'typeorm';

import OrderItemEntity from '../entity/order-item';

export default class OrderItemController {

  orderItemRepository: Repository<OrderItemEntity>;

  constructor() {
    this.orderItemRepository = getConnection().manager.getRepository(OrderItemEntity);
  }

  async orderItem(orderItemId: string) {
    return await this.orderItemRepository.findOne({id: orderItemId});
  }

  async allOrderItems() {
    return await this.orderItemRepository.find();
  }

  async createOrderItem(orderItem: OrderItemEntity) {
    return await getConnection()
    .createEntityManager()
    .query(`
      DECLARE @T TABLE (
        id     INT,
        amount INT
      );

      INSERT INTO "order_item"("price", "amount", "orderId", "productId") OUTPUT
      INSERTED."id",
      INSERTED."amount"
      INTO @T
      VALUES (@0, @1, @2, @3);
    `, [orderItem.price, orderItem.amount, orderItem.order.id, orderItem.product.id, ]
    );
  }

}
