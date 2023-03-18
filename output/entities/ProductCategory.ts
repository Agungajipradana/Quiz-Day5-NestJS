import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Product";

@Index("productcategory_pk", ["productcategoryId"], { unique: true })
@Entity("product_category", { schema: "public" })
export class ProductCategory {
  @PrimaryGeneratedColumn({ type: "integer", name: "productcategory_id" })
  productcategoryId: number;

  @Column("character varying", { name: "name", nullable: true, length: 100 })
  name: string | null;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 200,
  })
  description: string | null;

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

  @OneToMany(() => Product, (product) => product.category_2)
  products: Product[];
}
