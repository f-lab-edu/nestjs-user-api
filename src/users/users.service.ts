import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(name: string, age: number): Promise<void> {
    const user = new User();
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

  async find(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
