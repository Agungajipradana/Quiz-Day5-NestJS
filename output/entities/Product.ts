import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderDetail } from "./OrderDetail";
import { Orders } from "./Orders";
import { ProductCategory } from "./ProductCategory";

@Index("product_pk", ["productId"], { unique: true })
@Entity("product", { schema: "public" })
export class Product {
  @PrimaryGeneratedColumn({ type: "integer", name: "product_id" })
  productId: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 200,
  })
  description: string | null;

  @Column("numeric", { name: "price", nullable: true })
  price: string | null;

  @Column("character varying", { name: "image", nullable: true, length: 200 })
  image: string | null;

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

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails: OrderDetail[];

  @ManyToOne(() => Orders, (orders) => orders.products, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "orderId" }])
  category: Orders;

  @ManyToOne(
    () => ProductCategory,
    (productCategory) => productCategory.products,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn([
    { name: "category_id", referencedColumnName: "productcategoryId" },
  ])
  category_2: ProductCategory;
}
