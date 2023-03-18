import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from 'src/service/product/product.service';

@Controller('/category')
export class ProductsController {
  constructor(private Service: ProductsService) {}

  @Get()
  public async getAll() {
    return await this.Service.findAll();
  }

  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    return await this.Service.findCategory(id);
  }
}
