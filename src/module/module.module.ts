import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'output/entities/Customers';
import { Users } from 'output/entities/Users';
import { Orders } from 'output/entities/Orders';
import { OrderDetail } from 'output/entities/OrderDetail';
import { Product } from 'output/entities/Product';
import { ProductCategory } from 'output/entities/ProductCategory';
import { UsersController } from 'src/controller/users/users.controller';
import { UsersService } from 'src/service/users/users.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/auth/local.strategy';
import { ProductsService } from 'src/service/product/product.service';
import { ProductsController } from 'src/controller/product/product.controller';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Customers,
      Users,
      Orders,
      OrderDetail,
      Product,
      ProductCategory,
    ]),
    PassportModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [UsersService, ProductsService, LocalStrategy, JwtStrategy],
  controllers: [UsersController, ProductsController],
  exports: [UsersService],
})
export class ModuleModule {}
