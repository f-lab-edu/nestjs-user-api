import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UseFilters,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { RefreshUserDto } from './dtos/refresh-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAccessTokenAuthGuard } from './guards/jwt-access-auth.guard';
import { JwtRefreshTokenAuthGuard } from './guards/jwt-refresh-auth.guard';
import { SerializeUser } from './interceptors/serialize-user.interceptor';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { User } from './decorators/user-param.decorator';

@Controller('users')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  @SerializeUser()
  async create(@Body() createUserDto: CreateUserDto) {
    const { email, password, name, age } = createUserDto;
    const user = await this.authService.signup({ email, password, name, age });
    return user;
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async signin(@User() user: SignInUserDto) {
    return this.authService.signin(user);
  }

  @Post('/refresh')
  @UseGuards(JwtRefreshTokenAuthGuard)
  async refresh(@User() user: RefreshUserDto) {
    return this.authService.getAccessToken(user);
  }

  @Get(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @SerializeUser()
  find(@Param('id') id: string) {
    return this.usersService.find(parseInt(id));
  }

  @Put(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @SerializeUser()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(parseInt(id), updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAccessTokenAuthGuard)
  @SerializeUser()
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
