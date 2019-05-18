import {Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, OneToMany} from 'typeorm';

import User from './user';
import OrderItem from './order-item';

@Entity()
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({type: 'datetime'})
  orderedAt: Date;

  // TODO: add a shipping method?

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {cascade: ['insert']})
  items: OrderItem[];
}