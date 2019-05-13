import {Entity, PrimaryGeneratedColumn, ManyToOne, Column} from 'typeorm';

import User from './user';
import Product from './product';

@Entity()
export default class Review {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column('text')
  body: string;

  @Column('float')
  rating: number;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Product, product => product.reviews)
  product: Product;
}