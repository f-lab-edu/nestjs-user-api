import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SignInUserDto } from './dtos/sign-in-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { SerializeUser } from './interceptors/serialize.interceptor';

@Controller('auth')
@SerializeUser()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  create(@Body() body: CreateUserDto) {
    const { email, password, name, age } = body;
    return this.authService.signup(email, password, name, age);
  }

  @Post('/signin')
  signin(@Body() body: SignInUserDto) {
    const { email, password } = body;
    return this.authService.signin(email, password);
  }

  @Get(':id')
  find(@Param('id') id: string) {
    return this.usersService.find(parseInt(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
