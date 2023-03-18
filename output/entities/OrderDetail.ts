import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./Orders";
import { Product } from "./Product";

@Index("orderdetail_pk", ["orderdetailId"], { unique: true })
@Entity("order_detail", { schema: "public" })
export class OrderDetail {
  @PrimaryGeneratedColumn({ type: "integer", name: "orderdetail_id" })
  orderdetailId: number;

  @Column("integer", { name: "quantity", nullable: true })
  quantity: number | null;

  @Column("timestamp with time zone", {
    name: "createdat",
    nullable: true,
    default: () => "now()",
  })
  createdat: Date | null;

  @Column("timestamp with time zone", {
    name: "updatedat",
    nullable: true,
    default: () => "now()",
  })
  updatedat: Date | null;

  @ManyToOne(() => Orders, (orders) => orders.orderDetails, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Product;
}
