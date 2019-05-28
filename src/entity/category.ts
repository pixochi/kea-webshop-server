import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Product from './product';

@Entity()
export default class Category {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({length: 128})
  name: string;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
