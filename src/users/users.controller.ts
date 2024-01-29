import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Session,
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
  async create(
    @Body() body: CreateUserDto,
    @Session() session: Record<string, any>,
  ) {
    const { email, password, name, age } = body;
    const user = await this.authService.signup(email, password, name, age);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: SignInUserDto,
    @Session() session: Record<string, any>,
  ) {
    const { email, password } = body;
    const user = await this.authService.signin(email, password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signOut(@Session() session: Record<string, any>) {
    session.userId = null;
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
