import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(name: string, age: number): Promise<void> {
    const user = new UserEntity();
    user.name = name;
    user.age = age;
    await this.usersRepository.save(user);
  }

  async update(id: number, name: string, age: number): Promise<void> {
    const user = await this.usersRepository.findOneBy({ id });
    if (name) user.name = name;
    if (age) user.age = age;
    await this.usersRepository.update({ id }, user);
  }

  async find(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
