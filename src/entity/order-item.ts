import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

import Order from './order';
import Product from './product';

@Entity()
export default class OrderItem {
  @PrimaryGeneratedColumn()
  readonly id: string;

  // price at the time of placing the order
  @Column('decimal', {precision: 13, scale: 4})
  price: number;

  @Column({
    type: 'int',
    unsigned: true,
    default: 1,
    nullable: true,
  })
  amount: number;

  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @ManyToOne(() => Product, product => product.orderItem, {onDelete: 'CASCADE', cascade: true})
  product: Product;
}