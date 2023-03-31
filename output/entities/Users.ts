import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Customers } from './Customers';
import { Orders } from './Orders';

@Index('user_pk', ['userId'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'user_id' })
  userId: number;

  @Column('character varying', {
    name: 'username',
    nullable: true,
    length: 100,
  })
  username: string | null;

  @Column('text', { name: 'password', nullable: true })
  password: string | null;

  @Column('timestamp with time zone', {
    name: 'createdat',
    nullable: true,
    default: () => 'now()',
  })
  createdat: Date | null;

  @Column('timestamp with time zone', {
    name: 'updatedat',
    nullable: true,
    default: () => 'now()',
  })
  updatedat: Date | null;

  @OneToMany(() => Customers, (customers) => customers.user)
  customers: Customers[];

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];
}
