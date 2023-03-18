import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'output/entities/ProductCategory';
import { Product } from 'output/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private serviceRepo: Repository<Product>,
    @InjectRepository(ProductCategory)
    private categeRepo: Repository<ProductCategory>,
  ) {}

  public async findAll() {
    return await this.serviceRepo.find();
  }

  public async findCategory(id: number) {
    const categ = await this.categeRepo.findOne({
      relations: { products: true },
      where: { productcategoryId: id },
    });

    return categ;
  }
}
