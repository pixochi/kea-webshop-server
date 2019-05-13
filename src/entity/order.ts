import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from 'typeorm';

import User from './user';
import OrderItem from './order-item';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column('datetime')
  orderedAt: Date;

  // TODO: add a shipping method?

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @ManyToOne(() => OrderItem, orderItem => orderItem.order)
  items: OrderItem[];
}