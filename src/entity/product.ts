import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne} from 'typeorm';

import Review from './review';
import Category from './category';
import OrderItem from './order-item';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({length: 128})
  name: string;

  // in case you're interested why decimal(13, 4)
  // https://rietta.com/blog/2012/03/03/best-data-types-for-currencymoney-in/
  @Column('decimal', {precision: 13, scale: 4})
  price: number;

  @Column('text')
  description: string;

  @Column()
  image: string;

  @Column('float')
  rating: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToMany(() => Review, review => review.product, {onDelete: 'CASCADE'})
  reviews: Review[];

  @OneToOne(() => OrderItem, orderItem => orderItem.product)
  orderItem: OrderItem;
}