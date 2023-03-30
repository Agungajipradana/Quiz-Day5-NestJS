import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customers } from 'output/entities/Customers';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customers) private customerRepo: Repository<Customers>,
  ) {}

  public async findAll() {
    return await this.customerRepo.find({
      relations: {
        user: true,
      },
    });
  }

  public async findOne(id: number) {
    return await this.customerRepo.findOne({
      where: {
        customerId: id,
      },
      relations: {
        user: true,
      },
    });
  }

  public async Create(
    customerId,
    firstname: string,
    lastname: string,
    user,
    createdat: Date = new Date(),
    updatedat: Date = new Date(),
  ) {
    try {
      const customer = await this.customerRepo.save({
        customerId: customerId,
        firstname: firstname,
        lastname: lastname,
        user: user,
        createdat: createdat,
        updatedat: updatedat,
      });
      return customer;
    } catch (error) {
      return error.message;
    }
  }
  public async Update(id: number, firstname: string) {
    try {
      const customer = await this.customerRepo.update(id, {
        firstname: firstname,
      });
      return customer;
    } catch (error) {
      return error.message;
    }
  }
  public async Delete(id: string) {
    try {
      const customer = await this.customerRepo.delete(id);
      return customer;
    } catch (error) {
      return error.message;
    }
  }
}
