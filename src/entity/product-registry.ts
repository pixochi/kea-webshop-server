import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';

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

  @Column({nullable: true}) // TODO: remove all productRegistries from the table and make it non-nullable
  country: string;

  @ManyToOne(() => Product, product => product.productRegistries)
  product: Product;
}