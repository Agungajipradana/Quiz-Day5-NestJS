import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './OrderDetail';
import { Users } from './Users';
import { Product } from './Product';

@Index('order_pk', ['orderId'], { unique: true })
@Entity('orders', { schema: 'public' })
export class Orders {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'order_id' })
  orderId: number;

  @Column('integer', { name: 'totalproduct', nullable: true })
  totalproduct: number | null;

  @Column('numeric', { name: 'totalprice', nullable: true })
  totalprice: string | null;

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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Users, (users) => users.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Users;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
