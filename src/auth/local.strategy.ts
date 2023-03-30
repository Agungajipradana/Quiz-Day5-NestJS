import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/service/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private autService: UsersService) {
    super();
  }
  async validate(username: string, passwords: string) {
    console.log(username);
    const user = await this.autService.validateUser(username, passwords);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
