import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Users } from './Users';

@Index('customer_pk', ['customerId'], { unique: true })
@Entity('customers', { schema: 'public' })
export class Customers {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'customer_id' })
  customerId: number;

  @Column('character varying', {
    name: 'firstname',
    nullable: true,
    length: 100,
  })
  firstname: string | null;

  @Column('character varying', {
    name: 'lastname',
    nullable: true,
    length: 100,
  })
  lastname: string | null;

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

  @ManyToOne(() => Users, (users) => users.customers, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Users;
}
