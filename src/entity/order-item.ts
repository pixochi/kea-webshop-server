import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';

import Order from './order';
import Product from './product';

@Entity()
export default class OrderItem {
  @PrimaryGeneratedColumn()
  readonly id: string;

  // price at the time of placing the order
  @Column('decimal', {precision: 13, scale: 4})
  price: number;

  @ManyToOne(() => Order, order => order.items)
  order: Order;

  @OneToOne(() => Product, product => product.orderItem, {onDelete: 'CASCADE', cascade: true})
  @JoinColumn() // adds a foreign key
  product: Product;
}