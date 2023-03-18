import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Users } from 'output/entities/Users';

const Salt = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  public async signup(fields: any) {
    try {
      const hashPassword = await Bcrypt.hash(fields.password, Salt);
      const user = await this.userRepo.save({
        username: fields.username,
        password: hashPassword,
        createat: new Date(),
        updateat: new Date(),
      });
      const { passwords, ...result } = user;
      return result;
    } catch (error) {
      return error.message;
    }
  }

  public async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOne({
      relations: {
        customers: true,
        orders: { orderDetails: { product: true } },
      },
      where: [{ username: username }],
    });

    const compare = await Bcrypt.compare(password, user.passwords);

    if (compare) {
      const { passwords, ...result } = user;
      return result;
    }
  }

  public async login(user: any) {
    const payload = {
      userName: user.username,
      userPass: user.password,
      cust: user.customers,
      order: user.orders,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
