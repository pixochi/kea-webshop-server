import {Entity, PrimaryGeneratedColumn, ManyToOne, Column, Unique} from 'typeorm';

import User from './user';
import Product from './product';

@Entity()
@Unique('UQ_LIKE', ['userId', 'statusId'])
export default class Review {

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(type => User, user => user.reviews)
  user: User;

  @Column('int')
  userId: string;

  @ManyToOne(type => Product, product => product.review, { onDelete: 'CASCADE' })
  product: Product;

  @Column('int')
  productId: string;
}