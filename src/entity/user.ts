import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Review from './review';
import Order from './order';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({length: 128})
  firstName: string;

  @Column({length: 128})
  lastName: string;

  @Column({unique: true, length: 64})
  email: string;

  @Column({length: 128})
  password: string;

  // https://en.wikipedia.org/wiki/List_of_long_place_names
  @Column({length: 128})
  city: string;

  // https://stackoverflow.com/questions/325041/i-need-to-store-postal-codes-in-a-database-how-big-should-the-column-be
  @Column({length: 32})
  zipcode: string;

  // https://www.worldatlas.com/articles/what-is-the-longest-country-name-in-the-world.html
  @Column({length: 128})
  country: string;

  @Column({length: 64})
  street: string;

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}