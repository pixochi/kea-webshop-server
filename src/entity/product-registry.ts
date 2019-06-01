import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, Check} from 'typeorm';

import Product from './product';

@Entity()
@Check(`"amount" > -1`)
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