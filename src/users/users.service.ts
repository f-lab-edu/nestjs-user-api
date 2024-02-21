import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IUser } from './interfaces/user.interface';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create({ email, password, name, age }: IUser) {
    const user = this.usersRepository.create({
      email,
      password,
      name,
      age,
    });
    return this.usersRepository.save(user);
  }

  find(id: number) {
    if (!id) throw new NotFoundException('user not found');
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: number, info: Partial<IUser>) {
    const user = await this.find(id);
    if (!user) throw new NotFoundException('user not found');
    Object.assign(user, info);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.find(id);
    if (!user) throw new NotFoundException('user not found');
    return this.usersRepository.remove(user);
  }
}
