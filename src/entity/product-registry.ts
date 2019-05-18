import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';

import Product from './product';

@Entity()
export default class ProductRegistry {
  @PrimaryGeneratedColumn()
  readonly id: string;

  @Column({
    type: 'integer',
    unsigned: true,
    default: 0,
  })
  amount: number;

  @ManyToMany(() => Product, product => product.productRegistries)
  products: Product[];
}