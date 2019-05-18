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
    return await this.orderItemRepository.insert(orderItem);
  }

}
