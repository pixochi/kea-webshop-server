import {getConnection, Repository} from 'typeorm';
import uuid4 from 'uuid';

import OrderItemController from './order-item';

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

    const orderItemController = await new OrderItemController();

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

    newOrder.items = orderItemEntities;
    const savedOrder = await this.orderRepository.insert(newOrder);

    const orderItemsPromises = orderItemEntities.map(item => {
        return new Promise<OrderItemEntity>(async (resolve) => {
            const savedItem = await orderItemController.createOrderItem(item);
            resolve(savedItem);
        });
    });
    await Promise.all<OrderItemEntity>(orderItemsPromises);

    return savedOrder;
  }

}
