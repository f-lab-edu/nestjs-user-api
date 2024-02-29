import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  UseGuards,
  UseFilters,
} from '@nestjs/common';

import { UpdateUserDto } from './dtos/update-user.dto';
import { TokenUserDto } from './dtos/token-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { JwtAccessTokenAuthGuard } from './guards/jwt-access-auth.guard';
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh-auth.guard';
import { SerializeUser } from './interceptors/serialize-user.interceptor';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { User } from './decorators/user-param.decorator';
import { GoogleOAuthGuard } from './guards/google-oauth.guard';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('google')
  @UseGuards(GoogleOAuthGuard)
  async login() {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard)
  async loginCallback(@User() user: LoginUserDto) {
    return this.authService.login(user);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshTokenAuthGuard)
  async refresh(@User() user: TokenUserDto) {
    return this.authService.getAccessToken(user);
  }

  @Get('self')
  @UseGuards(JwtAccessTokenAuthGuard)
  @SerializeUser()
  find(@User() user: TokenUserDto) {
    return this.usersService.find(user.id);
  }

  @Put('self')
  @UseGuards(JwtAccessTokenAuthGuard)
  @SerializeUser()
  update(@User() user: TokenUserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Delete('self')
  @UseGuards(JwtAccessTokenAuthGuard)
  @SerializeUser()
  remove(@User() user: TokenUserDto) {
    return this.usersService.remove(user.id);
  }
}
