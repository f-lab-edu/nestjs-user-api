import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';
import { ConfigService } from '@nestjs/config';

const saltRounds = 10;

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  private async sign({ id, email }: Partial<IUser>) {
    const payload = { email, sub: id };
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwtSecret'),
      expiresIn: '1h',
    });
  }

  private async refresh() {
    const payload = {};
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwtRefreshSecret'),
      expiresIn: '14d',
    });
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

    return this.usersService.create({
      email,
      password: await this.hashPassword(password),
      name,
      age,
    });
  }

  async signin({ id, email }: Partial<IUser>) {
    const payload = { id, email };
    const refreshToken = await this.refresh();

    await this.usersService.update(id, { refreshToken });

    return {
      access_token: await this.sign(payload),
      refresh_token: refreshToken,
    };
  }

  async verifyRefreshToken({ refreshToken }) {
    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) throw new UnauthorizedException('invalid token');
    return { id: user.id, email: user.email };
  }

  async getAccessToken({ id, email }: Partial<IUser>) {
    const payload = { id, email };
    return {
      access_token: await this.sign(payload),
    };
  }
}
