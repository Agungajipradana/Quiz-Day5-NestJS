import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CustomerService } from 'src/service/customers/customers.service';

@Controller('/customer')
export class CustomerController {
  constructor(private ServicesCustomer: CustomerService) {}

  @Get()
  public async getAll() {
    return await this.ServicesCustomer.findAll();
  }
  @Get('/:id')
  public async getOne(@Param('id') id: number) {
    return await this.ServicesCustomer.findOne(id);
  }
  @Post()
  public async Create(
    @Body('customerId') customerId,
    @Body('firstname') firstname: string,
    @Body('lastname') lastname: string,
    @Body('userId') user,
  ) {
    return await this.ServicesCustomer.Create(
      customerId,
      firstname,
      lastname,
      user,
    );
  }
  @Put('/:id')
  public async Update(
    @Param('id') id: number,
    @Body('firstname') firstname: string,
  ) {
    return await this.ServicesCustomer.Update(id, firstname);
  }
  @Delete('/:id')
  public async Delete(@Param('id') id: string) {
    return await this.ServicesCustomer.Delete(id);
  }
}
