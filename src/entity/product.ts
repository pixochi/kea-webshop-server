import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';

import Review from './review';
import Category from './category';
import OrderItem from './order-item';
import ProductRegistry from './product-registry';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: string;

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

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItem: OrderItem;

  @OneToMany(() => ProductRegistry, productRegistry => productRegistry.product)
  productRegistries: ProductRegistry[];
}