import { Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { User } from '../users/decorators/user-param.decorator';
import { TokenUserDto } from '../users/dtos/token-user.dto';
import { AuthService } from './auth.service';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh-auth.guard';
import { LoginUserDto } from '../users/dtos/login-user.dto';

@Controller('auth')
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @UseGuards(GoogleOAuthGuard)
  async login() {}

  @Get('callback')
  @UseGuards(GoogleOAuthGuard)
  async loginCallback(@User() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenAuthGuard)
  async refresh(@User() user: TokenUserDto) {
    return this.authService.getAccessToken(user);
  }
}
