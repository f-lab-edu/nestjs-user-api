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
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SerializeUser } from './interceptors/serialize-user.interceptor';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
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
  async create(@Body() body: CreateUserDto) {
    const { email, password, name, age } = body;
    const user = await this.authService.signup({ email, password, name, age });
    return user;
  }

  @Post('/signin')
  @UseGuards(LocalAuthGuard)
  async signin(@User() user: SignInUserDto) {
    return this.authService.signin(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @SerializeUser()
  find(@Param('id') id: string) {
    return this.usersService.find(parseInt(id));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @SerializeUser()
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @SerializeUser()
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
