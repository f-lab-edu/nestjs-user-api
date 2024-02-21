import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup({ email, password, name, age }: IUser) {
    const user = await this.usersService.findByEmail(email);
    if (user) throw new BadRequestException('email in use');

    const hash = await bcrypt.hash(password, saltRounds);

    return this.usersService.create({ email, password: hash, name, age });
  }

  async signin({ email, password }: Partial<IUser>) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('user not found');

    const { password: hash } = user;

    if (!(await bcrypt.compare(password, hash))) {
      throw new BadRequestException('bad password');
    }
    return user;
  }
}
