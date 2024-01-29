import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<void> {
    const { name, age } = createUserDto;
    await this.usersService.create(name, age);
  }

  @Get(':id')
  async find(@Param('id') id: number) {
    return this.usersService.find(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UserDto,
  ): Promise<void> {
    const { name, age } = updateUserDto;
    await this.usersService.update(id, name, age);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.usersService.remove(id);
  }
}
