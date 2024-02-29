import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from './users.service';
import { IUser } from './interfaces/user.interface';

type Tokens = { accessToken: string; refreshToken: string };

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async sign({ id, email }: Partial<IUser>) {
    const payload = { email, sub: id };
    return this.jwtService.signAsync(payload);
  }

  private async refresh() {
    const payload = {};
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get('jwtRefreshSecret'),
      expiresIn: '14d',
    });
  }

  private async getTokens({ id, email }: Partial<IUser>): Promise<Tokens> {
    const payload = { id, email };
    return {
      accessToken: await this.sign(payload),
      refreshToken: await this.refresh(),
    };
  }

  async verifyRefreshToken({ refreshToken }) {
    const user = await this.usersService.findByRefreshToken(refreshToken);
    if (!user) throw new UnauthorizedException('invalid token');
    return { id: user.id, email: user.email };
  }

  updateRefreshToken({ id, refreshToken }) {
    return this.usersService.update(id, { refreshToken });
  }

  async getAccessToken({ id, email }: Partial<IUser>) {
    const payload = { id, email };
    return {
      access_token: await this.sign(payload),
    };
  }

  async login({ email, name }: Partial<IUser>) {
    const { id } = await this.usersService.findOrCreate({ email, name });
    const { accessToken, refreshToken } = await this.getTokens({ id, email });
    await this.updateRefreshToken({ id, refreshToken });
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}
