import {getConnection, Repository} from 'typeorm';

import OrderEntity from '../entity/order';

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

  async createOrder(order: OrderEntity) {
    console.log({order})
    return await this.orderRepository.insert(order);
  }

}
