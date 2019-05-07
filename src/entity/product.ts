import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Review from './review';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column('text')
  body: string;

  @OneToMany(() => Review, review => review.product, { onDelete: 'CASCADE' })
  review: Review;
}