import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string, name: string, age: number) {
    const users = await this.usersService.findAll(email);
    if (users.length) throw new BadRequestException('email in use');

    const hash = await bcrypt.hash(password, saltRounds);

    return this.usersService.create(email, hash, name, age);
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.findAll(email);
    if (!user) throw new NotFoundException('user not found');

    const { password: hash } = user;

    if (!(await bcrypt.compare(password, hash))) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
