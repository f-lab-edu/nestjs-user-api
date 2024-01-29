import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<void> {
    const { email, password, name, age } = body;
    await this.usersService.create(email, password, name, age);
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    const user = await this.usersService.find(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(parseInt(id), body);
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(parseInt(id));
    if (!user) throw new NotFoundException('user not found');
    return user;
  }
}
