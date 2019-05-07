import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from 'typeorm';

import Review from './review';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({unique: true, length: 64})
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Review, review => review.user)
  reviews: Review[];
}