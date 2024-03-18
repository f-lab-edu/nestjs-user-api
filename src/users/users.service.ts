import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { IUser } from './interfaces/user.interface';
import { User } from './models/user.entity';
import { AccountsService } from '../accounts/accounts.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private dataSource: DataSource,
    private accountsService: AccountsService,
  ) {}

  async create({ email, name }: Partial<IUser>) {
    let user = null;

    const runner = this.dataSource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const account = await this.accountsService.create(runner);
      const userEntity = runner.manager.create(User, { email, name, account });
      user = await runner.manager.save(User, userEntity);
      await runner.commitTransaction();
    } catch (e) {
      console.error(e);
      await runner.rollbackTransaction();
    } finally {
      await runner.release();
    }
    return user;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async find(id: number) {
    if (!id) throw new NotFoundException('user not found');
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async findByRefreshToken(refreshToken: string) {
    return this.usersRepository.findOneBy({ refreshToken });
  }

  async findOrCreate({ email, name }: Partial<IUser>) {
    let user = await this.findByEmail(email);
    if (!user) {
      user = await this.create({ email, name });
    }
    return user;
  }

  async update(id: number, info: Partial<IUser>) {
    const user = await this.find(id);
    Object.assign(user, info);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.find(id);
    const runner = this.dataSource.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      await runner.manager.remove(user);
      await this.accountsService.remove({ id: user.account.id }, runner);
      await runner.commitTransaction();
    } catch (e) {
      console.error(e);
      await runner.rollbackTransaction();
    } finally {
      await runner.release();
    }
  }
}
