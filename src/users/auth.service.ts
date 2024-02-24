import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  private async hashPassword(password: string) {
    return bcrypt.hash(password, saltRounds);
  }

  private async validatePassword({
    password,
    storedPassword,
  }: {
    password: string;
    storedPassword: string;
  }) {
    return bcrypt.compare(password, storedPassword);
  }

  async validateUser({ email, password }: Partial<IUser>) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('user not found');

    const { password: hash } = user;

    if (!(await this.validatePassword({ password, storedPassword: hash }))) {
      throw new BadRequestException('bad password');
    }
    return user;
  }

  async signup({ email, password, name, age }: Partial<IUser>) {
    const isDuplicated =
      await this.usersService.checkDuplicatedUserByEmail(email);
    if (isDuplicated) throw new BadRequestException('email in use');

    const hash = await this.hashPassword(password);

    return this.usersService.create({ email, password: hash, name, age });
  }

  async signin({ id, email }: Partial<IUser>) {
    const payload = { id, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
